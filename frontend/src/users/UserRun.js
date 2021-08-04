import React from 'react';

// Show info about a run
// Limited rendered to UserRunList to show a card for each run

const UserRun = ({ date, distance, pace, duration, place, mapUrl }) => {
    
    return (
        <div>
            <h1>{date}</h1>
            <p>{distance}</p>
            <p>{pace}</p>
            <p>{duration}</p>
            <p>{place}</p>
            <p>{mapUrl}</p>
        </div>
    )
}

export default UserRun;