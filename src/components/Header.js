import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import LoginButton from '../containers/Login'
const styles = {
  flex: {
    flex: 1,
  },
};

const Header = ({ classes }) => (
  <AppBar style={{ background: '#2E3B55' }} position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        Persona Picker
      </Typography>
      {/* <Button color="inherit" component={Link} to="/posts">Posts Manager</Button> */}
      <div className={classes.flex} />
      <LoginButton />
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(Header);
