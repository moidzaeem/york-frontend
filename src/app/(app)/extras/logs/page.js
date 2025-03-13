'use client'

import DataTable from '@/components/table/DataTable';
import Card from '@/components/card/Card';
import SimpleIconButton from '@/components/buttons/SimpleIconButton';
import ButtonGroupH from '@/components/buttons/ButtonGroupH';
import SidebarExtras from '@/components/icons/SidebarExtras';
import DeleteConfirmationModal from '@/components/modal/deleteConfirm';
import { useRef, useState } from 'react';
import Link from 'next/link';
import axios from "@/lib/axios"
import { useRouter } from 'next/navigation';
import { useAccessControl } from '@/hooks/accessControl';


const Page = () => {

    const datatableRef = useRef(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [resourceID, setResourceID] = useState(0);
    const router = useRouter();
    const {permissions, can} = useAccessControl();

    if (!can(["Logs - View", "Logs - Delete"])) {
        // navigate to 403 page.
        router.push(process.env.NEXT_PUBLIC_UNAUTHORIZED_ROUTE);
    }

    const closeModal = () => {
        setIsModalVisible(false);
    };


    const handleDeletionPopup = (logID) => {
        setResourceID(logID);
        setIsModalVisible(true);
    }


    const actionButtons = "";

    const breadcrumb = (
        <ul className="flex items-center justify-start gap-3">
            <li className="capitalize text-base text-gray-800 font-bold hover:text-blue-500 hover:underline cursor-pointer" >
                <Link href="/dashboard">Dashboard</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-500 font-bold">
                Logs
            </li>
        </ul>
    )

    const tableConfig = {
        remoteURL: "/api/logs",
        title: <div className="flex items-center justify-start gap-3 text-xl md:text-xl font-semibold">
                    <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                        <SidebarExtras size="size-[23px] md:size-[23px]" className="stroke-slate-800 dark:stroke-slate-300" />
                    </span>
                    Logs
                </div>,
        tableFluid: false,
        actionButtons: actionButtons,
        tableWrapperClass: "pb-4 rounded-[15px] 2xl:rounded-[30px]",
        search: false,
        breadcrumb: breadcrumb,

        columns: [
            {
                label: "ID",
                key: "id"
            },
            {
                label: "Operation",
                key: "description"
            },
            {
                label: "Date",
                key: "created_at"
            },
            {
                label: "Action",
                key: null,
                render: (data, row) => {
                    return <ButtonGroupH>

                        {
                            can("Logs - Delete") ? 
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
                            className="text-xs text-gray-700 font-extrabold w-full flex items-center justify-between gap-5">
                                <span className="text-gray-400">ID: {row.id}</span>
                                <ButtonGroupH>

                                    {
                                        can("Logs - Delete") ? 
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
                            className="w-full flex items-center justify-between gap-2">
                                <span className="text-base text-gray-600 font-extrabold capitalize">Operation</span>
                        </div>
                        <div
                            className="text-base text-[#202224] font-extrabold uppercase">
                                { row.description }
                        </div>

                        <div className="flex flex-col gap-2 w-full mt-4">       
                            
                            <div className="w-full h-[30px] bg-white rounded-[15px] flex items-center justify-start gap-2 font-semibold text-sm">
                                <div className="rounded-[15px] bg-[#2BB592] text-white w-[132px] h-full flex items-center px-3">
                                    Date
                                </div>
                                <div className="grow text-[#939393] h-full flex items-center px-1">
                                    { row.created_at }
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        }
    };


    return (
        <>
            <title>YORK - Logs</title>

            <Card className="h-auto md:rounded-[15px] bg-transparent md:bg-white px-0 md:px-4 dark:bg-transparent md:dark:bg-gray-800" >
                <DataTable tableConfig={tableConfig} ref={datatableRef} />
            </Card>

            <DeleteConfirmationModal 
                isVisible={isModalVisible} 
                resourceID={resourceID} 
                remoteEndPoint='/api/logs/delete' 
                onClose={closeModal}
                datatableRef={datatableRef} />
        </>
    )
}

export default Page;