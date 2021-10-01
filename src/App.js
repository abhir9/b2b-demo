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
      <Route path="/dashboard" component={Admin} />
      <Route path="/team" component={Team} />
      {/* <Route path="/login/callback" component={LoginCallback} /> */}
    </main>
  </Fragment>
);

export default withStyles(styles)(App);
