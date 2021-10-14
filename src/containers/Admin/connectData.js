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
const API = process.env.REACT_APP_API || 'http://localhost:3072';

class ConnectData extends Component {
  state = {
    loading: false,
    type: "",
    body: "",
    open: false,
    messge: ""
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
    this.setState({ loading: true })
    var response = await this.fetch('post', '/connectdata', {
      type: this.state.type,
      body: this.state.body
    });
    if (response.id) {
      this.setState({ loading: false, type: "", body: "", open: true, message: "Created Connect Data successfully." })
    }
    else {
      this.setState({ loading: false, open: true, message: "Connect Data is not created." })
    }

    // this.props.history.goBack();
    //  await this.getPosts();
  }
  async getData() {
    this.setState({ loading: false, data: (await this.fetch('get', '/connectdata')) || [] });
  }
  render() {
    const { loading } = this.state;
    return (
      <div>
        <Typography>ConnectData Data</Typography>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '100%', margin: '3px' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Connection Type" variant="outlined" onChange={(e) => {
            this.setState({ type: e.target.value.trim() })
          }} />
          <TextField label="Connection String" variant="outlined"
            multiline
            rows={4} onChange={(e) => {
              this.setState({ body: e.target.value.trim() })
            }} />

          <Button
            color="secondary"
            onClick={() => {
              this.saveData();
            }}
            disabled={loading}
            variant="contained"
          >
            {loading ? <CircularProgress /> : "Connect"}
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

export default ConnectData;
