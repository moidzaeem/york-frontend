'use client'

import DataTable from '@/components/table/DataTable';
import Card from '@/components/card/Card';
import SimpleIconButton from '@/components/buttons/SimpleIconButton';
import ButtonGroupH from '@/components/buttons/ButtonGroupH';
import { useRef, useState } from 'react';
import ChangeStatusModal from '@/components/modal/ChangeStatusModal';
import Label from '@/components/Label';
import Select from '@/components/Select';
import Image from 'next/image';
import ChangeRoleModal from '@/components/modal/ChangeRoleModal';
import { useFetchDropdownData } from '@/hooks/fetchDropdownData';
import SidebarExtras from '@/components/icons/SidebarExtras';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccessControl } from '@/hooks/accessControl';


const Page = () => {

    const {dropdowns} = useFetchDropdownData("/api/dropdowns/user");

    const datatableRef = useRef(null);
    const [isRoleSwitchingModalVisible, setIsRoleSwitchingModalVisible] = useState(false);
    const [isChangingStatusModalVisible, setIsChangingStatusModalVisible] = useState(false);
    const [resourceID, setResourceID] = useState(0);
    const [resourceStatus, setResourceStatus] = useState("");
    const [resourceRole, setResourceRole] = useState("");
    const router = useRouter();
    const {permissions, can} = useAccessControl();

    if (!can(["Users - View", "Users - Change Status", "Users - Change Role"])) {
        // navigate to 403 page.
        router.push(process.env.NEXT_PUBLIC_UNAUTHORIZED_ROUTE);
    }

    const closeRoleSwitchingModal = () => {
        setIsRoleSwitchingModalVisible(false);
    };

    const closeChangingStatusModal = () => {
        setIsChangingStatusModalVisible(false);
    };


    const handleRoleSwitchingPopup = (userID, userRole) => {
        setResourceID(userID);
        setResourceRole(userRole);
        setIsRoleSwitchingModalVisible(true);
    }

    const handleRoleChange = () => {
        setResourceRole(prev => event.target.value);
    }

    const handleStatusChange = () => {
        setResourceStatus(prev => event.target.value);
    }

    const handleStatusChangingPopup = (userID, userStatus) => {
        setResourceID(userID);
        setResourceStatus(userStatus);
        setIsChangingStatusModalVisible(true);
    }


    const actionButtons = "";

    const breadcrumb = (
        <ul className="flex items-center justify-start gap-3">
            <li className="capitalize text-base text-gray-800 font-bold hover:text-blue-500 hover:underline cursor-pointer" >
                <Link href="/dashboard">Dashboard</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-500 font-bold">
                Users
            </li>
        </ul>
    )

    const tableConfig = {
        remoteURL: "/api/users",
        title: <div className="flex items-center justify-start gap-3 text-xl md:text-xl font-semibold">
                    <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                        <SidebarExtras size="size-[23px] md:size-[23px]" className="stroke-slate-800 dark:stroke-slate-300" />
                    </span>
                    Users
                </div>,
        tableFluid: false,
        actionButtons: actionButtons,
        tableWrapperClass: "pb-4 rounded-[15px] 2xl:rounded-[30px]",
        breadcrumb: breadcrumb,

        columns: [
            {
                label: "ID",
                key: "id"
            },
            {
                label: "User Name",
                key: "name"
            },
            {
                label: "Phone",
                key: "phone_number"
            },
            {
                label: "Email",
                key: "email"
            },
            {
                label: "Registration Date",
                key: "created_at"
            },
            {
                label: "Status",
                key: "status",
                render: (data, row) => {
                    if (row.status === "Pending") {
                        return <span className="text-orange-400">Pending</span>
                    }

                    if (row.status === "Approved") {
                        return <span className="text-green-500">Approved</span>
                    }

                    if (row.status === "Rejected") {
                        return <span className="text-red-500">Rejected</span>
                    }

                    if (row.status === "Banned") {
                        return <span className="text-red-700">Banned</span>
                    }
                }
            },
            {
                label: "Action",
                key: null,
                render: (data, row) => {
                    return <ButtonGroupH>
                        {
                            can("Users - Change Status") ? 
                                <SimpleIconButton onClick={() => handleStatusChangingPopup(row.id, row.status)} className="border border-gray-600" title="Change Status">
                                    <svg fill="currentColor" className="size-4" viewBox="0 0 16 16">
                                        <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16M1 8a7 7 0 0 0 7 7 3.5 3.5 0 1 0 0-7 3.5 3.5 0 1 1 0-7 7 7 0 0 0-7 7"/>
                                    </svg>
                                </SimpleIconButton>
                                :
                                ""
                        }

                        {
                            can("Users - Change Role") ? 
                                <SimpleIconButton className="border border-gray-600" onClick={ () => handleRoleSwitchingPopup(row.id, row.role_name) } title="Switch Role">

                                    <svg fill="currentColor" className="size-4" viewBox="0 0 16 16">
                                        <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                                    </svg>
                                </SimpleIconButton>
                                :
                                ""
                        }
                    </ButtonGroupH>
                }
            },
        ],
        mobile_view: {
            render: (row) => {
                let statusClass = "";

                if (row.status === "Pending") {
                    statusClass = "bg-orange-400 text-white";
                }

                if (row.status === "Approved") {
                    statusClass = "bg-green-500 text-white";
                }

                if (row.status === "Rejected") {
                    statusClass = "bg-red-500 text-white";
                }

                if (row.status === "Banned") {
                    statusClass = "bg-red-700 text-white";
                }

                
                return (
                    <div 
                        key={row.id} 
                        className="w-full h-min p-4 bg-[#f5f5f5] rounded-[15px] flex flex-col items-start justify-start gap-2">
                        <div
                            className="text-xs text-gray-700 font-extrabold w-full flex items-center justify-between gap-5">
                                <span className="text-gray-400">ID: {row.id}</span>
                                <ButtonGroupH>
                                    {
                                        can("Users - Change Status") ? 
                                            <SimpleIconButton onClick={() => handleStatusChangingPopup(row.id, row.status)} className="border border-gray-600" title="Change Status">
                                                <svg fill="currentColor" className="size-3" viewBox="0 0 16 16">
                                                    <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16M1 8a7 7 0 0 0 7 7 3.5 3.5 0 1 0 0-7 3.5 3.5 0 1 1 0-7 7 7 0 0 0-7 7"/>
                                                </svg>
                                            </SimpleIconButton>
                                            :
                                            ""
                                    }

                                    {
                                        can("Users - Change Role") ? 
                                            <SimpleIconButton className="border border-gray-600" onClick={ () => handleRoleSwitchingPopup(row.id, row.role_name) } title="Switch Role">
                                                <svg fill="currentColor" className="size-3" viewBox="0 0 16 16">
                                                    <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                                                </svg>
                                            </SimpleIconButton>
                                            :
                                            ""
                                    }
                                </ButtonGroupH>
                        </div>

                        <div className="w-full flex items-center justify-start gap-2 my-4">
                            
                            <Image src={row.avatar} width={72} height={72} className="rounded-full size-[72px] aspect-square" alt="profile photo" />
                            
                            <div className="flex flex-col">
                                <div className="text-base text-[#202224] font-extrabold uppercase">
                                        { row.name }
                                </div>
                                {
                                    row.role_name && (
                                        <div className="text-base text-gray-600 font-light">
                                                { row.role_name }
                                        </div>
                                    )
                                }
                                {
                                    row.is_client && (
                                        <div className="text-base text-gray-600 font-light">
                                                { row.is_client }
                                        </div>
                                    )
                                }
                                {
                                    row.blacklist && (
                                        <div className="text-base text-gray-600 font-light">
                                                { row.blacklist }
                                        </div>
                                    )
                                }
                                {
                                    row.special && (
                                        <div className="text-base text-gray-600 font-light">
                                                { row.special }
                                        </div>
                                    )
                                }
                                <div className="text-base text-gray-600 font-light">
                                        { row.created_at }
                                </div>
                            </div>
                        </div>

                        <div className="text-base text-gray-600 font-light my-4">
                                { row.address }
                        </div>

                        <div className="w-full flex flex-col gap-3">
                            <span className="w-full px-4 py-1 border-2 border-[#2BB592] dark:border-gray-800 text-gray-700 text-base font-extrabold rounded-full">
                                { row.phone_number }
                            </span>
                            <span className="w-full px-4 py-1 border-2 border-[#2BB592] dark:border-gray-800 text-gray-700 text-base font-extrabold rounded-full">
                                { row.email }
                            </span>
                        </div>

                        <div className="w-full h-[1px] border-t-2 border-gray-200 dark:border-gray-700 my-4"></div>

                        <div className="w-full flex items-center justify-end">
                            <span className={`w-max px-4 py-1 ${statusClass} dark:bg-gray-800 text-base font-extrabold rounded-full`}>
                                { row.status }
                            </span>
                        </div>
                    </div>
                );
            }
        }
    };


    return (
        <>
            <title>YORK - Users</title>

            <Card className="h-auto md:rounded-[15px] bg-transparent md:bg-white px-0 md:px-4 dark:bg-transparent md:dark:bg-gray-800" >
                <DataTable tableConfig={tableConfig} ref={datatableRef} />
            </Card>

            <ChangeStatusModal 
                isVisible={isChangingStatusModalVisible} 
                resourceID={resourceID} 
                resourceStatus={resourceStatus} 
                remoteEndPoint='/api/users/change_status' 
                onClose={closeChangingStatusModal}
                datatableRef={datatableRef} >

                    {/* Form Group start */}
                    <div className="">
                        <Label htmlFor="status">User Status</Label>

                        <Select
                            id="status"
                            name="status"
                            value={resourceStatus}
                            onChange={handleStatusChange}
                            className="block mt-1 w-full bg-[#f5f5f5]"
                            required
                            autoFocus
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

                </ChangeStatusModal>

            <ChangeRoleModal 
                isVisible={isRoleSwitchingModalVisible} 
                resourceID={resourceID} 
                resourceRole={resourceRole} 
                remoteEndPoint='/api/users/switch_role' 
                onClose={closeRoleSwitchingModal}
                datatableRef={datatableRef} >

                    {/* Form Group start */}
                    <div className="">
                        <Label htmlFor="role">User Role</Label>

                        <Select
                            id="role"
                            name="role"
                            value={resourceRole}
                            className="block mt-1 w-full bg-[#f5f5f5]"
                            onChange={handleRoleChange}
                            autoFocus
                        >
                           <option value="_">select role</option>
                            {
                                dropdowns?.roles?.length ? dropdowns.roles.map(role => (
                                    <option key={ role } value={ role }>{ role }</option>
                                ))
                                :
                                (
                                    <option value="_">roles not found</option>
                                )
                            }
                        </Select>
                    </div>
                    {/* Form Group end */}

                </ChangeRoleModal>
        </>
    )
}

export default Page;