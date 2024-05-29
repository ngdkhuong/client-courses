import { useUserType } from '../../context/switch-context';
import React from 'react';

const SwitchUserButton: React.FC = () => {
    const { userType, toggleUserType } = useUserType();

    return (
        <button onClick={toggleUserType} className="w-full bg-gray-800 p-2 rounded text-white">
            {userType === 'student' ? 'Instructor' : 'Student'}
        </button>
    );
};

export default SwitchUserButton;
