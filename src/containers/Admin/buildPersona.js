import React, { Component } from 'react';
import {
Typography,
TextField,
Box,
LoadingButton,
Button,
Snackbar,
IconButton
} from '@material-ui/core';
import {
  Close
  } from '@material-ui/icons';
const API = process.env.REACT_APP_API || 'http://localhost:3072';

class BuildPersona extends Component {
    state = {
        loading: false,
        name: "",
        body: "",
        open: false,
        messge:""
      };
      
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

      //this.setState({ error });
    }
  }
      saveData = async () => {
         var response =  await this.fetch('post', '/data', {
            name:this.state.name,
            body:this.state.body
          });
        if(response.id){
          this.setState({name:"", body:"", open:true, message:"Created Build Persona query successfully."})
        }
        else{
          this.setState({open:true, message:"Build Persona query is not created."})
        }
       
       // this.props.history.goBack();
      //  await this.getPosts();
      }
    
  render() {
    return (
      <div>
      <Typography>BuildPersona Data</Typography> 
  <Box
  component="form"
  sx={{
    '& .MuiTextField-root': { m: 1, width: '100%', margin: '3px' },
  }}
  noValidate
  autoComplete="off"
>
<TextField id="outlined-basic" label="Persona Name" variant="outlined" onChange={(e)=>{
  this.setState({name:e.target.value.trim()})
}}/>
<TextField  label="Persona Query" variant="outlined"
          multiline
          rows={4} onChange={(e)=>{
            this.setState({body:e.target.value.trim()})
          }} />
            
           <Button
        color="secondary"
        onClick={()=>{
         this.saveData();
        }}
        variant="contained"
      >
        Build
      </Button>

</Box>
<Snackbar
  anchorOrigin={{ vertical: 'top', horizontal: 'right'}}
  open={this.state.open}
  onClose={()=>{
    this.setState({open:false})
  }}
  message={this.state.message}
 // key={vertical + horizontal}
 action={
  <React.Fragment>
    <IconButton
      aria-label="close"
      color="inherit"
      sx={{ p: 0.5 }}
      onClick={()=>{
        this.setState({open:false})
      }}
    >
      <Close />
    </IconButton>
  </React.Fragment>
}
/>
</div>
    );
  }
}

export default BuildPersona;
