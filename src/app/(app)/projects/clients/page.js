'use client'

import DataTable from '@/components/table/DataTable';
import Card from '@/components/card/Card';
import Plus from '@/components/icons/Plus';
import BaseLink from '@/components/buttons/BaseLink';
import SimpleIconButton from '@/components/buttons/SimpleIconButton';
import ButtonGroupH from '@/components/buttons/ButtonGroupH';
import SimpleIconLink from '@/components/buttons/SimpleIconLink';
import { useRef, useState } from 'react';
import SidebarProjects from '@/components/icons/SidebarProjects';
import DeleteConfirmationModal from '@/components/modal/deleteConfirm';
import BaseButton from '@/components/buttons/BaseButton';
import Download from '@/components/icons/Download';
import { useShowOrDownload } from '@/hooks/showOrDownload';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccessControl } from '@/hooks/accessControl';
// import Container from '@/components/container/Container';


const Page = () => {

    const datatableRef = useRef(null);
    const [exportToExcel, loadingStatus] = useShowOrDownload();
    const [isDeletionModalVisible, setIsDeletionModalVisible] = useState(false);
    const [resourceID, setResourceID] = useState(0);
    const router = useRouter();
    const {permissions, can} = useAccessControl();

    if (!can(["Clients - View", "Clients - Create", "Clients - Edit", "Clients - Delete"])) {
        // navigate to 403 page.
        router.push(process.env.NEXT_PUBLIC_UNAUTHORIZED_ROUTE);
    }

    const closeDeletionModal = () => {
        setIsDeletionModalVisible(false);
    };


    const handleDeletionPopup = (clientID) => {
        setResourceID(clientID);
        setIsDeletionModalVisible(true);
    }


    const actionButtons = (
        <>
            <BaseButton onClick={async () => { await exportToExcel("clients") }} className="bg-white md:bg-[#f5f5f5] text-base md:text-base" >
                <Download className="fill-slate-500" />
                Download
            </BaseButton>

            {
                can("Clients - Create") ?
                    <BaseLink href="/projects/clients/new" className="bg-white md:bg-[#f5f5f5] text-base md:text-base" >
                        <Plus className="fill-slate-500" />
                        New Client
                    </BaseLink>
                    :
                    ""
            }
        </>
    );

    const breadcrumb = (
        <ul className="flex items-center justify-start gap-3">
            <li className="capitalize text-base text-gray-800 font-bold hover:text-blue-500 hover:underline cursor-pointer" >
                <Link href="/dashboard">Dashboard</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-500 font-bold">
                Clients
            </li>
        </ul>
    )

    const tableConfig = {
        remoteURL: "/api/clients",
        title: <div className="flex items-center justify-start gap-3 text-xl md:text-xl font-semibold">
                    <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                        <SidebarProjects size="size-[23px] md:size-[23px]" className="stroke-slate-800 dark:stroke-slate-300" />
                    </span>
                    Clients
                </div>,
        tableFluid: false,
        actionButtons: actionButtons,
        tableWrapperClass: "pb-4 rounded-[15px] 2xl:rounded-[30px]",
        breadcrumb: breadcrumb,

        columns: [
            {
                label: "Client Name",
                key: "client_name",
                field: "profile.name",
                render: (data, row) => {
                    let icon = "";

                    if (row.blacklist) {
                        icon = <svg fill="currentColor" className="size-4 text-red-600" viewBox="0 0 16 16">
                                <path d="M15 8a6.97 6.97 0 0 0-1.71-4.584l-9.874 9.875A7 7 0 0 0 15 8M2.71 12.584l9.874-9.875a7 7 0 0 0-9.874 9.874ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0"/>
                            </svg>
                    }
                    else if (row.special) {
                        icon = <svg fill="currentColor" className="size-4 text-green-600" viewBox="0 0 16 16">
                                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                            </svg>
                    }

                    return <span className="flex items-center justify-start gap-1">
                        { icon }
                        { data }
                    </span>
                }
            },
            {
                label: "Email",
                key: "email",
                field: "profile.email"
            },
            {
                label: "Phone",
                key: "phone_gsm",
                field: "profile.phone_number"
            },
            {
                label: "Status",
                key: "status"
            },
            {
                label: "Reg.Date",
                key: "created_at"
            },
            {
                label: "Action",
                key: null,
                render: (data, row) => {
                    return <ButtonGroupH>

                        {
                            can("Clients - Edit") ? 
                                <SimpleIconLink href={`/projects/clients/${row.client_id}`} className="border border-gray-600" title="Edit">
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                </SimpleIconLink>
                                :
                                ""
                        }

                        {
                            can ("Clients - Delete") ? 
                                <SimpleIconButton className="border border-gray-600" onClick={ () => handleDeletionPopup(row.id) } title="Delete">
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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

                return (
                    <div 
                        key={row.id} 
                        className="w-full h-min p-4 bg-[#f5f5f5] rounded-[15px] flex flex-col gap-2">
                        <div
                            className="text-sm text-gray-700 font-extrabold w-full flex items-center justify-between gap-5">
                                <span className="text-gray-400">ID: {row.id}</span>
                                <ButtonGroupH>

                                    {
                                        can ("Clients - Edit") ? 
                                            <SimpleIconLink href={`/projects/clients/${row.client_id}`} className="border border-gray-600" title="Edit">
                                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                </svg>
                                            </SimpleIconLink>
                                            :
                                            ""
                                    }

                                    {
                                        can ("Clients - Delete") ? 
                                            <SimpleIconButton className="border border-gray-600" onClick={ () => handleDeletionPopup(row.id) } title="Delete">
                                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </SimpleIconButton>
                                            :
                                            ""
                                    }
                                    
                                </ButtonGroupH>
                        </div>
                        <div
                            className="w-full flex items-center justify-end gap-2">
                                <span className="w-max px-4 py-1 bg-white dark:bg-gray-800 text-gray-600 text-sm font-bold rounded-full">
                                    Reg.Date: {row.created_at}
                                </span>
                        </div>
                        <div
                            className="w-full flex items-center justify-start gap-2">
                                <span className="text-base text-[#202224] font-extrabold capitalize">{row.client_name}</span>
                        </div>
                        <div
                            className="flex flex-col gap-3 text-sm text-gray-700 font-semibold">
                                <span className="w-full text-wrap">Phone: {row.phone_gsm}</span>
                                <span className="w-full text-wrap">Email: {row.email}</span>
                                <span className="w-full text-wrap">Office Address: {row.address}</span>
                        </div>

                        <div className="bg-[#13ad86] px-5 py-2 rounded-full font-semibold capitalize text-sm text-white md:text-base text-center" >
                            { row.status }
                        </div>
                    </div>
                );
            }
        }
    };


    return (
        <>
            <title>YORK - Clients</title>

            <Card className="h-auto md:rounded-[15px] bg-transparent md:bg-white px-0 md:px-4 dark:bg-transparent md:dark:bg-gray-800" >
                <DataTable tableConfig={tableConfig} ref={datatableRef} />

                <DeleteConfirmationModal 
                    isVisible={isDeletionModalVisible} 
                    resourceID={resourceID} 
                    remoteEndPoint='/api/clients/delete' 
                    onClose={closeDeletionModal}
                    datatableRef={datatableRef} />
            </Card>
        </>
    )
}

export default Page;