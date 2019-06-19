import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { isLoggedIn } from '../helper/isLoggedIn';

import Auth from '../auth/Auth';
import Home from './Home';

import '../App.css';
import ApiHelper from '../api/ApiHelper';

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    componentDidMount () {
        // get login user details and to local storage
        ApiHelper.meDetails().then(response => {
            localStorage.setItem("users", JSON.stringify(response.data));
            this.setState({loading: false})
        }).catch(error => {
            this.setState({loading: false})
            localStorage.clear()
            console.log( "error", error.response);
        })
    }

    render() {
        if (this.state.loading) {
            return <div>Loading</div>
        }

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