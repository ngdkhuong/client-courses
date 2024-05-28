import { MagnifyingGlassIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';
import {
    Card,
    CardHeader,
    InputAdornment,
    TextField,
    Typography,
    Button,
    CardContent,
    Chip,
    CardActions,
    Avatar,
    IconButton,
} from '@mui/material';
import { getMyStudents } from '../../../api/endpoints/instructor';
import { useState, useEffect } from 'react';
import usePagination from '../../../hooks/usePagination';
import { formatDate } from '../../../utils/helpers';
import { toast } from 'react-toastify';
import { Students } from '../../../api/types/student/student';

const TABLE_HEAD = ['Student', 'Course', 'Status', 'Joined'];

const MyStudents: React.FC = () => {
    const [students, setStudents] = useState<Students[]>([]);
    const ITEMS_PER_PAGE = 5;
    const { currentPage, totalPages, currentData, goToPage, goToNextPage, goToPreviousPage } = usePagination(
        students,
        ITEMS_PER_PAGE,
    );

    const fetchStudents = async () => {
        try {
            const response = await getMyStudents();
            setStudents(response.data);
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className="pb-10">
            <Card className="h-full w-full">
                <CardHeader
                    title={
                        <div>
                            <Typography variant="h5" color="text.primary">
                                Students list
                            </Typography>
                            <Typography color="text.secondary" className="mt-1 font-normal">
                                See information about all students
                            </Typography>
                        </div>
                    }
                    action={
                        <TextField
                            label="Search"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <MagnifyingGlassIcon className="h-5 w-5" />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            size="small"
                        />
                    }
                    className="rounded-none"
                />
                <CardContent className="overflow-scroll px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head, index) => (
                                    <th
                                        key={head}
                                        className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                                    >
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        >
                                            {head}{' '}
                                            {index !== TABLE_HEAD.length - 1 && (
                                                <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                            )}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentData?.map(
                                (
                                    {
                                        email,
                                        fullName,
                                        course,
                                        isBlocked,
                                        isGoogleUser,
                                        dateJoined,
                                        profileUrl,
                                        profilePic,
                                    },
                                    index,
                                ) => {
                                    const isLast = index === students.length - 1;
                                    const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

                                    return (
                                        <tr key={index}>
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <Avatar
                                                        src={isGoogleUser ? profilePic?.url : profileUrl}
                                                        alt="image"
                                                        sx={{ width: 40, height: 40 }}
                                                    />
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="body2"
                                                            color="text.primary"
                                                            className="font-normal"
                                                        >
                                                            {fullName}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                            className="font-normal opacity-70"
                                                        >
                                                            {email}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="body2"
                                                        color="text.primary"
                                                        className="font-normal"
                                                    >
                                                        {course}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="w-max">
                                                    <Chip
                                                        variant="outlined"
                                                        size="small"
                                                        label={!isBlocked ? 'active' : 'blocked'}
                                                        color={isBlocked ? 'error' : 'success'}
                                                    />
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="body2"
                                                    color="text.primary"
                                                    className="font-normal"
                                                >
                                                    {formatDate(dateJoined)}
                                                </Typography>
                                            </td>
                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </CardContent>
                <CardActions className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </Button>
                    <div className="flex items-center gap-2">
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
        </div>
    );
};

export default MyStudents;
