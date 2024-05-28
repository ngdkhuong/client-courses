import { useState, useEffect } from 'react';

interface PaginationResult<T> {
    currentPage: number;
    totalPages: number;
    currentData: T[];
    goToPage: (page: number) => void;
    goToPreviousPage: () => void;
    goToNextPage: () => void;
}

const usePagination = <T>(data: T[], itemsPerPage: number): PaginationResult<T> => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [currentData, setCurrentData] = useState<T[]>([]);

    // Tổng số lượng trên 1 trang
    useEffect(() => {
        setTotalPages(Math.ceil(data.length / itemsPerPage));
    }, [data, itemsPerPage]);

    //  nếu dư số lượng quy định 1 trang sẽ tạo thêm trang mới
    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setCurrentData(data.slice(startIndex, endIndex));
    }, [data, currentPage, itemsPerPage]);

    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    return {
        currentPage,
        totalPages,
        currentData,
        goToPage,
        goToPreviousPage,
        goToNextPage,
    };
};

export default usePagination;
