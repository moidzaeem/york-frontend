// components/Modal.js
import React from 'react';
import { useSubmitData } from '@/hooks/submitData';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormAction from '../forms/FormAction';
import InputError from '../InputError';
import Label from '../Label';
import Input from '../Input';
import SidebarFiles from '../icons/SidebarFiles';

const CreateFolderModal = ({ isVisible, onClose, datatableRef, parentDirID = null }) => {

    const {isSubmitted, submitData} = useSubmitData('/api/directory');

    const sendRequest = async (payload, { resetForm }) => {

        try {
            await submitData(payload);

            resetForm();
            
            onClose();

            if (datatableRef.current) {
                datatableRef.current.reloadDatatable();
            }

        } catch (error) {
            
        }
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            parent_id: parentDirID,
            type: "directory",
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Required'),
        }),
        onSubmit: sendRequest
    });

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0  overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border max-w-[1080px] shadow-xl rounded-2xl shadow-teal-200 bg-white">
                <div className="w-full flex flex-row gap-3 items-center justify-between px-4 my-8">
                    <div className="flex items-center justify-start gap-3 text-sm md:text-xl font-semibold">
                        <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                            <SidebarFiles size="size-[23px] md:size-[23px]" className="stroke-slate-800 dark:stroke-slate-300" />
                        </span>
                        Create Folder/Directory
                    </div>
                </div>

                <div className="w-full px-4 mt-12">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-11 gap-y-6">

                            <input type="hidden" name="parent_id" value={ parentDirID } />
                            <input type="hidden" name="type" value="directory" />

                            {/* Form Group start */}
                            <div className="col-span-2">
                                <Label htmlFor="name">
                                    Folder Name
                                    <InputError message={formik.touched.name && formik.errors.name ? formik.errors.name : ''} />
                                </Label>

                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={ formik.values.name }
                                    placeholder="Directory/Folder Name"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoFocus
                                />
                            </div>
                            {/* Form Group end */}
                        </div>

                        <FormAction onClose={onClose} isSubmitted={isSubmitted} />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateFolderModal;
