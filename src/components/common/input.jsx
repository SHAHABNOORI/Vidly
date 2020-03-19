import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        // value={value}
        // onChange={onChange}
        // type={type}
        id={name}
        name={name}
        // autoFocus
        // ref={this.userName}

        className="form-control"
      />
      {error && <div className="alert alert-danger m-2">{error}</div>}
    </div>
  );
};

export default Input;
