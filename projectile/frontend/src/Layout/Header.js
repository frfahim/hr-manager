import React, { Component } from "react";
import { Link } from "react-router-dom";

import { logOut } from "../helper/logOut";

class Header extends Component {
  constructor(props) {
    super(props);
    this.logOut = logOut;
    this.users = localStorage.getItem('users')
    this.users = JSON.parse(this.users)
    if (this.users.photo){
      this.users.photo = `http://localhost:8000${this.users.photo}`
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <a className="navbar-brand text-success" href="/">
          HR Manager
        </a>
        <ul className="navbar-nav ml-auto">
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
          <li className="nav-item">
          <a className="nav-link user-name">
            {this.users.first_name} {this.users.last_name}
          </a>
          </li>
          <li>
            <img className="avatar" alt="avtater" src={this.users.photo}/>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;
