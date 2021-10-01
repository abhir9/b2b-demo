import React, { Component } from 'react';
import {
Typography,
TextField,
Box,
LoadingButton,
SaveIcon,
Button
} from '@material-ui/core';

class BuildPersona extends Component {
    state = {
        loading: false
      };
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
<TextField id="outlined-basic" label="Persona Name" variant="outlined" />
<TextField  label="Persona Query" variant="outlined"
          multiline
          rows={4}  />
            
           <Button
        color="secondary"
        onClick={()=>{
         
        }}
        variant="contained"
      >
        Build
      </Button>

</Box>
</div>
    );
  }
}

export default BuildPersona;
