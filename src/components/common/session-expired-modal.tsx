import React, { Fragment } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Props {
    show: boolean;
    onClose: () => void;
}

const SessionExpired: React.FC<Props> = ({ show, onClose }) => {
    const navigate = useNavigate();

    const handleConfirm = () => {
        onClose();
        // Check if the user is logged in here (you can implement your own logic)
        navigate('/login');
    };

    return (
        <Fragment>
            <Dialog open={show} fullWidth maxWidth="sm" onClose={onClose}>
                <DialogTitle className="text-xl font-bold">Session Expired</DialogTitle>
                <DialogContent dividers>
                    <p className="text-gray-700">Your session has expired. To continue, please log in again.</p>
                </DialogContent>
                <DialogActions>
                    <Button variant="text" color="error" onClick={onClose} className="mr-1">
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleConfirm} className="text-white">
                        Log In
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default SessionExpired;
