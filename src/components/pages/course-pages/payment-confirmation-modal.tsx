import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Box } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { formatToINR, formatTime } from '../../../utils/helpers';
import { enrollStudent } from '../../../api/endpoints/course/course';
import { toast } from 'react-toastify';
import { FaSpinner } from 'react-icons/fa';

interface PaymentModalProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setUpdated: () => void;
    courseDetails: {
        price: number;
        overview: string;
        isPaid: boolean;
    };
}

const PaymentConfirmationModal: React.FC<PaymentModalProps> = ({ open, setOpen, setUpdated, courseDetails }) => {
    const handleOpen = () => setOpen((cur) => !cur);
    const { courseId } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const handleClose = () => setOpen(false);
    const offerExpiration = '2024-08-13T22:59:59.000Z';

    const [timeLeft, setTimeLeft] = useState<number>(0);

    const handleConfirmPayment = async () => {
        try {
            setIsLoading(true);
            const response = await enrollStudent(courseId ?? '');
            setTimeout(() => {
                setUpdated();
                setIsLoading(false);
                setOpen(false);
                toast.success(response?.message, {
                    position: 'bottom-right',
                });
            }, 3000);
        } catch (error) {
            setIsLoading(false);
            toast.error('Something went wrong', {
                position: 'bottom-right',
            });
        }
    };

    const handleCourseEnroll = () => {
        if (courseDetails.isPaid) {
            navigate(`/courses/${courseId}/payment`);
        } else {
            handleConfirmPayment();
        }
    };

    const isFreeCourse = courseDetails?.isPaid === false;

    useEffect(() => {
        if (!isFreeCourse) {
            const offerEndTime = new Date(offerExpiration).getTime();
            const currentTime = new Date().getTime();

            const timeRemaining = offerEndTime - currentTime;
            setTimeLeft(timeRemaining);

            const timer = setInterval(() => {
                setTimeLeft((prevTime) => (prevTime > 1000 ? prevTime - 1000 : 0));
            }, 1000);

            return () => {
                clearInterval(timer);
            };
        }
    }, [isFreeCourse, offerExpiration]);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                <Box display="flex" alignItems="center">
                    <ExclamationCircleIcon fontSize="large" style={{ color: 'yellow' }} />
                    <Typography variant="h5" style={{ marginLeft: '8px' }}>
                        {isFreeCourse ? 'Explore Your Free Learning Adventure' : 'Payment Confirmation'}
                    </Typography>
                </Box>
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                    Please review the details before proceeding:
                </Typography>
                <Typography variant="body2" style={{ marginTop: '16px', marginBottom: '8px' }}>
                    {isFreeCourse ? (
                        <span style={{ fontWeight: 'bold', color: 'green' }}>This course is free!</span>
                    ) : (
                        <Box style={{ backgroundColor: '#f0f0f0', padding: '16px', borderRadius: '8px' }}>
                            <Typography variant="h6" style={{ marginBottom: '8px' }}>
                                🎉 Limited Time Offer 🎉
                            </Typography>
                            <Typography variant="h5" style={{ fontWeight: 'bold', color: 'green' }}>
                                Price: {formatToINR(courseDetails?.price)}{' '}
                                <span style={{ textDecoration: 'line-through', color: 'gray' }}>
                                    {formatToINR(courseDetails?.price + 100)}
                                </span>
                            </Typography>
                            <Typography variant="body2" style={{ fontWeight: 'bold', color: 'gray' }}>
                                Offer Expires in: {formatTime(timeLeft)}
                            </Typography>
                        </Box>
                    )}
                </Typography>
                <Typography variant="body2">
                    <span style={{ fontWeight: 'bold' }}>Course Overview:</span>
                    <br />
                    {courseDetails?.overview}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleCourseEnroll} fullWidth disabled={isLoading}>
                    {isLoading ? (
                        <Box display="flex" alignItems="center" justifyContent="center" width="100%">
                            <span>Processing...</span>
                            <FaSpinner className="animate-spin ml-2" size={20} />
                        </Box>
                    ) : (
                        <span>{isFreeCourse ? 'Start Course' : 'Confirm Payment'}</span>
                    )}
                </Button>
                <Button variant="outlined" color="primary" onClick={handleClose} fullWidth>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PaymentConfirmationModal;
