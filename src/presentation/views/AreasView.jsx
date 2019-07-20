import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Fade from '@material-ui/core/Fade';
import { Button, CircularProgress } from '@material-ui/core';
import AreaCard from '../components/cards/AreaCard';
import {
  getAreaStatus,
  openNewAreaDialog,
} from '../../redux/actions/areaActions';

class RoomsView extends Component {
  static propTypes = {
    areas: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchData: PropTypes.func.isRequired,
    requestStatus: PropTypes.string.isRequired,
    newArea: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  render() {
    const { areas, requestStatus, newArea } = this.props;
    const cards = areas.map(data => (
      <Fade in key={data.name}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AreaCard {...data} />
        </Grid>
      </Fade>
    ));
    return (
      <Container maxWidth="xl" style={{ marginTop: 20 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
            borderBottom: '1px solid #777',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h3"
              style={{ fontWeight: 'lighter' }}
              gutterBottom
            >
              Areas
            </Typography>
            {requestStatus === 'fetching' ? (
              <CircularProgress color="secondary" style={{ marginLeft: 30 }} />
            ) : null}
          </div>
          <Button
            variant="contained"
            onClick={newArea}
            color="secondary"
            size="large"
          >
            New Area
          </Button>
        </div>
        <Grid container spacing={2}>
          {cards}
        </Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    areas: state.areas.data.areas,
    requestStatus: state.areas.data.requestStatus,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(getAreaStatus()),
    newArea: () => dispatch(openNewAreaDialog()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RoomsView);
