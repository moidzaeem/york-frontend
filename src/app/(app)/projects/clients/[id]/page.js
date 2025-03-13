'use client'

import Card from '@/components/card/Card';
import Label from '@/components/Label';
import Input from '@/components/Input';
import InputError from '@/components/InputError';
import Select from '@/components/Select';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputCheckbox from '@/components/InputCheckbox';
import FormAction from '@/components/forms/FormAction';
import { useSubmitData } from '@/hooks/submitData';
import { useFetchDropdownData } from '@/hooks/fetchDropdownData';
import SidebarProjects from '@/components/icons/SidebarProjects';
import { useFetchResource } from '@/hooks/fetchResource';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccessControl } from '@/hooks/accessControl';


const Page = ({ params }) => {
    
    const {isSubmitted, submitData} = useSubmitData('/api/clients/update');
    const {dropdowns} = useFetchDropdownData("/api/dropdowns/client");
    const router = useRouter();
    const {permissions, can} = useAccessControl();

    if (!can(["Clients - View", "Clients - Edit"])) {
        // navigate to 403 page.
        router.push(process.env.NEXT_PUBLIC_UNAUTHORIZED_ROUTE);
    }

    const { initialData } = useFetchResource("/api/clients", params.id);

    const formik = useFormik({
        initialValues: initialData,
        enableReinitialize: true,
        validationSchema: Yup.object({
            client_name: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .max(55, 'Must be 55 characters or less')
                .required('Required'),
            company_name: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .max(55, 'Must be 55 characters or less')
                .required('Required'),
            phone_gsm: Yup.number()
                .required('Required')
                .integer("Must be valid phone number"),
            phone_stable: Yup.number()
                .required('Required')
                .integer("Must be valid phone number"),
            email: Yup.string()
                .email()
                .required('Required'),
            address: Yup.string()
                .min(4, "Must be 4 characters or more")
                .max(30, "Must be 30 characters or less")
                .required('Required'),
            decorated: Yup.string(),
            // special: Yup.bool(),
            // blacklist: Yup.bool(),
            status: Yup.string()
                .required('Required'),
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
                <Link href="/projects/clients">Clients</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-500 font-bold">
                Add Client
            </li>
        </ul>
    )

    return (
        <>
            <title>YORK - Clients</title>

            <Card className="h-auto min-h-96 md:rounded-[15px] bg-white md:bg-white px-0 md:px-4 dark:bg-transparent md:dark:bg-gray-800" >
                { breadcrumb }
                <div className="w-full flex flex-row gap-3 items-center justify-between px-4 my-8">
                    <div className="flex items-center justify-start gap-3 text-xl md:text-xl font-semibold">
                        <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                            <SidebarProjects size="size-[23px] md:size-[23px]" className="stroke-slate-800 dark:stroke-slate-300" />
                        </span>
                        Edit Client
                    </div>
                </div>

                <div className="w-full px-4 mt-12">
                    <form onSubmit={ can("Clients - Edit") ? formik.handleSubmit : () => false}><div className="grid grid-cols-1 md:grid-cols-2 gap-x-11 gap-y-6">
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="client_name">
                                    Client Name
                                    <InputError message={formik.touched.client_name && formik.errors.client_name ? formik.errors.client_name : ''} />
                                </Label>

                                <Input
                                    id="client_name"
                                    type="text"
                                    name="client_name"
                                    value={ formik.values.client_name }
                                    placeholder="Client Name"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoFocus
                                />
                            </div>
                            {/* Form Group end */}
                            
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="company_name">
                                    Company Name
                                    <InputError message={formik.touched.company_name && formik.errors.company_name ? formik.errors.company_name : ''} />
                                </Label>

                                <Input
                                    id="company_name"
                                    type="text"
                                    name="company_name"
                                    value={ formik.values.company_name }
                                    placeholder="Company Name"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}
                            
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="phone_gsm">
                                    Phone Number (Cell)
                                    <InputError message={formik.touched.phone_gsm && formik.errors.phone_gsm ? formik.errors.phone_gsm : ''} />
                                </Label>

                                <Input
                                    id="phone_gsm"
                                    type="text"
                                    name="phone_gsm"
                                    value={ formik.values.phone_gsm }
                                    placeholder="Client Phone Number (GSM)"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}
                            
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="phone_stable">
                                    Phone Number (Office)
                                    <InputError message={formik.touched.phone_stable && formik.errors.phone_stable ? formik.errors.phone_stable : ''} />
                                </Label>

                                <Input
                                    id="phone_stable"
                                    type="text"
                                    name="phone_stable"
                                    value={ formik.values.phone_stable }
                                    placeholder="Client Phone Number (Stable)"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}
                            
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="email">
                                    Email
                                    <InputError message={formik.touched.email && formik.errors.email ? formik.errors.email : ''} />
                                </Label>

                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={ formik.values.email }
                                    placeholder="Client Email"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}
                            
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="address">
                                    Office Address
                                    <InputError message={formik.touched.address && formik.errors.address ? formik.errors.address : ''} />
                                </Label>

                                <Input
                                    id="address"
                                    type="text"
                                    name="address"
                                    value={ formik.values.address }
                                    placeholder="Office Address"
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
                                <Label htmlFor="decorated">
                                    Decorate
                                    <InputError message={formik.touched.decorated && formik.errors.decorated ? formik.errors.decorated : ''} />
                                </Label>

                                <Select
                                    id="decorated"
                                    name="decorated"
                                    value={ formik.values.decorated }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="_">select badge</option>
                                    <option value="special">Special</option>
                                    <option value="blacklist">Blacklist</option>
                                </Select>
                            </div>
                            {/* Form Group end */}
                        </div>

                        {
                            can("Clients - Edit") ? 
                                <FormAction backUrl="/projects/clients" isSubmitted={isSubmitted} />
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