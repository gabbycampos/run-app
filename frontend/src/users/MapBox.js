import React from 'react';
import ReactMapGL from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PolylineOverlay from './PolylineOverlay';

mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FiYXRyb24iLCJhIjoiY2tzNDNkN2I1MGp1bTJwc214ZnVwajRvciJ9.wVMGgukfb54v3u1X2e94Eg';

function MapBox() {
    const [viewport, setViewport] = React.useState({
        longitude: -122.486052,
        latitude: 37.830348,
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
                <PolylineOverlay points={[
                    [-122.483696, 37.833818],
                    [-122.483482, 37.833174],
                    [-122.483396, 37.8327],
                    [-122.483568, 37.832056],
                    [-122.48404, 37.831141],
                    [-122.48404, 37.830497],
                    [-122.483482, 37.82992],
                    [-122.483568, 37.829548],
                    [-122.48507, 37.829446],
                    [-122.4861, 37.828802],
                    [-122.486958, 37.82931],
                    [-122.487001, 37.830802],
                    [-122.487516, 37.831683],
                    [-122.488031, 37.832158],
                    [-122.488889, 37.832971],
                    [-122.489876, 37.832632],
                    [-122.490434, 37.832937],
                    [-122.49125, 37.832429],
                    [-122.491636, 37.832564],
                    [-122.492237, 37.833378],
                    [-122.493782, 37.833683]
                ]} />
            </ReactMapGL>
        </div>
    );
}

export default MapBox;