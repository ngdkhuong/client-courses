import { useEffect, useState } from 'react';

const useScroll = () => {
    const [scrollPosition, setScrollPosition] = useState({ y: 0 });

    const handleScroll = () => {
        setScrollPosition({
            y: window.scrollY,
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return scrollPosition;
};

export default useScroll;
