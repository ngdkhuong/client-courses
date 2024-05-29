import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the context and the type for its value
interface UserTypeContextValue {
    userType: 'student' | 'instructor';
    toggleUserType: () => void;
}

const UserTypeContext = createContext<UserTypeContextValue | undefined>(undefined);

export const useUserType = () => {
    const context = useContext(UserTypeContext);
    if (!context) {
        throw new Error('useUserType must be used within a UserTypeProvider');
    }
    return context;
};

export const UserTypeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userType, setUserType] = useState<'student' | 'instructor'>('student');

    const toggleUserType = () => {
        setUserType((prevType) => (prevType === 'student' ? 'instructor' : 'student'));
    };

    return <UserTypeContext.Provider value={{ userType, toggleUserType }}>{children}</UserTypeContext.Provider>;
};
