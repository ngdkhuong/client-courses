import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { googleStudentLogin } from '../../api/endpoints/auth/student-auth';
import { setToken } from '../../redux/reducers/authSlice';
import { GoogleLogin } from '@react-oauth/google';

function GoogleAuthComponent(): JSX.Element {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const errorMessage = (): void => {
        toast.error('Error from google login.', {
            position: 'bottom-right',
        });
    };

    const handleSignInWithGoogle = (credential: string) => {
        googleStudentLogin(credential)
            .then((response: any) => {
                const { accessToken, refreshToken }: { accessToken: string; refreshToken: string } = response;

                dispatch(setToken({ accessToken, refreshToken, userType: 'student' }));

                toast.success(response?.message, {
                    position: 'bottom-right',
                });

                response.status === 'success' && navigate('/');
            })
            .catch((error: any) => {
                toast.error(error?.data?.message, {
                    position: 'bottom-right',
                });
            });
    };

    return (
        <div className="mb-5">
            <div className="flex justify-center">
                <GoogleLogin
                    width="280px"
                    size="large"
                    logo_alignment="center"
                    shape="pill"
                    auto_select={false}
                    type="standard"
                    ux_mode="popup"
                    onSuccess={(response) => {
                        if (response) {
                            handleSignInWithGoogle(response.credential ?? 'empty response');
                        }
                    }}
                    onError={errorMessage}
                />
            </div>
        </div>
    );
}

export default GoogleAuthComponent;
