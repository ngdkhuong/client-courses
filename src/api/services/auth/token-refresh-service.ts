import CONFIG_KEYS from '../../../config';
import api from '../../middlewares/protected-interceptor';

export const refreshTokenService = async (endpoint: string, refreshToken: string) => {
    const response = await api.post(`${CONFIG_KEYS.API_BASE_URL}/${endpoint}`, {
        refreshToken: `Bearer ${refreshToken}`,
    });

    return response.data.accessToken;
};
