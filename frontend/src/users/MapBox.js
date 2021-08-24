import React from 'react';
import ReactMapGL from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PolylineOverlay from './PolylineOverlay';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FiYXRyb24iLCJhIjoiY2tzNDNkN2I1MGp1bTJwc214ZnVwajRvciJ9.wVMGgukfb54v3u1X2e94Eg';

function MapBox() {
    const [viewport, setViewport] = React.useState({
        longitude: -116.91893124612263,
        latitude: 33.76030225825322,
        zoom: 14
    });

    return (
        <div className="map-container">
            <ReactMapGL
                {...viewport}
                width="100%"
                height="100%"
                onViewportChange={(viewport) => setViewport(viewport)}
                mapboxApiAccessToken={mapboxgl.accessToken}>
                <PolylineOverlay points={runs.runs.coordinates.map(loc => loc.coordinates)} />
            </ReactMapGL>
        </div>
    );
}

export default MapBox;