import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

const ConfirmDeleteDialog = ({open,handleClose,deleteHandler}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Are you sure you wnat to delete this group?
            </DialogContentText>
            <DialogActions>
            <Button>No</Button>
            <Button color="error">Yes</Button>
            </DialogActions>
        </DialogContent>
    </Dialog>
  )
}

export default ConfirmDeleteDialog