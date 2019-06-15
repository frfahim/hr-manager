import React, { Component } from "react";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";

import ApiHelper from "../api/ApiHelper";
import Select from "../helper/Select";
import { browserHistory } from "../helper/browserHistory";
import { logOut } from "../helper/logOut";
import {credential} from '../helper/credential';


class Register extends Component {
  constructor(props) {
    super(props);
    // delete token from storage when register component run
    logOut()

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      requestStatus: 3,
      submitted: false,
      loading: false,
      error: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // set form input field data in state
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value, error: "" });
  }

  // set select data in state
  handleSelectChange(key, value) {
    this.setState({ [key]: value });
  }

  // submit form to api
  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { email, password } = this.state;

    // stop here if form is invalid
    if (!(email && password)) {
      return;
    }
    // generate payload that will send to api
    const payload = {
      email: this.state.email,
      password: this.state.password,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      request_status: this.state.requestStatus
    };

    this.setState({ loading: true })
    ApiHelper.userCreate(payload)
      .then(response => {
        this.setState({ error: "", loading: false });
        // after successfully register login register user and set token to storage
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          browserHistory.push("/");
        }
      })
      .catch(error => {
        if (error.response) {
          this.setState({ error: error.response.data.error });
        }
        this.setState({ loading: false });
      });
  }

  responseGoogle = response => {
    console.log(response);
  };

  render() {
    const {
      email,
      password,
      submitted,
      loading,
      error,
      firstName,
      lastName
    } = this.state;

    // set select field data
    const selectOptions = [
      { key: 1, value: "Manage" },
      { key: 2, value: "HR" },
      { key: 3, value: "Employee" }
    ];

    return (
      <div>
        <div className="col-md-4 offset-md-4 login-form">
          <h2 className="text-center mb-2 text-uppercase">Sign Up</h2>

          <hr className="mt-2 mb-4" />
          <form
            name="form"
            className="text-center"
            onSubmit={this.handleSubmit}
          >
            <div className="form-row mb-4">
              <div className="col">
                <input
                  required
                  type="text"
                  className="form-control"
                  placeholder="First name"
                  name="firstName"
                  value={firstName}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col">
                <input
                  required
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                  name="lastName"
                  value={lastName}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <Select
              stateName="requestStatus"
              defaultValue={this.state.requestStatus}
              options={selectOptions}
              onChange={this.handleSelectChange}
            />
            <input
              required
              placeholder="E-mail"
              type="email"
              className="form-control mb-4"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            {submitted && !email && (
              <span className="alert-danger">Email is required</span>
            )}
            <input
              required
              placeholder="Password"
              type="password"
              className="form-control mb-4"
              name="password"
              value={password}
              onChange={this.handleChange}
            />
            {submitted && !password && (
              <span className="alert-danger">Password is required</span>
            )}
            {error && <div className={"alert alert-danger"}>{error}</div>}
            <button
              className="btn btn-info btn-block my-8 text-uppercase"
              disabled={loading}
            >
              Sign Up
            </button>
            <p className="mt-2">
              Already a member?
              <span className="ml-2">
                <Link to="/login">Sign In</Link>
              </span>
            </p>

            <p>OR:</p>

            <GoogleLogin
              clientId={credential('google')}
              buttonText="Sign in With Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Register;
