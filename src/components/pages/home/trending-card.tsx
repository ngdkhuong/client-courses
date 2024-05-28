import { Card, CardHeader, CardContent, Typography, Avatar } from '@mui/material';
import { ApiResponseTrending } from '../../../api/types/apiResponses/api-response-home-page-listing';

interface Props {
    courseInfo: ApiResponseTrending;
}

const TrendingCard: React.FC<Props> = ({ courseInfo }) => {
    const imageUrl = courseInfo?.thumbnailUrl;
    const profileUrl = courseInfo.profileUrl;

    const initials = courseInfo.instructorName ? courseInfo.instructorName.charAt(0).toUpperCase() : '';

    return (
        <div>
            <Card
                sx={{ maxWidth: 345 }}
                className="relative  grid h-[30rem] sm:h-[28rem] sm:w-[22rem] w-[24rem]   items-end justify-center overflow-hidden text-center"
            >
                <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    style={{ backgroundImage: `url(${imageUrl})` }}
                    className="absolute inset-0 m-0 h-full w-full rounded-none  bg-cover bg-center"
                >
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
                </CardHeader>
                <CardContent className="relative py-14 px-6 md:px-12">
                    <Typography variant="h3" color="white" className="mb-6 text-3xl font-medium leading-[1.5]">
                        {courseInfo?.title}
                    </Typography>
                    <Typography variant="h5" className="mb-4 text-gray-400">
                        {courseInfo.instructorName}
                    </Typography>
                    <Avatar
                        sx={{ bgcolor: 'random' }}
                        alt="Khuong Nguyen"
                        className="border-2 border-white"
                        src={profileUrl}
                    >
                        {initials}
                    </Avatar>
                </CardContent>
            </Card>
        </div>
    );
};

export default TrendingCard;
