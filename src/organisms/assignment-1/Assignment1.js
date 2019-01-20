import React, { Component } from "react";
import InputValidator from "..//../molecules/input-validator/InputValidator";
import "./Assignment1.scss";

//mock values 1: 9000-9003,9000-9010,9
//mock values 2: 9000-9003,9000-9010,9011-9020
//mock values 3: 98,9
//mock values 4: 8

class Assignment1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialData: [7000, 7001, 7002, 7003, 7004, 7005],
      repeatedData: [],
      finalData: []
    };
    this.timer = null;
  }

  // @todo : clean logic - use recursion maybe
  findUniqueNumbers = inputs => {
    const finalData = [...this.state.initialData];
    const repeatedData = [];
    const inputArray = inputs.split(",");
    inputArray.forEach(input => {
      const num = input.trim();
      if (num.indexOf("-") === -1) {
        const numberInput = parseInt(num, 10);
        if (finalData.indexOf(numberInput) > -1) {
          repeatedData.push(numberInput);
        } else {
          finalData.push(numberInput);
        }
      } else {
        const [low, up] = input.split("-");
        const lower = parseInt(low.trim(), 10);
        const upper = parseInt(up.trim(), 10);
        for (let i = lower; i <= upper; i++) {
          const numberInput = parseInt(i, 10);
          if (finalData.indexOf(numberInput) > -1) {
            repeatedData.push(numberInput);
          } else {
            finalData.push(numberInput);
          }
        }
      }
    });
    finalData.sort((a, b) => a - b);
    repeatedData.sort((a, b) => a - b);

    this.setState({
      finalData,
      repeatedData
    });
  };

  resetData = () => {
    this.setState({ repeatedData: [], finalData: [] });
  };

  onKeyDown = numbers => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.findUniqueNumbers(numbers), 1500);
  };

  // @todo : ui modifications - show in colored background
  render() {
    const { initialData, repeatedData, finalData } = this.state;
    return (
      <div className="paper w-px-500 mr-auto">
        <div className="paper-title flex-hbox flex-cross-center flex-main-center">
          <div className="">Initial Array : </div>
          <div className="mr-lr-sm text-link">[ {initialData.join(", ")} ]</div>
        </div>
        <div className="paper-content flex-hbox flex-cross-center flex-main-center">
          <InputValidator
            onKeyDown={this.onKeyDown}
            resetData={this.resetData}
          />
        </div>
        {repeatedData.length || finalData.length ? (
          <div className="paper-content">
            {repeatedData.length ? (
              <div className="pd-tb-sm">
                <div className="">Repeated Data : </div>
                <div className="mr-lr-sm text-warning">
                  {repeatedData.join(",")}
                </div>
              </div>
            ) : null}
            {finalData.length ? (
              <div className="pd-tb-sm">
                <div className="">Result Data : </div>
                <div className="mr-lr-sm text-success">
                  {finalData.join(", ")}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Assignment1;
