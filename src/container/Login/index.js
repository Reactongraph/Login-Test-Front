import React, { Component } from "react";
import { connect } from "react-redux";

import Form from "../../components/Form";
import { loginThunk } from "../../redux/pages";
import history from "../../history";

class index extends Component {
  constructor(props) {
    super();

    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };
  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    const x = {
      email,
      password,
    };
    this.props.login(x);
    // window.open("/dashboard", "_self");
  };

  render() {
    return (
      <>
        <Form
          handleSubmit={this.handleSubmit}
          title={"Sign In"}
          buttonName={"Sign In"}
          handleChange={this.handleChange}
          email={this.state.email}
          password={this.state.password}
        />
      </>
    );
  }
}
function mapStateToProp(state) {
  return {
    state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (x) => dispatch(loginThunk.login(x)),
  };
}

export default connect(mapStateToProp, mapDispatchToProps)(index);
