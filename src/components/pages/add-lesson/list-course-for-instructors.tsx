import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, ChevronUpDownIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { PencilIcon, UserPlusIcon, TrashIcon, SquaresPlusIcon } from '@heroicons/react/24/solid';
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardContent,
    Chip,
    CardActions,
    Tabs,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
    Box,
    Grid,
} from '@mui/material';
import { getCourseByInstructor } from '../../../api/endpoints/course/course';
import { formatDate } from '../../../utils/helpers';
import { Link } from 'react-router-dom';
import usePagination from '../../../hooks/usePagination';
import useSearch from '../../../hooks/useSearch';

const TABS = [
    {
        label: 'All',
        value: 'all',
    },
    {
        label: 'Monitored',
        value: 'monitored',
    },
    {
        label: 'Pending',
        value: 'pending',
    },
];

const TABLE_HEAD = ['Course', 'Category', 'Status', 'Added', ''];

const ListCourseForInstructors: React.FC = () => {
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { currentPage, totalPages, currentData, goToPreviousPage, goToNextPage } = usePagination(courses, 4);
    const searchResult = useSearch(courses, searchQuery);

    const fetData = async () => {
        const response = await getCourseByInstructor();
        setCourses(response.data);
    };

    const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchQuery(e.currentTarget.value);
    };

    useEffect(() => {
        fetData();
    }, []);

    const displayData = searchQuery !== '' ? searchResult : currentData;

    return (
        <Card className="h-auto w-full mb-24">
            <CardHeader title="Course list" subheader="See information about all courses" />
            <CardContent>
                <Grid container spacing={2} justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h5" color="primary">
                            Course list
                        </Typography>
                        <Typography color="textSecondary">See information about all courses</Typography>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" color="primary" size="small" sx={{ marginRight: 1 }}>
                            View all
                        </Button>
                        <Button
                            component={Link}
                            to="/instructors/add-course"
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<UserPlusIcon />}
                        >
                            Add course
                        </Button>
                    </Grid>
                </Grid>
                <Box mt={4}>
                    <Tabs value="all">
                        {TABS.map(({ label, value }) => (
                            <Tab key={value} label={label} value={value} />
                        ))}
                    </Tabs>
                </Box>
                <Box mt={2} display="flex" justifyContent="flex-end">
                    <Input
                        placeholder="Search..."
                        value={searchQuery}
                        onInput={handleSearch}
                        startAdornment={<MagnifyingGlassIcon />}
                        fullWidth
                    />
                </Box>
            </CardContent>
            <CardContent>
                <Box overflow="auto">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head, index) => (
                                    <th key={head} className="border-y border-primary-100 bg-primary-50/50 p-4">
                                        <Typography
                                            variant="caption"
                                            className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                        >
                                            {head}
                                            {index !== TABLE_HEAD.length - 1 && (
                                                <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                                            )}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {displayData.length > 0 ? (
                                displayData.map(
                                    ({ _id, title, thumbnailUrl, category, createdAt, isVerified }, index) => {
                                        const isLast = index === currentData.length - 1;
                                        const classes = isLast ? 'p-4' : 'p-4 border-b border-primary-50';
                                        return (
                                            <tr key={_id}>
                                                <td className={classes}>
                                                    <Box display="flex" alignItems="center">
                                                        <Avatar
                                                            src={thumbnailUrl}
                                                            alt="image"
                                                            sx={{ width: 40, height: 40, marginRight: 2 }}
                                                        />
                                                        <Typography variant="body2" color="primary">
                                                            {title}
                                                        </Typography>
                                                    </Box>
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="body2" color="primary">
                                                        {category}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Chip
                                                        label={isVerified ? 'active' : 'pending'}
                                                        color={isVerified ? 'success' : 'primary'}
                                                        size="small"
                                                    />
                                                </td>
                                                <td className={classes}>
                                                    <Typography variant="body2" color="primary">
                                                        {formatDate(createdAt)}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Tooltip title="Add lessons">
                                                        <IconButton
                                                            component={Link}
                                                            to={`/instructors/view-lessons/${_id}`}
                                                            color="primary"
                                                        >
                                                            <SquaresPlusIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Edit course">
                                                        <IconButton
                                                            component={Link}
                                                            to={`/instructors/edit-course/${_id}`}
                                                            color="primary"
                                                        >
                                                            <PencilIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete course">
                                                        <IconButton color="error">
                                                            <TrashIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        );
                                    },
                                )
                            ) : (
                                <tr>
                                    <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                                        <Box display="flex" justifyContent="center" alignItems="center">
                                            <ExclamationCircleIcon className="h-6 w-6 text-primary-400" />
                                            <Typography variant="body2" color="primary" ml={1}>
                                                No results found for your search query.
                                            </Typography>
                                        </Box>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Box>
            </CardContent>
            <CardActions className="flex items-center justify-between border-t border-primary-50 p-4">
                <Typography variant="body2" color="primary">
                    Page {currentPage} of {totalPages}
                </Typography>
                <Box display="flex" gap={2}>
                    <Button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        variant="outlined"
                        color="primary"
                        size="small"
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        variant="outlined"
                        color="primary"
                        size="small"
                    >
                        Next
                    </Button>
                </Box>
            </CardActions>
        </Card>
    );
};

export default ListCourseForInstructors;
