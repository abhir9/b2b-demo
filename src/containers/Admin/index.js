import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation, Link } from "react-router-dom";
import {
  Typography,
  Box,
  Tab,
  Tabs,
  Snackbar,
  IconButton
} from '@material-ui/core';
import {
  Close
} from '@material-ui/icons';
import ConnectData from './connectData';
import YourPersona from './yourPersona';
import BuildPersona from './buildPersona';
import UserContext  from './../LoginContext';
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
 <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
          </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}
export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);
  const {user} = useContext(UserContext)
  const history = useHistory();
  const [message, setMessage] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
 // alert(value)
  return (
    <React.Fragment>
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 500 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Build Persona" {...a11yProps(0)} />
        <Tab label="Your Persona" {...a11yProps(1)} />
        <Tab label="Connect Data" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <BuildPersona showSection = {()=>{
          setValue(1)
          handleChange(null, 1);
          setMessage("Build Persona query has updated successfully");
        }}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <YourPersona showSection={(data)=>{
          history.push(
            `/dashboard`,
            {
              persona: data,
            }
          );
          setValue(0)
          handleChange(null, 0)
        }}/>
        
      </TabPanel>
      <TabPanel value={value} index={2}>
      <ConnectData />
      </TabPanel>
    </Box>
  
  <Snackbar
  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
  open={message !== ""}
  onClose={() => {
   setMessage("");
  }}
  message={message}
  // key={vertical + horizontal}
  action={
    <React.Fragment>
      <IconButton
        aria-label="close"
        color="inherit"
        sx={{ p: 0.5 }}
        onClick={() => {
          setMessage("");
        }}
      >
        <Close />
      </IconButton>
    </React.Fragment>
  }
/>
</React.Fragment>
  );
}
