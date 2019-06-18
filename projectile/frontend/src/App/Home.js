import React, { Component } from "react";

import RequestList from "../components/RequestList";
import Header from "../Layout/Header";
import BaseRouter from "./Router";
import ApiHelper from "../api/ApiHelper";
import { browserHistory } from "../helper/browserHistory";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <BaseRouter />
      </div>
    );
  }
}

export default App;
