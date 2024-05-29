import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AppRouter from './routes';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from '@mui/material';
import { unstable_createMuiStrictModeTheme } from '@mui/material/styles';
import CONFIG_KEYS from './config';
import { ModalProvider } from './context/modal-context';
import { UserTypeProvider } from './context/switch-context';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const theme = unstable_createMuiStrictModeTheme();

root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={CONFIG_KEYS.GOOGLE_AUTH_CLIENT_ID}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ThemeProvider theme={theme}>
                        <ModalProvider>
                            <UserTypeProvider>
                                <RouterProvider router={AppRouter} />
                                <ToastContainer />
                            </UserTypeProvider>
                        </ModalProvider>
                    </ThemeProvider>
                </PersistGate>
            </Provider>
        </GoogleOAuthProvider>
    </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
