import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import RunAppApi from '../api/api';
import LoadingSpinner from '../common/LoadingSpinner';
import './UserRun.css';

import ReactMapGL from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PolylineOverlay from './PolylineOverlay';
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FiYXRyb24iLCJhIjoiY2tzNDNkN2I1MGp1bTJwc214ZnVwajRvciJ9.wVMGgukfb54v3u1X2e94Eg';

// Show run detail with map image

const UserRun = () => {
    const { id } = useParams();
    console.debug("UserRun", "id=", id);
    const [runs, setRuns] = useState(null);

    const [viewport, setViewport] = React.useState({
        longitude: -116.91893124612263,
        latitude: 33.76030225825322,
        zoom: 14
    });

    useEffect(function getRunForUser() {
        async function getRun() {
            setRuns(await RunAppApi.getRun(id));
        }
        getRun();
    }, [id]);
    // useEffect(function getRunOnMount() {
    //     getUserRun(id);
    // }, [id]);

    // async function getUserRun(id) {
    //     let { run } = await RunAppApi.getRun(id);
    //     setRun(run)
    // }

    if (!runs) return <LoadingSpinner />;

    return (
        <article className="run-card">
            <div className="text">
                <h4 className="title">Run Summary - {(new Date(runs.runs.day).toDateString())}</h4>
                <span>Distance: {runs.runs.distance} miles</span>
                <span>Avg Pace: {runs.runs.pace} <small>(mil / hr)</small></span>
                <span>Duration: {runs.runs.duration} <small>min</small></span>
            </div>
            <div className="run-image">
                {/* <div className="map-container">
                    <ReactMapGL
                        {...viewport}
                        width="100%"
                        height="100%"
                        onViewportChange={(viewport) => setViewport(viewport)}
                        mapboxApiAccessToken={mapboxgl.accessToken}>
                        <PolylineOverlay points={runs.runs.coordinates.map(loc => loc.coordinates)} />
                    </ReactMapGL>
                </div> */}
            </div>
        </article>
    )
}

export default UserRun;