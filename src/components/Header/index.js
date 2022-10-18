import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { loginThunk } from '../../redux/pages';

export class Index extends Component {
  constructor(props) {
    super();

    this.state = { redirect: false };
  }
  handleLogout = () => {
    this.props.logout();
    this.setState({ redirect: true });
  };
  render() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        {this.state.redirect && <Navigate to="/" replace={true} />}
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome
            </Typography>
            <Button onClick={this.handleLogout} color="inherit">
              Sign Out
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
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
    logout: () => dispatch(loginThunk.logout()),
  };
}

export default connect(mapStateToProp, mapDispatchToProps)(Index);
