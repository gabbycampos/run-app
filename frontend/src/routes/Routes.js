import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import HomePage from '../HomePage';
import PrivateRoute from './PrivateRoute';
import UserList from '../users/UserList';
import TimerList from '../timers/TimerList';
import LoginForm from '../auth/LoginForm';
import SignupForm from '../auth/SignUpForm';

function Routes({ login, signup }) {
    console.debug(
        "Routes",
        `login=${typeof login}`,
        `register=${typeof register}`,
    );

    return (
        <div className="pt-5">
            <Switch>

                <Route exact path="/">
                    <HomePage />
                </Route>

                <Route exact path="/login">
                    <LoginForm login={login} />
                </Route>

                <Route exact path="/signup">
                    <SignupForm signup={signup} />
                </Route>

                <PrivateRoute exact path="/timer">
                    <TimerList />
                </PrivateRoute>

                <PrivateRoute exact path="/profile">
                    <UserList />
                </PrivateRoute>

                <Redirect to="/" />
            </Switch>
        </div>
    )
}

export default Routes;