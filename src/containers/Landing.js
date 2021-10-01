import React from 'react';
import {
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {
    Button,
  } from '@material-ui/core';
export default () => (
  <div>
 
  <Typography  align="center" variant="div">Build Buyer Persons from your customer Data!</Typography>
  <Button variant="contained" component={Link} to="/posts">Join Now</Button>
  </div>
);
