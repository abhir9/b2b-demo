import React, { Component } from 'react';
import {
Typography,
TextField,
Box,
LoadingButton,
SaveIcon,
Button
} from '@material-ui/core';

class ConnectData extends Component {
    state = {
        loading: false
      };
  render() {
    return (
      <div>
      <Typography>Connect Data</Typography> 
  <Box
  component="form"
  sx={{
    '& .MuiTextField-root': { m: 1, width: '100%', margin: '3px' },
  }}
  noValidate
  autoComplete="off"
>
<TextField id="outlined-basic" label="Connection Type" variant="outlined" />
<TextField  label="Connection String" variant="outlined"
          multiline
          rows={4}  />
            
           <Button
        color="secondary"
        onClick={()=>{
         
        }}
        variant="contained"
      >
        Connect
      </Button>

</Box>
</div>
    );
  }
}

export default ConnectData;
