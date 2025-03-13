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
import Link from 'next/link';


const Page = () => {

    const {isSubmitted, submitData} = useSubmitData('/api/inputs/create');
    const {dropdowns} = useFetchDropdownData("/api/dropdowns/input");
    const router = useRouter();
    const {permissions, can} = useAccessControl();

    if (!can("Inputs - Create")) {
        // navigate to 403 page.
        router.push(process.env.NEXT_PUBLIC_UNAUTHORIZED_ROUTE);
    }

    const formik = useFormik({
        initialValues: {
            name: "",
            code: "",
            category_id: 0,
            notes: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .max(55, 'Must be 55 characters or less')
                .required('Required'),
            code: Yup.string()
                .min(2, 'Must be 2 characters or more')
                .max(55, 'Must be 55 characters or less')
                .required('Required'),
            category_id: Yup.number()
                .required('Required')
                .integer("Must be Valid category Id"),
            notes: Yup.string()
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
            <li className="capitalize text-base text-gray-500 font-bold">
                Add input
            </li>
        </ul>
    )

    return (
        <>
            <title>YORK - Inputs -- add new</title>

            <Card className="h-auto min-h-96 md:rounded-[15px] bg-white md:bg-white px-0 md:px-4 dark:bg-transparent md:dark:bg-gray-800" >
                { breadcrumb }
                <div className="w-full flex flex-row gap-3 items-center justify-between px-4 my-8">
                    <div className="flex items-center justify-start gap-3 text-xl md:text-xl font-semibold">
                        <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                            <SidebarExtras size="size-[23px] md:size-[23px]" className="stroke-slate-800 dark:stroke-slate-300" />
                        </span>
                        Add New Input
                    </div>
                </div>

                <div className="w-full px-4 mt-12">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-11 gap-y-6">
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="name">
                                    Input Name
                                    <InputError message={formik.touched.name && formik.errors.name ? formik.errors.name : ''} />
                                </Label>

                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={ formik.values.name }
                                    placeholder="Input Name"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoFocus
                                />

                            </div>
                            {/* Form Group end */}
                            
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="code">
                                    Input Code
                                    <InputError message={formik.touched.code && formik.errors.code ? formik.errors.code : ''} />
                                </Label>

                                <Input
                                    id="code"
                                    type="text"
                                    name="code"
                                    value={ formik.values.code }
                                    placeholder="Input Code"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
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
                                <Label htmlFor="notes">
                                    Notes
                                    <InputError messages={formik.touched.notes && formik.errors.notes ? formik.errors.notes : ''} className="mt-2" />
                                </Label>

                                <TextArea
                                    id="notes"
                                    rows="8"
                                    name="notes"
                                    value={ formik.values.notes }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    required
                                />

                            </div>
                            {/* Form Group end */}
                        </div>

                        <FormAction backUrl="/extras/inputs" isSubmitted={isSubmitted} />
                    </form>
                </div>
            </Card>
        </>
    )
}

export default Page;