import { object, string } from 'yup';

export const studentRegistrationValidationSchema = object().shape({
    fullName: string().trim().required('Full Name is required'),
    email: string().email('Invalid email').trim().required('Email is required'),
    password: string().required('Password is required'),
});
