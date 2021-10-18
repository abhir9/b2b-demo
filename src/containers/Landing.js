import React , {useContext } from 'react';
import {
  Typography,
  Link
} from '@material-ui/core';
import {idxDomain} from "../config";

import {
    Button,
  } from '@material-ui/core';
  const link =  idxDomain + '?action=register&return_url='+ window.location.origin + "/login";
export default () => (
  
  <React.Fragment>
  <div style={{textAlign: "center"}}>
  <Typography  align="center" variant="body1" style={{maxWidth: "375px", margin: "0 auto"}}>
    Build Buyer Persons from your customer Data and AI make it bloody too much easy to understand
    </Typography>
  <Button color="primary"  underline="none" variant="contained" component={Link} onClick={()=>{
    window.location=link;
  }} style={{margin:"48px 0 auto"}}>Join Now</Button>
  </div>
   <div className="box-wrap">
   <div className="box">
     <div className="icon"></div>
     <div className="title">Loream Ipsum</div>
   </div>
   <div className="box">
     <div className="icon"></div>
     <div className="title">Loream Ipsum</div>
   </div>
   <div className="box">
     <div className="icon"></div>
     <div className="title">Loream Ipsum</div>
   </div>
 </div>
 </React.Fragment>
);
