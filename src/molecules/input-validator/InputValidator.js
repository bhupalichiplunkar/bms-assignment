import React, { Component } from "react";
import Input from "../../atoms/input/Input";
import "./InputValidator.scss";

class InputValidator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: ""
    };
  }

  onChange = numbers => {
    this.setState({ numbers }, this.trigger);
  };

  trigger = () => {
    const { numbers } = this.state;
    if (numbers.length === 0) {
      this.props.resetData();
    } else {
      this.props.onKeyDown(numbers);
    }
  };

  render() {
    const { numbers } = this.state;
    return (
      <div>
        <Input
          value={numbers}
          onChange={this.onChange}
          placeholder="eg : 6000,7000,7005-7010"
        />
      </div>
    );
  }
}

export default InputValidator;
