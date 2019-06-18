import React, { Component } from "react";
import ApiHelper from "../api/ApiHelper";
import { browserHistory } from "../helper/browserHistory";

class RequestCreate extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.clearForm = this.clearForm.bind(this);
    this.state = {
      title: null,
      description: null
    };
  }

  // submit form data api
  handleSubmit(event) {
    event.preventDefault();
    ApiHelper.employeeRequestCreate({ payload: this.state })
      .then(request => {
        // after succesfull go to home page
        browserHistory.push("/");
        this.clearForm();
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  // validate title and set data to state
  handleInputChange(event) {
    event.preventDefault();
    let key = event.target.name;
    let value = event.target.value;
    if (key === "title") {
      if (value.length > 150) {
        alert("This title is too long");
      }
    }
    this.setState({
      [key]: value
    });
  }

  // clear form
  clearForm(event) {
    event.preventDefault();
    this.requestCreateForm.reset();
    this.setState({
      title: null,
      description: null
    });
    browserHistory.push("/");
  }

  render() {
    return (
      <div className="col-md-6 offset-md-3 request-form">
        <form
          onSubmit={this.handleSubmit}
          ref={el => (this.requestCreateForm = el)}
        >
          <div className="form-group">
            <label for="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              placeholder="Request title"
              onChange={this.handleInputChange}
              required="required"
            />
          </div>
          <div className="form-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              placeholder="Request details"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="clearfix">
            <button className="btn btn-outline-success foat-left">
              Submit
            </button>
            <button
              className="btn btn-outline-info float-right"
              onClick={this.clearForm}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default RequestCreate;
