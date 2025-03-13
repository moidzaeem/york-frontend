'use client'

import Card from '@/components/card/Card';
import Label from '@/components/Label';
import Input from '@/components/Input';
import InputError from '@/components/InputError';
import Select from '@/components/Select';
import TextArea from '@/components/TextArea';
import SidebarTenders from '@/components/icons/SidebarTenders';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormAction from '@/components/forms/FormAction';
import { useSubmitData } from '@/hooks/submitData';
import { useFetchDropdownData } from '@/hooks/fetchDropdownData';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccessControl } from '@/hooks/accessControl';


const Page = () => {
    
    const {isSubmitted, submitData} = useSubmitData('/api/tenders/create');
    const {dropdowns} = useFetchDropdownData("/api/dropdowns/tender");
    const router = useRouter();
    const {permissions, can} = useAccessControl();

    if (!can("Tenders - Create")) {
        // navigate to 403 page.
        router.push(process.env.NEXT_PUBLIC_UNAUTHORIZED_ROUTE);
    }

    const formik = useFormik({
        initialValues: {
            project_name: "",
            client_id: "",
            category_id: "",
            closing_date: "",
            status: "",
            notes: "",
        },
        validationSchema: Yup.object({
            project_name: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .max(55, 'Must be 55 characters or less')
                .required('Required'),
            client_id: Yup.number()
                .required('Required')
                .integer("Must be valid category Id"),
            category_id: Yup.number()
                .required('Required')
                .integer("Must be valid category Id"),
            closing_date: Yup.date()
                .required('Required'),
            status: Yup.string()
                .required('Required'),
            notes: Yup.string()
                .nullable()
                .max(10000, 'Notes are too long'),
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
                <Link href="/tenders">Tenders</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-500 font-bold">
                Add Tender
            </li>
        </ul>
    )

    return (
        <>
            <title>YORK - Tenders</title>

            <Card className="h-auto min-h-96 md:rounded-[15px] bg-white md:bg-white px-0 md:px-4 dark:bg-transparent md:dark:bg-gray-800" >
                { breadcrumb }
                <div className="w-full flex flex-row gap-3 items-center justify-between px-4 my-8">
                    <div className="flex items-center justify-start gap-3 text-xl md:text-xl font-semibold">
                        <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                            <SidebarTenders size="size-[23px] md:size-[23px]" className="stroke-slate-800 dark:stroke-slate-300" />
                        </span>
                        Add New Tender
                    </div>
                </div>

                <div className="w-full px-4 mt-12">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-11 gap-y-6">
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="project_name">
                                    Project Name
                                    <InputError message={formik.touched.project_name && formik.errors.project_name ? formik.errors.project_name : ''} />
                                </Label>

                                <Input
                                    id="project_name"
                                    type="text"
                                    name="project_name"
                                    value={ formik.values.project_name }
                                    placeholder="Project Name Here"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoFocus
                                />
                            </div>
                            {/* Form Group end */}
                            
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
                                <Label htmlFor="category_id">
                                    Project Type (Category)
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
                                        dropdowns?.categories?.length ? dropdowns.categories.map(cat => (
                                            <option key={ cat.id } value={ cat.id }>{ cat.title }</option>
                                        ))
                                        :
                                        (
                                            <option value="_">Categories not found</option>
                                        )
                                    }
                                </Select>
                            </div>
                            {/* Form Group end */}

                            
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="closing_date">
                                    Closing Date
                                    <InputError message={formik.touched.closing_date && formik.errors.closing_date ? formik.errors.closing_date : ''} />
                                </Label>

                                <Input
                                    id="closing_date"
                                    type="date"
                                    name="closing_date"
                                    value={ formik.values.closing_date }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
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
                                            <option value="_">statuses not found</option>
                                        )
                                    }
                                </Select>
                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="md:col-span-2">
                                <Label htmlFor="notes">
                                    Notes
                                    <InputError message={formik.touched.notes && formik.errors.notes ? formik.errors.notes : ''} />
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

                        <div className="w-full flex flex-col md:flex-row md:items-center md:justify-start gap-5 mt-6">
                            <FormAction backUrl="/tenders" isSubmitted={isSubmitted} />
                        </div>
                    </form>
                </div>
            </Card>
        </>
    )
}

export default Page;