import React, { Component, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemText,
  Box 
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import  UserContext  from './LoginContext';
import { idxDomain, apiEndpoint } from '../config';

const API = apiEndpoint;
class Login extends Component {
  state = {
    authenticated: false,
    user: null,
    menuAnchorEl: null,
    loading: false
  };
  static contextType = UserContext;
  async fetch(method, endpoint, body) {
    try {
      const response = await fetch(`${API}${endpoint}`, {
        method,
        body: body && JSON.stringify(body),
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
         // authorization: `Bearer ${await this.props.authService.getAccessToken()}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  componentDidUpdate() {
      const { user } = this.context
  if(user.uid && !this.state.authenticated){
    this.setState({authenticated: true})
  }
  }

  componentDidMount() {
    this.checkAuthentication();
  }
  parseQueryParams(queryString) {
    const qsToArray = queryString.substr(1).split("&"); // Array of key values with = delimeter

    const qsToObject = {
    };

    for (let i = 0; i < qsToArray.length; i++) {
      let query = qsToArray[i].split("=");
      qsToObject[query[0]] = query[1];
    }
    return qsToObject;
  }

  async checkAuthentication() {
    const { user, setUser } = this.context
    this._isMounted = true;
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const {token,name,employee,organization,role,domain} = this.parseQueryParams(this.props.history.location.search);
    
    if (isLoggedIn === false || localStorage.getItem("x-token")) {
      var _token = token || localStorage.getItem("x-token");
      if(_token){
        if(token){
          localStorage.setItem("x-token", token);
        }
        
      this.setState({loading:true});
     var userProfile =  await this.fetch("post", "/login", {token:_token, domain:domain, role:role, employee:employee,organization:organization});
     if(userProfile.email){
      localStorage.setItem("isLoggedIn", true);
      setUser(userProfile);
      this.setState({authenticated:true, loading:false });
      this.props.history.push("/dashboard");
    }
    else {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("x-token");
      this.setState({loading:false});
      if(window.location.pathname && window.location.pathname !== "/"){
        this.logout();
      }
    }
    }
    } else {
      this.setState({loading:false});
      this.props.history.push("/dashboard");
    }
  }

  login = () => {
    this.setState({loading:false});
      window.location = idxDomain + '?promptOrganization=true&return_url='+ window.location.origin + "/login";

  }
  logout = () => {
    this.setState({loading:false});
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("x-token");
    this.handleMenuClose();
    window.location = idxDomain + '?action=logout&return_url='+ window.location.origin;
    //this.props.authService.logout('/');
  };

  handleMenuOpen = event => this.setState({ menuAnchorEl: event.currentTarget });
  handleMenuClose = () => this.setState({ menuAnchorEl: null });

  render() {
    if(this.state.loading){
    return (
      <div className="lr_fade lr-loading-screen-overlay" id="loading-spinner">
      <div className="load-dot"></div>
      <div className="load-dot"></div>
      <div className="load-dot"></div>
      <div className="load-dot"></div>
    </div>
    )
    }
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
        //  anchorOrigin={menuPosition}
          transformOrigin={menuPosition}
          open={!!menuAnchorEl}
          onClose={this.handleMenuClose}
        >
          <MenuItem onClick={()=>{
            this.props.history.push("/profile");
            this.handleMenuClose();
          }}>
            
            Profile
          </MenuItem>
          <MenuItem onClick={()=>{
            this.props.history.push("/team");
            this.handleMenuClose();
          }}>
            
            Team
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

export default withRouter(Login);
