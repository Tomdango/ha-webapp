import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { toast, Flip } from 'react-toastify';
import PropTypes from 'prop-types';
import { Area } from '../../../../redux/types/datafeedTypes';
import { datafeed } from '../../../../core/constants/routes';

class AreaFeed extends PureComponent {
  static propTypes = {
    feed: PropTypes.func.isRequired,
  };

  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {
      initialConnection: false,
      connected: false,
      currentTimeout: null,
    };
  }

  componentDidMount() {
    this.openWebSocket();
  }

  openWebSocket = () => {
    const ws = new WebSocket(datafeed.areas);
    ws.onopen = this.onOpen;
    ws.onmessage = this.onMessage;
    ws.onclose = this.onClose;
    ws.onerror = this.onError;
  };

  onOpen = () => {
    const { initialConnection } = this.state;
    this.setState({ initialConnection: true, connected: true });
    if (initialConnection) {
      toast.info('Datafeed.Area Reconnnected', {
        autoClose: 2000,
        transition: Flip,
        closeButton: false,
      });
    } else {
      toast.info('Datafeed.Area Connnected', {
        autoClose: 2000,
        transition: Flip,
        closeButton: false,
      });
    }
  };

  onClose = () => {
    const { connected, currentTimeout } = this.state;
    this.setState({ connected: false });
    if (connected) {
      toast.warn('Datafeed.Area Closed', {
        autoClose: 2000,
        transition: Flip,
        closeButton: false,
      });
    }
    if (!currentTimeout) {
      this.setState({
        currentTimeout: setTimeout(() => {
          this.openWebSocket();
          this.setState({ currentTimeout: null });
        }, 500),
      });
    }
  };

  onError = () => {
    const { connected, currentTimeout } = this.state;
    this.setState({ connected: false });
    if (connected) {
      toast.error('Datafeed.Area Errored', {
        autoClose: 2000,
        transition: Flip,
        closeButton: false,
      });
    }
    if (!currentTimeout) {
      this.setState({
        currentTimeout: setTimeout(() => {
          this.openWebSocket();
          this.setState({ currentTimeout: null });
        }, 500),
      });
    }
  };

  onMessage = message => {
    const { feed } = this.props;
    const parsedMessage = JSON.parse(message.data);
    switch (parsedMessage.type) {
      case 'Area.TempUpdate':
        return feed({ type: Area.TempUpdate, message: parsedMessage });
      case 'Area.HumUpdate':
        return feed({ type: Area.HumUpdate, message: parsedMessage });
      case 'Area.TargetSet':
        return feed({ type: Area.TargetSet, message: parsedMessage });
      case 'Area.NodeAdd':
        return feed({ type: Area.NodeAdd, message: parsedMessage });
      case 'Area.NewRoutine':
        return feed({ type: Area.NewRoutine, message: parsedMessage });
      case 'Area.RemoveRoutine':
        return feed({ type: Area.RemoveRoutine, message: parsedMessage });
      case 'Area.RemoveNode':
        return feed({ type: Area.RemoveNode, message: parsedMessage });
      case 'Area.NodesSet':
        return feed({ type: Area.NodesSet, message: parsedMessage });
      case 'Area.SetHeatingEnabled':
        return feed({ type: Area.SetHeatingEnabled, message: parsedMessage });
      default:
        return toast.error(`Unknown Message Type "${parsedMessage.type}"`);
    }
  };

  render() {
    return null;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    feed: ({ type, message }) => {
      dispatch({ type, payload: message });
    },
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(AreaFeed);
