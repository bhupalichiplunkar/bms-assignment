import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquare,
  faCheckSquare,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";

import "./MultiCheckDropdown.scss";

class MultiCheckDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.node = null;
  }

  componentDidMount() {
    document.addEventListener("click", this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleOutsideClick, false);
  }

  toggleDropDown = () => {
    this.setState({
      open: !this.state.open
    });
    this.setState({ open: !this.state.open });
  };

  handleOutsideClick = e => {
    if (this.node && this.node.contains(e.target)) {
      return;
    }
    if (this.state.open) {
      this.setState({ open: false });
    }
  };

  onSelect = option => {
    this.setState({
      value: option
    });
    if (this.state.open) {
      this.toggleDropDown();
    }
    if (this.props.onSelect) this.props.onSelect(option);
  };

  render() {
    const { value, options, defaultLabel, ...rest } = this.props;
    const { open } = this.state;
    const label = value.length ? value.join(", ") : defaultLabel;
    return (
      <div
        className="container"
        ref={node => {
          this.node = node;
        }}
      >
        <div
          className="dropdown-label flex-hbox flex-cross-center"
          onClick={this.toggleDropDown}
        >
          <div className="flex-full pd-sm label-string">{label}</div>
          <div className="flex-auto pd-r-sm">
            <FontAwesomeIcon icon={faChevronDown} color="#279e76" />
          </div>
        </div>
        {open && (
          <div className="dropdown-options">
            {options.map(option => (
              <div
                key={option}
                className="flex-hbox flex-cross-center br-xs br-radius-xs pd-sm cursor-pointer"
                onClick={() => this.onSelect(option)}
              >
                <div className="mr-r-sm">
                  <FontAwesomeIcon
                    icon={value.indexOf(option) > -1 ? faCheckSquare : faSquare}
                    color="white"
                  />
                </div>
                <div className="text-white">{option}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default MultiCheckDropdown;
