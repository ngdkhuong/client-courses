/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

type RefreshDataFunction = () => void;

interface ApiDataResult<T> {
    data: T | null;
    isLoading: boolean;
    isError: boolean;
    error: boolean;
    refreshData: RefreshDataFunction;
}

const useApiData = <T>(
    /* This line of code defines a custom React hook called `useApiData` that takes
two parameters:
1. `apiCall`: This parameter is a function that can take any number of
arguments and returns a Promise of type `T`. This function is typically used
to make an API call to fetch data.
2. `...args`: This parameter uses the rest parameter syntax to capture any
additional arguments passed to the `useApiData` hook after the `apiCall`
function. */ apiCall: (...args: any[]) => Promise<T>,
    ...args: any[]
): ApiDataResult<T> => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isError, setIsError] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);
    const [refreshFlag, setRefreshFlag] = useState<boolean>(false);

    const refreshData = () => {
        setRefreshFlag(!refreshFlag);
    };

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        let timerId: any;

        const fetchData = async (): Promise<void> => {
            setIsLoading(true);

            try {
                const response = await apiCall(...args);
                setData(response);
            } catch (error: any) {
                setIsError(true);
                setError(error);
            }
            timerId = setTimeout(() => {
                setIsLoading(false);
            }, 2000);
        };

        fetchData();
    }, [refreshFlag, ...args]);

    return {
        data,
        isLoading,
        isError,
        error,
        refreshData,
    };
};

export default useApiData;
