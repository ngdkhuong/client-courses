import React, { useState, useEffect, useRef, Fragment } from 'react';
import useTimeAgo from '../../../hooks/useTimeAgo';
import { BiMessageRoundedDots } from 'react-icons/bi';
import { MdOutlineMoreVert } from 'react-icons/md';
import { Menu, MenuItem, Button, Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectStudentId } from '../../../redux/reducers/studentSlice';
import { ApiResponseDiscussion } from '../../../api/types/apiResponses/api-response-discussion';
import { RiEdit2Line, RiDeleteBinLine, RiFlagLine } from 'react-icons/ri';
import EditDiscussionModal from './edit-discussion-modal';
import { deleteDiscussions, getRepliesByDiscussion, replyDiscussions } from '../../../api/endpoints/course/discussion';
import { toast } from 'react-toastify';
import { SyncLoader, BeatLoader } from 'react-spinners';
import { IoSend } from 'react-icons/io5';
import { selectIsLoggedIn } from '../../../redux/reducers/authSlice';
import { ApiResponseDiscussionReply } from '../../../api/types/apiResponses/api-response-discussion';

const profilePic = 'https://res.cloudinary.com/dwucedjmy/image/upload/v1690203086/images_2_d4e6fp.jpg';

const MenuBar: React.FC<{
    commentId: string;
    message: string;
    updated: boolean;
    setUpdated: (updated: boolean) => void;
    isEditable: boolean;
}> = ({ commentId, message, updated, setUpdated, isEditable }) => {
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDiscussionDelete = async (discussionId: string) => {
        try {
            const response = await deleteDiscussions(discussionId);
            setUpdated(!updated);
            toast.success(response?.message, {
                position: 'bottom-right',
            });
            handleClose();
        } catch (error) {
            toast.error('Something went wrong please try again later', {
                position: 'bottom-right',
            });
        }
    };

    const handleMenuItemClick = (action: string) => {
        switch (action) {
            case 'Edit':
                setOpen(true);
                break;
            case 'Delete':
                handleDiscussionDelete(commentId);
                break;
            case 'Report':
                // alert("Report action triggered");
                break;
            default:
                break;
        }
        handleClose();
    };

    return (
        <div>
            <EditDiscussionModal
                setOpen={setOpen}
                updated={updated}
                setUpdated={setUpdated}
                commentId={commentId}
                message={message}
                open={open}
            />
            <Button
                onClick={handleClick}
                className="bg-transparent focus:outline-none shadow-none hover:bg-transparent hover:shadow-none"
            >
                <MdOutlineMoreVert className="text-customFontColorBlack text-lg mr-3" />
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                {isEditable ? (
                    <MenuItem onClick={() => handleMenuItemClick('Edit')} className="flex items-center">
                        <span className="flex-grow">Edit</span>
                        <RiEdit2Line className="text-blue-500 text-sm flex-shrink-0" />
                    </MenuItem>
                ) : null}
                {isEditable ? (
                    <MenuItem onClick={() => handleMenuItemClick('Delete')} className="flex items-center">
                        <span className="flex-grow">Delete</span>
                        <RiDeleteBinLine className="text-red-500 text-sm flex-shrink-0" />
                    </MenuItem>
                ) : (
                    <MenuItem onClick={() => handleMenuItemClick('Report')} className="flex items-center">
                        <span className="flex-grow">Report</span>
                        <RiFlagLine className="text-orange-500 text-sm flex-shrink-0" />
                    </MenuItem>
                )}
            </Menu>
        </div>
    );
};

interface Props extends ApiResponseDiscussion {
    updated: boolean;
    setUpdated: (updated: boolean) => void;
}

const DiscussionListEl: React.FC<Props> = ({
    _id,
    createdAt,
    replies,
    updatedAt,
    studentDetails,
    message,
    updated,
    setUpdated,
}) => {
    const calculateTimeAgo = useTimeAgo();
    const studentId = useSelector(selectStudentId);
    const commedUpdated = createdAt < updatedAt;
    const isEditable = studentId === studentDetails._id;
    const [showReplies, setShowReplies] = useState<boolean>(false);
    const [visibleCount, setVisibleCount] = useState(3);
    const [repliesLoading, setRepliesLoading] = useState(false);
    const [isInputEmpty, setIsInputEmpty] = useState(true);
    const [replyText, setReplyText] = useState<string>('');
    const replyRef = useRef<HTMLInputElement>(null);
    const [isReply, setIsReply] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const totalComments = replies?.length ?? 0;
    const shouldShowViewMore = visibleCount < totalComments;
    const shouldShowShowLess = visibleCount > 3;
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const [discussionReplies, setDiscussionReplies] = useState<ApiResponseDiscussionReply[] | null>(null);

    useEffect(() => {
        if (isReply && replyRef.current) {
            replyRef.current.focus();
            setIsReply(false);
        }
    }, [isReply]);

    const fetchReplies = async (discussionId: string) => {
        try {
            setRepliesLoading(true);
            const replies = await getRepliesByDiscussion(discussionId);
            setDiscussionReplies(replies?.data);
            setRepliesLoading(false);
        } catch (error) {
            setRepliesLoading(false);
            toast.error('Something went wrong please try again later', {
                position: 'bottom-right',
            });
        }
    };

    const handleViewMore = () => {
        setVisibleCount((prevCount) => prevCount + 3);
    };

    const handleShowLess = () => {
        setVisibleCount(3);
    };

    const handleReplyComment = () => {
        setIsReply(!isReply);
    };

    const handlePostReply = async () => {
        try {
            setIsLoading(true);
            const response = await replyDiscussions(_id, {
                studentId: studentDetails?._id,
                message: replyText,
            });
            setUpdated(!updated);
            toast.success(response?.message, {
                position: 'bottom-right',
            });
            setReplyText('');
            setIsInputEmpty(true);
            setIsReply(false);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            toast.error('Something went wrong', {
                position: 'bottom-right',
            });
        }
    };

    const handleShowReply = async () => {
        setShowReplies(!showReplies);
        !showReplies && fetchReplies(_id);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setReplyText(e.target.value);
        setIsInputEmpty(e.target.value === '');
    };

    return (
        <li className="border-b mt-3 border-gray-300 p-6">
            <div className="flex justify-between items-start">
                <div className="flex">
                    <img src={profilePic} className="h-12 w-12" alt="image" />
                    <div className="ml-2">
                        <h2 className="font-semibold text-customFontColorBlack">
                            {studentDetails?.firstName + ' ' + studentDetails?.lastName}
                            <span className="font-light ml-1 text-customFontColorBlack text-xs">
                                {commedUpdated ? '(edited)' : ''}
                            </span>
                        </h2>
                        <h2 className="font-light text-xs">
                            {commedUpdated ? calculateTimeAgo(updatedAt) : calculateTimeAgo(createdAt)}
                        </h2>
                        <br />
                    </div>
                </div>
                <MenuBar
                    updated={updated}
                    setUpdated={setUpdated}
                    commentId={_id}
                    message={message}
                    isEditable={isEditable}
                />
            </div>
            <h2 className="mt-1">{message}</h2>
            <div className="pt-2">
                {isLoggedIn && (
                    <button
                        onClick={handleReplyComment}
                        className="cursor-pointer text-blue-gray-400 font-semibold text-sm"
                    >
                        Reply
                    </button>
                )}
                {isReply && (
                    <div className="flex pt-2 flex-wrap">
                        <input
                            type="text"
                            value={replyText}
                            ref={replyRef}
                            onChange={handleInputChange}
                            className="border inline-block border-gray-400 w-1/2 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                            placeholder="Reply to the comment"
                        />
                        {isLoading ? (
                            <div className="flex p-3 justify-center items-center">
                                <BeatLoader className="mt-1" color="#808080" size={8} />
                            </div>
                        ) : (
                            <Tooltip title="Post message" placement="bottom">
                                <button
                                    onClick={handlePostReply}
                                    disabled={isInputEmpty}
                                    className={`bg-blue ${
                                        isInputEmpty ? 'text-gray-500' : 'hover:text-white bg-blue-500'
                                    } ml-2 font-bold py-2 px-4 rounded-md h-full`}
                                >
                                    <IoSend
                                        className={`h-full text-2xl ${
                                            isInputEmpty ? 'text-gray-500 ' : 'hover:text-white text-white'
                                        }`}
                                    />
                                </button>
                            </Tooltip>
                        )}
                    </div>
                )}

                <button
                    onClick={handleShowReply}
                    className="flex mt-4 items-center text-sm text-customFontColorBlack hover:text-blue-gray-400"
                >
                    <BiMessageRoundedDots className="text-xl" />
                    <span className="ml-1">{!showReplies ? `View ${replies.length} more replies` : 'Show less'}</span>
                </button>
            </div>
            <div>
                {repliesLoading ? (
                    <SyncLoader className="mt-1 p-2 ml-3" color="#808080" size={8} />
                ) : (
                    <Fragment>
                        {showReplies && (
                            <div>
                                <ul>
                                    {discussionReplies?.map((reply, index) => (
                                        <li
                                            className={`mt-3 border-gray-300 p-6 ${
                                                index !== replies.length - 1 ? 'border-b' : 'pb-0'
                                            }`}
                                            key={reply._id}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex">
                                                    <img className="w-12 h-12" src={profilePic} alt="image" />
                                                    <div className="ml-2">
                                                        <h2 className="font-semibold text-customFontColorBlack">
                                                            {reply.studentDetails.firstName +
                                                                ' ' +
                                                                reply.studentDetails.lastName}
                                                            <span className="font-light ml-1 text-customFontColorBlack text-xs">
                                                                {commedUpdated ? '(edited)' : ''}
                                                            </span>
                                                        </h2>
                                                        <h2 className="font-light text-xs">
                                                            {commedUpdated
                                                                ? calculateTimeAgo(reply.updatedAt)
                                                                : calculateTimeAgo(reply.createdAt)}
                                                        </h2>
                                                        <br />
                                                    </div>
                                                </div>
                                            </div>
                                            <h2 className="mt-1">{reply.message}</h2>
                                        </li>
                                    ))}
                                </ul>
                                {shouldShowViewMore && (
                                    <button
                                        className="text-customFontColorBlack ml-4 mt-1 underline"
                                        onClick={handleViewMore}
                                    >
                                        View More
                                    </button>
                                )}
                                {shouldShowShowLess && (
                                    <button
                                        className="text-customFontColorBlack ml-4 mt-1 underline"
                                        onClick={handleShowLess}
                                    >
                                        Show less
                                    </button>
                                )}
                            </div>
                        )}
                    </Fragment>
                )}
            </div>
        </li>
    );
};

export default DiscussionListEl;
