import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/Inbox';
import { connect } from 'react-redux';
// import HomeIcon from '@material-ui/icons/HomeIcon';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Badge } from '@material-ui/core';
import { homepage } from '../../../../package.json';

const Drawer = ({ onClose, onOpen, open, uninitializedNodes }) => {
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  return (
    <SwipeableDrawer
      onClose={onClose}
      onOpen={onOpen}
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      open={open}
    >
      <List style={{ minWidth: 300 }}>
        <Link className="sidebar-links" to="/" as={ListItem}>
          <ListItem button>
            <ListItemIcon>{/* <HomeIcon /> */}</ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </Link>
        <Divider />
        <Link
          className="sidebar-links"
          to={`${homepage}/areas`}
          onClick={onClose}
          as={ListItem}
        >
          <ListItem button>
            <ListItemIcon>{/* <MailIcon /> */}</ListItemIcon>
            <ListItemText primary="Areas" />
          </ListItem>
        </Link>
        <Link
          className="sidebar-links"
          to={`${homepage}/nodes`}
          onClick={onClose}
          as={ListItem}
        >
          <ListItem button>
            <ListItemIcon>{/* <MailIcon /> */}</ListItemIcon>
            <ListItemText primary="Nodes" />
          </ListItem>
        </Link>
        <Link
          className="sidebar-links"
          to={`${homepage}/routines`}
          onClick={onClose}
          as={ListItem}
        >
          <ListItem button>
            <ListItemIcon>{/* <MailIcon /> */}</ListItemIcon>
            <ListItemText primary="Routines" />
          </ListItem>
        </Link>
        <Link
          className="sidebar-links"
          to={`${homepage}/setup`}
          onClick={onClose}
          as={ListItem}
        >
          {uninitializedNodes ? (
            <ListItem button>
              <Badge
                variant="standard"
                badgeContent={uninitializedNodes}
                color="secondary"
              >
                <ListItemIcon>{/* MailIcon */}</ListItemIcon>
                <ListItemText style={{ paddingRight: 10 }}>Setup</ListItemText>
              </Badge>
            </ListItem>
          ) : (
            <ListItem button>
              <>
                <ListItemIcon>{/* <MailIcon /> */}</ListItemIcon>
                <ListItemText primary="Setup" />
              </>
            </ListItem>
          )}
        </Link>
      </List>

      <List>
        <ListItem button>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="" />
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
};

Drawer.propTypes = {
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
  return {
    uninitializedNodes: state.nodes.discovery.uninitializedNodes.length,
  };
};

const ConnectedDrawer = connect(
  mapStateToProps,
  null,
)(Drawer);

const Navigation = () => {
  const [state, setState] = React.useState({ open: false });

  const toggleDrawer = open => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ open });
  };
  return (
    <>
      <ConnectedDrawer
        open={state.open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={toggleDrawer(true)}
            edge="start"
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">163 Roberts Wharf</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navigation;
