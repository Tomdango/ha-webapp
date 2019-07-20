import { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { nodesDiscovered as nodesDiscoveredAction } from '../../../redux/actions/nodeActions';
import { nodes } from '../../../core/constants/routes';

class NodeJobs extends Component {
  static propTypes = {
    uninitializedNodes: PropTypes.arrayOf(PropTypes.object).isRequired,
    nodesDiscovered: PropTypes.func.isRequired,
  };

  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {
      intervalIDs: [],
    };
  }

  componentDidMount() {
    const intervalIDs = [];
    const jobs = [{ func: this.discoverNodes, timeout: 10000 }];

    jobs.forEach(job => {
      job.func();
      intervalIDs.push(setInterval(job.func, job.timeout));
    });

    this.setState(intervalIDs);
  }

  componentWillUnmount() {
    const { intervalIDs } = this.state;
    intervalIDs.forEach(clearInterval);
  }

  discoverNodes = async () => {
    const { uninitializedNodes, nodesDiscovered } = this.props;
    axios
      .get(nodes.getUninitialised)
      .then(response => {
        const { data } = response;
        const currentNodeIds = uninitializedNodes.map(node => {
          return node.nodeId;
        });
        const newNodes = data.filter(
          node => !currentNodeIds.includes(node.nodeId),
        );
        if (newNodes.length > 0) {
          toast.info('There are new nodes which require setup.');
          nodesDiscovered(newNodes);
        }
      })
      .catch(err => {
        toast.error(`Failed to get node discovery info.\n${err.toString()}`);
      });
  };

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return {
    uninitializedNodes: state.nodes.discovery.uninitializedNodes,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    nodesDiscovered: n => dispatch(nodesDiscoveredAction(n)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NodeJobs);
