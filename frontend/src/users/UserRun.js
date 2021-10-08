import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import RunAppApi from '../api/api';
import LoadingSpinner from '../common/LoadingSpinner';
import './UserRun.css';
import ReactMapGL from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import PolylineOverlay from './PolylineOverlay';

// Show run detail with map image

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FiYXRyb24iLCJhIjoiY2t0Mzcyd2YzMDR3YjJ2bnViZ3QxeWFociJ9.kpIGKfhs34paqkF0xNGRZQ';

const UserRun = () => {
    const { id } = useParams();
    console.debug("UserRun", "id=", id);
    const [runs, setRuns] = useState(null);

    const [viewport, setViewport] = React.useState({
        longitude: -116.91893124612263,
        latitude: 33.76030225825322,
        zoom: 10
    });
    //debugger;
    useEffect(function getRunForUser() {
        async function getRun() {
            let data = await RunAppApi.getRun(id);
            data.runs.coordinates = data.runs.coordinates.map(ele => {return JSON.parse(ele)})
            //console.log('data', data.runs.coordinates[0].longitude)
            setRuns(data);
            setViewport({
                longitude: data.runs.coordinates[0].longitude,
                latitude: data.runs.coordinates[0].latitude,
                zoom: viewport.zoom
            });
        }
        getRun();
    }, [id]);

    if (!runs) return <LoadingSpinner />;

    return (
        <div>

            <article className="run-card">
                <div className="text">
                    <h4 className="title">Run Summary - {(new Date(runs.runs.day).toDateString())}</h4>
                    <span>Distance: {runs.runs.distance} miles</span>
                    <span>Avg Pace: {runs.runs.pace} <small>(min / mil)</small></span>
                    <span>Duration: {runs.runs.duration} <small>min</small></span>
                </div>
            </article>
            <div className="run-image">
                <div className="map-container">
                    <ReactMapGL
                        {...viewport}
                        width="100%"
                        height="100%"
                        onViewportChange={(viewport) => setViewport(viewport)}
                        mapboxApiAccessToken={mapboxgl.accessToken}>
                        <PolylineOverlay points={runs.runs.coordinates.map(loc => {
                            //loc = JSON.parse(loc)
                            return [loc.longitude, loc.latitude]
                        }
                        )} />
                    </ReactMapGL>
                </div>
            </div>
        </div>
    )
}

export default UserRun;