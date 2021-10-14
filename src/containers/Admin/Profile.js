import React, { useContext } from 'react';
  import {
    Typography,
    Grid,
    makeStyles,
    Link,
    Card,
    CardContent,
    CardActions,
    

    } from '@material-ui/core';

    import UserContext  from './../LoginContext';
  
  function Profile() {
    const {user} = useContext(UserContext)
  
    return (
        <Card sx={{ minWidth: 1000 }}>
      <CardContent>
       
        <Typography variant="h5" component="div">
         Personal Details
        </Typography>
        <Grid container spacing={2}>
  <Grid item xs={2}>
  <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Name : 
        </Typography>
  </Grid>
  <Grid item xs={4}>
  <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          {user.name}
        </Typography>
  </Grid>
</Grid>
<Grid container spacing={2}>   
<Grid item xs={2}>
  <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Email : 
        </Typography>
  </Grid>
  <Grid item xs={4}>
  <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          {user.email}
        </Typography>
  </Grid>
</Grid>
<Grid container spacing={2}>
<Grid item xs={2}>
  <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Role : 
        </Typography>
  </Grid>
  <Grid item xs={4}>
  <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
          {user.role}
        </Typography>
  </Grid>
  </Grid>
      </CardContent>
    </Card>
    );
  }
  
  export default Profile;