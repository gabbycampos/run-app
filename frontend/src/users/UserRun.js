import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import RunAppApi from '../api/api';
import LoadingSpinner from '../common/LoadingSpinner';
import './UserRun.css';
import MapBox from './MapBox';

// Show run detail with map image

const UserRun = () => {
    const { id } = useParams();
    console.debug("UserRun", "id=", id);
    const [runs, setRuns] = useState(null);

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
                <span>Avg Pace: {runs.runs.pace} <small>(min / mil)</small></span>
                <span>Duration: {runs.runs.duration} <small>min</small></span>
            </div>
            <div className="run-image">
                {/* <MapBox /> */}
            </div>
        </article>
    )
}

export default UserRun;