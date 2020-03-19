import React, { Component } from "react";
import Joi from "@hapi/joi";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    this.schemaObject = Joi.object(this.schema);
    const options = { abortEarly: false };
    const { error } = this.schemaObject.validate(this.state.data, options);

    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;

    // const { data } = this.state;
    // const errors = {};
    // if (data.username.trim() === "")
    //   errors.username = "Username is required";

    // if (data.password.trim() === "")
    //   errors.password = "Password is required";

    // return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
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

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
    // const userName = this.userName.current.value;
    // const password = this.password.current.value;
    // console.log("User Name :: ", userName);
    // console.log("Password :: ", password);
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
}

export default Form;
