'use client'

import Card from '@/components/card/Card';
import Label from '@/components/Label';
import Input from '@/components/Input';
import InputError from '@/components/InputError';
import Select from '@/components/Select';
import TextArea from '@/components/TextArea';
import FormAction from '@/components/forms/FormAction';
import InputRadio from '@/components/InputRadio';
import { useSubmitData } from '@/hooks/submitData';
import { useFetchDropdownData } from '@/hooks/fetchDropdownData';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useFetchResource } from '@/hooks/fetchResource';
import SidebarProjects from '@/components/icons/SidebarProjects';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccessControl } from '@/hooks/accessControl';
import { useShowOrDownload } from '@/hooks/showOrDownload';
import BaseButton from '@/components/buttons/BaseButton';
import Download from '@/components/icons/Download';

const Page = ({ params }) => {
    
    const {isSubmitted, submitData} = useSubmitData('/api/back_charge/update');
    const {dropdowns} = useFetchDropdownData("/api/dropdowns/back_charge");
    const router = useRouter();
    const {permissions, can} = useAccessControl();
    const [exportToExcel, loadingStatus] = useShowOrDownload();

    if (!can(["BackCharges - View", "BackCharges - Edit"])) {
        // navigate to 403 page.
        router.push(process.env.NEXT_PUBLIC_UNAUTHORIZED_ROUTE);
    }

    const { initialData } = useFetchResource("/api/back_charge", params.id);

    const formik = useFormik({
        initialValues: initialData,
        enableReinitialize: true,
        validationSchema: Yup.object({
            project_id: Yup.number()
                .required('Required')
                .integer("Must be valid client"),
            date: Yup.date()
                .required('Required'),
            floor: Yup.string()
                .required('Required'),
            unit_number: Yup.string("Please enter a valid number")
                .required('Required'),
            description_of_change: Yup.string()
                .required('Required')
                .max(10000, 'Notes are too long'),
            description_of_change_approval: Yup.string()
                .nullable()
                .max(10000, 'Notes are too long'),
            reason_for_change: Yup.string()
                .required('Required')
                .max(10000, 'Notes are too long'),
            reason_for_change_approval: Yup.string()
                .nullable()
                .max(10000, 'Notes are too long'),
            additional_notes: Yup.string()
                .nullable()
                .max(10000, 'Notes are too long'),
            fix_amount: Yup.number()
                .required('Required'),
            charge_amount: Yup.string()
                .required('Required'),
            york_signature: Yup.string()
                .required('Required'),
            client_signature: Yup.string()
                .nullable(),
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
                <Link href="/projects/back_charges">BackCharges</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-500 font-bold">
                Add BackCharge
            </li>
        </ul>
    )

    return (
        <>
            <title>YORK - Back Charges</title>

            <Card className="h-auto min-h-96 md:rounded-[15px] bg-white md:bg-white px-0 md:px-4 dark:bg-transparent md:dark:bg-gray-800" >
                { breadcrumb }
                <div className="w-full flex flex-row gap-3 items-center justify-between px-4 my-8">
                    <div className="flex items-center justify-start gap-3 text-xl md:text-xl font-semibold">
                        <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                            <SidebarProjects size="size-[23px] md:size-[23px]" className="stroke-slate-800 dark:stroke-slate-300" />
                        </span>
                        Edit Back Charge
                    </div>
                    <BaseButton onClick={async () => { await exportToExcel("BackCharges", true, params.id) }} className="bg-white md:bg-[#f5f5f5] text-base md:text-base" >
                        <Download className="fill-slate-500" />
                        Download
                    </BaseButton>
                </div>

                <div className="w-full px-4 mt-12">
                    <form onSubmit={ can("BackCharges - Edit") ? formik.handleSubmit : () => false }>
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
                            <div className="">
                                <Label htmlFor="floor">
                                    Floor
                                    <InputError message={formik.touched.floor && formik.errors.floor ? formik.errors.floor : ''} />
                                </Label>

                                <Input
                                    id="floor"
                                    type="text"
                                    name="floor"
                                    value={ formik.values.floor }
                                    placeholder="Floor"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="unit_number">
                                    Unit Number
                                    <InputError message={formik.touched.unit_number && formik.errors.unit_number ? formik.errors.unit_number : ''} />
                                </Label>

                                <Input
                                    id="unit_number"
                                    type="text"
                                    name="unit_number"
                                    value={ formik.values.unit_number }
                                    placeholder="Unit Number"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="description_of_change">
                                    Description of Change
                                    <InputError message={formik.touched.description_of_change && formik.errors.description_of_change ? formik.errors.description_of_change : ''} className="mt-2" />
                                </Label>

                                <TextArea
                                    id="description_of_change"
                                    rows="8"
                                    name="description_of_change"
                                    value={ formik.values.description_of_change }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    placeholder="Write description..."
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="description_of_change_approval">
                                    Approval
                                    <InputError message={formik.touched.description_of_change_approval && formik.errors.description_of_change_approval ? formik.errors.description_of_change_approval : ''} className="mt-2" />
                                </Label>

                                <TextArea
                                    id="description_of_change_approval"
                                    rows="8"
                                    name="description_of_change_approval"
                                    value={ formik.values.description_of_change_approval }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    placeholder="Write description..."
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="reason_for_change">
                                    Reason For Change
                                    <InputError message={formik.touched.reason_for_change && formik.errors.reason_for_change ? formik.errors.reason_for_change : ''} className="mt-2" />
                                </Label>

                                <TextArea
                                    id="reason_for_change"
                                    rows="8"
                                    name="reason_for_change"
                                    value={ formik.values.reason_for_change }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    placeholder="Write description..."
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="reason_for_change_approval">
                                    Approval
                                    <InputError message={formik.touched.reason_for_change_approval && formik.errors.reason_for_change_approval ? formik.errors.reason_for_change_approval : ''} className="mt-2" />
                                </Label>

                                <TextArea
                                    id="reason_for_change_approval"
                                    rows="8"
                                    name="reason_for_change_approval"
                                    value={ formik.values.reason_for_change_approval }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    placeholder="Write description..."
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="md:col-span-2">
                                <Label htmlFor="additional_notes">
                                    Additional Notes
                                    <InputError message={formik.touched.additional_notes && formik.errors.additional_notes ? formik.errors.additional_notes : ''} className="mt-2" />
                                </Label>

                                <TextArea
                                    id="additional_notes"
                                    rows="8"
                                    name="additional_notes"
                                    value={ formik.values.additional_notes }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    placeholder="Write description..."
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}
                            
                            {/* Form Group start */}
                            <div className="md:col-span-2 flex items-center justify-start gap-4">
                                <div>
                                    <Label htmlFor="fix-rate">
                                        Fixed Amount
                                    </Label>

                                    <InputRadio
                                        id="fix-rate"
                                        name="fix_amount"
                                        value="1"
                                        className="mt-1 bg-[#f5f5f5]"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        checked={ formik.values.fix_amount == 1 ? true : false }
                                        />
                                </div>
                                
                                <div>
                                    <Label htmlFor="hourly-rate">
                                        Hourly Rate
                                    </Label>

                                    <InputRadio
                                        id="hourly-rate"
                                        name="fix_amount"
                                        value="0"
                                        className="mt-1 bg-[#f5f5f5]"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        checked={ formik.values.fix_amount == 0 ? true : false }
                                        />
                                </div>
                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="charge_amount">
                                    Charge Amount
                                    <InputError message={formik.touched.charge_amount && formik.errors.charge_amount ? formik.errors.charge_amount : ''} />
                                </Label>

                                <Input
                                    id="charge_amount"
                                    type="text"
                                    name="charge_amount"
                                    value={ formik.values.charge_amount }
                                    placeholder="Charge Amount"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}

                            <div className="hidden md:block"></div>

                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="york_signature">
                                    York Hospitality (Signature)
                                    <InputError message={formik.touched.york_signature && formik.errors.york_signature ? formik.errors.york_signature : ''} />
                                </Label>

                                <Input
                                    id="york_signature"
                                    type="text"
                                    name="york_signature"
                                    value={ formik.values.york_signature }
                                    placeholder="York Hospitality (Signature)"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="client_signature">
                                    Client (Signature)
                                    <InputError message={formik.touched.client_signature && formik.errors.client_signature ? formik.errors.client_signature : ''} />
                                </Label>

                                <Input
                                    id="client_signature"
                                    type="text"
                                    name="client_signature"
                                    value={ formik.values.client_signature }
                                    placeholder="Client (Signature)"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}

                        </div>

                        {
                            can("BackCharges - Edit") ? 
                                <FormAction backUrl="/projects/back_charges" isSubmitted={isSubmitted} />
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