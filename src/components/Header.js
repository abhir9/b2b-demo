import React from 'react';
import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  withStyles,
  Link
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
        
        <Link href={"/dashboard"} color="inherit" underline="none">
        Persona Picker
        </Link>
      </Typography>
      {/* <Button color="inherit" component={Link} to="/posts">Posts Manager</Button> */}
      <div className={classes.flex} />
      <LoginButton />
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(Header);
