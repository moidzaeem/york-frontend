'use client'

import { useState } from 'react';
import Card from '@/components/card/Card';
import Label from '@/components/Label';
import Input from '@/components/Input';
import InputError from '@/components/InputError';
import Select from '@/components/Select';
import TextArea from '@/components/TextArea';
import BaseLink from '@/components/buttons/BaseLink';
import BaseButton from '@/components/buttons/BaseButton';
import SidebarTenders from '@/components/icons/SidebarTenders';
import FormAction from '@/components/forms/FormAction';
import Camera from '@/components/icons/Camera';
import FileInput from '@/components/buttons/FileInput';
import SidebarProjects from '@/components/icons/SidebarProjects';
import { useSubmitData } from '@/hooks/submitData';
import { useFetchDropdownData } from '@/hooks/fetchDropdownData';
import { useFetchResource } from '@/hooks/fetchResource';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccessControl } from '@/hooks/accessControl';
import ReactSelect from 'react-select';


const Page = ({ params }) => {
    
    const {isSubmitted, submitData} = useSubmitData('/api/installations/update');
    const {dropdowns} = useFetchDropdownData("/api/dropdowns/installation");
    const router = useRouter();
    const {permissions, can} = useAccessControl();

    if (!can(["Installations - View", "Installations - Edit"])) {
        // navigate to 403 page.
        // router.push(process.env.NEXT_PUBLIC_UNAUTHORIZED_ROUTE);
    }

    const SUPPORTED_FORMATS = [
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/svg+xml',
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
        'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
        'text/plain' // .txt
    ];
    const FILE_SIZE = 1024 * 1024 * 12; // 12MB

    const userOptions = dropdowns?.users.map(user => ({
        value: user.id,
        label: user.name
    })) || [];

    const { initialData } = useFetchResource("/api/installations", params.id);

    const formik = useFormik({
        initialValues: {
            ...initialData,
            assigned_to: initialData.users ? initialData.users : [], // Parse comma-separated string to array
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            project_id: Yup.number()
                .required('Required')
                .integer("Must be valid client"),
            assigned_to: Yup.number()
                .required('Required')
                .integer("Must be valid sales person"),
            manager_id: Yup.number()
                .required('Required')
                .integer("Must be valid category"),
            status: Yup.string()
                .required('Required'),
            installation_amount: Yup.string()
                .required("Required"),
            shipment_amount: Yup.string()
                .required("Required"),
            start_date: Yup.date()
                .required('Required'),
            end_date: Yup.date()
                .required('Required'),
            notes: Yup.string()
                .nullable()
                .max(10000, 'Notes are too long'),
            files: Yup.array()
                .of(
                    Yup.mixed()
                        .test(
                            'fileSize',
                            'File too large',
                            value => value && value.size <= FILE_SIZE
                        )
                        .test(
                            'fileFormat',
                            'Unsupported Format',
                            value => value && SUPPORTED_FORMATS.includes(value.type)
                        )
                )
        }),
        onSubmit: submitData
    });

    
    const handleSelectChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        formik.setFieldValue('assigned_to', selectedValues);
    };
    const breadcrumb = (
        <ul className="flex items-center justify-start gap-3">
            <li className="capitalize text-base text-gray-800 font-bold hover:text-blue-500 hover:underline cursor-pointer" >
                <Link href="/dashboard">Dashboard</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-800 font-bold hover:text-blue-500 hover:underline cursor-pointer" >
                <Link href="/projects/installations">Installations</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-500 font-bold">
                Add Installation
            </li>
        </ul>
    )

    return (
        <>
            <title>YORK - Installations</title>

            <Card className="h-auto min-h-96 md:rounded-[15px] bg-white md:bg-white px-0 md:px-4 dark:bg-transparent md:dark:bg-gray-800" >
                { breadcrumb }
                <div className="w-full flex flex-row gap-3 items-center justify-between px-4 my-8">
                    <div className="flex items-center justify-start gap-3 text-xl md:text-xl font-semibold">
                        <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                            <SidebarProjects size="size-[23px] md:size-[23px]" className="stroke-slate-800 dark:stroke-slate-300" />
                        </span>
                        Edit Installation
                    </div>
                </div>

                <div className="w-full px-4 mt-12">
                    <form onSubmit={ can("Installations - Edit") ? formik.handleSubmit : () => false }>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-11 gap-y-6">
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="project_id">
                                    Project
                                    <InputError message={formik.touched.project_id && formik.errors.project_id ? formik.errors.project_id : ''} />
                                </Label>

                                <Select
                                    id="project_id"
                                    name="project_id"
                                    value={ formik.values.project_id }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoFocus
                                >
                                    <option value="_">select project</option>
                                    {
                                        dropdowns?.projects?.length ? dropdowns.projects.map(project => (
                                            <option key={ project.id } value={ project.id }>{ project.project_name }</option>
                                        ))
                                        :
                                        (
                                            <option value="_">projects not found</option>
                                        )
                                    }
                                </Select>
                            </div>
                            {/* Form Group end */}
                            
 {/* Form Group start */}
 <div className="">
                                <Label htmlFor="assigned_to">
                                    Assignee
                                    <InputError message={formik.touched.assigned_to && formik.errors.assigned_to ? formik.errors.assigned_to : ''} />
                                </Label>

                                <ReactSelect
                                    id="assigned_to"
                                    name="assigned_to"
                                    value={userOptions.filter(option => formik.values.assigned_to.includes(option.value))}
                                    onChange={handleSelectChange}
                                    options={userOptions}
                                    isMulti
                                    closeMenuOnSelect={false}
                                    className="mt-2"
                                    placeholder="Select assignees"
                                />



                            </div>
                            {/* Form Group end */}
                            {/* Form Group end */}
                            
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="manager_id">
                                    Project Manager
                                    <InputError message={formik.touched.manager_id && formik.errors.manager_id ? formik.errors.manager_id : ''} />
                                </Label>

                                <Select
                                    id="manager_id"
                                    name="manager_id"
                                    value={ formik.values.manager_id }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="_">select project manager</option>
                                    {
                                        dropdowns?.users?.length ? dropdowns.users.map(assignee => (
                                            <option key={ assignee.id } value={ assignee.id }>{ assignee.name }</option>
                                        ))
                                        :
                                        (
                                            <option value="_">project managers not found</option>
                                        )
                                    }
                                </Select>
                            </div>
                            {/* Form Group end */}
                            
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="status">
                                    Status
                                    <InputError message={formik.touched.status && formik.errors.status ? formik.errors.status : ''} />
                                </Label>

                                <Select
                                    id="status"
                                    name="status"
                                    value={ formik.values.status }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="_">select status</option>
                                    {
                                        dropdowns?.statuses?.length ? dropdowns.statuses.map(status => (
                                            <option key={ status } value={ status }>{ status }</option>
                                        ))
                                        :
                                        (
                                            <option value="_">status not found</option>
                                        )
                                    }
                                </Select>
                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="installation_amount">
                                    Installation Amount
                                    <InputError message={formik.touched.installation_amount && formik.errors.installation_amount ? formik.errors.installation_amount : ''} />
                                </Label>

                                <Input
                                    id="installation_amount"
                                    type="text"
                                    name="installation_amount"
                                    value={ formik.values.installation_amount }
                                    placeholder="$0000"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="shipment_amount">
                                    Shipment Amount
                                    <InputError message={formik.touched.shipment_amount && formik.errors.shipment_amount ? formik.errors.shipment_amount : ''} />
                                </Label>

                                <Input
                                    id="shipment_amount"
                                    type="text"
                                    name="shipment_amount"
                                    value={ formik.values.shipment_amount }
                                    placeholder="$0000"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="start_date">
                                    Start Date
                                    <InputError message={formik.touched.start_date && formik.errors.start_date ? formik.errors.start_date : ''} className="mt-2" />
                                </Label>

                                <Input
                                    id="start_date"
                                    type="date"
                                    name="start_date"
                                    value={ formik.values.start_date }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="end_date">
                                    End Date
                                    <InputError message={formik.touched.end_date && formik.errors.end_date ? formik.errors.end_date : ''} className="mt-2" />
                                </Label>

                                <Input
                                    id="end_date"
                                    type="date"
                                    name="end_date"
                                    value={ formik.values.end_date }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="md:col-span-2">
                                <Label htmlFor="files">
                                    Files
                                    <InputError message={formik.touched.files && formik.errors.files ? formik.errors.files : ''} className="mt-2" />
                                </Label>

                                <FileInput 
                                    id="files" 
                                    name="files" 
                                    onChange={() => formik.setFieldValue("files", [...event.target.files])}
                                    className="mt-1 !bg-[#080808] !text-white group cursor-pointer" 
                                    multiple={true}
                                    >
                                    <span>Upload Files</span>
                                    <Camera className="stroke-slate-300  group-hover:stroke-slate-100" />
                                </FileInput>
                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="md:col-span-2">
                                <Label htmlFor="notes">
                                    Notes
                                    <InputError message={formik.touched.notes && formik.errors.notes ? formik.errors.notes : ''} className="mt-2" />
                                </Label>

                                <TextArea
                                    id="notes"
                                    rows="8"
                                    name="notes"
                                    value={ formik.values.notes }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}
                        </div>
                        
                        {
                            can("Installations - Edit") ? 
                                <FormAction backUrl="/projects/installations" isSubmitted={isSubmitted} />
                                :
                                ""
                        }
                        
                    </form>
                </div>
            </Card>
        </>
    )
}

export default Page;