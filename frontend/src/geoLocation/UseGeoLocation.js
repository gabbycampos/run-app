import React, { useState } from 'react';

function UseGeoLocation() {
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);

    const getLocation = () => {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
        } else {
            setStatus('Location...');
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus(null);
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
            }, () => {
                setStatus('Unable to retrieve your location');
            });
        }
    }
 


    const getWatchLocation = () => {
        navigator.geolocation.watchPosition(
            data => {
                console.log(data);
                console.log(data.coords.latitude)
            }, error => console.log(error)
        )
    }   

    return (
        <div>
            <button onClick={getLocation}>get location</button>
            <h1>coordinates</h1>
            <p>{status}</p>
            {lat && <p>Latitude: {lat}</p>}
            {lng && <p>Longitude: {lng}</p>}
            <button onClick={getWatchLocation}>watch location func.</button>
        </div>
    )
}

export default UseGeoLocation;