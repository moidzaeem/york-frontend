// components/Modal.js
import React, { useState } from 'react';
import { useFetchDropdownData } from '@/hooks/fetchDropdownData';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputError from '../InputError';
import Label from '../Label';
import Select from '../Select';
import Input from '../Input';
import Search2 from '../icons/Search2';
import BaseButton from '../buttons/BaseButton';
import SimpleIconButton from '../buttons/SimpleIconButton';
import axios from '@/lib/axios';
import { toast } from 'react-toastify';

const SearchModal = ({ isVisible, onClose }) => {

    // const {isSubmitted, submitData, output: result} = useSubmitData('/api/search', true);
    const {dropdowns} = useFetchDropdownData("/api/dropdowns/search");

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [result, setResult] = useState({
        result: []
    });

    const submitData = async (data) => {

        setIsSubmitted(true);

        try {
            const response = await axios.get("/api/search", {
                params: data
            });
            
            setResult(prev => {
                return {
                    ...response.data
                }
            });

            formik.values.term = "";

        } catch (error) {
            // console.log(error);
            notify("Oops! something went wrong while loading categories.");
        } finally {
            setIsSubmitted(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            term: "",
            type: "User"
        },
        validationSchema: Yup.object({
            term: Yup.string()
                .min(3, "Must be 3 characters or more")
                .max(35, "Must be 35 characters or less")
                .required("Required"),
            type: Yup.string()
                .required('Required')
        }),
        onSubmit: submitData
    });


    const notify = (data) => {

        data.status == 201 ? 
            toast.success(data.message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }) 
            :
            toast.error(data.message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
    }

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0  overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border max-w-[768px] shadow-xl rounded-2xl shadow-teal-200 bg-white">
                <div className="w-full flex flex-row gap-3 items-center justify-between px-4 mb-4">
                    <div className="flex items-center justify-start gap-3 text-sm md:text-xl font-semibold">
                        <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                            <Search2 className="fill-slate-500" size="size-[20px]" />
                        </span>
                        Search
                    </div>

                    <SimpleIconButton className="" onClick={ onClose } title="close">
                        <svg fill="currentColor" className="size-6" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                        </svg>
                    </SimpleIconButton>
                </div>

                <div className="w-full px-4 mt-12">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-11 gap-y-6">
                            {/* Form Group start */}
                            <div className="col-span-2">
                                <Label htmlFor="term">
                                    Search
                                    <InputError message={formik.touched.event_term && formik.errors.event_term ? formik.errors.event_term : ''} />
                                </Label>

                                <Input
                                    id="term"
                                    type="text"
                                    name="term"
                                    value={ formik.values.term }
                                    placeholder="Search user..."
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoFocus
                                />
                            </div>
                            {/* Form Group end */}
                            
                            {/* Form Group start */}
                            <div className="hidden">
                                <Label htmlFor="type">
                                    Type
                                    <InputError message={formik.touched.type && formik.errors.type ? formik.errors.type : ''} />
                                </Label>

                                <Select
                                    id="type"
                                    name="type"
                                    value={ formik.values.type }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="_">select type</option>
                                    {
                                        dropdowns?.types?.length ? dropdowns.types.map(type => (
                                            <option key={ type } value={ type }>{ type }</option>
                                        ))
                                        :
                                        (
                                            <option value="_">targets not found</option>
                                        )
                                    }
                                </Select>
                            </div>
                            {/* Form Group end */}

                            <div className="w-full flex flex-col md:flex-row md:items-center md:justify-start gap-5 mt-4">
                                {
                                    !isSubmitted ? <BaseButton type="submit" className="!bg-[#13ad86] text-xs text-white md:text-base rounded-md" >
                                            Search
                                        </BaseButton>
                                    : <BaseButton className="!bg-blue-500 text-xs text-white md:text-base" >
                                            Please wait ...
                                        </BaseButton>
                                }
                            </div>
                        </div>
                    </form>
                    
                    <div className="my-6"></div>

                    {
                        result.result.length ? (
                            <>
                                <h3>Showing results for: <strong>{ result.search_term }</strong></h3>

                                <div className="flex flex-col gap-4">
                                    {
                                        result.result.map((r, idx) => (
                                            <div key={idx} className="rounded-md bg-gray-100 text-gray-800 text-sm mt-4 p-4">
                                                <p><strong>Name: </strong> {r.name}</p>
                                                <p><strong>Email: </strong> {r.email}</p>
                                                <p><strong>Phone: </strong> {r.phone_number}</p>
                                                <p><strong>Status: </strong> {r.status}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </>
                        )
                        :
                        ""
                    }
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
