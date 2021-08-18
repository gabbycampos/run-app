import React, { useState, useEffect, useContext } from 'react';
import RunAppApi from '../api/api';
import UserRunCard from './UserRunCard';
import LoadingSpinner from '../common/LoadingSpinner';
// import { useParams } from "react-router-dom";
import UserContext from '../auth/UserContext';
import { Link } from 'react-router-dom';

// routes: 
// Shows list of runs from a user.

function UserRunList() {
    const [runs, setRuns] = useState(null);
    // const { userId } = useParams();
    // console.debug("UserRunList", "userId=", userId);
    const { currentUser } = useContext(UserContext);
    console.debug("UserRunList", "currentUser=", currentUser);

    // useEffect(() => {
    //     async function getRunList(userId) {
    //         // debugger;
    //         let runs = await RunAppApi.getRuns(userId);
    //         setRuns(runs);
    //     }
    //     getRunList()
    // }, [userId]);

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
        await RunAppApi.deleteRun(id);
    }
    
    // const runComponent = runs.runs.map(r => (
    //     <UserRunCard
    //     key={r.id}
    //     id={r.id}
    //     userId={r.userId}
    //     date={new Date(r.day)}
    //     distance={r.distance}
    //     pace={r.pace}
    //     duration={r.duration}
    //     place={r.place}
    //     remove={remove}
    //     />
    //     ));

        if (!runs) return <LoadingSpinner />;
        // debugger;
        
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
                                date={new Date(r.day)}
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