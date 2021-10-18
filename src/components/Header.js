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
import { useHistory, useLocation } from "react-router-dom";
const styles = {
  flex: {
    flex: 1,
  },
};
//const history = useHistory();
function Header ({classes}) {
  const history = useHistory();
  return (
  <AppBar style={{ background: '#2E3B55' }} position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        
        <Link  color="inherit" underline="none" onClick={()=>{
          history.push("/dashboard")
        }} style={{cursor:"pointer"}}>
        Persona Picker
        </Link>
      </Typography>
      {/* <Button color="inherit" component={Link} to="/posts">Posts Manager</Button> */}
      <div className={classes.flex} />
      <LoginButton />
    </Toolbar>
  </AppBar>

)
      };

export default withStyles(styles)(Header);
