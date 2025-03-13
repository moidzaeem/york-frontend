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
import TextArea from '@/components/TextArea';
import Select from '@/components/Select';
import { useFetchDropdownData } from '@/hooks/fetchDropdownData';
import FileInput from '@/components/buttons/FileInput';
import Camera from '@/components/icons/Camera';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccessControl } from '@/hooks/accessControl';


const Page = () => {

    const {isSubmitted, submitData} = useSubmitData('/api/tickets/create');
    const {dropdowns} = useFetchDropdownData("/api/dropdowns/ticket");
    const router = useRouter();
    const {permissions, can} = useAccessControl();

    if (!can("Tickets - Create")) {
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

    const formik = useFormik({
        initialValues: {
            subject: "",
            category_id: "",
            description: "",
            files: []
        },
        validationSchema: Yup.object({
            subject: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .max(55, 'Must be 55 characters or less')
                .required('Required'),
            category_id: Yup.number()
                .required('Required')
                .integer("Must be Valid category Id"),
            description: Yup.string().nullable().max(10000, 'Description is too long'),
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
                <Link href="/extras/tickets">Tickets</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-500 font-bold">
                New ticket
            </li>
        </ul>
    )

    return (
        <>
            <title>YORK - Tickets -- add new</title>

            <Card className="h-auto min-h-96 md:rounded-[15px] bg-white md:bg-white px-0 md:px-4 dark:bg-transparent md:dark:bg-gray-800" >
                { breadcrumb }
                <div className="w-full flex flex-row gap-3 items-center justify-between px-4 my-8">
                    <div className="flex items-center justify-start gap-3 text-xl md:text-xl font-semibold">
                        <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                            <SidebarExtras size="size-[23px] md:size-[23px]" className="stroke-slate-800 dark:stroke-slate-300" />
                        </span>
                        Add New Ticket
                    </div>
                </div>

                <div className="w-full px-4 mt-12">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-11 gap-y-6">
                            {/* Form Group start */}
                            <div className="md:col-span-2">
                                <Label htmlFor="subject">
                                    Subject
                                    <InputError message={formik.touched.subject && formik.errors.subject ? formik.errors.subject : ''} />
                                </Label>

                                <Input
                                    id="subject"
                                    type="text"
                                    name="subject"
                                    value={ formik.values.subject }
                                    placeholder="Ticket Subject"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoFocus
                                />

                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="category">
                                    Category
                                    <InputError messages={formik.touched.category_id && formik.errors.category_id ? formik.errors.category_id : ''} className="mt-2" />
                                </Label>

                                <Select
                                    id="category"
                                    name="category_id"
                                    value={formik.values.category_id ? formik.values.category_id : dropdowns?.categories[0].id }
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
                                            <option value="_">categories not found</option>
                                        )
                                    }
                                </Select>
                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="md:col-span-2">
                                <Label htmlFor="files">
                                    Files
                                    <InputError messages={formik.touched.files && formik.errors.files ? formik.errors.files : ''} className="mt-2" />
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
                                <Label htmlFor="description">
                                    Description
                                    <InputError messages={formik.touched.description && formik.errors.description ? formik.errors.description : ''} className="mt-2" />
                                </Label>

                                <TextArea
                                    id="description"
                                    rows="8"
                                    name="description"
                                    value={ formik.values.description }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                            </div>
                            {/* Form Group end */}
                        </div>

                        <FormAction backUrl="/extras/tickets" isSubmitted={isSubmitted} />
                    </form>
                </div>
            </Card>
        </>
    )
}

export default Page;