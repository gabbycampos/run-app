import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { Button, Table } from 'reactstrap';
import './UserRunCard.css';
import UserContext from '../auth/UserContext';

// Show info about a run
// Limited rendered to UserRunList to show a card for each run

const UserRunCard = ({ id, userId, day, distance, pace, duration, deleteRunForUser }) => {
    const { currentUser } = useContext(UserContext);

    const handleDelete = (evt, id) => {
        evt.preventDefault();
        deleteRunForUser(id);
    }

    return (
        <div>
            {currentUser.users.username === userId ?
                <Table style={{ borderRadius: '5px' }}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>username</th>
                            <th>Distance</th>
                            <th>Avg. Pace</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><Link className="Run-Card-Link" to={`/runs/${id}`}><p>{(new Date(day).toLocaleDateString("en-US"))}</p></Link></td>
                            <td>{userId}</td>
                            <td>{distance} miles</td>
                            <td>{pace} <small>(min/mil)</small></td>
                            <td>{duration} <small>min</small></td>
                            <td><Button className="card-btn btn btn-warning" onClick={(evt) => handleDelete(evt, id)}>Delete Run</Button></td>
                        </tr>
                    </tbody>
                </Table>
                : (
                    <p></p>
                )
            }
        </div>
    )
}

export default UserRunCard;