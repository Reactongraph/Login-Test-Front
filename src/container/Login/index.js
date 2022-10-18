import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../../components/Form/Index';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Navigate } from 'react-router-dom';
import { loginSliceAction, loginThunk } from '../../redux/pages';

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

  componentDidUpdate() {
    const { error, isAuthenticated } = this.props?.state?.loginState || {};
    if (error?.code === 'ERR_BAD_REQUEST') {
      this.handleOpen();
      this.props.removeError();
    }
    if (isAuthenticated) {
      this.setState({ ...this.state, redirect: true });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ ...this.state, [name]: value });
  };

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.login({ email, password });
  };

  render() {
    const { error } = this.props.state.loginState;
    const { open, email, password, redirect } = this.state;

    return (
      <>
        {redirect && <Navigate to="/dashboard" replace={true} />}
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
              Login Failed. Try Again
            </MuiAlert>
          </Snackbar>
        )}
        <Form
          handleSubmit={this.handleSubmit}
          title={'Sign In'}
          buttonName={'Sign In'}
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
    login: (x) => dispatch(loginThunk.login(x)),
    removeError: () => dispatch(loginSliceAction.removeError()),
  };
}

export default connect(mapStateToProp, mapDispatchToProps)(Index);
