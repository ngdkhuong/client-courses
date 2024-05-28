import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid';
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableFooter,
    IconButton,
    Paper,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { getAllCategories } from '../../../api/endpoints/category';
import { toast } from 'react-toastify';
import { formatDate } from '../../../utils/helpers';
import usePagination from '../../../hooks/usePagination';
import useSearch from '../../../hooks/useSearch';

const TABLE_HEAD = ['Name', 'Description', 'Date added', ''];

const ListCategories: React.FC = () => {
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { currentData, currentPage, goToNextPage, goToPreviousPage, totalPages } = usePagination(categories, 7);
    const searchResult = useSearch(categories, searchQuery);
    const fetchCategories = async () => {
        try {
            const response = await getAllCategories();
            setCategories(response.data);
        } catch (error) {
            toast.error('Something went wrong', {
                position: 'bottom-right',
            });
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchQuery(e.currentTarget.value);
    };

    const displayData = searchQuery !== '' ? searchResult : currentData;

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Categories
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all categories
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button variant="outlined" color="primary" size="small">
                            View All
                        </Button>
                        <Link to={`/admin/categories/add-category`}>
                            <Button className="flex items-center gap-3" size="small">
                                <PlusCircleIcon strokeWidth={2} className="h-5 w-5" />
                                Add Category
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                    <div className="w-full md:w-72">
                        <Input
                            fullWidth
                            placeholder="Search"
                            startAdornment={<MagnifyingGlassIcon />}
                            value={searchQuery}
                            onInput={handleSearch}
                        />
                    </div>
                </div>
            </CardHeader>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {TABLE_HEAD.map((head) => (
                                <TableCell key={head}>
                                    <Typography variant="body2" color="textPrimary">
                                        {head}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {displayData.map(({ title, description, createdAt, _id }) => (
                            <TableRow key={_id}>
                                <TableCell>{title}</TableCell>
                                <TableCell>{description}</TableCell>
                                <TableCell>{formatDate(createdAt)}</TableCell>
                                <TableCell>
                                    <Link to={`/admin/categories/edit-category/${_id}`}>
                                        <Button color="primary" size="small">
                                            Edit
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4} align="center">
                        <Typography variant="body2" color="textSecondary">
                            Page {currentPage} of {totalPages}
                        </Typography>
                    </TableCell>
                    <TableCell align="right" colSpan={2}>
                        <IconButton disabled={currentPage === 1} onClick={goToPreviousPage}>
                            Previous
                        </IconButton>
                        <IconButton disabled={currentPage === totalPages} onClick={goToNextPage}>
                            Next
                        </IconButton>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Card>
    );
};

export default ListCategories;
