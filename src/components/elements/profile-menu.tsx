import React, { useState } from 'react';
import { Typography, Button, Menu, MenuItem, Avatar } from '@mui/material'; // Import MUI components
import {
    UserCircleIcon,
    InboxArrowDownIcon,
    Cog6ToothIcon,
    LifebuoyIcon,
    PowerIcon,
} from '@heroicons/react/24/outline';
import { clearToken } from '../../redux/reducers/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { USER_AVATAR } from '../../constants/common';
import { selectStudent } from '../../redux/reducers/studentSlice';
import LogoutConfirmationModal from './student-logout-modal';

const profileMenuItems = [
    {
        label: 'My Profile',
        icon: <UserCircleIcon />,
    },
    {
        label: 'Inbox',
        icon: <InboxArrowDownIcon />,
    },
    {
        label: 'Settings',
        icon: <Cog6ToothIcon />,
    },
    {
        label: 'Help',
        icon: <LifebuoyIcon />,
    },
    {
        label: 'Sign Out',
        icon: <PowerIcon />,
    },
];

export default function ProfileMenu() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const student = useSelector(selectStudent);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [logoutConfirmationOpen, setLogoutConfirmationOpen] = useState(false);

    const username = student.studentDetails?.firstName + ' ' + student.studentDetails?.lastName;

    const handleAction = (action: any) => {
        switch (action) {
            case 'My Profile':
                navigate('/dashboard/my-profile');
                break;
            case 'Settings':
                navigate('#');
                break;
            case 'Inbox':
                navigate('#');
                break;
            case 'Help':
                navigate('#');
                break;
            case 'Sign Out':
                setLogoutConfirmationOpen(true);
                break;
            default:
                break;
        }
    };

    const handleLogout = () => {
        setTimeout(() => {
            dispatch(clearToken());
            navigate('/');
        }, 2000);
    };

    return (
        <>
            <Menu
                open={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem>
                    <Avatar
                        variant="circular"
                        alt="candice wu"
                        src={student.studentDetails?.profilePic?.url || USER_AVATAR}
                    />
                    <Typography variant="body2" color="textPrimary">
                        {username || 'Guest'}
                    </Typography>
                </MenuItem>
                {profileMenuItems.map(({ label, icon }, key) => (
                    <MenuItem key={key} onClick={() => handleAction(label)}>
                        {icon}
                        <Typography variant="body2" color="textPrimary">
                            {label}
                        </Typography>
                    </MenuItem>
                ))}
            </Menu>
            <LogoutConfirmationModal
                open={logoutConfirmationOpen}
                setOpen={setLogoutConfirmationOpen}
                onConfirmLogout={handleLogout}
            />
        </>
    );
}
