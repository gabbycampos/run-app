import React, { useState, useEffect } from 'react';
import RunAppApi from '../api/api';
import UserRun from './UserRun';
import LoadingSpinner from '../common/LoadingSpinner';
import { useParams } from "react-router-dom";

// routes: 
// Shows list of runs from a user.

function UserRunList() {
    const [runs, setRuns] = useState(null);
    const { userId } = useParams();
    // console.debug("UserRunList", "userId=", userId);
    
    // useEffect(function getRunListForUser() {
    //     async function getRunList() {
    //         // debugger;
    //         setRuns(await RunAppApi.getRuns(userId));
    //     }
    //     getRunList();
    // }, [userId]);

    // useEffect(() => {
    //     async function getRunList(userId) {
    //         // debugger;
    //         let runs = await RunAppApi.getRuns(userId);
    //         setRuns(runs);
    //     }
    //     getRunList()
    // }, [userId]);

    useEffect(function getRunsOnMount() {
        getRunList(userId);
    }, [userId]);
    async function getRunList(userId) {
        // debugger;
        // or let {runs} = 
        let runs = await RunAppApi.getRuns(userId);
        setRuns(runs);
    }

    if (!runs) return <LoadingSpinner />;
    // debugger;
    return (
        <div>
            <h1>A users runs</h1>
            <div>
                {runs.runs.length ? (
                    <div>
                        {runs.runs.map(r => (
                            <UserRun 
                                key={r.id}
                                distance={r.distance}
                                pace={r.pace}
                                duration={r.duration} 
                            />
                        ))}
                    </div>
                ) : (
                    <p>No runs available.</p>
                )}
            </div>
        </div>
    )
}

export default UserRunList;