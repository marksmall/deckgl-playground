import React from 'react';

import 'mapbox-gl/dist/mapbox-gl.css';

import { StaticMap, MapContext, NavigationControl } from 'react-map-gl';
import DeckGL from '@deck.gl/react/typed';
import { ArcLayer, GeoJsonLayer } from '@deck.gl/layers/typed';

import { MAPBOX_ACCESS_TOKEN, INITIAL_VIEW_STATE } from './map.constants';

const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

const NAV_CONTROL_STYLE = {
  position: 'absolute',
  top: 10,
  left: 10,
};

const onClick = info => {
  if (info.object) {
    // eslint-disable-next-line
    alert(`${info.object.properties.name} (${info.object.properties.abbrev})`);
  }
};

const layers = [
  new GeoJsonLayer({
    id: 'airports',
    data: AIR_PORTS,
    // Styles
    filled: true,
    pointRadiusMinPixels: 2,
    pointRadiusScale: 2000,
    getPointRadius: f => 11 - f.properties.scalerank,
    getFillColor: [200, 0, 80, 180],
    // Interactive props
    pickable: true,
    autoHighlight: true,
    onClick,
  }),
  new ArcLayer({
    id: 'arcs',
    data: AIR_PORTS,
    dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
    // Styles
    getSourcePosition: f => [-0.4531566, 51.4709959], // London
    getTargetPosition: f => f.geometry.coordinates,
    getSourceColor: [0, 128, 200],
    getTargetColor: [200, 0, 80],
    getWidth: 1,
  }),
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
