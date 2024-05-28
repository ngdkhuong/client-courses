import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, PencilIcon, UserPlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import {
    Card,
    CardHeader,
    InputBase,
    Typography,
    Button,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Tooltip,
} from '@mui/material';
import { formatDate } from '../../../utils/helpers';
import { getLessonsByCourse } from '../../../api/endpoints/course/lesson';
import { useParams } from 'react-router-dom';
import { ApiResponseLessons } from '../../../api/types/apiResponses/api-response-instructors';
import AddLessonForm from './add-lessons-form';
import { Link } from 'react-router-dom';
import { LESSON_AVATAR } from '../../../constants/common';

const ViewLessons: React.FC = () => {
    const [lessons, setLessons] = useState<ApiResponseLessons[] | null>(null);
    const [formVisible, setFormVisible] = useState<boolean>(false);
    const { courseId } = useParams<{ courseId: string | undefined }>();

    const fetchData = async (courseId: string) => {
        const response = await getLessonsByCourse(courseId);
        setLessons(response.data);
    };

    useEffect(() => {
        if (courseId) fetchData(courseId);
    }, [courseId]);

    return (
        <Card className="h-auto w-full mb-24">
            <CardHeader
                title={
                    <div>
                        <Typography variant="h5" color="textPrimary">
                            Course name
                        </Typography>
                        <Typography color="textSecondary" className="mt-1 font-normal">
                            about the course
                        </Typography>
                    </div>
                }
                action={
                    <div className="flex gap-2">
                        <Button variant="outlined" color="primary" size="small">
                            View All
                        </Button>
                        <Button
                            onClick={() => setFormVisible(!formVisible)}
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={!formVisible ? <UserPlusIcon /> : null}
                        >
                            {formVisible ? 'View Lessons' : 'Add Lessons'}
                        </Button>
                    </div>
                }
                className="rounded-none mb-8"
            />
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row px-4">
                <InputBase
                    placeholder="Search"
                    startAdornment={<MagnifyingGlassIcon className="h-5 w-5" />}
                    className="w-full md:w-72"
                />
            </div>
            {formVisible ? (
                <AddLessonForm />
            ) : (
                <>
                    <CardContent className="overflow-scroll px-0">
                        <ul className="mt-4 w-full min-w-max text-left">
                            {lessons?.map(({ _id, title, thumbnail, description, createdAt }, index) => {
                                const isLast = index === lessons.length - 1;
                                const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';
                                if (index <= 4) {
                                    return (
                                        <li key={_id} className={`flex ${classes}`}>
                                            <Avatar src={thumbnail ?? LESSON_AVATAR} alt="image" />
                                            <div className="flex flex-col flex-grow ml-3 mr-8">
                                                <Typography variant="body2" color="textPrimary">
                                                    {title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                    className="opacity-70"
                                                >
                                                    {description}
                                                </Typography>
                                            </div>
                                            <div className="flex items-center mr-8">
                                                <Typography variant="body2" color="textSecondary">
                                                    {formatDate(createdAt)}
                                                </Typography>
                                            </div>
                                            <div className="flex items-center mr-6 gap-2">
                                                <Tooltip title="Edit lesson">
                                                    <Link
                                                        to={`/instructors/view-lessons/${courseId}/edit-lesson/${_id}`}
                                                    >
                                                        <IconButton color="primary" size="small">
                                                            <PencilIcon />
                                                        </IconButton>
                                                    </Link>
                                                </Tooltip>
                                                <Tooltip title="Disable lesson">
                                                    <IconButton color="secondary" size="small">
                                                        <TrashIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </li>
                                    );
                                }
                                return null;
                            })}
                        </ul>
                    </CardContent>
                    <CardActions className="flex items-center justify-between border-t border-gray-200 p-4">
                        <Typography variant="body2" color="textSecondary">
                            Page 1 of 10
                        </Typography>
                        <div className="flex gap-2">
                            <Button variant="outlined" color="primary" size="small">
                                Previous
                            </Button>
                            <Button variant="outlined" color="primary" size="small">
                                Next
                            </Button>
                        </div>
                    </CardActions>
                </>
            )}
        </Card>
    );
};

export default ViewLessons;
