import React from 'react';
import { Card, CardContent, Tabs, Tab, Box } from '@mui/material';
import { FaBan, FaEye } from 'react-icons/fa';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { NavLink, useLocation } from 'react-router-dom';

const TopNav: React.FC = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <Card className="mx-3 mb-5 lg:mx-4">
            <CardContent className="p-2">
                <Box className="w-96 bg-gray-100 rounded-lg">
                    <Tabs
                        value={
                            currentPath === '/admin/instructors'
                                ? 0
                                : currentPath === '/admin/instructors/requests'
                                ? 1
                                : currentPath === '/admin/instructors/blocked'
                                ? 2
                                : false
                        }
                        centered
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        <Tab
                            icon={<FaEye className="-mt-1 mr-2 inline-block h-5 w-5" />}
                            component={NavLink}
                            to="/admin/instructors"
                            label="View"
                            wrapped
                        />
                        <Tab
                            icon={<UserPlusIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />}
                            component={NavLink}
                            to="/admin/instructors/requests"
                            label="Requests"
                            wrapped
                        />
                        <Tab
                            icon={<FaBan className="-mt-1 mr-2 inline-block h-5 w-5" />}
                            component={NavLink}
                            to="/admin/instructors/blocked"
                            label="Blocked"
                            wrapped
                        />
                    </Tabs>
                </Box>
            </CardContent>
        </Card>
    );
};

export default TopNav;
