import React from "react";

const Input = ({ name, label, value, type, error, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        value={value}
        onChange={onChange}
        id={name}
        name={name}
        // autoFocus
        // ref={this.userName}
        type={type}
        className="form-control"
      />
      {error && <div className="alert alert-danger m-2">{error}</div>}
    </div>
  );
};

export default Input;
