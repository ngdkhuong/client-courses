import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
} from '@mui/material';
import { toast } from 'react-toastify';
import { formatDate } from '../../../utils/helpers';
import usePagination from '../../../hooks/usePagination';
import { getAllBlockedStudents, unblockStudents } from '../../../api/endpoints/student-management';
import { Students } from '../../../api/types/student/student';
import { USER_AVATAR } from '../../../constants/common';

const TABLE_HEAD = ['Name', 'Email', 'Date Joined', 'Status', 'Actions'];

interface Props {
    updated: boolean;
    setUpdated: (val: boolean) => void;
}

const BlockedStudents: React.FC<Props> = ({ updated, setUpdated }) => {
    const [students, setStudents] = useState<Students[]>([]);
    const ITEMS_PER_PAGE = 4;
    const { currentPage, totalPages, currentData, goToPage, goToPreviousPage, goToNextPage } = usePagination(
        students,
        ITEMS_PER_PAGE,
    );

    const fetchBlockedStudents = async () => {
        try {
            const response = await getAllBlockedStudents();
            setStudents(response?.data);
        } catch (error: any) {
            toast.error(error?.data?.message, {
                position: 'bottom-right',
            });
        }
    };

    useEffect(() => {
        fetchBlockedStudents();
    }, [updated]);

    const handleUnblock = async (studentId: string) => {
        try {
            const response = await unblockStudents(studentId);
            toast.success(response?.message, {
                position: 'bottom-right',
            });
            setUpdated(!updated);
        } catch (error: any) {
            toast.error(error?.message, {
                position: 'bottom-right',
            });
        }
    };

    return (
        <Card sx={{ height: '100%', width: '100%' }}>
            <CardHeader sx={{ paddingBottom: 0 }}>
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Typography variant="h5" color="primary">
                            Unblock students
                        </Typography>
                        <Typography color="textSecondary" className="mt-1 font-normal">
                            These are details about blocked students
                        </Typography>
                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                        <TextField
                            fullWidth
                            label="Search"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <MagnifyingGlassIcon className="h-5 w-5" />,
                            }}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent sx={{ paddingTop: 0 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {TABLE_HEAD.map((head) => (
                                    <TableCell key={head}>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {head}
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={TABLE_HEAD.length}>
                                        <Typography color="textSecondary" variant="h6" className="mt-1 p-2 font-normal">
                                            No blocked students found
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                currentData.map(
                                    (
                                        {
                                            _id,
                                            profilePic,
                                            profileUrl,
                                            fullName,
                                            email,
                                            dateJoined,
                                            isBlocked,
                                            isGoogleUser,
                                        },
                                        index,
                                    ) => {
                                        return (
                                            <TableRow key={_id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-3">
                                                        <Avatar
                                                            src={
                                                                isGoogleUser && profilePic && profilePic.url
                                                                    ? profilePic.url
                                                                    : profileUrl || USER_AVATAR
                                                            }
                                                            alt="image"
                                                            sx={{
                                                                border: 1,
                                                                borderColor: 'divider',
                                                                bgcolor: 'background.paper',
                                                                objectFit: 'contain',
                                                                p: 1,
                                                            }}
                                                        />
                                                        <Typography
                                                            variant="body2"
                                                            color="textPrimary"
                                                            fontWeight="bold"
                                                        >
                                                            {`${fullName}`}
                                                        </Typography>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" color="textPrimary">
                                                        {email}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Typography variant="body2" color="textPrimary">
                                                        {formatDate(dateJoined)}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell>
                                                    <Chip
                                                        size="small"
                                                        label={isBlocked ? 'Blocked' : 'Active'}
                                                        color={isBlocked ? 'error' : 'success'}
                                                        variant="outlined"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        onClick={() => handleUnblock(_id)}
                                                        variant="contained"
                                                        color="success"
                                                        size="small"
                                                    >
                                                        Unblock
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    },
                                )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-between', padding: 2 }}>
                <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <div>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                        <IconButton
                            key={pageNumber}
                            color={pageNumber === currentPage ? 'primary' : 'default'}
                            onClick={() => goToPage(pageNumber)}
                        >
                            {pageNumber}
                        </IconButton>
                    ))}
                </div>
                <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </CardActions>
        </Card>
    );
};

export default BlockedStudents;
