import React, { Component } from "react";
import { Link } from "react-router-dom";
import GoogleLogin from "react-google-login";

import ApiHelper from "../api/ApiHelper";
import { logOut } from "../helper/logOut";
import { browserHistory } from "../helper/browserHistory";
import {credential} from '../helper/credential';


class Login extends Component {
  constructor(props) {
    super(props);
    // delete token from storage when register component run
    // logOut()

    this.state = {
      email: "",
      password: "",
      submitted: false,
      loading: false,
      error: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // set for input to state
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value, error: "" });
  }

  // submit form
  handleSubmit(event) {
    event.preventDefault();

    // form is submitted
    this.setState({ submitted: true });
    const { email, password } = this.state;

    // stop here if form is invalid
    if (!(email && password)) {
      return;
    }

    // submitted and waiting for response
    this.setState({ loading: true });
    ApiHelper.userLogin({ email, password })
      .then(response => {
        this.setState({ error: "", loading: false });
        // after successfully login set token in local storage then redirec to home page
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user_id", response.data.user);
          browserHistory.push("/#");
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        // set error in state to show error message
        if (error.response) {
          this.setState({ error: error.response.data.error });
        }
      });
  }

  // authentical using google
  responseGoogle = response => {
    console.log(response);
  };

  render() {
    const { email, password, submitted, loading, error } = this.state;
    return (
      <div className="col-md-4 offset-md-4 login-form">
        <h2 className="text-center mb-2 text-uppercase">Sign in</h2>
        <hr className="myt-2 mb-4" />
        <form
          name="form"
          className="text-center"
          onSubmit={this.handleSubmit}
        >
          <input
            required
            placeholder="E-mail"
            className="form-control mb-4"
            name="email"
            value={email}
            onChange={this.handleChange}
            type="email"
          />
          {submitted && !email && (
            <span className="alert-danger">Email is required</span>
          )}
          <input
            required
            placeholder="Password"
            className="form-control mb-4"
            name="password"
            value={password}
            onChange={this.handleChange}
            type="password"
          />
          {submitted && !password && (
            <span className="alert-danger">Password is required</span>
          )}
          {error && <div className={"alert alert-danger"}>{error}</div>}
          <button
            className="btn btn-info btn-block my-8 text-uppercase"
            disabled={loading}
          >
            Sign In
          </button>
          <p className="mt-2">
            Not a member?
            <span className="ml-2">
              <Link to="/auth/register">Sign Up</Link>
            </span>
          </p>

          <p>OR:</p>

          <GoogleLogin
            clientId={credential.google}
            buttonText="Sign in With Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
          />
        </form>
      </div>
    );
  }
}

export default Login;
