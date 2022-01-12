import React, { Component } from 'react';
import {
  Typography,
  TextField,
  Box,
  LoadingButton,
  Button,
  Snackbar,
  IconButton,
  CircularProgress
} from '@material-ui/core';
import {
  Close
} from '@material-ui/icons';
import {
  withRouter,
} from "react-router-dom";
import UserContext from './../LoginContext';
import { apiEndpoint } from "../../config";
const API = apiEndpoint;

class BuildPersona extends Component {
  state = {
    loading: false,
    name: "",
    body: "",
    open: false,
    messge: "",
    id:''
  };
  static contextType = UserContext;
componentDidMount(){
  const {
    history,
    location,
  } = this.props;
  if (history.action === "PUSH" && location.state) {
    let data = location.state.persona;
    history.push(
      `/dashboard`,
      {
        persona: '',
      }
    );
    this.setState({name:data.name, body: data.body,id:data.id})
  }
}
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
    const { user } = this.context;
    this.setState({ loading: true })
    var method = this.state.id?"put":"post";
    var endpoint = method === "put" ? '/data/'+ this.state.id : '/data';
    var response = await this.fetch(method, endpoint, {
      name: this.state.name,
      body: this.state.body,
      orgid: user.organization
    });
    if (response.id) {
      var message = method === "put" ? "Build Persona query has updated successfully" :"Build Persona query has created successfully." ;
      this.setState({ loading: false, id:"", name: "", body: "", open: true, message: message});
      this.props.showSection();
    }
    else {
      this.setState({ loading: false, open: true, message: "Build Persona query is not created." })
    }
  }
  async getData() {
    this.setState({ loading: false, data: (await this.fetch('get', '/data')) || [] });
  }
  render() {
    const { user } = this.context;
    const { loading, name, body } = this.state;
  
    return (
      <div >
        <Typography>Build Persona</Typography>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '100%', margin: '3px' },
          }}
          noValidate
          autoComplete="off"
          style={{padding:'40px'}}
        >
          <TextField id="outlined-basic" label="Persona Name" value={name} variant="outlined" onChange={(e) => {
            this.setState({ name: e.target.value.trim() })
          }} />
          <TextField label="Persona Query" variant="outlined" value={body}
            multiline
            rows={4} onChange={(e) => {
              this.setState({ body: e.target.value.trim() })
            }} />

          <Button
           color="primary"
            onClick={() => {
              this.saveData();
            }}
            disabled={loading  || user.role.includes("Marketeer") || user.role.includes("Developer")}
            variant="contained"
          >
            {loading ? <CircularProgress /> : "Build"}
          </Button>


        </Box>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={this.state.open}
          onClose={() => {
            this.setState({ open: false })
          }}
          message={this.state.message}
          // key={vertical + horizontal}
          action={
            <React.Fragment>
              <IconButton
                aria-label="close"
                color="inherit"
                sx={{ p: 0.5 }}
                onClick={() => {
                  this.setState({ open: false })
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

export default withRouter(BuildPersona);
