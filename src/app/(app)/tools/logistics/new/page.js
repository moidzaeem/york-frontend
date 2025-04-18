'use client'

import Card from '@/components/card/Card';
import Label from '@/components/Label';
import Input from '@/components/Input';
import InputError from '@/components/InputError';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormAction from '@/components/forms/FormAction';
import { useSubmitData } from '@/hooks/submitData';
import Select from '@/components/Select';
import { useFetchDropdownData } from '@/hooks/fetchDropdownData';
import SidebarTools from '@/components/icons/SidebarTools';
import TextArea from '@/components/TextArea';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccessControl } from '@/hooks/accessControl';
import ReactSelect from 'react-select';


const Page = () => {

    const { isSubmitted, submitData } = useSubmitData('/api/logistics/create');
    const { dropdowns } = useFetchDropdownData("/api/dropdowns/logistic");
    const router = useRouter();
    const { permissions, can } = useAccessControl();

    const userOptions = dropdowns?.users.map(user => ({
        value: user.id,
        label: user.name
    })) || [];



    if (!can("Logistics - Create")) {
        // navigate to 403 page.
        // router.push(process.env.NEXT_PUBLIC_UNAUTHORIZED_ROUTE);
    }

    const formik = useFormik({
        initialValues: {
            client_id: "",
            project_id: "",
            manager_id: "",
            assigned_to: [], registration_date: "",
            shipment_date: "",
            status: "",
            notes: "",
        },
        validationSchema: Yup.object({
            client_id: Yup.number()
                .required('Required')
                .integer("Must be Valid category Id"),
            project_id: Yup.number()
                .required('Required')
                .integer("Must be Valid category Id"),
            manager_id: Yup.number()
                .required('Required')
                .integer("Must be Valid category Id"),
            assigned_to: Yup.array().min(1, 'Atleast one assigne is required').required('required'),
            registration_date: Yup.date()
                .required('Required'),
            shipment_date: Yup.date()
                .required('Required'),
            status: Yup.string()
                .min(2, 'Must be 2 characters or more')
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            notes: Yup.string().nullable().max(10000, 'Notes are too long'),
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
                <Link href="/tools/logistics">Logistics</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-500 font-bold">
                Add Logistic
            </li>
        </ul>
    )

    const handleSelectChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        formik.setFieldValue('assigned_to', selectedValues);
    };


    return (
        <>
            <title>YORK - Logistics -- add new</title>

            <Card className="h-auto min-h-96 md:rounded-[15px] bg-white md:bg-white px-0 md:px-4 dark:bg-transparent md:dark:bg-gray-800" >
                {breadcrumb}
                <div className="w-full flex flex-row gap-3 items-center justify-between px-4 my-8">
                    <div className="flex items-center justify-start gap-3 text-xl md:text-xl font-semibold">
                        <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                            <SidebarTools size="size-[23px] md:size-[23px]" className="fill-slate-800 dark:fill-slate-300" />
                        </span>
                        Add New Logistic
                    </div>
                </div>

                <div className="w-full px-4 mt-12">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-11 gap-y-6">

                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="client">
                                    Client
                                    <InputError message={formik.touched.client_id && formik.errors.client_id ? formik.errors.client_id : ''} />
                                </Label>

                                <Select
                                    id="client"
                                    name="client_id"
                                    value={formik.values.client_id}
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoFocus
                                >
                                    <option value="_">select client</option>
                                    {
                                        dropdowns?.clients?.length ? dropdowns.clients.map(cl => (
                                            <option key={cl.id} value={cl.id}>{cl.name}</option>
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
                                <Label htmlFor="project">
                                    Project
                                    <InputError message={formik.touched.project_id && formik.errors.project_id ? formik.errors.project_id : ''} />
                                </Label>

                                <Select
                                    id="project"
                                    name="project_id"
                                    value={formik.values.project_id}
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="_">select project</option>
                                    {
                                        dropdowns?.projects?.length ? dropdowns.projects.map(project => (
                                            <option key={project.id} value={project.id}>{project.project_name}</option>
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
                                <Label htmlFor="manager">
                                    Project Manager
                                    <InputError message={formik.touched.manager_id && formik.errors.manager_id ? formik.errors.manager_id : ''} />
                                </Label>

                                <Select
                                    id="manager"
                                    name="manager_id"
                                    value={formik.values.manager_id}
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="_">select manager</option>
                                    {
                                        dropdowns?.users?.length ? dropdowns.users.map(manager => (
                                            <option key={manager.id} value={manager.id}>{manager.name}</option>
                                        ))
                                            :
                                            (
                                                <option value="_">managers not found</option>
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


                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="registration_date">
                                    Registration Date
                                    <InputError message={formik.touched.registration_date && formik.errors.registration_date ? formik.errors.registration_date : ''} />
                                </Label>

                                <Input
                                    id="registration_date"
                                    type="date"
                                    name="registration_date"
                                    value={formik.values.registration_date}
                                    placeholder="Registration Date"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="shipment_date">
                                    Shipment Date
                                    <InputError message={formik.touched.shipment_date && formik.errors.shipment_date ? formik.errors.shipment_date : ''} />
                                </Label>

                                <Input
                                    id="shipment_date"
                                    type="date"
                                    name="shipment_date"
                                    value={formik.values.shipment_date}
                                    placeholder="Shipment Date"
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
                                    value={formik.values.status}
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="_">select status</option>
                                    {
                                        dropdowns?.statuses?.length ? dropdowns.statuses.map(status => (
                                            <option key={status} value={status}>{status}</option>
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
                            <div className="md:col-span-2">
                                <Label htmlFor="notes">
                                    Notes
                                    <InputError message={formik.touched.notes && formik.errors.notes ? formik.errors.notes : ''} />
                                </Label>

                                <TextArea
                                    id="notes"
                                    rows="8"
                                    name="notes"
                                    value={formik.values.notes}
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                            </div>
                            {/* Form Group end */}
                        </div>

                        <FormAction backUrl="/tools/logistics" isSubmitted={isSubmitted} />
                    </form>
                </div>
            </Card>
        </>
    )
}

export default Page;