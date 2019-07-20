import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Typography, CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { directLoad } from '../../redux/actions/nodeActions';
import HeaterDetails from '../components/node-details/HeaterDetails';

class NodeControlView extends Component {
  static propTypes = {
    activeNode: PropTypes.object,
    directLoad: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
  };

  componentDidMount() {
    const { activeNode, match } = this.props;
    const { id } = activeNode;
    if (!id) {
      directLoad(match.params.id);
    }
  }

  renderNodeControl = () => {
    const { activeNode } = this.props;
    const { loading, data } = activeNode;
    if (loading) {
      return null;
    }
    switch (data.type) {
      case 'Heater':
        return <HeaterDetails {...data} />;
      default:
        return <Typography variant="body1">Unknown Node Type.</Typography>;
    }
  };

  render() {
    const { activeNode } = this.props;
    const { name, loading } = activeNode;
    const NodeControl = this.renderNodeControl();
    return (
      <Container maxWidth="xl" style={{ marginTop: 20 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h4"
            style={{ fontWeight: 'lighter' }}
            gutterBottom
          >
            {name || 'Loading'}
          </Typography>
          {loading ? (
            <CircularProgress color="secondary" style={{ marginLeft: 30 }} />
          ) : null}
        </div>
        {NodeControl}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return { activeNode: state.nodes.core.activeNode };
};

const mapDispatchToProps = dispatch => {
  return {
    directLoad: () => dispatch(directLoad()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(NodeControlView));
