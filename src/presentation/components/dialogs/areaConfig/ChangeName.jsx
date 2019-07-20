import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from 'react-redux';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withRouter } from 'react-router-dom';

const NewAreaDialog = ({
  open,
  onClose,
  inProgress,
  createNewArea,
  history,
}) => {
  const [submitted, setSubmitted] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const handleCancel = () => {
    setInputValue('');
    setSubmitted(false);
    onClose();
  };
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    if (inputValue) {
      createNewArea(inputValue, history, () => {
        setInputValue('');
        setSubmitted(false);
      });
    }
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Area</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Creating a new area allows you to assign Nodes and set custom
          temperatures to that area.
        </DialogContentText>
        <form>
          <TextField
            margin="none"
            label="Area Name"
            error={submitted && !inputValue}
            value={inputValue}
            required
            autoFocus
            onChange={e => setInputValue(e.target.value)}
            type="text"
            fullWidth
            style={{ marginBottom: 20 }}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginBottom: 10 }}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <div style={{ position: 'relative' }}>
              <Button
                variant="contained"
                type="submit"
                disabled={inProgress}
                style={{ marginLeft: 10, marginBottom: 10 }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
              {inProgress ? (
                <CircularProgress
                  size={24}
                  style={{
                    position: 'absolute',
                    color: '#fff',
                    top: '50%',
                    left: '50%',
                    marginTop: -17,
                    marginLeft: -6,
                  }}
                />
              ) : null}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = state => {
  return {
    inProgress: state.areas.config.inProgress === 'changeName',
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // changeName: (name, history, callback) =>
    //   dispatch(changeName(name, history, callback)),
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(NewAreaDialog),
);
