'use client'

import Card from '@/components/card/Card';
import Label from '@/components/Label';
import Input from '@/components/Input';
import InputError from '@/components/InputError';
import SidebarExtras from '@/components/icons/SidebarExtras';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormAction from '@/components/forms/FormAction';
import { useSubmitData } from '@/hooks/submitData';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccessControl } from '@/hooks/accessControl';


const Page = () => {

    const {isSubmitted, submitData} = useSubmitData('/api/categories/create');
    const router = useRouter();
    const {permissions, can} = useAccessControl();

    if (!can("Categories - Create")) {
        // navigate to 403 page.
        router.push(process.env.NEXT_PUBLIC_UNAUTHORIZED_ROUTE);
    }

    const formik = useFormik({
        initialValues: {
            title: "",
        },
        validationSchema: Yup.object({
            title: Yup.string()
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
                <Link href="/extras/inputs">Inputs</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-800 font-bold hover:text-blue-500 hover:underline cursor-pointer" >
                <Link href="/extras/inputs/categories">Categories</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-500 font-bold">
                Add category
            </li>
        </ul>
    )

    return (
        <>
            <title>YORK - Categories -- add new</title>

            <Card className="h-auto min-h-96 md:rounded-[15px] bg-white md:bg-white px-0 md:px-4 dark:bg-transparent md:dark:bg-gray-800" >
                { breadcrumb }
                <div className="w-full flex flex-row gap-3 items-center justify-between px-4 my-8">
                    <div className="flex items-center justify-start gap-3 text-xl md:text-xl font-semibold">
                        <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                            <SidebarExtras size="size-[23px] md:size-[23px]" className="stroke-slate-800 dark:stroke-slate-300" />
                        </span>
                        Add New Category
                    </div>
                </div>

                <div className="w-full px-4 mt-12">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-11 gap-y-6">
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="title">
                                    Category Title
                                    <InputError message={formik.touched.title && formik.errors.title ? formik.errors.title : ''} />
                                </Label>

                                <Input
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={ formik.values.title }
                                    placeholder="Category Title"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoFocus
                                />

                            </div>
                            {/* Form Group end */}
                        </div>

                        <FormAction backUrl="/extras/inputs/categories" isSubmitted={isSubmitted} />
                    </form>
                </div>
            </Card>
        </>
    )
}

export default Page;