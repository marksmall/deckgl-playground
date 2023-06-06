import React from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

import { StaticMap, MapContext, NavigationControl } from 'react-map-gl';
import DeckGL from '@deck.gl/react/typed';
import { ArcLayer, GeoJsonLayer } from '@deck.gl/layers/typed';
import { PickingInfo } from '@deck.gl/core/typed';
import { MVTLayer } from '@deck.gl/geo-layers/typed';

import { MVTComboLayer } from './mvt-combo-layer';

import { MAPBOX_ACCESS_TOKEN, INITIAL_VIEW_STATE } from './map.constants';

const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

const MVT_LAD_MORTALITY =
  'https://astrosat-testing-public.s3.eu-west-1.amazonaws.com/astrosat/lad_2019_gb_mortality__mvt/{z}/{x}/{y}.pbf';

const MVT_LAD_MIGRATION =
  'https://astrosat-testing-public.s3.eu-west-1.amazonaws.com/astrosat/lad_2019_gb_migration__mvt/{z}/{x}/{y}.pbf';

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

const mvtComboLayer = new MVTComboLayer({
  data: MVT_LAD_MIGRATION,
  extraDataUrl: [MVT_LAD_MORTALITY],
  getFillColor: [0, 128, 200, 150],
  getLineColor: [16, 16, 16],
  getLineWidth: 64,

  pickable: true,
  autoHighlight: true,
  onClick,
});

// const migrationLayer = new MVTLayer({
//   data: MVT_LAD_MIGRATION,
//   uniqueIdProperty: 'LAD Code',

//   getFillColor: [128, 200, 0, 150],
// });

// const mortalityLayer = new MVTLayer({
//   data: MVT_LAD_MORTALITY,
//   uniqueIdProperty: 'LAD Code',

//   getFillColor: [128, 0, 200, 150],
// });

const layers = [
  // new GeoJsonLayer({
  //   id: 'airports',
  //   data: AIR_PORTS,
  //   // Styles
  //   filled: true,
  //   pointRadiusMinPixels: 2,
  //   pointRadiusScale: 2000,
  //   getPointRadius: feature => 11 - feature.properties?.scalerank,
  //   getFillColor: [200, 0, 80, 180],
  //   // Interactive props
  //   pickable: true,
  //   autoHighlight: true,
  //   onClick,
  // }),
  // new ArcLayer({
  //   id: 'arcs',
  //   data: AIR_PORTS,
  //   dataTransform: data =>
  //     data.features?.filter(
  //       (feature: unknown) => feature.properties.scalerank < 4,
  //     ),
  //   // Styles
  //   getSourcePosition: () => [-0.4531566, 51.4709959], // London
  //   getTargetPosition: f => f.geometry.coordinates,
  //   getSourceColor: [0, 128, 200],
  //   getTargetColor: [200, 0, 80],
  //   getWidth: 1,
  // }),
  mvtComboLayer,
];

const Map = () => {
  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      ContextProvider={MapContext.Provider}
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
