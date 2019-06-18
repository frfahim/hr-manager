import React, { Component } from "react";

/**
 * Auto generate html select element
 * @props {selectClassName} string - add class in selected element
 * @props {stateName} string - add selected option value to this state
 * @props {defaultVale} number - select a default value from option
 * @props {options} array - generate dropdown based on option data
 * @props {onChange} method - send stateName and selected option value
 */
class Select extends Component {
  constructor(props) {
    super(props);
    this.getOptions = this.getOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: this.props.defaultValue
    };
  }

  // set selected option value in state
  // call parent componenet onChange method and send option value and state name
  handleChange(event) {
    this.setState({
      value: event.target.value
    });
    this.props.onChange(this.props.stateName, event.target.value);
  }

  // generate option element from options array of object data
  getOptions() {
    const { options, defaultValue } = this.props;
    return options.map(option => (
      <option value={option.key} key={option.key}>
        {option.value}
      </option>
    ));
  }
  render() {
    return (
      <select
        value={this.state.value}
        onChange={this.handleChange}
        className={`form-control  ${this.props.selectClassName}`}
      >
        {this.getOptions()}
      </select>
    );
  }
}

export default Select;
