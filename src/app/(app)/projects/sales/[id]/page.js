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
import FileInput from '@/components/buttons/FileInput';
import Camera from '@/components/icons/Camera';
import FormAction from '@/components/forms/FormAction';
import { useSubmitData } from '@/hooks/submitData';
import { useFetchDropdownData } from '@/hooks/fetchDropdownData';
import { useFetchResource } from '@/hooks/fetchResource';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import SidebarProjects from '@/components/icons/SidebarProjects';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccessControl } from '@/hooks/accessControl';


const Page = ({ params }) => {
    
    const {isSubmitted, submitData} = useSubmitData('/api/sales/update');
    const {dropdowns} = useFetchDropdownData("/api/dropdowns/sale");
    const router = useRouter();
    const {permissions, can} = useAccessControl();

    if (!can(["Sales - View", "Sales - Edit"])) {
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

    const { initialData } = useFetchResource("/api/sales", params.id);

    const formik = useFormik({
        initialValues: initialData,
        enableReinitialize: true,
        validationSchema: Yup.object({
            client_id: Yup.number()
                .required('Required')
                .integer("Must be valid client"),
            sales_person_id: Yup.number()
                .required('Required')
                .integer("Must be valid sales person"),
            category_id: Yup.number()
                .required('Required')
                .integer("Must be valid category"),
            status: Yup.string()
                .required('Required'),
            offer_price: Yup.number("Please enter a valid number")
                .required("Required"),
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
                <Link href="/projects/sales">Sales</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-500 font-bold">
                Edit Sale
            </li>
        </ul>
    )

    return (
        <>
            <title>YORK - Sales</title>

            <Card className="h-auto min-h-96 md:rounded-[15px] bg-white md:bg-white px-0 md:px-4 dark:bg-transparent md:dark:bg-gray-800" >
                { breadcrumb }
                <div className="w-full flex flex-row gap-3 items-center justify-between px-4 my-8">
                    <div className="flex items-center justify-start gap-3 text-xl md:text-xl font-semibold">
                        <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                            <SidebarProjects size="size-[23px] md:size-[23px] " className="stroke-slate-800 dark:stroke-slate-300" />
                        </span>
                        Edit Sale
                    </div>
                </div>

                <div className="w-full px-4 mt-12">
                    <form onSubmit={ can("Sales - Edit") ? formik.handleSubmit : () => false }>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-11 gap-y-6">
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="client_id">
                                    Client
                                    <InputError message={formik.touched.client_id && formik.errors.client_id ? formik.errors.client_id : ''} />
                                </Label>

                                <Select
                                    id="client_id"
                                    name="client_id"
                                    value={ formik.values.client_id }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoFocus
                                >
                                    <option value="_">select client</option>
                                    {
                                        dropdowns?.clients?.length ? dropdowns.clients.map(client => (
                                            <option key={ client.id } value={ client.id }>{ client.name }</option>
                                        ))
                                        :
                                        (
                                            <option value="_">clients not found</option>
                                        )
                                    }
                                </Select>
                            </div>
                            {/* Form Group end */}
                            
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="sales_person_id">
                                    Sales Person
                                    <InputError message={formik.touched.sales_person_id && formik.errors.sales_person_id ? formik.errors.sales_person_id : ''} />
                                </Label>

                                <Select
                                    id="sales_person_id"
                                    name="sales_person_id"
                                    value={ formik.values.sales_person_id }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="_">select sales person</option>
                                    {
                                        dropdowns?.users?.length ? dropdowns.users.map(sales_person => (
                                            <option key={ sales_person.id } value={ sales_person.id }>{ sales_person.name }</option>
                                        ))
                                        :
                                        (
                                            <option value="_">sales persons not found</option>
                                        )
                                    }
                                </Select>
                            </div>
                            {/* Form Group end */}
                            
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="category_id">
                                    Category
                                    <InputError message={formik.touched.category_id && formik.errors.category_id ? formik.errors.category_id : ''} />
                                </Label>

                                <Select
                                    id="category_id"
                                    name="category_id"
                                    value={ formik.values.category_id }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="_">select category</option>
                                    {
                                        dropdowns?.categories?.length ? dropdowns.categories.map(category => (
                                            <option key={ category.id } value={ category.id }>{ category.title }</option>
                                        ))
                                        :
                                        (
                                            <option value="_">category not found</option>
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
                                <Label htmlFor="offer_price">
                                    Offer Price
                                    <InputError message={formik.touched.offer_price && formik.errors.offer_price ? formik.errors.offer_price : ''} />
                                </Label>

                                <Input
                                    id="offer_price"
                                    type="text"
                                    name="offer_price"
                                    value={ formik.values.offer_price }
                                    placeholder="$0000"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
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
                            can("Sales - Edit") ? 
                                <FormAction backUrl="/projects/sales" isSubmitted={isSubmitted} />
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