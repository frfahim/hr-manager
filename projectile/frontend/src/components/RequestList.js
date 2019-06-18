import React, { Component } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

import Select from "../helper/Select";
import ApiHelper from "../api/ApiHelper";

class RequestList extends Component {
  constructor(props) {
    super(props);

    this.handleNewRequest = this.handleNewRequest.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.employeeRequestStatus = {
      Open: 1,
      Reviewed: 2,
      Processed: 3
    };
    this.state = {
      employeeRequestsList: [],
      nextPageURL: "",
      requestStatus: this.employeeRequestStatus.Processed,
      loading: true
    };
  }

  get() {
    ApiHelper.employeeRequestList()
      .then(result => {
        this.setState({
          employeeRequestsList: result.data.results,
          nextPageURL: ""
        });
      })
      .catch(error => {
        console.log("can't get employee request list", error);
      });
  }

  handleNewRequest() {
    this.get();
  }

  componentDidMount() {
    this.get();
    this.isEmployee = false;
    this.isHr = false;
    this.isManage = false;
    this.personGroup = {
      Employee: 1,
      HR: 2,
      Manage: 3
    };
    ApiHelper.userDetails(Number(localStorage.getItem("user_id")))
      .then(response => {
        let userDetails = response.data;
        if (userDetails.person_group == this.personGroup.HR) {
          this.isHr = true;
        }
        if (userDetails.person_group == this.personGroup.Employee) {
          this.isEmployee = true;
        }
        if (userDetails.person_group == this.personGroup.Manage) {
          this.isManage = true;
        }
        this.setState({ loading: false });
      })
      .catch(error => {
        console.log(error.response);
      });
  }

  handleSelectChange(key, value) {
    this.setState({ [key]: value });
  }

  handleUpdate(event, data) {
    let { requestStatus } = this.state;
    let payload = {
      request_status: Number(requestStatus)
    };
    ApiHelper.employeeRequestUpdate({ id: data.id, payload: payload }).then(
      () => {
        this.get();
      }
    );
  }

  nextPage() {
    ApiHelper.employeeRequestList({ next: this.state.nextPageURL })
      .then(result => {
        this.setState({
          employeeRequestsList: result.data,
          nextPageURL: result.data.next
        });
      })
      .catch(error => {
        console.log("can't get employee request list", error);
      });
  }

  getRequestStatusName(requestStatus) {
    return Object.keys(this.employeeRequestStatus).find(
      key => this.employeeRequestStatus[key] === requestStatus
    );
  }

  renderTableData() {
    const requestStatusOption = [
      { key: 2, value: "Reviewed" },
      { key: 3, value: "Processed" }
    ];
    return this.state.employeeRequestsList.map((request, index) => {
      const {
        id,
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
                defaultValue={this.state.requestStatus}
                options={requestStatusOption}
                // selectClassName="mb-2 mt-2"
                onChange={this.handleSelectChange}
              />
            </td>
          )}
          {!this.isEmployee && (
            <td>
              <button onClick={event => this.handleUpdate(event, request)}>
                Processed
              </button>
            </td>
          )}
        </tr>
      );
    });
  }

  downloadPdf = () => {
    const data = this.state.employeeRequestsList.map((request, index) => {
      const {
        id,
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

    var docDefinition = {
      content: [
        {
          layout: "lightHorizontalLines",
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

  render() {
    const { loading } = this.state;
    if (loading) {
      return <div>Loading</div>;
    }
    return (
      <div className="container">
        <button onClick={this.downloadPdf}>Download</button>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
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
      </div>
    );
  }
}

export default RequestList;
