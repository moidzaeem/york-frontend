'use client'

import Card from '@/components/card/Card';
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
import SidebarCalendar from '@/components/icons/SidebarCalendar';


const Page = ({ params }) => {
    
    const {isSubmitted, submitData} = useSubmitData('/api/events/update');
    const {dropdowns} = useFetchDropdownData("/api/dropdowns/event");

    const { initialData } = useFetchResource("/api/events", params.id);

    const formik = useFormik({
        initialValues: initialData,
        enableReinitialize: true,
        validationSchema: Yup.object({
            event_name: Yup.string()
                .min(3, "Must be 3 characters or more")
                .max(35, "Must be 35 characters or less")
                .required(),
            client_id: Yup.number()
                .required('Required')
                .integer("Must be valid category"),
            assigned_to: Yup.number()
                .required('Required')
                .integer("Must be valid user"),
            due_date: Yup.date()
                .required('Required'),
            department_id: Yup.number()
                .required('Required')
                .integer("Must be valid category"),
            status: Yup.string()
                .required('Required'),
            notes: Yup.string()
                .nullable()
                .max(10000, 'Notes are too long')
        }),
        onSubmit: submitData
    });

    return (
        <>
            <title>YORK - Events</title>

            <Card className="h-auto min-h-96 md:rounded-[15px] bg-white md:bg-white px-0 md:px-4 dark:bg-transparent md:dark:bg-gray-800" >
                <div className="w-full flex flex-row gap-3 items-center justify-between px-4 my-8">
                    <div className="flex items-center justify-start gap-3 text-xl md:text-xl font-semibold">
                        <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                            <SidebarCalendar className="size-[23px] md:size-[23px] stroke-slate-800 dark:stroke-slate-300" />
                        </span>
                        Edit Event
                    </div>
                </div>

                <div className="w-full px-4 mt-12">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-11 gap-y-6">
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="name">
                                    Event Name
                                    <InputError message={formik.touched.event_name && formik.errors.event_name ? formik.errors.event_name : ''} />
                                </Label>

                                <Input
                                    id="name"
                                    type="text"
                                    name="event_name"
                                    value={ formik.values.event_name }
                                    placeholder="Event Name"
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
                                <Label htmlFor="assigned_to">
                                    Assignee
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
                                <Label htmlFor="due_date">
                                    Task Start Date & Time
                                    <InputError message={formik.touched.due_date && formik.errors.due_date ? formik.errors.due_date : ''} />
                                </Label>

                                <Input
                                    id="due_date"
                                    type="datetime-local"
                                    name="due_date"
                                    value={ formik.values.due_date }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
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
                                    value={ formik.values.department_id }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="_">select department</option>
                                    {
                                        dropdowns?.departments?.length ? dropdowns.departments.map(department => (
                                            <option key={ department.id } value={ department.id }>{ department.name }</option>
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

                        <FormAction backUrl="/events" isSubmitted={isSubmitted} />
                    </form>
                </div>
            </Card>
        </>
    )
}

export default Page;