import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@material-ui/core';

const ConfirmationDialog = ({ title, text, open, onAccept, onReject }) => (
  <Dialog open={open}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      {text ? <DialogContentText>{text}</DialogContentText> : null}
      <DialogActions>
        <Button
          onClick={onReject}
          size="large"
          color="primary"
          variant="contained"
        >
          No
        </Button>
        <Button
          onClick={onAccept}
          size="large"
          color="secondary"
          variant="contained"
        >
          Yes
        </Button>
      </DialogActions>
    </DialogContent>
  </Dialog>
);

export default ConfirmationDialog;
