'use client'

import Card from '@/components/card/Card';
import Label from '@/components/Label';
import Input from '@/components/Input';
import InputError from '@/components/InputError';
import Select from '@/components/Select';
import TextArea from '@/components/TextArea';
import SidebarHr from '@/components/icons/SidebarHr';
import FormAction from '@/components/forms/FormAction';
import Camera from '@/components/icons/Camera';
import FileInput from '@/components/buttons/FileInput';
import { useSubmitData } from '@/hooks/submitData';
import { useFetchDropdownData } from '@/hooks/fetchDropdownData';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useFetchResource } from '@/hooks/fetchResource';
import Link from 'next/link';
import InputCheckbox from '@/components/InputCheckbox';
import { useRouter } from 'next/navigation';
import { useAccessControl } from '@/hooks/accessControl';


const Page = ({ params }) => {

    const {isSubmitted, submitData} = useSubmitData('/api/employees/update');
    const {dropdowns} = useFetchDropdownData("/api/dropdowns/employee");
    const router = useRouter();
    const {permissions, can} = useAccessControl();

    if (!can(["Employees - View", "Employees - Edit"])) {
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

    const { initialData } = useFetchResource("/api/employees", params.id);

    const formik = useFormik({
        initialValues: initialData,
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .max(55, 'Must be 55 characters or less')
                .required('Required'),
            position_id: Yup.number()
                .required('Required')
                .integer("Must be Valid position Id"),
            department_id: Yup.number()
                .required('Required')
                .integer("Must be Valid department Id"),
            phone_number: Yup.number()
                .required('Required'),
            email: Yup.string()
                .email()
                .required('Required'),
            employment_type: Yup.string()
                .min(3, 'Must be 3 characters or more')
                .max(15, 'Must be 15 characters or less')
                .required('Required'),
            dob: Yup.date()
                .required('Required'),
            notes: Yup.string().nullable().max(10000, 'Notes are too long'),
            address: Yup.string().nullable().max(100, 'Address is too long'),
            role: Yup.string().required("Required"),
            permissions: Yup.array(),
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
                )
        }),
        onSubmit: submitData
    });


    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        const { permissions } = formik.values;

        if (checked) {
            formik.setFieldValue('permissions', [...permissions, value]);
        } else {
            formik.setFieldValue('permissions', permissions.filter(p => p !== value));
        }
    };

    const breadcrumb = (
        <ul className="flex items-center justify-start gap-3">
            <li className="capitalize text-base text-gray-800 font-bold hover:text-blue-500 hover:underline cursor-pointer" >
                <Link href="/dashboard">Dashboard</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-800 font-bold hover:text-blue-500 hover:underline cursor-pointer" >
                <Link href="/hr/employees">Employees</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-500 font-bold">
                Edit Employee
            </li>
        </ul>
    )


    return (
        <>
            <title>YORK - Employees</title>

            <Card className="h-auto min-h-96 md:rounded-[15px] bg-white md:bg-white px-0 md:px-4 dark:bg-transparent md:dark:bg-gray-800" >
                { breadcrumb }
                <div className="w-full flex flex-row gap-3 items-center justify-between px-4 my-8">
                    <div className="flex items-center justify-start gap-3 text-xl md:text-xl font-semibold">
                        <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                            <SidebarHr size="size-[23px] md:size-[23px]" className="fill-slate-800 dark:fill-slate-300" />
                        </span>
                        Edit Employee
                    </div>
                </div>

                <div className="w-full px-4 mt-12">
                    <form onSubmit={ can("Employees - Edit") ? formik.handleSubmit : () => false }>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-11 gap-y-6">
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="name">
                                    Name
                                    <InputError message={formik.touched.name && formik.errors.name ? formik.errors.name : ''} />
                                </Label>

                                <Input
                                    id="name"
                                    type="text"
                                    name="name"
                                    value={ formik.values.name }
                                    placeholder="Name"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoFocus
                                />

                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="position">
                                    Position
                                    <InputError messages={formik.touched.position_id && formik.errors.position_id ? formik.errors.position_id : ''} className="mt-2" />
                                </Label>

                                <Select
                                    id="position"
                                    name="position_id"
                                    value={formik.values.position_id ? formik.values.position_id : 0 }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="_">select position</option>
                                    {
                                        dropdowns?.positions?.length ? dropdowns.positions.map(position => (
                                            <option key={ position.id } value={ position.id }>{ position.title }</option>
                                        ))
                                        :
                                        (
                                            <option value="_">positions not found</option>
                                        )
                                    }
                                </Select>
                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="department">
                                    Department
                                    <InputError messages={formik.touched.department_id && formik.errors.department_id ? formik.errors.department_id : ''} className="mt-2" />
                                </Label>

                                <Select
                                    id="department"
                                    name="department_id"
                                    value={formik.values.department_id ? formik.values.department_id : 0 }
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
                                <Label htmlFor="phone_number">
                                    Phone Number
                                    <InputError message={formik.touched.phone_number && formik.errors.phone_number ? formik.errors.phone_number : ''} />
                                </Label>

                                <Input
                                    id="phone_number"
                                    type="text"
                                    name="phone_number"
                                    value={ formik.values.phone_number }
                                    placeholder="Phone Number"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoFocus
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
                                    type="text"
                                    name="email"
                                    value={ formik.values.email }
                                    placeholder="Email"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    autoFocus
                                />

                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="employment_type">
                                    Employment Type
                                    <InputError messages={formik.touched.employment_type && formik.errors.employment_type ? formik.errors.employment_type : ''} className="mt-2" />
                                </Label>

                                <Select
                                    id="employment_type"
                                    name="employment_type"
                                    value={formik.values.employment_type }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="_">select employment type</option>
                                    {
                                        dropdowns?.employment_types?.length ? dropdowns.employment_types.map(employmentType => (
                                            <option key={ employmentType } value={ employmentType }>{ employmentType }</option>
                                        ))
                                        :
                                        (
                                            <option value="_">employment types not found</option>
                                        )
                                    }
                                </Select>
                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="dob">
                                    Date of Birth
                                    <InputError message={formik.touched.dob && formik.errors.dob ? formik.errors.dob : ''} />
                                </Label>

                                <Input
                                    id="dob"
                                    type="date"
                                    name="dob"
                                    value={ formik.values.dob }
                                    placeholder="Date of birth"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="address">
                                    Address
                                    <InputError message={formik.touched.address && formik.errors.address ? formik.errors.address : ''} />
                                </Label>

                                <Input
                                    id="address"
                                    type="text"
                                    name="address"
                                    value={ formik.values.address }
                                    placeholder="Address"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="md:col-span-2">
                                <Label htmlFor="files">
                                    Picture
                                    <InputError messages={formik.touched.files && formik.errors.files ? formik.errors.files : ''} className="mt-2" />
                                </Label>

                                <FileInput 
                                    id="files" 
                                    name="files" 
                                    onChange={() => formik.setFieldValue("files", [...event.target.files])}
                                    className="mt-1 !bg-[#080808] !text-white group cursor-pointer" 
                                    multiple={false}
                                    >
                                    <span>Upload Picture</span>
                                    <Camera className="stroke-slate-800  group-hover:stroke-slate-100" />
                                </FileInput>
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
                                />

                            </div>
                            {/* Form Group end */}

                            {/* Form Group start */}
                            <div className="md:col-span-2">
                                <Label htmlFor="role">
                                    User Role
                                    <InputError messages={formik.touched.role && formik.errors.role ? formik.errors.role : ''} className="mt-2" />
                                </Label>

                                <Select
                                    id="role"
                                    name="role"
                                    value={formik.values.role }
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="_">select role</option>
                                    {
                                        dropdowns?.roles?.length ? dropdowns.roles.map(role => (
                                            <option key={ role.id } value={ role.name }>{ role.name }</option>
                                        ))
                                        :
                                        (
                                            <option value="_">roles not found</option>
                                        )
                                    }
                                </Select>
                            </div>
                            {/* Form Group end */}
                            
                            {/* Form Group start */}
                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {
                                    dropdowns?.permissions?.length ? dropdowns.permissions.map(permission => (
                                        <div key={permission.id}>
                                            <Label htmlFor={`permission-${permission.id}`}>
                                                {permission.name}
                                            </Label>

                                            <InputCheckbox
                                                id={`permission-${permission.id}`}
                                                name="permissions"
                                                value={permission.name}
                                                className="mt-1 bg-[#f5f5f5]"
                                                onChange={handleCheckboxChange}
                                                checked={formik.values.permissions?.includes(String(permission.name))}
                                                onBlur={formik.handleBlur}
                                                />
                                        </div>
                                    ))
                                    : 
                                    <>
                                        <input type="hidden" name="permissions" value="" />
                                        <span className="md:col-span-2">Permissions not found</span>
                                    </>
                                }
                            </div>
                            {/* Form Group end */}
                        </div>

                        {
                            can("Employees - Edit") ? 
                                <FormAction backUrl="/hr/employees" isSubmitted={isSubmitted} />
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