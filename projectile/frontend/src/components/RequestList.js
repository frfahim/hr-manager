import React, { Component } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import Select from "../helper/Select";
import ApiHelper from "../api/ApiHelper";

class RequestList extends Component {
  constructor(props) {
    super(props);

    this.nextPage = this.nextPage.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    // add employee request status object
    this.employeeRequestStatus = {
      Open: 1,
      Reviewed: 2,
      Processed: 3
    };
    this.state = {
      employeeRequestsList: [],
      nextPageURL: "",
      requestStatus: this.employeeRequestStatus.Processed,
    };

    // add default person group to check which user is login
    this.isEmployee = false;
    this.isHr = false;
    this.isManage = false;
    this.personGroup = {
      Employee: 1,
      HR: 2,
      Manage: 3
    };
    // get user data from local storage
    this.users = localStorage.getItem('users')
    this.users = JSON.parse(this.users)
    this.setPersonGroup(this.users)
  }

  // check curren login user group
  setPersonGroup(userDetails) {
    if (userDetails.person_group === this.personGroup.HR) {
      this.isHr = true;
      this.buttonText = 'Update'
    }
    if (userDetails.person_group === this.personGroup.Employee) {
      this.isEmployee = true;
    }
    if (userDetails.person_group === this.personGroup.Manage) {
      this.isManage = true;
      this.buttonText = 'Processed'
    }
  }

// ger request list
  get() {
    ApiHelper.employeeRequestList()
      .then(result => {
        this.setState({
          employeeRequestsList: result.data.results,
          nextPageURL: result.data.next,
        });
      })
      .catch(error => {
        console.log("can't get employee request list", error.response);
      });
  }


  componentDidMount() {
    this.get();
  }

  // set request status changes data into state
  handleSelectChange(key, value) {
    this.setState({ [key]: value });
  }

  // update request status
  handleUpdate(event, data) {
    let { requestStatus } = this.state;
    let payload = {
      request_status: Number(requestStatus)
    };
    if (Number(requestStatus) === this.employeeRequestStatus.Processed) {
      payload.processed_by = this.users.id
    }
    ApiHelper.employeeRequestUpdate({ id: data.id, payload: payload }).then(
      () => {
        this.get();
      }
    );
  }

  // get next page data
  nextPage() {
    ApiHelper.employeeRequestList({ next: this.state.nextPageURL })
      .then(result => {
        this.setState({
          employeeRequestsList: this.state.employeeRequestsList.concat(result.data.results),
          nextPageURL: result.data.next
        });
      })
      .catch(error => {
        console.log("can't get employee request list", error);
      });
  }

  // this method will get request status name based on number value
  getRequestStatusName(requestStatus) {
    return Object.keys(this.employeeRequestStatus).find(
      key => this.employeeRequestStatus[key] === requestStatus
    );
  }

  // generate pdf file from html
  downloadPdf = () => {
    const data = this.state.employeeRequestsList.map((request, index) => {
      const {
        title,
        description,
        request_status: requestStatus,
        request_by: requestBy,
        processed_by: processedBy
      } = request;
      let requestByName = `${requestBy.first_name} ${requestBy.last_name}`;
      let processedByName = processedBy
        ? `${processedBy.first_name} ${processedBy.last_name}`
        : "";
      return [
        index + 1,
        title,
        description,
        requestByName,
        processedByName,
        this.getRequestStatusName(requestStatus)
      ];
    });

    // set content to generate pdf
    var docDefinition = {
      content: [
        {text: 'HR Manager', style: 'header'},
        {
          layout: "lightHorizontalLines",
          style: 'tableExample',
          table: {
            headerRows: 1,
            widths: ["5%", "22%", "31%", "15%", "15%", "12%"],
            body: [
              [
                "SL",
                "Title",
                "Description",
                "Request By",
                "Processed By",
                "Request Status"
              ],
              ...data
            ]
          }
        }
      ]
    };
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    pdfMake.createPdf(docDefinition).download();
  };

  // render table body data
  renderTableData() {
    const requestStatusOption = [
      { key: 2, value: "Reviewed" },
      { key: 3, value: "Processed" }
    ];
    // map request data and generate table body
    return this.state.employeeRequestsList.map((request, index) => {
      const {
        title,
        description,
        request_status: requestStatus,
        request_by: requestBy,
        processed_by: processedBy
      } = request;
      let requestByName = `${requestBy.first_name} ${requestBy.last_name}`;
      let processedByName = processedBy
        ? `${processedBy.first_name} ${processedBy.last_name}`
        : "";
      return (
        <tr key={index + 1}>
          <td>{index + 1}</td>
          <td>{title}</td>
          <td>{description}</td>
          <td>{requestByName}</td>
          <td>{processedByName}</td>
          <td>{this.getRequestStatusName(requestStatus)}</td>
          {this.isHr && (
            <td style={{ width: "150px" }}>
              <Select
                stateName="requestStatus"
                isDisable={requestStatus===3}
                defaultValue={this.state.requestStatus}
                options={requestStatusOption}
                onChange={this.handleSelectChange}
              />
            </td>
          )}
          {!this.isEmployee && (
            <td>
              <button disabled={requestStatus===3} className="btn btn-success" onClick={event => this.handleUpdate(event, request)}>
                {this.buttonText}
              </button>
            </td>
          )}
        </tr>
      );
    });
  }

  render() {
    const { nextPageURL } = this.state
    return (
      <div className="container">
        <div className="my-2 float-right">
        <button
          onClick={this.downloadPdf}
          className="btn btn-outline-primary"
        >Download
        </button>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr className="bg-info">
              <th>SL</th>
              <th>Title</th>
              <th>Description</th>
              <th>Request By</th>
              <th>Processed By</th>
              <th>Request Status</th>
              {!this.isEmployee && <th />}
              {this.isHr && <th />}
            </tr>
          </thead>
          <tbody>{this.renderTableData()}</tbody>
        </table>
        <div className="my-2">
        { nextPageURL ?
        <button
          onClick={this.nextPage}
          className="btn btn-outline-info"
        >Load More
        </button> : ''
        }
        </div>
      </div>
    );
  }
}

export default RequestList;
