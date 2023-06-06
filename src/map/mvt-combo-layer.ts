import { DefaultProps } from '@deck.gl/core/typed';

import type { BinaryFeatures } from '@loaders.gl/schema';
import type { Feature } from 'geojson';
import { geojsonToBinary, binaryToGeojson } from '@loaders.gl/gis';

import { getURLFromTemplate } from '@deck.gl/geo-layers/typed/tile-layer/utils';
import type { TileLoadProps } from '@deck.gl/geo-layers/typed/tile-layer/types';
import MVTLayer, {
  MVTLayerProps,
} from '@deck.gl/geo-layers/typed/mvt-layer/mvt-layer';

// copied from: https://github.com/visgl/deck.gl/blob/8.8-release/modules/geo-layers/src/mvt-layer/mvt-layer.ts
type ParsedMvtTile = Feature[] | BinaryFeatures;

export type MVTComboLayerProps<DataT extends Feature = Feature> =
  _MVTComboLayerProps & MVTLayerProps<DataT>;

/** Props added by the MVTComboLayer  */
export type _MVTComboLayerProps = {
  /**
   * URLs to extra MVT tiles to load extra properties from.
   *
   * @default []
   */
  extraData: string[];
};

const defaultProps: DefaultProps<MVTComboLayerProps> = {
  ...MVTLayer.defaultProps,
  uniqueIdProperty: 'index',
  extraData: [],
};

export class MVTComboLayer<
  DataT extends Feature = Feature,
  ExtraProps = Record<string, unknown>,
> extends MVTLayer<DataT, Required<_MVTComboLayerProps> & ExtraProps> {
  static layerName = 'MVTComboLayer';
  static defaultProps = defaultProps;

  getTileData(loadProps: TileLoadProps): Promise<ParsedMvtTile> {
    const combineTilesData = async () => {
      const extraDataUrlTemplates: string[] = this.props.extraData;
      const uniqueIdProperty = this.props.uniqueIdProperty;

      const extraDataUrls = extraDataUrlTemplates.map(urlTemplate =>
        getURLFromTemplate(urlTemplate, loadProps),
      );

      // Check that all the templated urls are valid
      if (!extraDataUrls.every(url => url)) {
        return Promise.reject(`Invalid URL Template in extraData[]`);
      }

      // loadOptions taken from
      // https://github.com/visgl/deck.gl/blob/8.8-release/modules/geo-layers/src/mvt-layer/mvt-layer.ts#L191-L206
      let loadOptions = this.getLoadOptions();
      loadOptions = {
        ...loadOptions,
        mimeType: 'application/x-protobuf',
        mvt: {
          ...loadOptions?.mvt,
          coordinates: this.context.viewport.resolution ? 'wgs84' : 'local',
          tileIndex: loadProps.index,
        },
        gis: this.state.binary ? { format: 'binary' } : {},
      };

      const fetchContext = {
        propName: 'extraData',
        layer: this,
        loadOptions: loadOptions,
        signal: loadProps.signal,
      };

      // Construct fetch promises for each extraData MVT tile
      const extraDataPromises: Array<Promise<ParsedMvtTile>> = (
        extraDataUrls as string[]
      ).map(url => this.props.fetch(url, fetchContext));

      // Fetch data and extraData in parallel
      const [data, ...extraLayers]: ParsedMvtTile[] = await Promise.all(
        [super.getTileData(loadProps)].concat(extraDataPromises),
      );

      // If the MVTLayer decided to fetch in binary format
      // then we need to convert it back to GeoJSON first
      // so that we can work with the individual features in JS.
      const dataGeojson =
        this.state.binary && !Array.isArray(data)
          ? (binaryToGeojson(data) as Feature[])
          : (data as Feature[]);

      const extraLayersGeojson = extraLayers.map(extraLayer =>
        this.state.binary && !Array.isArray(extraLayer)
          ? (binaryToGeojson(extraLayer) as Feature[])
          : (extraLayer as Feature[]),
      );

      // Build lookup Maps of each set of extra properties
      // featId => properties
      // so that it's easy to lookup properties by featId.
      const extraLayersPropertiesLookup = extraLayersGeojson.map(
        extraLayerFeatures => {
          const propertiesMap = new Map<string, object>();
          extraLayerFeatures.forEach(feat => {
            // We can only use extraData features that have the uniqueIdProperty
            if (feat.properties?.[uniqueIdProperty]) {
              propertiesMap.set(
                feat.properties[uniqueIdProperty],
                feat.properties,
              );
            }
          });
          return propertiesMap;
        },
      );

      // For a ComboFeature to be valid, it must have data in *every* extraData layer
      // If we have no extraData for this feature, it must not have been included in the extraData MVT
      // => we cannot be sure we have all properties for this feature => remove it.
      // Also if a feature doesn't have the uniqueIdProperty, we have no way to match it with extra properties.
      const validFeatures = dataGeojson.filter(feature =>
        extraLayersPropertiesLookup.every(
          extraPropertiesMap =>
            feature.properties?.[uniqueIdProperty] &&
            extraPropertiesMap.has(feature.properties[uniqueIdProperty]),
        ),
      );

      // Combine to add all properties
      const combinedFeatures = validFeatures.map(feat => {
        // Add in extra properties from other MVTs
        extraLayersPropertiesLookup.forEach(extraPropertiesLookup => {
          feat.properties = {
            ...feat.properties,

            // We determined above that all valid features have the uniqueIdProperty
            ...extraPropertiesLookup.get(feat.properties?.[uniqueIdProperty]),
          };
        });

        return feat;
      });

      // If we the data was requested to be in binary format
      // we must convert it back to binary.
      return this.state.binary
        ? geojsonToBinary(combinedFeatures)
        : combinedFeatures;
    };

    return combineTilesData();
  }
}
