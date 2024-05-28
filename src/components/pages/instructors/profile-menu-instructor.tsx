import React, { useState } from 'react';
import { Menu, MenuItem, Avatar, Typography, IconButton } from '@mui/material';
import {
    ChevronDownIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,
    UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useSelector, useDispatch } from 'react-redux';
import { selectInstructor } from '../../../redux/reducers/instructorSlice';
import { clearToken } from '../../../redux/reducers/authSlice';
import { clearDetails } from '../../../redux/reducers/instructorSlice';
import { USER_AVATAR } from '../../../constants/common';
import { useNavigate } from 'react-router-dom';

const profileMenuItems = [
    {
        label: 'My Profile',
        icon: UserCircleIcon,
    },
    {
        label: 'Inbox',
        icon: InboxArrowDownIcon,
    },
    {
        label: 'Help',
        icon: LifebuoyIcon,
    },
    {
        label: 'Sign Out',
        icon: PowerIcon,
    },
];

export function ProfileMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const instructor = useSelector(selectInstructor);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleAction = (action: string) => {
        handleMenuClose();
        switch (action) {
            case 'My Profile':
                navigate('/instructors/view-profile');
                break;
            case 'Settings':
                break;
            case 'Inbox':
                break;
            case 'Help':
                break;
            case 'Sign Out':
                dispatch(clearToken());
                dispatch(clearDetails());
                navigate('/instructors/login');
                break;
            default:
                break;
        }
    };

    return (
        <>
            <IconButton
                onClick={handleMenuOpen}
                color="inherit"
                className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
            >
                <Avatar
                    variant="circular"
                    alt="candice wu"
                    className="border border-blue-500 p-0.5"
                    src={instructor.instructorDetails?.profileUrl || USER_AVATAR}
                />
                <ChevronDownIcon className={`h-3 w-3 transition-transform ${anchorEl ? 'rotate-180' : ''}`} />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                {profileMenuItems.map(({ label, icon: Icon }, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <MenuItem
                            key={label}
                            onClick={() => handleAction(label)}
                            className={isLastItem ? 'text-red-500' : ''}
                        >
                            <Icon className={`h-4 w-4 ${isLastItem ? 'text-red-500' : ''}`} />
                            <Typography variant="inherit" className={`ml-2 ${isLastItem ? 'text-red-500' : ''}`}>
                                {label}
                            </Typography>
                        </MenuItem>
                    );
                })}
            </Menu>
        </>
    );
}
