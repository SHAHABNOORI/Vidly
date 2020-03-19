import React from "react";
import Input from "./common/input";
import Joi from "@hapi/joi";
import Form from "./common/form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  username = React.createRef();
  password = React.createRef();

  componentDidMount() {
    // this.userName.current.focus();
  }

  doSubmit = () => {
    //Call the server
    console.log("Submited...");
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={data.username}
            label="User Name"
            type="text"
            error={errors.username}
            onChange={this.handleChange}
          />
          <Input
            name="password"
            value={data.password}
            label="Password"
            type="password"
            error={errors.password}
            onChange={this.handleChange}
          />

          <button disabled={this.validate()} className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
