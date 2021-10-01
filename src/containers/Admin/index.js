import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Box,
  Tab,
  Tabs
} from '@material-ui/core';
import ConnectData from './connectData';
import YourPersona from './yourPersona';
import BuildPersona from './buildPersona';
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
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
        <BuildPersona />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <YourPersona />
      </TabPanel>
      <TabPanel value={value} index={2}>
      <ConnectData />
      </TabPanel>
    </Box>
  );
}
