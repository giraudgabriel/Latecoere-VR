import React from "react";

const Input = ({ label, placeholder, value, disabled, handleInput, type }) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend" hidden={!label}>
        <span className="input-group-text">{label}</span>
      </div>
      <input
        className="form-control"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        type={type}
        onChange={e => handleInput(e.target.value)}
      />
    </div>
  );
};

export default Input;
