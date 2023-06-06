import React, { FC } from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

import { StaticMap, MapContext, NavigationControl } from 'react-map-gl';
import DeckGL from '@deck.gl/react/typed';
// import { ArcLayer, GeoJsonLayer } from '@deck.gl/layers/typed';
// import { MVTLayer } from '@deck.gl/geo-layers/typed';

import { DataFilterExtension } from '@deck.gl/extensions/typed';

import type { PickingInfo } from '@deck.gl/core/typed';
import type { Feature } from 'geojson';

import { MVTComboLayer } from './mvt-combo-layer';

import { DataSetProperty } from './map-controls.component';

import * as benefits from './oa_gb_benefits_breakdown_raw_allgeo.json';
import * as child from './oa_gb_childpov2019_breakdown_raw_allgeo.json';
console.log('BENEFITS: ', benefits);
console.log('CHIOLD: ', child);

import { MAPBOX_ACCESS_TOKEN, INITIAL_VIEW_STATE } from './map.constants';

const MVT_LAD_BENEFITS =
  'https://astrosat-testing-public.s3.dualstack.eu-west-1.amazonaws.com/astrosat/lad_2019_gb_benefits_breakdown_raw__mvt/{z}/{x}/{y}.pbf';

const MVT_LAD_CHILD_POVERTY =
  'https://astrosat-testing-public.s3.dualstack.eu-west-1.amazonaws.com/astrosat/lad_2019_gb_childpov2019_breakdown_raw__mvt/{z}/{x}/{y}.pbf';

const NAV_CONTROL_STYLE = {
  position: 'absolute',
  top: 10,
  left: 10,
};

const onClick = (info: PickingInfo) => {
  if (info.object) {
    console.log(info.object.properties);
  } else {
    console.log('No Object', info);
  }
};

// const migrationLayer = new MVTLayer({
//   data: MVT_LAD_BENEFITS,
//   uniqueIdProperty: 'LAD Code',

//   getFillColor: [128, 200, 0, 150],
// });

// const mortalityLayer = new MVTLayer({
//   data: MVT_LAD_CHILD_POVERTY,
//   uniqueIdProperty: 'LAD Code',

//   getFillColor: [128, 0, 200, 150],
// });

interface Props {
  selectedProperties: DataSetProperty[];
  selectedFilterRanges: Array<number[]>;
}

const Map: FC<Props> = ({ selectedProperties, selectedFilterRanges }) => {
  const mvtComboLayer = new MVTComboLayer({
    data: MVT_LAD_BENEFITS,
    extraData: [MVT_LAD_CHILD_POVERTY],
    uniqueIdProperty: 'LAD Code',

    getFillColor: [0, 128, 200, 150],
    getLineColor: [16, 16, 16],
    getLineWidth: 64,

    pickable: true,
    onClick,
    extensions: [
      new DataFilterExtension({ filterSize: selectedProperties.length }),
    ],
    getFilterValue: (feature: Feature) => {
      const filters = selectedProperties?.map((property: DataSetProperty) => {
        if (feature.properties) {
          return feature.properties[property.name];
        }
      });

      return filters;
    },
    filterRange: selectedFilterRanges,
  });

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={[mvtComboLayer]}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ContextProvider={MapContext.Provider}
      height="85%"
    >
      <StaticMap
        mapStyle="mapbox://styles/mapbox/light-v9"
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
      />
      <NavigationControl style={NAV_CONTROL_STYLE} />
    </DeckGL>
  );
};

export default Map;
