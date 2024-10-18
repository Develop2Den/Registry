

import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const EditCustomerDialog = ({ open, customer, onClose, onSave, onChange, text, addMode = false }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{addMode ? 'Add Customer' : 'Edit Customer'}</DialogTitle>
      <DialogTitle>{text}</DialogTitle>
      <DialogContent>
        <TextField
          label="Email"
          name="email"
          type="email"
          value={customer?.email || ''}
          onChange={onChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={customer?.password || ''}
          onChange={onChange}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={onSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditCustomerDialog;



