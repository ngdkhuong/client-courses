import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Dispatch, SetStateAction } from 'react';
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardContent,
    Chip,
    Avatar,
    IconButton,
    InputBase,
    Box,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
} from '@mui/material';
import { getAllStudents, unblockStudents } from '../../../api/endpoints/student-management';
import { toast } from 'react-toastify';
import { formatDate } from '../../../utils/helpers';
import usePagination from '../../../hooks/usePagination';
import BlockStudentModal from './block-student-modal';
import { Students } from '../../../api/types/student/student';
import { USER_AVATAR } from '../../../constants/common';

const TABLE_HEAD = ['Name', 'Email', 'Date Joined', 'Status', 'Actions'];

interface Props {
    updated: boolean;
    setUpdated: Dispatch<SetStateAction<boolean>>;
}

const ViewStudents: React.FC<Props> = ({ updated, setUpdated }) => {
    const [students, setStudents] = useState<Students[]>([]);
    const [open, setOpen] = useState(false);
    const [id, setId] = useState('');
    const ITEMS_PER_PAGE = 4;
    const { currentPage, totalPages, currentData, goToPage, goToPreviousPage, goToNextPage } = usePagination(
        students,
        ITEMS_PER_PAGE,
    );

    const fetchStudents = async () => {
        try {
            const response = await getAllStudents();
            setStudents(response?.data);
        } catch (error: any) {
            toast.error(error.data.message, {
                position: 'bottom-right',
            });
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [updated]);

    const handleUnblock = async (studentId: string) => {
        try {
            const response = await unblockStudents(studentId);
            toast.success(response?.data?.message, {
                position: 'bottom-right',
            });
            setUpdated(!updated);
        } catch (error: any) {
            toast.error(error?.data?.message, {
                position: 'bottom-right',
            });
        }
    };

    return (
        <Card sx={{ height: '100%', width: '100%' }}>
            {open && (
                <BlockStudentModal open={open} setOpen={setOpen} updated={updated} setUpdated={setUpdated} id={id} />
            )}
            <CardHeader sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
                <Box
                    sx={{
                        mb: 4,
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        gap: 2,
                    }}
                >
                    <Box>
                        <Typography variant="h5" color="text.primary">
                            Manage Students
                        </Typography>
                        <Typography color="text.secondary" sx={{ mt: 1 }}>
                            These are details about the students
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2, width: { xs: '100%', md: 'auto' } }}>
                        <InputBase
                            placeholder="Search"
                            startAdornment={<MagnifyingGlassIcon style={{ width: 20, height: 20, marginRight: 8 }} />}
                            sx={{
                                width: '100%',
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1,
                                px: 2,
                                py: 1,
                            }}
                        />
                    </Box>
                </Box>
            </CardHeader>
            <CardContent sx={{ overflow: 'auto', p: 0 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {TABLE_HEAD.map((head) => (
                                    <TableCell
                                        key={head}
                                        sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 2 }}
                                    >
                                        <Typography variant="subtitle2" color="text.secondary">
                                            {head}
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentData?.map(
                                (
                                    {
                                        _id,
                                        fullName,
                                        profileUrl,
                                        profilePic,
                                        isGoogleUser,
                                        email,
                                        dateJoined,
                                        isBlocked,
                                    },
                                    index,
                                ) => (
                                    <TableRow key={_id}>
                                        <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 2 }}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                <Avatar
                                                    src={
                                                        isGoogleUser && profilePic && profilePic.url
                                                            ? profilePic.url
                                                            : profileUrl || USER_AVATAR
                                                    }
                                                    alt="image"
                                                    sx={{
                                                        width: 40,
                                                        height: 40,
                                                        border: '1px solid',
                                                        borderColor: 'divider',
                                                    }}
                                                />
                                                <Typography variant="body2" fontWeight="bold">
                                                    {`${fullName}`}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 2 }}>
                                            <Typography variant="body2" color="text.primary">
                                                {email}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 2 }}>
                                            <Typography variant="body2" color="text.primary">
                                                {formatDate(dateJoined)}
                                            </Typography>
                                        </TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 2 }}>
                                            <Chip
                                                size="small"
                                                label={isBlocked ? 'Blocked' : 'Active'}
                                                color={isBlocked ? 'error' : 'success'}
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell sx={{ borderBottom: '1px solid', borderColor: 'divider', py: 2 }}>
                                            {isBlocked ? (
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    size="small"
                                                    onClick={() => handleUnblock(_id)}
                                                >
                                                    Unblock
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    size="small"
                                                    onClick={() => {
                                                        setOpen(true);
                                                        setId(_id);
                                                    }}
                                                >
                                                    Block
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ),
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardContent>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    p: 2,
                }}
            >
                <Button variant="outlined" size="small" onClick={goToPreviousPage} disabled={currentPage === 1}>
                    Previous
                </Button>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                        <IconButton
                            key={pageNumber}
                            onClick={() => goToPage(pageNumber)}
                            sx={{ border: pageNumber === currentPage ? '1px solid' : 'none', borderColor: 'divider' }}
                        >
                            {pageNumber}
                        </IconButton>
                    ))}
                </Box>
                <Button variant="outlined" size="small" onClick={goToNextPage} disabled={currentPage === totalPages}>
                    Next
                </Button>
            </Box>
        </Card>
    );
};

export default ViewStudents;
