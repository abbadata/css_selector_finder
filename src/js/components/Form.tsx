import React, { Component } from "react";
import ReactDOM from "react-dom";
import SubForm from "./SubForm";
import Notice from "./Notice";

interface IProps {}

interface IState {
  value?: string;
}

class Form extends Component<IProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { value } = event.target;
    this.setState(() => {
      return {
        value
      };
    });
  }

  render() {
    return (
      <form>
        <p>Test</p>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <Notice notice="This is a notice"></Notice>
        <SubForm></SubForm>
      </form>
    );
  }
}

export default Form;

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<Form />, wrapper) : false;
