import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

class Login extends Component {
  state = {
    authenticated: true,
    user: null,
    menuAnchorEl: null,
  };

  componentDidUpdate() {
    this.checkAuthentication();
  }

  componentDidMount() {
    this.checkAuthentication();
  }

  async checkAuthentication() {
    // const authenticated = this.props.authState.isAuthenticated;
    // if (authenticated !== this.state.authenticated) {
    //   const user = await this.props.authService.getUser();
    //   this.setState({ authenticated, user });
    // }
  }

  login = () => {
      console.log('Call login fucntion')
  }
  logout = () => {
    this.handleMenuClose();
    //this.props.authService.logout('/');
  };

  handleMenuOpen = event => this.setState({ menuAnchorEl: event.currentTarget });
  handleMenuClose = () => this.setState({ menuAnchorEl: null });

  render() {
    const { authenticated, user, menuAnchorEl } = this.state;

    if (!authenticated) return <Button color="inherit" onClick={this.login}>Login</Button>;

    const menuPosition = {
      vertical: 'left',
      horizontal: 'right',
    };

    return (
      <div>
        <IconButton onClick={this.handleMenuOpen} color="inherit">
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={menuAnchorEl}
          anchorOrigin={menuPosition}
          transformOrigin={menuPosition}
          open={!!menuAnchorEl}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={this.profile}>
            <ListItemText
              primary="Profile"
              secondary={user && user.name}
            />
          </MenuItem>
          <MenuItem to="/team">
            
            <Button variant="text" component={Link} to="/team">Team</Button>
          </MenuItem>
          <MenuItem onClick={this.logout}>
            <ListItemText
              primary="Logout"
              secondary={user && user.name}
            />
          </MenuItem>
          
        </Menu>
      </div>
    );
  }
}

export default Login;
