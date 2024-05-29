import React, { useState, ChangeEvent } from 'react';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import { toast } from 'react-toastify';
import { registerInstructor } from '../../../api/endpoints/auth/instructor-auth';
import { registerValidationSchema } from '../../../validations/auth/registerValidation';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { InstructorRegisterDataInterface } from '../../../api/types/instructor/auth-interface';
import SpinnerDialog from '../../common/spinner-page';
import { Link } from 'react-router-dom';
import { APP_LOGO } from '../../../constants/common';
import { useModal } from '../../../context/modal-context';
const initialValues = {
    fullName: '',
    email: '',
    password: '',
};

const InstructorRegistrationModal: React.FC = () => {
    const { closeModal } = useModal();

    const handleSubmit = async (values: any) => {
        try {
            const response = await registerInstructor(values);
            if (response.data.status === 'success') {
                toast.success('Registration successful', { position: 'bottom-right' });
                closeModal();
            }
        } catch (error: any) {
            toast.error(error?.data?.message, { position: 'bottom-right' });
        }
    };

    const handleCloseModal = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    return (
        <div className="modal" onClick={handleCloseModal}>
            <div className="modal-content">
                <h2 className="text-center text-2xl font-bold mb-4">Register as an Instructor</h2>
                <Formik
                    initialValues={{ email: '', password: '', fullName: '' }}
                    validationSchema={registerValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-4">
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium">
                                    Full Name
                                </label>
                                <Field
                                    type="text"
                                    name="fullName"
                                    id="fullName"
                                    className="w-full p-2 border rounded"
                                    placeholder="Your Name"
                                />
                                <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium">
                                    Email Address
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="w-full p-2 border rounded"
                                    placeholder="you@example.com"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium">
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="w-full p-2 border rounded"
                                    placeholder="Your password"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500"
                                    disabled={isSubmitting}
                                >
                                    Register
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default InstructorRegistrationModal;
