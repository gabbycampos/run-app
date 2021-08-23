import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from './auth/UserContext';
import './HomePage.css';

// Shows welcome message or login/register buttons
// Routed at / 

function HomePage() {
    const { currentUser } = useContext(UserContext);
    console.debug("Homepage", "currentUser=", currentUser);

    return (
        <div className="Homepage">
            <div className="container text-center">
                <h1 className="mb-4 font-weight-bold">Run App</h1>
                <p className="lead">Run along with your custom running timer.</p>
                {currentUser
                    ? <h3>
                        Welcome Back, {currentUser.users.firstName || currentUser.users.username}! 🏃‍♀️ 🏃‍♂️
                    </h3>
                    : (
                        <p>
                            <Link className="btn btn-warning font-weight-bold mr-3"
                                to="/login">
                                Log in
                            </Link>
                            <Link className="btn btn-warning font-weight-bold"
                                to="/signup">
                                Sign up
                            </Link>
                        </p>
                    )}
            </div>
        </div>
    );
}

export default HomePage;