import React, { Component } from 'react';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import { connect } from 'react-redux';
import PowerOn from '@material-ui/icons/Power';
import PowerOff from '@material-ui/icons/PowerOff';
import Timer from '@material-ui/icons/Timer';
import UpdateIcon from '@material-ui/icons/Update';
import Button from '@material-ui/core/Button';
import { red, green, yellow } from '@material-ui/core/colors';

class HeaterControl extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      selectedDate: null,
    };
  }

  handleDateInput = selectedDate => {
    const { showSnackbar } = this.props;
    this.setState({ selectedDate });
    showSnackbar(`Timer set until: ${selectedDate}`, 3000);
  };

  handleToggle = e => {
    const { showSnackbar } = this.props;
    const { checked, value } = e.target;
    let message = '';
    switch (value) {
      case 'heaterEnabled':
        message = `Heater ${checked ? 'Enabled' : 'Disabled'}`;
        break;
      default:
        break;
    }
    showSnackbar(message);
  };

  firmwareAvailable = () => {
    const { latestVersion, firmwareVersion } = this.props;
    const [major, minor, patch] = firmwareVersion.split('.');
    const [latestMajor, latestMinor, latestPatch] = latestVersion.split('.');
    if (latestMajor > major) return true;
    if (latestMinor > minor) return true;
    if (latestPatch > patch) return true;
    return null;
  };

  render() {
    const { on, latestVersion, firmwareVersion } = this.props;
    const { selectedDate } = this.state;
    const updateAvailable = this.firmwareAvailable();
    return (
      <Paper>
        <List subheader={<ListSubheader>Settings</ListSubheader>}>
          <ListItem>
            <ListItemIcon>{on ? <PowerOn /> : <PowerOff />}</ListItemIcon>
            <ListItemText primary="Heater Enabled" />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={this.handleToggle}
                checked={on}
                value="heaterEnabled"
                inputProps={{
                  'aria-labelledby': 'switch-list-label-wifi',
                }}
              />
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Timer />
            </ListItemIcon>
            <ListItemText primary="Timer" />
            <ListItemSecondaryAction>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  value={selectedDate}
                  disablePast
                  onChange={this.handleDateInput}
                  allowKeyboardControl
                  showTodayButton
                />
              </MuiPickersUtilsProvider>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <UpdateIcon />
            </ListItemIcon>
            {updateAvailable ? (
              <>
                <ListItemText>Update Available</ListItemText>
                <ListItemSecondaryAction>
                  <Button variant="contained">Update Firmware</Button>
                </ListItemSecondaryAction>
              </>
            ) : (
              <ListItemText secondary="Firmware Up To Date" />
            )}
          </ListItem>
          {updateAvailable ? (
            <ListItem>
              <ListItemIcon />
              <ListItemText>
                <span
                  style={{
                    padding: 10,
                    backgroundColor: red[500],
                    borderRadius: '10px 0 0 10px',
                  }}
                >
                  {firmwareVersion}
                </span>
                <span
                  style={{
                    padding: 10,
                    backgroundColor: yellow[900],
                  }}
                >
                  →
                </span>
                <span
                  style={{
                    padding: 10,
                    backgroundColor: green[500],
                    borderRadius: '0 10px 10px 0',
                  }}
                >
                  {latestVersion}
                </span>
              </ListItemText>
            </ListItem>
          ) : null}
        </List>
      </Paper>
    );
  }
}

const mapStateToProps = state => {
  return {
    latestVersion: state.nodes.core.latestVersion,
  };
};

export default connect(
  mapStateToProps,
  null,
)(HeaterControl);
