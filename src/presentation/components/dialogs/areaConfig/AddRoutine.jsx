import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  Avatar,
  Switch,
  ListItemText,
  ListItem,
  List,
  Typography,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { blue } from '@material-ui/core/colors';
import { addNewRoutine } from '../../../../redux/actions/areaActions';
import SetTemperature from '../SetTemperature';

class AddRoutineDialog extends Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {
      name: '',
      timeStart: null,
      timeEnd: null,
      heatingEnabled: true,
      repeat: [],
      errors: {},
      targetTemperature: null,
      openDialog: false,
    };
  }

  validate = () => {
    const { timeStart, timeEnd, name } = this.state;
    const errors = {};
    if (timeStart === null) {
      errors.timeStart = true;
    }
    if (name.length === 0) {
      errors.name = true;
    }
    if (timeEnd === null) {
      errors.timeEnd = true;
    }
    this.setState({ errors });
    if (Object.keys(errors).length > 0) {
      return false;
    }
    return true;
  };

  handleClick = selectedDay => {
    const { repeat } = this.state;
    if (repeat.includes(selectedDay)) {
      this.setState({ repeat: repeat.filter(day => day !== selectedDay) });
    } else {
      this.setState({ repeat: [...repeat, selectedDay] });
    }
  };

  handleSubmit = () => {
    if (this.validate()) {
      const { match, addRoutine, onClose } = this.props;
      const { id } = match.params;
      const {
        timeStart,
        timeEnd,
        heatingEnabled,
        repeat,
        targetTemperature,
        name,
      } = this.state;
      addRoutine(id, {
        name,
        timeStart: timeStart.toString(),
        timeEnd: timeEnd.toString(),
        heatingEnabled,
        repeat,
        targetTemperature: Number(targetTemperature),
      });
      onClose();
    }
  };

  openDialog = open => {
    this.setState({ openDialog: open });
  };

  render() {
    const { open, onClose } = this.props;
    const {
      timeStart,
      timeEnd,
      heatingEnabled,
      repeat,
      targetTemperature,
      openDialog,
      errors,
      name,
    } = this.state;
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Create New Routine</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Note: If you do not select a repeat, the routine will run daily.
          </DialogContentText>
          <TextField
            margin="none"
            required
            value={name}
            onChange={e => this.setState({ name: e.target.value })}
            error={errors.name && name.length === 0}
            label="Name"
            type="text"
            fullWidth
            style={{ marginBottom: 30 }}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div style={{ marginBottom: 30, display: 'flex' }}>
              <TimePicker
                onChange={time =>
                  this.setState({
                    timeStart: time,
                    errors: { ...errors, timeStart: false },
                  })
                }
                value={timeStart}
                ampm={false}
                required
                error={errors.timeStart}
                label="Time Start"
                style={{ marginRight: 5 }}
              />
              <TimePicker
                onChange={time =>
                  this.setState({
                    timeEnd: time,
                    errors: { ...errors, timeEnd: false },
                  })
                }
                style={{ marginLeft: 5 }}
                required
                error={errors.timeEnd}
                ampm={false}
                value={timeEnd}
                label="Time End"
              />
            </div>
          </MuiPickersUtilsProvider>
          <Typography color="textSecondary" style={{ marginBottom: 10 }}>
            Repeat
          </Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 30,
            }}
          >
            <Avatar
              className="date-select-button"
              style={{
                backgroundColor: repeat.includes('mon') ? blue[500] : '',
              }}
              onClick={() => this.handleClick('mon')}
            >
              M
            </Avatar>
            <Avatar
              className="date-select-button"
              style={{
                backgroundColor: repeat.includes('tue') ? blue[500] : '',
              }}
              onClick={() => this.handleClick('tue')}
            >
              T
            </Avatar>
            <Avatar
              className="date-select-button"
              style={{
                backgroundColor: repeat.includes('wed') ? blue[500] : '',
              }}
              onClick={() => this.handleClick('wed')}
            >
              W
            </Avatar>
            <Avatar
              className="date-select-button"
              style={{
                backgroundColor: repeat.includes('thu') ? blue[500] : '',
              }}
              onClick={() => this.handleClick('thu')}
            >
              T
            </Avatar>
            <Avatar
              className="date-select-button"
              style={{
                backgroundColor: repeat.includes('fri') ? blue[500] : '',
              }}
              onClick={() => this.handleClick('fri')}
            >
              F
            </Avatar>
            <Avatar
              className="date-select-button"
              style={{
                backgroundColor: repeat.includes('sat') ? blue[500] : '',
              }}
              onClick={() => this.handleClick('sat')}
            >
              S
            </Avatar>
            <Avatar
              className="date-select-button"
              style={{
                backgroundColor: repeat.includes('sun') ? blue[500] : '',
              }}
              onClick={() => this.handleClick('sun')}
            >
              S
            </Avatar>
          </div>

          <List>
            <ListItem style={{ padding: 0, marginBottom: 10 }}>
              <Typography color="textSecondary">Actions</Typography>
            </ListItem>
            <ListItem style={{ padding: 0, marginBottom: 10 }}>
              <ListItemText>Heating Enabled</ListItemText>
              <ListItemSecondaryAction>
                <Switch
                  onChange={e =>
                    this.setState({ heatingEnabled: e.target.checked })
                  }
                  checked={heatingEnabled}
                />
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem style={{ padding: 0, marginBottom: 10 }}>
              <ListItemText>Target Temperature</ListItemText>
              <ListItemSecondaryAction>
                <Button
                  onClick={() => {
                    if (targetTemperature === null) {
                      this.setState({ targetTemperature: 10 });
                    }
                    this.openDialog(true);
                  }}
                  disabled={!heatingEnabled}
                >
                  {heatingEnabled ? (
                    <>
                      {targetTemperature ? `${targetTemperature}°C` : 'Not Set'}
                    </>
                  ) : (
                    'Heating Disabled'
                  )}
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginBottom: 10 }}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              onClick={this.handleSubmit}
              variant="contained"
              type="submit"
              style={{ marginLeft: 10, marginBottom: 10 }}
            >
              Submit
            </Button>
          </div>
        </DialogContent>
        <SetTemperature
          onSubmit={temp => {
            this.setState({ targetTemperature: temp });
            this.openDialog(false);
          }}
          initialValue={targetTemperature || 10}
          open={openDialog}
          onClose={() => this.openDialog(false)}
        />
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    inProgress: state.areas.config.inProgress === 'changeName',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addRoutine: (id, routine) => dispatch(addNewRoutine(id, routine)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AddRoutineDialog),
);
