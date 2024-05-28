import React from 'react';
import { Card, CardHeader, CardContent, Typography, Avatar } from '@mui/material';
import { InstructorApiResponse } from '../../../api/types/apiResponses/api-response-instructors';

const InstructorCard: React.FC<InstructorApiResponse> = ({
    firstName,
    lastName,
    subjects,
    skills,
    profileUrl,
    about,
}) => {
    return (
        <Card
            sx={{
                width: 300,
                height: 400,
                boxShadow: 3,
                cursor: 'pointer',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
            }}
        >
            <CardHeader
                sx={{
                    p: 0,
                    position: 'relative',
                    height: 200,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <Avatar
                    sx={{
                        width: 100,
                        height: 100,
                        border: '2px solid white',
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                    alt={`${firstName} ${lastName}`}
                    src={
                        profileUrl ||
                        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
                    }
                />
            </CardHeader>
            <CardContent
                sx={{
                    p: 2,
                    mt: 4,
                    height: 'calc(100% - 200px)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h5" gutterBottom>
                    {`${firstName} ${lastName}`}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                    {about}
                </Typography>
                <Typography variant="body1" color="textPrimary">
                    {`${skills}, ${subjects}`}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default InstructorCard;
