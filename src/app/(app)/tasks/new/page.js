'use client'

import Card from '@/components/card/Card';
import TasksIcon from '@/components/icons/Tasks';
import Label from '@/components/Label';
import Input from '@/components/Input';
import InputError from '@/components/InputError';
import Select from '@/components/Select';
import TextArea from '@/components/TextArea';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormAction from '@/components/forms/FormAction';
import { useSubmitData } from '@/hooks/submitData';
import { useFetchDropdownData } from '@/hooks/fetchDropdownData';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccessControl } from '@/hooks/accessControl';
import ReactSelect from 'react-select';


const NewTask = () => {

    const { isSubmitted, submitData } = useSubmitData('/api/tasks/create');
    const { dropdowns } = useFetchDropdownData("/api/dropdowns/task");
    const router = useRouter();
    const { permissions, can } = useAccessControl();
    const userOptions = dropdowns?.users.map(user => ({
        value: user.id,
        label: user.name
    })) || [];


    if (!can("Tasks - Create")) {
        // navigate to 403 page.
        router.push(process.env.NEXT_PUBLIC_UNAUTHORIZED_ROUTE);
    }

    const formik = useFormik({
        initialValues: {
            title: "",
            client_id: "",
            start_date: "",
            end_date: "",
            status: "",
            department_id: "",
            category_id: "",
            assigned_to: [],
            priority: "",
            notes: "",
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .min(3, "Must be 3 characters or more")
                .max(35, "Must be 35 characters or less")
                .required('Required'),
            client_id: Yup.number()
                .required('Required')
                .integer("Must be valid category"),
            start_date: Yup.date()
                .required('Required'),
            end_date: Yup.date()
                .required('Required'),
            status: Yup.string()
                .required('Required'),
            department_id: Yup.number()
                .required('Required')
                .integer("Must be valid category"),
            category_id: Yup.number()
                .required('Required')
                .integer("Must be valid category"),
            assigned_to: Yup.array().min(1, 'Atleast one assigne is required').required('required'),
            priority: Yup.string()
                .required('Required'),
            notes: Yup.string()
                .nullable()
                .max(10000, 'Notes are too long')
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
                <Link href="/tasks">Tasks</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-500 font-bold">
                Add Task
            </li>
        </ul>
    )

    return (
        <>
            <title>YORK - Tasks</title>

            <Card className="h-auto min-h-96 md:rounded-[15px] bg-white md:bg-white px-0 md:px-4 dark:bg-transparent md:dark:bg-gray-800" >
                {breadcrumb}
                <div className="w-full flex flex-row gap-3 items-center justify-between px-4 my-8">
                    <div className="flex items-center justify-start gap-3 text-xl md:text-xl font-semibold">
                        <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                            <TasksIcon className="size-[23px] md:size-[23px] stroke-slate-800 dark:stroke-slate-300" />
                        </span>
                        Add New Task
                    </div>
                </div>

                <div className="w-full px-4 mt-12">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-11 gap-y-6">
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="title">
                                    Task Title
                                    <InputError message={formik.touched.title && formik.errors.title ? formik.errors.title : ''} />
                                </Label>

                                <Input
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={formik.values.title}
                                    placeholder="Task Title"
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
                                    value={formik.values.client_id}
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="_">select client</option>
                                    {
                                        dropdowns?.clients?.length ? dropdowns.clients.map(client => (
                                            <option key={client.id} value={client.id}>{client.name}</option>
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
                                <Label htmlFor="start_date">
                                    Task Start Date
                                    <InputError message={formik.touched.start_date && formik.errors.start_date ? formik.errors.start_date : ''} />
                                </Label>

                                <Input
                                    id="start_date"
                                    type="date"
                                    name="start_date"
                                    value={formik.values.start_date}
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="end_date">
                                    Task End Date
                                    <InputError message={formik.touched.end_date && formik.errors.end_date ? formik.errors.end_date : ''} />
                                </Label>

                                <Input
                                    id="end_date"
                                    type="date"
                                    name="end_date"
                                    value={formik.values.end_date}
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
                                                <option value="_">statuses not found</option>
                                            )
                                    }
                                </Select>
                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="department_id">
                                    Department
                                    <InputError message={formik.touched.department_id && formik.errors.department_id ? formik.errors.department_id : ''} />
                                </Label>

                                <Select
                                    id="department_id"
                                    name="department_id"
                                    value={formik.values.department_id}
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="_">select department</option>
                                    {
                                        dropdowns?.departments?.length ? dropdowns.departments.map(department => (
                                            <option key={department.id} value={department.id}>{department.name}</option>
                                        ))
                                            :
                                            (
                                                <option value="_">departments not found</option>
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
                                    value={formik.values.category_id}
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="_">select category</option>
                                    {
                                        dropdowns?.categories?.length ? dropdowns.categories.map(category => (
                                            <option key={category.id} value={category.id}>{category.title}</option>
                                        ))
                                            :
                                            (
                                                <option value="_">categories not found</option>
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
                                <Label htmlFor="priority">
                                    Priority
                                    <InputError message={formik.touched.priority && formik.errors.priority ? formik.errors.priority : ''} />
                                </Label>

                                <Select
                                    id="priority"
                                    name="priority"
                                    value={formik.values.priority}
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="_">select priority</option>
                                    {
                                        dropdowns?.priorities?.length ? dropdowns.priorities.map(priority => (
                                            <option key={priority} value={priority}>{priority}</option>
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

                        <FormAction backUrl="/tasks" isSubmitted={isSubmitted} />
                    </form>
                </div>
            </Card>
        </>
    )
}

export default NewTask;