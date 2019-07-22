import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Grid from '@material-ui/core/Grid';
import HeaterControl from './HeaterControl';
import HeaterData from './HeaterData';

class HeaterDetails extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      timeout: null,
      open: false,
      message: '',
      selectedDate: null,
    };
  }

  showSnackbar = (message, openTime = 1500) => {
    const { timeout } = this.state;
    if (timeout) clearTimeout(timeout);
    this.setState({
      timeout: setTimeout(() => {
        this.setState({ timeout: null, open: false });
      }, openTime),
      open: true,
      message,
    });
  };

  render() {
    const { on } = this.props;
    const { open, message } = this.state;
    return (
      <>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={open}
        >
          <SnackbarContent
            // style={{ backgroundColor: green[500], color: '#fafafa' }}
            message={<Typography variant="body1">{message}</Typography>}
          />
        </Snackbar>
        <Fade in>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <HeaterControl
                showSnackbar={this.showSnackbar}
                on={on}
                {...this.props}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <HeaterData {...this.props} />
            </Grid>
          </Grid>
        </Fade>
      </>
    );
  }
}

export default HeaterDetails;
