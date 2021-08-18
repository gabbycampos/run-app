import React from 'react';
import { Link } from "react-router-dom";
import { Button, Table } from 'reactstrap';
import './UserRunCard.css';
// Show info about a run
// Limited rendered to UserRunList to show a card for each run

const UserRunCard = ({ id, userId, day, distance, pace, duration, deleteRunForUser }) => {
    const handleDelete = (evt, id) => {
        evt.preventDefault();
        // debugger;
        deleteRunForUser(id);
    }
    return (
        <div>

            <Table style={{ width: '70%', borderRadius: '5px' }}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>username</th>
                        <th>Distance</th>
                        <th>Pace</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><Link className="Run-Card-Link" to={`/runs/${id}`}><p>Date: {day}</p></Link></td>
                        <td>{userId}</td>
                        <td>{distance}</td>
                        <td>{pace}</td>
                        <td>{duration}</td>
                    </tr>
                </tbody>
            </Table>
            <Button className="card-btn btn btn-danger" onClick={(evt) => handleDelete(evt, id)}>Delete Run</Button>
        </div>
    )
}

export default UserRunCard;