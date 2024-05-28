import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

interface Props {
    confirm: boolean;
    setConfirm: (value: boolean) => void;
}

const LoginConfirmation: React.FC<Props> = ({ confirm, setConfirm }) => {
    const navigate = useNavigate();

    const handleOpen = () => setConfirm(false);

    const handleConfirm = () => {
        setConfirm(false);
        // * Check if the user is logged in here (you can implement your own logic)
        navigate('/login');
    };

    return (
        <Fragment>
            <Dialog open={confirm} maxWidth={'sm'} onClose={handleOpen}>
                <DialogTitle>Login Confirmation</DialogTitle>
                <DialogContent>
                    To purchase this course, you need to be logged in. Please log in to continue.
                </DialogContent>
                <DialogActions>
                    <Button variant="text" color="error" onClick={handleOpen} className="mr-1">
                        <span>Cancel</span>
                    </Button>
                    <Button variant="contained" onClick={handleConfirm}>
                        <span>Proceed to Login</span>
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default LoginConfirmation;
