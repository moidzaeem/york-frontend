'use client'

import Card from '@/components/card/Card';
import Label from '@/components/Label';
import Input from '@/components/Input';
import InputError from '@/components/InputError';
import Select from '@/components/Select';
import TextArea from '@/components/TextArea';
import { useSubmitData } from '@/hooks/submitData';
import { useFetchDropdownData } from '@/hooks/fetchDropdownData';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SidebarProjects from '@/components/icons/SidebarProjects';
import FormAction from '@/components/forms/FormAction';
import Camera from '@/components/icons/Camera';
import FileInput from '@/components/buttons/FileInput';
import { useFetchResource } from '@/hooks/fetchResource';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccessControl } from '@/hooks/accessControl';


const Page = ({ params }) => {
    
    const {isSubmitted, submitData} = useSubmitData('/api/punch_list/update');
    const {dropdowns} = useFetchDropdownData("/api/dropdowns/punch_list");
    const router = useRouter();
    const {permissions, can} = useAccessControl();

    if (!can(["Punch Lists - View", "Punch Lists - Edit"])) {
        // navigate to 403 page.
        router.push(process.env.NEXT_PUBLIC_UNAUTHORIZED_ROUTE);
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

    const { initialData } = useFetchResource("/api/punch_list", params.id);

    const formik = useFormik({
        initialValues: initialData,
        enableReinitialize: true,
        validationSchema: Yup.object({
            project_id: Yup.number()
                .required('Required')
                .integer("Must be valid project"),
            assigned_to: Yup.number()
                .required('Required')
                .integer("Must be valid user"),
            address: Yup.string()
                .required("Required")
                .min(3, "Must be 3 characters or more"),
            priority: Yup.string()
                .required("Required"),
            status: Yup.string()
                .required('Required'),
            date: Yup.date()
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

    const breadcrumb = (
        <ul className="flex items-center justify-start gap-3">
            <li className="capitalize text-base text-gray-800 font-bold hover:text-blue-500 hover:underline cursor-pointer" >
                <Link href="/dashboard">Dashboard</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-800 font-bold hover:text-blue-500 hover:underline cursor-pointer" >
                <Link href="/projects/punch_lists">Punch Lists</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-500 font-bold">
                Add Punch List
            </li>
        </ul>
    )

    return (
        <>
            <title>YORK - Punch List</title>

            <Card className="h-auto min-h-96 md:rounded-[15px] bg-white md:bg-white px-0 md:px-4 dark:bg-transparent md:dark:bg-gray-800" >
                <div className="w-full flex flex-row gap-3 items-center justify-between px-4 my-8">
                    <div className="flex items-center justify-start gap-3 text-xl md:text-xl font-semibold">
                        <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                            <SidebarProjects size="size-[23px] md:size-[23px]" className="stroke-slate-800 dark:stroke-slate-300" />
                        </span>
                        Update Punch
                    </div>
                </div>

                <div className="w-full px-4 mt-12">
                    <form onSubmit={ can("Punch Lists - Edit") ? formik.handleSubmit : () => false }>
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
                                    Assigned To
                                    <InputError message={formik.touched.assigned_to && formik.errors.assigned_to ? formik.errors.assigned_to : ''} />
                                </Label>

                                <Select
                                    id="assigned_to"
                                    name="assigned_to"
                                    value={ formik.values.assigned_to }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="_">select assignee</option>
                                    {
                                        dropdowns?.users?.length ? dropdowns.users.map(assignee => (
                                            <option key={ assignee.id } value={ assignee.id }>{ assignee.name }</option>
                                        ))
                                        :
                                        (
                                            <option value="_">assignees not found</option>
                                        )
                                    }
                                </Select>
                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="address">
                                    Address
                                    <InputError message={formik.touched.address && formik.errors.address ? formik.errors.address : ''} />
                                </Label>

                                <Input
                                    id="address"
                                    type="text"
                                    name="address"
                                    value={ formik.values.address }
                                    placeholder="Address"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}
                            
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="priority">
                                    Priority
                                    <InputError message={formik.touched.priority && formik.errors.priority ? formik.errors.priority : ''} />
                                </Label>

                                <Select
                                    id="priority"
                                    name="priority"
                                    value={ formik.values.priority }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="_">select priority</option>
                                    {
                                        dropdowns?.priorities?.length ? dropdowns.priorities.map(priorities => (
                                            <option key={ priorities } value={ priorities }>{ priorities }</option>
                                        ))
                                        :
                                        (
                                            <option value="_">priorities not found</option>
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
                                <Label htmlFor="date">
                                    Date
                                    <InputError message={formik.touched.date && formik.errors.date ? formik.errors.date : ''} className="mt-2" />
                                </Label>

                                <Input
                                    id="date"
                                    type="date"
                                    name="date"
                                    value={ formik.values.date }
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
                                    <Camera className="stroke-slate-800  group-hover:stroke-slate-100" />
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
                            can("Punch Lists - Edit") ? 
                                <FormAction backUrl="/projects/punch_lists" isSubmitted={isSubmitted} />
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