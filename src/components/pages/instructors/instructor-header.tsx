import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { CubeTransparentIcon, UserCircleIcon, CodeBracketSquareIcon, Bars2Icon } from '@heroicons/react/24/outline';
import { ProfileMenu } from './profile-menu-instructor';

// Nav list menu items
const navListMenuItems = [
    {
        title: '@material-tailwind/html',
        description: 'Learn how to use @material-tailwind/html, packed with rich components and widgets.',
    },
    {
        title: '@material-tailwind/react',
        description: 'Learn how to use @material-tailwind/react, packed with rich components for React.',
    },
    {
        title: 'Material Tailwind PRO',
        description: 'A complete set of UI Elements for building faster websites in less time.',
    },
];

function NavListMenu() {
    return (
        <Menu
            id="nav-list-menu"
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={true}
        >
            {navListMenuItems.map(({ title, description }) => (
                <MenuItem key={title}>
                    <Typography variant="h6" color="primary" mb={1}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {description}
                    </Typography>
                </MenuItem>
            ))}
        </Menu>
    );
}

// Nav list component
const navListItems = [
    {
        label: 'Account',
        icon: <UserCircleIcon />,
    },
    {
        label: 'Blocks',
        icon: <CubeTransparentIcon />,
    },
    {
        label: 'Docs',
        icon: <CodeBracketSquareIcon />,
    },
];

function NavList() {
    return (
        <>
            <NavListMenu />
            {navListItems.map(({ label, icon }) => (
                <IconButton key={label} color="inherit" aria-label={label}>
                    {icon}
                    <Typography variant="subtitle1">{label}</Typography>
                </IconButton>
            ))}
        </>
    );
}

export default function InstructorHeader() {
    const [isNavOpen, setIsNavOpen] = React.useState(false);
    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    React.useEffect(() => {
        window.addEventListener('resize', () => window.innerWidth >= 960 && setIsNavOpen(false));
    }, []);

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography component="a" href="#" variant="h6" sx={{ mr: 4, cursor: 'pointer' }}>
                    TutorTrek
                </Typography>
                <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                    <NavList />
                </div>
                <IconButton size="small" color="inherit" onClick={toggleIsNavOpen} sx={{ ml: 'auto', mr: 2 }}>
                    <Bars2Icon />
                </IconButton>
                <ProfileMenu />
            </Toolbar>
        </AppBar>
    );
}
