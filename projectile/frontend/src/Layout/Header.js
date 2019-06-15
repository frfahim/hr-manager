import React, { Component } from "react";
import { Link } from "react-router-dom";

import { logOut } from "../helper/logOut";
import { isLoggedIn } from "../helper/isLoggedIn";

class Header extends Component {
  constructor(props) {
    super(props);
    this.logOut = logOut;
  }

  render() {
    var style = {};
    if (!isLoggedIn()) {
      style.display = "none";
    }
    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <a className="navbar-brand text-success" href="/">
          HR Manager
        </a>
        <ul className="navbar-nav ml-auto" style={style}>
          <li className="nav-item">
            <Link to="/create" className="nav-link">
              Add New
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="" onClick={event => this.logOut()}>
              Logout
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
