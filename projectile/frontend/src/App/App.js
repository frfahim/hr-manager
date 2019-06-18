import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { isLoggedIn } from '../helper/isLoggedIn';

import Auth from '../auth/Auth';
import Home from './Home';

import '../App.css';

class App extends Component {

    render() {

        return (
            <div>
            <Switch>
                <Route
                    path="/auth"
                    render={() => (isLoggedIn() ? <Redirect to="/" /> : <Auth />)}
                />
                <Route
                    path="/"
                    render={() => (isLoggedIn() ? <Home /> : <Redirect to="/auth/login" />)}
                />
            </Switch>
            </div>
        );
    }
}

export default App;