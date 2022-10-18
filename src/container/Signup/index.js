import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../../components/Form/Index';
import { loginSliceAction, loginThunk } from '../../redux/pages';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Navigate } from 'react-router-dom';
class Index extends Component {
  constructor(props) {
    super();
    this.state = {
      email: '',
      password: '',
      open: false,
      redirect: false,
    };
  }
  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.signup({ email, password });
  };

  componentDidUpdate() {
    const { error, user } = this.props.state.loginState;
    if (error?.code === 'ERR_BAD_REQUEST') {
      this.handleOpen();
      this.props.removeError();
    }

    if (user?.email) {
      this.setState({ ...this.state, redirect: true });
    }
  }
  render() {
    const { error } = this.props.state.loginState;
    const { open, email, password, redirect } = this.state;
    return (
      <>
        {redirect && <Navigate to="/" replace={true} />}
        {error && (
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            open={open}
            onClose={this.handleClose}
            autoHideDuration={5000}
          >
            <MuiAlert
              onClose={this.handleClose}
              severity="error"
              elevation={6}
              variant="filled"
            >
              Sign Up Failed. Try Again
            </MuiAlert>
          </Snackbar>
        )}
        <Form
          handleSubmit={this.handleSubmit}
          title={'SignUp'}
          buttonName={'Sign Up'}
          handleChange={this.handleChange}
          email={email}
          password={password}
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
    removeError: () => dispatch(loginSliceAction.removeError()),
  };
}

export default connect(mapStateToProp, mapDispatchToProps)(Index);
