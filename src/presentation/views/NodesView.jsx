import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import RoomCard from '../components/cards/RoomCard';
import { getAreaData } from '../../redux/actions/nodeActions';

class NodesView extends Component {
  static propTypes = {
    requestStatus: PropTypes.string.isRequired,
    fetchData: PropTypes.func.isRequired,
    nodeData: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  componentDidMount() {
    const { fetchData } = this.props;
    fetchData();
  }

  render() {
    const { requestStatus, nodeData } = this.props;
    const rooms = nodeData.map(data => (
      <Grid item xs={12} md={6} className="nodes-table-container">
        <RoomCard {...data} />
      </Grid>
    ));
    return (
      <Container maxWidth="xl" style={{ marginTop: 20 }}>
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
            Nodes
          </Typography>
          {requestStatus === 'fetching' ? (
            <CircularProgress color="secondary" style={{ marginLeft: 30 }} />
          ) : null}
        </div>

        <Grid container>{rooms}</Grid>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    requestStatus: state.nodes.areas.requestStatus,
    nodeData: state.nodes.areas.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(getAreaData()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NodesView);
