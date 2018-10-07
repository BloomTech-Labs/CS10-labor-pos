import Select from "react-select";
import React, { Component } from "react";
import { STATE_LIST } from "../../constants.js";

class MySelect extends Component {
  handleChange = value => {
    this.props.onChange("state", value);
  };

  handleBlur = () => {
    this.props.onBlur("state", true);
  };

  render() {
    return (
      <div>
        <Select
          id="state"
          options={STATE_LIST}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          value={this.props.value}
        />
        {!!this.props.error &&
          this.props.touched && (
            <div style={{ color: "red", marginTop: ".5rem" }}>
              {this.props.error}
            </div>
          )}
      </div>
    );
  }
}

export default MySelect;
