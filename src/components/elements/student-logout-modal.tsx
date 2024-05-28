import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface ModalProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    onConfirmLogout: () => void;
}

const LogoutConfirmationModal: React.FC<ModalProps> = ({ open, setOpen, onConfirmLogout }) => {
    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Confirm Logout</DialogTitle>
            <DialogContent>
                <DialogContentText>Are you sure you want to log out?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirmLogout} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default LogoutConfirmationModal;
