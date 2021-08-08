import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "../HomePage";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import PrivateRoute from "./PrivateRoute";
import Timer from '../timers/Timer';
import UserRunList from '../users/UserRunList';
import UserRun from "../users/UserRun";

function Routes({ login, signup, saveRun }) {
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

          <PrivateRoute exact path="/timer">
            <Timer saveRun={saveRun} />
          </PrivateRoute>

          <PrivateRoute exact path="/runs">
            <UserRunList />
          </PrivateRoute>

          <PrivateRoute exact path="/runs/:id">
            <UserRun />
          </PrivateRoute>

          <Redirect to="/" />
        </Switch>
      </div>
  );
}

export default Routes;