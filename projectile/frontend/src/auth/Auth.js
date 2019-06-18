import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

class Auth extends Component {
  render() {
    return (
        <div>
      <Switch>
        <Route exact path="/auth/register" component={Register} />
        <Route exact path="/auth/login" component={Login}  />
      </Switch>
        </div>
    );
  }
}

export default Auth;