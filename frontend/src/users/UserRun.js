import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import RunAppApi from '../api/api';
import LoadingSpinner from '../common/LoadingSpinner';

// Show run detail

const UserRun = () => {
    const { id } = useParams();
    console.debug("UserRun", "id=", id);
    const [runs, setRuns] = useState(null);

    useEffect(function getRunForUser() {
        async function getRun() {
            // debugger;
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
        <div className="RunDetail col-md-8 offset-md-2">
            <h4>My Run</h4>
            <p>Distance: {runs.runs.distance}</p>
            <p>Pace: {runs.runs.pace}</p>
            <p>Duration: {runs.runs.duration}</p>
        </div>
    )
}

export default UserRun;