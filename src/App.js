import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import {
  CssBaseline,
  withStyles,
} from '@material-ui/core';

import Header from './components/Header';
import Admin from './containers/Admin/index';
import Landing from './containers/Landing';
import Team from './containers/Admin/team';
import Profile from './containers/Admin/Profile';
import ProtectedRoute from './components/ProtectedRoute';

const styles = theme => ({
  main: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },
});

const App = ({ classes }) => (
  <Fragment>
    <CssBaseline />
    <Header />
    <main className={classes.main}>
      <Route exact path="/" component={Landing} />
      <ProtectedRoute path="/dashboard" component={Admin} />
      <ProtectedRoute path="/team" component={Team} />
      <ProtectedRoute path="/profile" component={Profile} />
      {/* <Route path="/login" component={Login}  /> */}
      {/* <Route path="/login/callback" component={LoginCallback} /> */}
    </main>
  </Fragment>
);

export default withStyles(styles)(App);
