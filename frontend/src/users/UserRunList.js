import React from 'react';
import UseGeoLocation from '../geoLocation/UseGeoLocation';

// routes: 
// Shows list of runs from a user.

function UserRunList() {
    return (
        <div>
            <h1>A users runs</h1>
            <UseGeoLocation />
        </div>
    )
}

export default UserRunList;