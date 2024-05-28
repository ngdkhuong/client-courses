import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material';
import { Square3Stack3DIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import BlockedStudents from './blocked-students';
import ViewStudents from './view-students';

interface TabData {
    label: string;
    value: string;
    icon: React.ElementType;
}

const StudentsTab = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [updated, setUpdated] = useState(false);

    const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
        setActiveTab(newValue);
    };

    const data: TabData[] = [
        {
            label: 'All students',
            value: 'all',
            icon: Square3Stack3DIcon,
        },
        {
            label: 'Blocked',
            value: 'blocked',
            icon: UserCircleIcon,
        },
    ];

    const tabComponents: { [key: string]: JSX.Element } = {
        all: <ViewStudents updated={updated} setUpdated={setUpdated} />,
        blocked: <BlockedStudents updated={updated} setUpdated={setUpdated} />,
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{ borderBottom: 1, borderColor: 'divider', padding: 0.5 }}
            >
                {data.map(({ label, value, icon: Icon }) => (
                    <Tab
                        key={value}
                        value={value}
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Icon style={{ width: 20, height: 20 }} />
                                <Typography variant="body2">{label}</Typography>
                            </Box>
                        }
                    />
                ))}
            </Tabs>
            <Box sx={{ padding: 3 }}>
                {data.map(({ value }) => (
                    <Box
                        key={value}
                        role="tabpanel"
                        hidden={activeTab !== value}
                        id={`tabpanel-${value}`}
                        aria-labelledby={`tab-${value}`}
                    >
                        {activeTab === value && <Box>{tabComponents[value]}</Box>}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default StudentsTab;
