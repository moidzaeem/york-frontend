'use client'

import Card from '@/components/card/Card';
import Label from '@/components/Label';
import Input from '@/components/Input';
import InputError from '@/components/InputError';
import BaseLink from '@/components/buttons/BaseLink';
import BaseButton from '@/components/buttons/BaseButton';
import SidebarExtras from '@/components/icons/SidebarExtras';
import axios from '@/lib/axios';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormAction from '@/components/forms/FormAction';
import { useSubmitData } from '@/hooks/submitData';
import { useFetchResource } from '@/hooks/fetchResource';
import Loader from '@/components/loaders/Loader';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccessControl } from '@/hooks/accessControl';


const Page = ({ params }) => {

    const {isSubmitted, submitData} = useSubmitData('/api/departments/update');
    const router = useRouter();
    const {permissions, can} = useAccessControl();

    if (!can(["Departments - View", "Departments - Edit"])) {
        // navigate to 403 page.
        router.push(process.env.NEXT_PUBLIC_UNAUTHORIZED_ROUTE);
    }

    const { initialData } = useFetchResource("/api/departments", params.id);

    const formik = useFormik({
        initialValues: initialData,
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .max(55, 'Must be 55 characters or less')
                .required('Required'),
            name: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .max(55, 'Must be 55 characters or less')
                .required('Required')
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
                <Link href="/extras/settings/departments">Departments</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-500 font-bold">
                Edit department
            </li>
        </ul>
    )

    // if (!initialData) {
    //     return <Loader />;
    // }

    return (
        <>
            <title>YORK - Departments -- Edit</title>

            <Card className="h-auto min-h-96 md:rounded-[15px] bg-white md:bg-white px-0 md:px-4 dark:bg-transparent md:dark:bg-gray-800" >
                { breadcrumb }
                <div className="w-full flex flex-row gap-3 items-center justify-between px-4 my-8">
                    <div className="flex items-center justify-start gap-3 text-xl md:text-xl font-semibold">
                        <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                            <SidebarExtras size="size-[23px] md:size-[23px]" className="stroke-slate-800 dark:stroke-slate-300" />
                        </span>
                        Edit Department
                    </div>
                </div>

                <div className="w-full px-4 mt-12">
                    <form onSubmit={ can("Departments - Edit") ? formik.handleSubmit : () => false }>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-11 gap-y-6">
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="title">
                                    Department Title
                                    <InputError message={formik.touched.title && formik.errors.title ? formik.errors.title : ''} />
                                </Label>

                                <Input
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={ formik.values.title }
                                    placeholder="Department Title"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoFocus
                                />

                            </div>
                            {/* Form Group end */}
                            
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="name">
                                    Department Name
                                    <InputError message={formik.touched.name && formik.errors.name ? formik.errors.name : ''} />
                                </Label>

                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={ formik.values.name }
                                    placeholder="Department Name"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                            </div>
                            {/* Form Group end */}
                        </div>

                        {
                            can("Departments - Edit") ? 
                                <FormAction backUrl="/extras/settings/departments" isSubmitted={isSubmitted} />
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