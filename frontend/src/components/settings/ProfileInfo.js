import * as React from 'react';
import { Grid, Typography, TextField, TextareaAutosize, Button } from '@mui/material';

export default function ProfileInfo() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">YOUR PROFILE INFORMATION</Typography>
        <hr />
        <form>
          <div className="form-group">
            <TextField id="fullName" label="Full Name" variant="standard" placeholder="Enter your fullname" defaultValue="" fullWidth />
            <small id="fullNameHelp" className="form-text text-muted"> </small>
          </div>
          <div className="form-group">
            <TextField id="email" label="Email" variant="standard" placeholder="" defaultValue="" fullWidth />
          </div>
          <div className="form-group">
            <TextField id="sponser" label="Sponser" variant="standard" placeholder="Enter your location" defaultValue="" fullWidth />
          </div>
          <div className="form-group small text-muted">
           
          </div>
          {/* <Button variant="contained" color="primary" type="button">Update Profile</Button>
          <Button variant="contained" color="default" type="reset" style={{ marginLeft: '10px' }}>Reset Changes</Button> */}
        </form>
      </Grid>
    </Grid>
  );
}