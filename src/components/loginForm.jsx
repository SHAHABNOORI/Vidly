import React, { Component } from "react";
import Input from "./common/input";
import Joi from "@hapi/joi";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
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

  schemaObject = Joi.object(this.schema);

  username = React.createRef();
  password = React.createRef();

  validateProperty = ({ name, value }) => {
    const obj = {};
    obj[name] = value;
    const propertySchema = Joi.object({
      [name]: this.schema[name]
    });
    const { error } = propertySchema.validate(obj);
    return error ? error.details[0].message : null;

    // var { error } = propertySchema.validate(obj);
    // if (!error) return null;
    // return error.details[0].message;
    // if (name === "username") {
    //   if (value.trim() === "") return "Username is required";
    // }

    // if (name === "password") {
    //   if (value.trim() === "") return "Password is required";
    // }
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = this.schema.validate(this.state.account, options);

    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;

    // const { account } = this.state;
    // const errors = {};
    // if (account.username.trim() === "")
    //   errors.username = "Username is required";

    // if (account.password.trim() === "")
    //   errors.password = "Password is required";

    // return Object.keys(errors).length === 0 ? null : errors;
  };
  componentDidMount() {
    // this.userName.current.focus();
  }

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    // const userName = this.userName.current.value;
    // const password = this.password.current.value;
    // console.log("User Name :: ", userName);
    // console.log("Password :: ", password);
  };
  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="User Name"
            type="text"
            error={errors.username}
            onChange={this.handleChange}
          />

          <Input
            name="password"
            value={account.password}
            label="Password"
            type="password"
            error={errors.password}
            onChange={this.handleChange}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
