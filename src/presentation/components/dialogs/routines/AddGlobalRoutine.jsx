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
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { blue } from '@material-ui/core/colors';
import { addNewRoutine } from '../../../../redux/actions/areaActions';
import SetTemperature from '../SetTemperature';
import { closeCreateGlobalRoutineDialog } from '../../../../redux/actions/routinesActions';

const SelectExcludeAreasDialog = ({ areas, open, onSubmit, excludedAreas }) => {
  const [excAreas, setExcAreas] = React.useState(excludedAreas);
  const handleChange = e => {
    const { checked, value } = e.target;
    if (!checked) {
      const newExcAreas = excAreas.filter(id => id !== value);
      setExcAreas(newExcAreas);
    } else {
      setExcAreas([...excAreas, value]);
    }
  };
  return (
    <Dialog open={open}>
      <DialogTitle>Excluded Areas</DialogTitle>
      <DialogContent style={{ minWidth: 400 }}>
        <FormGroup>
          {areas.map(area => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={excAreas.includes(area.areaId)}
                  value={area.areaId}
                  onChange={handleChange}
                />
              }
              label={area.name}
            />
          ))}
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button
          size="small"
          color="secondary"
          variant="contained"
          onClick={onSubmit}
        >
          Select
        </Button>
      </DialogActions>
    </Dialog>
  );
};

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
      excludedAreas: [],
      excludeAreasDialogOpen: false,
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
    const { open, onClose, dialogOpen, areas } = this.props;
    const {
      timeStart,
      timeEnd,
      heatingEnabled,
      repeat,
      targetTemperature,
      openDialog,
      errors,
      name,
      excludeAreasDialogOpen,
      excludedAreas,
    } = this.state;
    return (
      <>
        <Dialog open={dialogOpen} onClose={onClose}>
          <DialogTitle>Create New Global Routine</DialogTitle>
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
                        {targetTemperature
                          ? `${targetTemperature}°C`
                          : 'Not Set'}
                      </>
                    ) : (
                      'Heating Disabled'
                    )}
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            <List>
              <ListItem style={{ padding: 0, marginBottom: 10 }}>
                <Typography color="textSecondary">
                  Additional Options
                </Typography>
              </ListItem>
              <ListItem style={{ padding: 0, marginBottom: 10 }}>
                <ListItemText>Exclude Areas</ListItemText>
                <ListItemSecondaryAction>
                  <Button
                    onClick={() =>
                      this.setState({ excludeAreasDialogOpen: true })
                    }
                  >
                    Select
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
        <SelectExcludeAreasDialog
          open={excludeAreasDialogOpen}
          excludedAreas={excludedAreas}
          onSubmit={excAreas =>
            this.setState({
              excludedAreas: excAreas,
              excludeAreasDialogOpen: false,
            })
          }
          areas={areas}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    dialogOpen: state.routines.add.dialogOpen,
    areas: state.areas.data.areas,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClose: () => dispatch(closeCreateGlobalRoutineDialog()),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(AddRoutineDialog),
);
