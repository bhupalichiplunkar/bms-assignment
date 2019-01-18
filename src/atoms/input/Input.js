import React from "react";
import "./Input.scss";

const Input = function(props) {
  const { value, onChange, ...rest } = props;
  return (
    <div>
      <input
        className="input-box"
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        {...rest}
      />
    </div>
  );
};

export default Input;
