import React, { Component } from "react";
import { connect } from "react-redux";
import Form from "../../components/Form";
import { loginThunk } from "../../redux/pages";

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
  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const { email, password } = this.state;
    const x = {
      email,
      password,
    };
    this.props.signup(x);
  };

  render() {
    return (
      <>
        <Form
          handleSubmit={this.handleSubmit}
          title={"SignUp"}
          buttonName={"Sign Up"}
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
    signup: (x) => dispatch(loginThunk.signup(x)),
  };
}

export default connect(mapStateToProp, mapDispatchToProps)(index);
