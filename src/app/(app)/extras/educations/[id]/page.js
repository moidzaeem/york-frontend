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
import { useFetchResource } from '@/hooks/fetchResource';
import Loader from '@/components/loaders/Loader';
import Select from '@/components/Select';
import { useFetchDropdownData } from '@/hooks/fetchDropdownData';
import FileInput from '@/components/buttons/FileInput';
import Camera from '@/components/icons/Camera';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccessControl } from '@/hooks/accessControl';


const Page = ({ params }) => {

    const {isSubmitted, submitData} = useSubmitData('/api/learning_materials/update');
    
    const {dropdowns} = useFetchDropdownData("/api/dropdowns/learning_material");
    const router = useRouter();
    const {permissions, can} = useAccessControl();

    if (!can(["Education - View", "Education - Edit"])) {
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

    const { initialData } = useFetchResource("/api/learning_materials", params.id);

    const formik = useFormik({
        initialValues: initialData,
        enableReinitialize: true,
        validationSchema: Yup.object({
            title: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .max(55, 'Must be 55 characters or less')
                .required('Required'),
            category_id: Yup.number()
                .required('Required')
                .integer("Must be Valid category Id"),
            files: Yup.array()
                .of(
                    Yup.mixed()
                        .required('A file is required')
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
                ),
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
                <Link href="/extras/educations">Learning materials</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-500 font-bold">
                Edit Learning material
            </li>
        </ul>
    )

    // if (!initialData) {
    //     return <Loader />;
    // }

    return (
        <>
            <title>YORK - Learning Materials -- Edit</title>

            <Card className="h-auto min-h-96 md:rounded-[15px] bg-white md:bg-white px-0 md:px-4 dark:bg-transparent md:dark:bg-gray-800" >
                { breadcrumb }
                <div className="w-full flex flex-row gap-3 items-center justify-between px-4 my-8">
                    <div className="flex items-center justify-start gap-3 text-xl md:text-xl font-semibold">
                        <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                            <SidebarExtras size="size-[23px] md:size-[23px]" className="stroke-slate-800 dark:stroke-slate-300" />
                        </span>
                        Edit Learning Material
                    </div>
                </div>

                <div className="w-full px-4 mt-12">
                    <form onSubmit={ can("Education - Edit") ? formik.handleSubmit : () => false }>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-11 gap-y-6">
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="title">
                                    Title
                                    <InputError message={formik.touched.title && formik.errors.title ? formik.errors.title : ''} />
                                </Label>

                                <Input
                                    id="title"
                                    type="text"
                                    name="title"
                                    value={ formik.values.title }
                                    placeholder="Learning Material Title"
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
                                    value={formik.values.category_id }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
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
                                    File
                                    <InputError messages={formik.touched.files && formik.errors.files ? formik.errors.files : ''} className="mt-2" />
                                </Label>

                                <FileInput 
                                    id="files" 
                                    name="files" 
                                    onChange={() => formik.setFieldValue("files", [...event.target.files])}
                                    className="mt-1 !bg-[#080808] !text-white group cursor-pointer" 
                                    multiple={false}
                                    >
                                    <span>Upload File</span>
                                    <Camera className="stroke-slate-800  group-hover:stroke-slate-100" />
                                </FileInput>
                            </div>
                            {/* Form Group end */}
                        </div>

                        {
                            can("Education - Edit") ? 
                                <FormAction backUrl="/extras/educations" isSubmitted={isSubmitted} />
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