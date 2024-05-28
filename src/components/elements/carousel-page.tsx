import React from 'react';
import { Paper, Typography, Button } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { Link } from 'react-router-dom';

const ItemData = [
    {
        title: 'Welcome to TutorTrek',
        image: 'https://res.cloudinary.com/dwucedjmy/image/upload/v1687722374/Tutor-Trek/09206fc2-d0f1-41f6-b714-36242be94ee7_zhgvax.jpg',
        description: 'Enhance your knowledge and skills with our comprehensive courses taught by expert instructors.',
        linkCourse: 'Explore Courses',
        linkTag: 'About Us',
    },
    {
        title: 'Learn Anytime, Anywhere',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRlYWNoZXJ8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
        description:
            'Access our courses from the comfort of your own home and learn at your own pace. No restrictions or time limits.',
        linkCourse: 'Browse Courses',
        linkTag: 'FAQs',
    },
    {
        title: 'Expand Your Knowledge',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGxlYXJuaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
        description:
            'Discover new subjects and gain expertise in your area of interest. Our platform offers a wide range of courses to cater to your learning goals.',
        linkCourse: 'Start Learning',
        linkTag: 'Testimonials',
    },
];

export default function CarouselComponent() {
    return (
        <Carousel className="rounded-none h-[30rem]" autoPlay animation="slide">
            {ItemData.map((item, index) => (
                <Paper key={index} elevation={10}>
                    <div className="relative h-full w-full">
                        <img
                            src={item.image}
                            alt="Course"
                            className="h-full w-full object-cover"
                            style={{ height: '30rem', width: '100%' }}
                        />
                        <div className="absolute inset-0 grid h-full w-full items-center bg-black/50">
                            <div className="w-3/4 pl-12 md:w-2/4 md:pl-20 lg:pl-32">
                                <Typography
                                    variant="h3"
                                    color="white"
                                    className="mb-4 text-3xl md:text-4xl lg:text-5xl"
                                >
                                    {item.title}
                                </Typography>
                                <Typography color="white" className="mb-12 opacity-80">
                                    {item.description}
                                </Typography>
                                <div className="flex gap-2">
                                    <Link to="/courses">
                                        <Button size="large" className="text-white">
                                            {item.linkCourse}
                                        </Button>
                                    </Link>
                                    <Link to="/about">
                                        <Button size="large" className="text-white" variant="text">
                                            {item.linkTag}
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Paper>
            ))}
        </Carousel>
    );
}
