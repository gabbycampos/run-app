import React from 'react';
import { Link } from "react-router-dom";

// Show info about a run
// Limited rendered to UserRunList to show a card for each run

const UserRunCard = ({ id, userId, day, distance, pace, duration, place, deleteRunForUser}) => {
    const handleDelete = (evt, id) => {
        evt.preventDefault();
        // debugger;
        deleteRunForUser(id);
    }
    return (
        <div>
            <Link className="Run-Card-Link" to={`/runs/${id}`}>
                <h4>Date: {day}</h4>
            </Link>
            <p>{userId}</p>
            <p>Distance: {distance}</p>
            <p>Pace: {pace}</p>
            <p>Duration: {duration}</p>
            <p>Location: {place}</p>
            <button onClick={(evt)=>handleDelete(evt,id)}>X</button>
        </div>
    )
}

export default UserRunCard;