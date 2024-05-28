import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Shimmer = () => {
    return (
        <Card
            sx={{
                height: '24rem',
                width: '100%',
                maxWidth: '23rem',
                display: 'grid',
                alignItems: 'end',
                justifyContent: 'center',
                textAlign: 'center',
                position: 'relative',
                cursor: 'pointer',
                borderColor: 'gray.200',
                boxShadow: 1,
                overflow: 'hidden',
                animation: 'pulse 1.5s infinite',
            }}
        >
            <CardHeader
                sx={{
                    position: 'absolute',
                    pt: 14,
                    inset: 0,
                    m: 0,
                    width: '100%',
                    borderRadius: 0,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        backgroundColor: 'gray.300',
                        mb: 4,
                    }}
                ></Box>
                <Typography
                    variant="h5"
                    sx={{
                        mb: 2,
                        width: 36,
                        height: 6,
                        backgroundColor: 'gray.300',
                    }}
                >
                    {''}
                </Typography>
                <Typography
                    variant="h6"
                    sx={{
                        width: 64,
                        height: 4,
                        mb: 5,
                        backgroundColor: 'gray.300',
                    }}
                >
                    {''}
                </Typography>
            </CardHeader>
            <CardContent
                sx={{
                    position: 'relative',
                    px: 6,
                    md: { px: 12 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 'calc(100% - 16rem)',
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        mb: 6,
                        mt: 5,
                        fontWeight: 'medium',
                        lineHeight: 1.5,
                        width: 80,
                        height: 4,
                        backgroundColor: 'gray.300',
                    }}
                >
                    {''}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Shimmer;
