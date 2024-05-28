import { toast } from 'react-toastify';
import usePagination from '../../../hooks/usePagination';
import { getAllInstructors, unblockInstructors } from '../../../api/endpoints/instructor-management';
import { useEffect, useState } from 'react';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Avatar,
    Chip,
    Tooltip,
    IconButton,
    Button,
    Typography,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import BlockReasonModal from './block-reason-modal';
import { MagnifyingGlassIcon, PencilIcon } from '@heroicons/react/24/outline';
import { formatDate } from '../../../utils/helpers';

const TABLE_HEAD = ['Name', 'Email', 'Date Joined', 'Status', 'Actions', ''];

const ViewInstructors: React.FC = () => {
    const [instructors, setInstructors] = useState([]);
    const [open, setOpen] = useState(false);
    const [updated, setUpdated] = useState(false);
    const [id, setId] = useState('');
    const ITEMS_PER_PAGE = 4;
    const { currentPage, totalPages, currentData, goToPage, goToPreviousPage, goToNextPage } = usePagination(
        instructors,
        ITEMS_PER_PAGE,
    );

    const fetchInstructors = async () => {
        try {
            const response = await getAllInstructors();
            setInstructors(response?.data?.data);
        } catch (error: any) {
            toast.error(error.data.message, {
                position: 'bottom-right',
            });
        }
    };

    useEffect(() => {
        fetchInstructors();
    }, [updated]);

    const handleUnblock = async (instructorId: string) => {
        try {
            const response = await unblockInstructors(instructorId);
            toast.success(response.data.message, {
                position: 'bottom-right',
            });
            setUpdated(!updated);
        } catch (error: any) {
            toast.error(error.data.message, {
                position: 'bottom-right',
            });
        }
    };

    return (
        <Card>
            {open && (
                <BlockReasonModal open={open} setOpen={setOpen} updated={updated} setUpdated={setUpdated} id={id} />
            )}
            <CardHeader title="Manage Instructors" subheader="These are details about the instructors" />
            <CardContent>
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Search"
                        InputProps={{
                            startAdornment: <MagnifyingGlassIcon className="h-5 w-5" />,
                        }}
                    />
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {TABLE_HEAD.map((head) => (
                                    <TableCell key={head}>
                                        <Typography variant="body2" color="textSecondary">
                                            {head}
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentData.map(
                                (
                                    { _id, firstName, lastName, email, dateJoined, isBlocked, isVerified, profileUrl },
                                    index,
                                ) => (
                                    <TableRow key={_id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar src={profileUrl} alt="Profile Image" />
                                                <Typography variant="body2">{`${firstName} ${lastName}`}</Typography>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">{email}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="body2">{formatDate(dateJoined)}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Chip
                                                label={
                                                    isBlocked ? 'Blocked' : isVerified === false ? 'Pending' : 'Active'
                                                }
                                                color={
                                                    isBlocked ? 'error' : isVerified === false ? 'warning' : 'success'
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color={isBlocked ? 'success' : 'error'}
                                                size="small"
                                                onClick={() => {
                                                    if (isBlocked) {
                                                        handleUnblock(_id);
                                                    } else {
                                                        setOpen(true);
                                                        setId(_id);
                                                    }
                                                }}
                                            >
                                                {isBlocked ? 'Unblock' : 'Block'}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip title="Edit User">
                                                <IconButton>
                                                    <PencilIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ),
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            <CardActions>
                <Button onClick={goToPreviousPage} disabled={currentPage === 1}>
                    Previous
                </Button>
                <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                        <Button
                            key={pageNumber}
                            onClick={() => goToPage(pageNumber)}
                            variant={pageNumber === currentPage ? 'contained' : 'outlined'}
                        >
                            {pageNumber}
                        </Button>
                    ))}
                </div>
                <Button onClick={goToNextPage} disabled={currentPage === totalPages}>
                    Next
                </Button>
            </CardActions>
        </Card>
    );
};

export default ViewInstructors;
