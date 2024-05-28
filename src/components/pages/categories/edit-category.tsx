import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CategoryValidationSchema } from '../../../validations/category';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategory, editCategory } from '../../../api/endpoints/category';
import { toast } from 'react-toastify';
import { ApiResponseCategory } from '../../../api/types/apiResponses/api-response-category';

const EditCategory: React.FC = () => {
    const { categoryId } = useParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [category, setCategory] = useState<ApiResponseCategory | null>(null);
    const navigate = useNavigate();

    const fetchCategory = async (id: string) => {
        try {
            setLoading(true);
            const response = await getCategory(id);
            setCategory(response?.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error('Something went wrong', {
                position: 'bottom-right',
            });
        }
    };

    useEffect(() => {
        if (categoryId) {
            fetchCategory(categoryId);
        }
    }, []);

    const handleSubmit = async (categoryInfo: { name: string; description: string }) => {
        try {
            const response = await editCategory(categoryId ?? '', categoryInfo);
            toast.success(response?.message, {
                position: 'bottom-right',
            });
            navigate('/admin/categories');
        } catch (error) {
            toast.error('Failed to edit category', {
                position: 'bottom-right',
            });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex justify-center items-center w-full p-3 pb-56 bg-gray-100 text-customFontColorBlack">
            <Formik
                initialValues={{
                    name: category?.name ?? '',
                    description: category?.description ?? '',
                }}
                validationSchema={CategoryValidationSchema}
                onSubmit={handleSubmit}
            >
                <Form className="mt-10 space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                            Category name
                        </label>
                        <div className="mt-2">
                            <Field
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                Description
                            </label>
                        </div>
                        <div className="mt-2">
                            <Field
                                id="description"
                                name="description"
                                type="text"
                                autoComplete="description"
                                required
                                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-700 focus-visible:outline-none focus-visible:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                        </div>
                    </div>

                    <div className="mt-2">
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-blue-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Update
                        </button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default EditCategory;
