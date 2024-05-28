import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { editDiscussions } from '../../../api/endpoints/course/discussion';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    TextField,
    Box,
    Typography,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    updated: boolean;
    setUpdated: (updated: boolean) => void;
    commentId: string;
    message: string;
}

const EditDiscussionModal: React.FC<Props> = ({ open, setOpen, updated, setUpdated, commentId, message }) => {
    const [comment, setComment] = useState<string>(message);

    const handleEdit = async () => {
        try {
            const response = await editDiscussions(commentId, comment);
            setOpen(!open);
            setUpdated(!updated);
            toast.success(response.message, {
                position: 'bottom-right',
            });
        } catch (error) {
            setComment(message);
            setOpen(!open);
            toast.error('Something went wrong please try again later', {
                position: 'bottom-right',
            });
        }
    };

    const handleOpen = () => setOpen(!open);

    return (
        <Dialog open={open} onClose={handleOpen}>
            <DialogTitle>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography variant="h6">Edit comment</Typography>
                    <IconButton edge="end" color="inherit" onClick={handleOpen} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent dividers>
                <TextField
                    label="Message"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                />
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="error" onClick={handleOpen}>
                    Close
                </Button>
                <Button variant="contained" color="primary" onClick={handleEdit}>
                    Edit
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditDiscussionModal;
