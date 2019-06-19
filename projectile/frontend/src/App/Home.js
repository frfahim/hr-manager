import React, { Component } from "react";

import Header from "../Layout/Header";
import BaseRouter from "./Router";

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
