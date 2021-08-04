import React, { useState, useEffect } from 'react';
import RunAppApi from '../api/api';
import UserRun from './UserRun';
import LoadingSpinner from '../common/LoadingSpinner';

// routes: 
// Shows list of runs from a user.

function UserRunList() {
    const [runs, setRuns] = useState(null);

    // useEffect to call api?
    useEffect(function getRunsOnMount() {
        getRunList();
    }, []);

    async function getRunList(userId) {
        let runs = await RunAppApi.getRuns(userId);
        setRuns(runs);
    }

    if (!runs) return <LoadingSpinner />;

    return (
        <div>
            <h1>A users runs</h1>
            <div>
                {runs.map(r => (
                    <UserRun
                        key={r.id}
                        userId={r.userId}
                        distance={r.distance}
                        pace={r.pace}
                        duration={r.duration}
                    />
                ))}
            </div>
        </div>
    )
}

export default UserRunList;