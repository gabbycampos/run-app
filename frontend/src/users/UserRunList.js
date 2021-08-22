import React, { useState, useEffect, useContext } from 'react';
import RunAppApi from '../api/api';
import UserRunCard from './UserRunCard';
import LoadingSpinner from '../common/LoadingSpinner';
import UserContext from '../auth/UserContext';
import { Link, useHistory } from 'react-router-dom';

// routes: 
// Shows list of runs from a user.

function UserRunList() {
    const [runs, setRuns] = useState(null);
    const { currentUser } = useContext(UserContext);
    console.debug("UserRunList", "currentUser=", currentUser);
    const history = useHistory();

    useEffect(function getRunsOnMount() {
        getRunList();
    }, []);
    async function getRunList() {
        // debugger;
        // or let {runs} = 
        let runs = await RunAppApi.getRuns();
        setRuns(runs);
    }

    console.log('currentUser.users log ', currentUser.users.username)

    async function deleteRunForUser(id) {
        let response = await RunAppApi.deleteRun(id);
        if (response) {
            return history.push('/timer')
            // window.location.reload()
        }
        // debugger;
        // setRuns(runs.filter(run => {
        //     return run.id !== id;
        // }))
    }

    if (!runs) return <LoadingSpinner />;

    return (
        <div className="RunList col-md-8 offset-md-2">
            {/* {console.log(`comp `, runComponent)} */}
            <div>
                {currentUser
                    ? <h4>
                        {currentUser.users.firstName || currentUser.users.username}'s Runs!
                    </h4>
                    : (
                        <p>
                            <Link className="btn btn-primary font-weight-bold mr-3"
                                to="/login">
                                Log in
                            </Link>
                            <Link className="btn btn-primary font-weight-bold"
                                to="/signup">
                                Sign up
                            </Link>
                        </p>
                    )}
            </div>
            <div>                
                {runs.runs.length ? (
                    <div>
                        {runs.runs.map(r => (
                            <UserRunCard
                                key={r.id}
                                id={r.id}
                                userId={r.userId}
                                day={r.day}
                                distance={r.distance}
                                pace={r.pace}
                                duration={r.duration}
                                place={r.place}
                                deleteRunForUser={deleteRunForUser}
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