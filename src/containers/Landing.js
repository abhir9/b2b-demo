import React , {useContext } from 'react';
import {
  Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import {idxDomain} from "../config";

import {
    Button,
  } from '@material-ui/core';
  const link =  idxDomain + '?action=register&return_url='+ window.location.origin + "/login";
export default () => (
  <div>
  <Typography  align="center" variant="div">
    Build Buyer Persons from your customer Data and AI make it bloody too much eay to understand
    </Typography>
  <Button variant="contained" component={Link} onClick={()=>{
    window.location=link;
  }}>Join Now</Button>
  </div>
);
