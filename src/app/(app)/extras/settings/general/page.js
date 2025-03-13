'use client'

import Card from '@/components/card/Card';
import Label from '@/components/Label';
import Input from '@/components/Input';
import InputError from '@/components/InputError';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormAction from '@/components/forms/FormAction';
import { useSubmitData } from '@/hooks/submitData';
import SidebarExtras from '@/components/icons/SidebarExtras';
import { useFetchDropdownData } from '@/hooks/fetchDropdownData';
import { useFetchData } from '@/hooks/fetchData';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccessControl } from '@/hooks/accessControl';


const Page = () => {

    const { isSubmitted: isGeneralSettingsSubmitted, submitData: submitGeneralSettings} = useSubmitData('/api/settings/general/save');
    const { isSubmitted: isMailServerSettingsSubmitted, submitData: submitMailServerSettings} = useSubmitData('/api/settings/mailserver/save');
    const { isSubmitted: isSocialMediaSettingsSubmitted, submitData: submitSocialMediaSettings} = useSubmitData('/api/settings/social/save');
    const router = useRouter();
    const {permissions, can} = useAccessControl();

    if (!can("General Settings")) {
        // navigate to 403 page.
        router.push(process.env.NEXT_PUBLIC_UNAUTHORIZED_ROUTE);
    }

    const [ settings ] = useFetchData("/api/settings");

    const generalSettings = useFormik({
        initialValues: settings?.general ?? {
            company_name: "",
            system_url: ""
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            company_name: Yup.string()
                .min(3, "Must be 3 characters or more")
                .max(35, "Must be 35 characters or less")
                .required(),
            system_url: Yup.string()
                .url("Must be a valid URL")
                .max(35, "Must be 35 characters or less")
                .required()
        }),
        onSubmit: submitGeneralSettings
    });

    const mailServerSettings = useFormik({
        initialValues: settings?.mail_server ?? {
            host: "",
            email: "",
            password: "",
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            host: Yup.string()
                .min(3, "Must be 3 characters or more")
                .max(100, "URL too long")
                .required(),
            email: Yup.string()
                .email("Must be a valid email")
                .max(35, "Email too long"),
            password: Yup.string()
                .required('Required')
        }),
        onSubmit: submitMailServerSettings
    });

    const socialMediaSettings = useFormik({
        initialValues: settings?.social_media ?? {
            facebook: "",
            twitter: "",
            instagram: "",
            youtube: "",
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            facebook: Yup.string()
                .url("Must be a valid URL")
                .max(100, "Url too long"),
            twitter: Yup.string()
                .url("Must be a valid URL")
                .max(100, "Url too long"),
            instagram: Yup.string()
                .url("Must be a valid URL")
                .max(100, "Url too long"),
            youtube: Yup.string()
                .url("Must be a valid URL")
                .max(100, "Url too long")
        }),
        onSubmit: submitSocialMediaSettings
    });

    const breadcrumb = (
        <ul className="flex items-center justify-start gap-3">
            <li className="capitalize text-base text-gray-800 font-bold hover:text-blue-500 hover:underline cursor-pointer" >
                <Link href="/dashboard">Dashboard</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-500 font-bold">
                General Settings
            </li>
        </ul>
    )

    return (
        <>
            <title>YORK - Settings</title>

            <Card className="h-auto min-h-96 md:rounded-[15px] bg-white md:bg-white px-0 md:px-4 dark:bg-transparent md:dark:bg-gray-800" >
                <div className="w-full flex flex-row gap-3 items-center justify-between px-4 my-8">
                    <div className="flex items-center justify-start gap-3 text-xl md:text-xl font-semibold">
                        <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                            <SidebarExtras size="size-[23px] md:size-[23px]" className="fill-slate-800 dark:fill-slate-300" />
                        </span>
                        General Settings
                    </div>
                </div>

                <div className="w-full px-4 mt-12">
                    <form onSubmit={ can("General Settings") ? generalSettings.handleSubmit : () => false }>
                        <div className="grid grid-cols-1 gap-x-11 gap-y-6">
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="company_name">
                                    Company Name
                                    <InputError message={generalSettings.touched.company_name && generalSettings.errors.company_name ? generalSettings.errors.company_name : ''} />
                                </Label>

                                <Input
                                    id="company_name"
                                    type="text"
                                    name="company_name"
                                    value={ generalSettings.values.company_name }
                                    placeholder="Event Name"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={generalSettings.handleChange}
                                    onBlur={generalSettings.handleBlur}
                                    autoFocus
                                />
                            </div>
                            {/* Form Group end */}
                            
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="system_url">
                                    System URL
                                    <InputError message={generalSettings.touched.system_url && generalSettings.errors.system_url ? generalSettings.errors.system_url : ''} />
                                </Label>

                                <Input
                                    id="system_url"
                                    type="url"
                                    name="system_url"
                                    value={ generalSettings.values.system_url }
                                    placeholder="Event Name"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={generalSettings.handleChange}
                                    onBlur={generalSettings.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}

                        </div>

                        {
                            can("General Settings") ? 
                                <FormAction isSubmitted={isGeneralSettingsSubmitted} />
                                :
                                ""
                        }
                    </form>

                    <h3 className="text-bold text-2xl text-gray-800 mt-12 mb-5">Mail Server Information</h3>

                    <form onSubmit={ can("General Settings") ? mailServerSettings.handleSubmit : () => false }>
                        <div className="grid grid-cols-1 gap-x-11 gap-y-6">
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="host">
                                    Mail Server Host
                                    <InputError message={mailServerSettings.touched.host && mailServerSettings.errors.host ? mailServerSettings.errors.host : ''} />
                                </Label>

                                <Input
                                    id="host"
                                    type="text"
                                    name="host"
                                    value={ mailServerSettings.values.host }
                                    placeholder="Mail Server Host"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={mailServerSettings.handleChange}
                                    onBlur={mailServerSettings.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}
                            
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="email">
                                    Email Address
                                    <InputError message={mailServerSettings.touched.email && mailServerSettings.errors.email ? mailServerSettings.errors.email : ''} />
                                </Label>

                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={ mailServerSettings.values.email }
                                    placeholder="Email address"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={mailServerSettings.handleChange}
                                    onBlur={mailServerSettings.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}
                            
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="password">
                                    Password
                                    <InputError message={mailServerSettings.touched.password && mailServerSettings.errors.password ? mailServerSettings.errors.password : ''} />
                                </Label>

                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={ mailServerSettings.values.password }
                                    placeholder="Password"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={mailServerSettings.handleChange}
                                    onBlur={mailServerSettings.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}

                        </div>

                        {
                            can("General Settings") ? 
                                <FormAction isSubmitted={isMailServerSettingsSubmitted} />
                                :
                                ""
                        }
                    </form>

                    
                    <h3 className="text-bold text-2xl text-gray-800 mt-12 mb-5">Social Media Information</h3>

                    <form onSubmit={ can("General Settings") ? socialMediaSettings.handleSubmit : () => false}>
                        <div className="grid grid-cols-1 gap-x-11 gap-y-6">
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="facebook">
                                    Facebook
                                    <InputError message={socialMediaSettings.touched.facebook && socialMediaSettings.errors.facebook ? socialMediaSettings.errors.facebook : ''} />
                                </Label>

                                <Input
                                    id="facebook"
                                    type="url"
                                    name="facebook"
                                    value={ socialMediaSettings.values.facebook }
                                    placeholder="Facebook Link"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={socialMediaSettings.handleChange}
                                    onBlur={socialMediaSettings.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}
                            
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="twitter">
                                    X (Twitter)
                                    <InputError message={socialMediaSettings.touched.twitter && socialMediaSettings.errors.twitter ? socialMediaSettings.errors.twitter : ''} />
                                </Label>

                                <Input
                                    id="twitter"
                                    type="url"
                                    name="twitter"
                                    value={ socialMediaSettings.values.twitter }
                                    placeholder="X (Twitter) Link"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={socialMediaSettings.handleChange}
                                    onBlur={socialMediaSettings.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}
                            
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="instagram">
                                    Instagram
                                    <InputError message={socialMediaSettings.touched.instagram && socialMediaSettings.errors.instagram ? socialMediaSettings.errors.instagram : ''} />
                                </Label>

                                <Input
                                    id="instagram"
                                    type="url"
                                    name="instagram"
                                    value={ socialMediaSettings.values.instagram }
                                    placeholder="Instagram Link"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={socialMediaSettings.handleChange}
                                    onBlur={socialMediaSettings.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}
                            
                            {/* Form Group start */}
                            <div className="">
                                <Label htmlFor="youtube">
                                    Youtube
                                    <InputError message={socialMediaSettings.touched.youtube && socialMediaSettings.errors.youtube ? socialMediaSettings.errors.youtube : ''} />
                                </Label>

                                <Input
                                    id="youtube"
                                    type="url"
                                    name="youtube"
                                    value={ socialMediaSettings.values.youtube }
                                    placeholder="Youtube Link"
                                    className="block mt-1 w-full bg-[#f5f5f5]"
                                    onChange={socialMediaSettings.handleChange}
                                    onBlur={socialMediaSettings.handleBlur}
                                />
                            </div>
                            {/* Form Group end */}

                        </div>

                        {
                            can("General Settings") ? 
                                <FormAction isSubmitted={isSocialMediaSettingsSubmitted} />
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