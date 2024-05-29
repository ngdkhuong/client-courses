// TODO define modal context to execute open, close modal dialog
import React, { ReactNode, createContext, useContext, useState } from 'react';

type ModalType = 'login' | 'register' | null;

interface ModalContextProps {
    openModal: (type: ModalType) => void;
    closeModal: () => void;
    modalType: ModalType;
    isOpen: boolean;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [modalType, setModalType] = useState<ModalType>(null);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = (type: ModalType) => {
        setModalType(type);
        setIsOpen(true);
    };

    const closeModal = () => {
        setModalType(null);
        setIsOpen(true);
    };

    return (
        <ModalContext.Provider value={{ openModal, closeModal, modalType, isOpen }}>
            {children}
            {/* Render modals conditionally based on modalType */}
        </ModalContext.Provider>
    );
};
