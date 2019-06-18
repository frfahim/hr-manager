import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import RequestList from '../components/RequestList';
import RequestCreate from '../components/RequestCreate';

class BaseRouter extends Component {
  render() {
    return (
      <Switch>
        <Route path="/create" component={RequestCreate} />
        <Route path="/requests" component={RequestList} />
        <Route path="/" component={RequestList} />
      </Switch>
    );
  }
}

export default BaseRouter;