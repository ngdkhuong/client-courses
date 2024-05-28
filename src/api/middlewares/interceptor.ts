import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import CONFIG_KEYS from '../../config';
import CustomApiError from '../../utils/CustomApiError';

const axiosInstance: AxiosInstance = axios.create({
    baseURL: CONFIG_KEYS.API_BASE_URL,
});

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error: AxiosError) => {
        if (error.response) {
            const { data, status } = error.response;
            if (status === 400) {
                throw new CustomApiError('Bad Request', data);
            } else if (status === 401) {
                throw new CustomApiError('Unauthorized', data);
            } else if (status === 404) {
                throw new CustomApiError('Not found', data);
            } else if (status === 409) {
                throw new CustomApiError('Conflict', data);
            } else {
                throw new CustomApiError(`Request failed with status ${status}`, data);
            }
        } else if (error.request) {
            throw new CustomApiError(`No response received`, error.request);
        } else {
            console.log('Error:', error.message);
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;
