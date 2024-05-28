import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Carousel from '../../elements/carousel-page';
import TrendingCard from '../home/trending-card';
import RecommendedCard from '../home/recommended-card';
import {
    ApiResponseRecommended,
    ApiResponseTrending,
} from '../../../api/types/apiResponses/api-response-home-page-listing';
import { TrendingCardShimmer } from '../../shimmer/shimmer-trending-course';
import { selectIsLoggedIn } from '../../../redux/reducers/authSlice';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { getTrendingCourses, getRecommendedCourses } from '../../../api/endpoints/course/course';
import { Link } from 'react-router-dom';
import { selectUserType } from '../../../redux/reducers/authSlice';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const StudentHomePage: React.FC = () => {
    const [trendingCourses, setTrendingCourses] = useState<ApiResponseTrending[] | null>(null);
    const [recommendedCourses, setRecommendedCourses] = useState<ApiResponseRecommended[] | null>(null);
    const [isLoadingTrending, setIsLoadingTrending] = useState(false);
    const [isLoadingRecommended, setIsLoadingRecommended] = useState(false);
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const user = useSelector(selectUserType);

    const fetchTrendingCourses = async () => {
        try {
            setIsLoadingTrending(true);
            const response = await getTrendingCourses();
            setTrendingCourses(response.data);
            setTimeout(() => {
                setIsLoadingTrending(false);
            }, 1000);
        } catch (error) {
            setIsLoadingTrending(false);
        }
    };

    const fetchRecommendedCourses = async () => {
        try {
            setIsLoadingRecommended(true);
            const response = await getRecommendedCourses();
            setRecommendedCourses(response.data);
            setTimeout(() => {
                setIsLoadingRecommended(false);
            }, 1000);
        } catch (error) {
            setIsLoadingRecommended(false);
        }
    };

    useEffect(() => {
        fetchTrendingCourses();
        if (isLoggedIn && user === 'student') {
            fetchRecommendedCourses();
        }
    }, [isLoggedIn, user]);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    if (isLoadingTrending || isLoadingRecommended) {
        return (
            <div>
                <Carousel />
                <div className="lg:p-10 md:p-7 pt-7 sm:p-8 w-full">
                    <div className="ml-10 flex items-center justify-start w-9/12">
                        <Typography variant="h4" className="text-2xl p-2 ml-2 lg:text-4xl font-semibold">
                            Trending Courses
                        </Typography>
                    </div>
                    <div className="flex items-center justify-between px-10 flex-wrap">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <TrendingCardShimmer key={index} />
                        ))}
                    </div>
                </div>
                {isLoggedIn && (
                    <div className="lg:p-10 md:p-7 pt-5 sm:p-8 w-full">
                        {/* <div className="ml-10 flex items-center justify-start w-9/12">
                            <Typography variant="h4" className="text-2xl p-2 ml-2 lg:text-4xl font-semibold">
                                Recommended Courses
                            </Typography>
                        </div>
                        <div className="flex items-center justify-between pt-2 px-10 flex-wrap">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <TrendingCardShimmer key={index} />
                            ))}
                        </div> */}
                    </div>
                )}
            </div>
        );
    }

    return (
        <div>
            <div>
                <Carousel />
            </div>
            <div className="lg:p-10 md:p-7 pt-7 sm:p-8 w-full">
                <div className="ml-10 flex items-center justify-start w-9/12">
                    <Typography variant="h4" className="text-2xl p-2 ml-2 lg:text-4xl font-semibold">
                        Trending Courses
                    </Typography>
                </div>
                <Slider {...settings}>
                    {trendingCourses?.map((course) => (
                        <div
                            className="grid md:m-5 my-6 justify-center overflow-hidden text-center bg-red-200 rounded-lg"
                            key={course._id}
                        >
                            <Link to={`/courses/${course._id}`}>
                                <TrendingCard courseInfo={course} />
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>

            {isLoggedIn && recommendedCourses && (
                <div className="lg:p-10 md:p-7 pt-5 sm:p-8 w-full">
                    {/* <div className="ml-10 flex items-center justify-start w-9/12">
                        <Typography className="text-2xl p-2 ml-2 lg:text-4xl font-semibold">
                            Recommended Courses
                        </Typography>
                    </div>
                    <Slider {...settings}>
                        {recommendedCourses?.map((course) => (
                            <div key={course._id}>
                                <Link to={`/courses/${course._id}`} className="">
                                    <RecommendedCard courseInfo={course} />
                                </Link>
                            </div>
                        ))}
                    </Slider> */}
                </div>
            )}
        </div>
    );
};

export default StudentHomePage;
