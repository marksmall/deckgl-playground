import React from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

import { StaticMap, MapContext, NavigationControl } from 'react-map-gl';
import DeckGL from '@deck.gl/react/typed';
import { ArcLayer, GeoJsonLayer, IconLayer } from '@deck.gl/layers/typed';

import { PickingInfo } from '@deck.gl/core/typed';

import { MAPBOX_ACCESS_TOKEN, INITIAL_VIEW_STATE } from './map.constants';

const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

const NAV_CONTROL_STYLE = {
  position: 'absolute',
  top: 10,
  left: 10,
};

// const mvtStreetsLayer = new MVTLayer({
//   data: `https://a.tiles.mapbox.com/v4/mapbox.mapbox-streets-v7/{z}/{x}/{y}.vector.pbf?access_token=${MAPBOX_ACCESS_TOKEN}`,

//   minZoom: 0,
//   maxZoom: 23,
//   getLineColor: [192, 192, 192],
//   getFillColor: [140, 170, 180],

//   getLineWidth: f => {
//     switch (f.properties.class) {
//       case 'street':
//         return 6;
//       case 'motorway':
//         return 10;
//       default:
//         return 1;
//     }
//   },
//   lineWidthMinPixels: 1,
// });

const iconLayer = new IconLayer({
  id: 'IconLayer',
  data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json',

  /* props from IconLayer class */

  // alphaCutoff: 0.05,
  // billboard: true,
  // getAngle: 0,
  getColor: d => [Math.sqrt(d.exits), 140, 0],
  getIcon: d => 'marker',
  // getPixelOffset: [0, 0],
  getPosition: d => d.coordinates,
  getSize: d => 25,
  iconAtlas:
    'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
  iconMapping: {
    marker: {
      x: 0,
      y: 0,
      width: 128,
      height: 128,
      anchorY: 128,
      mask: true,
    },
  },
  // onIconError: null,
  // sizeMaxPixels: Number.MAX_SAFE_INTEGER,
  // sizeMinPixels: 0,
  // sizeScale: 2,
  // sizeUnits: 'pixels',

  /* props inherited from Layer class */

  // autoHighlight: false,
  // coordinateOrigin: [0, 0, 0],
  // coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
  // highlightColor: [0, 0, 128, 128],
  // modelMatrix: null,
  // opacity: 1,
  pickable: true,
  // visible: true,
  // wrapLongitude: false,
});

const onClick = (info: PickingInfo) => {
  if (info.object) {
    // eslint-disable-next-line
    alert(`${info.object.properties.name} (${info.object.properties.abbrev})`);
  }
};

const layers = [
  // new GeoJsonLayer({
  //   id: 'airports',
  //   data: AIR_PORTS,
  //   // Styles
  //   filled: true,
  //   pointRadiusMinPixels: 20,
  //   pointRadiusScale: 2000,
  //   getPointRadius: f => 11 - f.properties.scalerank,
  //   getFillColor: [200, 0, 80, 180],
  //   // Interactive props
  //   pickable: true,
  //   autoHighlight: true,
  //   onClick,
  // }),
  // new ArcLayer({
  //   id: 'arcs',
  //   data: AIR_PORTS,
  //   dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
  //   // Styles
  //   getSourcePosition: f => [-0.4531566, 51.4709959], // London
  //   getTargetPosition: f => f.geometry.coordinates,
  //   getSourceColor: [0, 128, 200],
  //   getTargetColor: [200, 0, 80],
  //   getWidth: 1,
  // }),
  iconLayer,
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
