import React from 'react';
import {
  Paper,
  List,
  ListSubheader,
  ListItemIcon,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PowerIcon from '@material-ui/icons/Power';
import WifiIcon from '@material-ui/icons/Wifi';
import PropTypes from 'prop-types';

import calculateCost from '../../../core/functions/calculateCost';

const HeaterData = ({ timeOn, power, on, status }) => {
  return (
    <Paper>
      <List subheader={<ListSubheader>Details</ListSubheader>}>
        <ListItem>
          <ListItemIcon>
            <WifiIcon />
          </ListItemIcon>
          <ListItemText primary="Node Status" />
          <ListItemSecondaryAction>
            <ListItemText secondary={status ? 'Online' : 'Offline'} />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <PowerIcon />
          </ListItemIcon>
          <ListItemText primary="Heater Status" />
          <ListItemSecondaryAction>
            <ListItemText secondary={on ? 'On' : 'Off'} />
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
          <ListItemText primary="Cost (Today)" />
          <ListItemSecondaryAction>
            <ListItemText
              secondary={`£${calculateCost(timeOn.today, power)}`}
            />
          </ListItemSecondaryAction>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <AttachMoneyIcon />
          </ListItemIcon>
          <ListItemText primary="Cost (Week)" />
          <ListItemSecondaryAction>
            <ListItemText secondary={`£${calculateCost(timeOn.week, power)}`} />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </Paper>
  );
};

HeaterData.propTypes = {
  timeOn: PropTypes.objectOf(PropTypes.number).isRequired,
  power: PropTypes.number.isRequired,
};

export default HeaterData;
