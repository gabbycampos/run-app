import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "../HomePage";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
//import PrivateRoute from "./PrivateRoute";
import TimerList from '../timers/TimerList';
import UserList from '../users/UserList';


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
            <SignUpForm signup={signup} />
          </Route>

          <Route exact path="/timer">
            <TimerList />
          </Route>

          <Route exact path="/profile">
            <UserList />
          </Route>

          <Redirect to="/" />
        </Switch>
      </div>
  );
}

export default Routes;