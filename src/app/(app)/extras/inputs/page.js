'use client'

import DataTable from '@/components/table/DataTable';
import Card from '@/components/card/Card';
import Plus from '@/components/icons/Plus';
import BaseLink from '@/components/buttons/BaseLink';
import SimpleIconButton from '@/components/buttons/SimpleIconButton';
import ButtonGroupH from '@/components/buttons/ButtonGroupH';
import SimpleIconLink from '@/components/buttons/SimpleIconLink';
import SidebarExtras from '@/components/icons/SidebarExtras';
import DeleteConfirmationModal from '@/components/modal/deleteConfirm';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAccessControl } from '@/hooks/accessControl';
// import Container from '@/components/container/Container';


const Page = () => {

    const datatableRef = useRef(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [resourceID, setResourceID] = useState(0);
    const router = useRouter();
    const {permissions, can} = useAccessControl();

    if (!can(["Inputs - View", "Inputs - Create", "Inputs - Edit", "Inputs - Delete"])) {
        // navigate to 403 page.
        router.push(process.env.NEXT_PUBLIC_UNAUTHORIZED_ROUTE);
    }

    const closeModal = () => {
        setIsModalVisible(false);
    };


    const handleDeletionPopup = (inputID) => {
        setResourceID(inputID);
        setIsModalVisible(true);
    }


    const actionButtons = (
        <>
            {
                can("Inputs - Create") ? 
                    <BaseLink href="/extras/inputs/new" className="bg-white md:bg-[#f5f5f5] text-base md:text-base" >
                        <Plus className="fill-slate-500" />
                        New Input
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
                Inputs
            </li>
        </ul>
    )

    const tableConfig = {
        remoteURL: "/api/inputs",
        title: <div className="flex items-center justify-start gap-3 text-xl md:text-xl font-semibold">
                    <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                        <SidebarExtras size="size-[23px] md:size-[23px]" className="stroke-slate-800 dark:stroke-slate-300" />
                    </span>
                    Inputs
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
                label: "Name",
                key: "name"
            },
            {
                label: "code",
                key: "code"
            },
            {
                label: "Created At",
                key: "created_at"
            },
            {
                label: "Updated At",
                key: "updated_at"
            },
            {
                label: "Action",
                key: null,
                render: (data, row) => {
                    return <ButtonGroupH>
                        {
                            can("Inputs - Edit") ? 
                                <SimpleIconLink href={`/extras/inputs/${row.id}`} className="border border-gray-600" title="Edit">
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                </SimpleIconLink>
                                :
                                ""
                        }

                        {
                            can("Inputs - Delete") ? 
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
                                    <SimpleIconLink href={`/extras/inputs/${row.id}`} className="border border-gray-600" title="Edit">
                                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                        </svg>
                                    </SimpleIconLink>
                                    <SimpleIconButton className="border border-gray-600" onClick={ () => handleDeletionPopup(row.id) } title="Delete">
                                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                        </svg>
                                    </SimpleIconButton>
                                </ButtonGroupH>
                        </div>
                        <div
                            className="w-full flex items-center justify-between gap-2">
                                <span className="text-base text-gray-600 font-extrabold capitalize">Name</span>
                        </div>
                        <div
                            className="text-base text-[#202224] font-extrabold uppercase">
                                { row.name }
                        </div>

                        <div className="flex flex-col gap-2 w-full mt-4">                            
                            <div className="w-full h-[30px] bg-white rounded-[15px] flex items-center justify-start gap-2 font-semibold text-sm">
                                <div className="rounded-[15px] bg-[#2BB592] text-white w-[132px] h-full flex items-center px-3">
                                    Code
                                </div>
                                <div className="grow text-[#939393] h-full flex items-center px-1">
                                    { row.code }
                                </div>
                            </div>
                            
                            <div className="w-full h-[30px] bg-white rounded-[15px] flex items-center justify-start gap-2 font-semibold text-sm">
                                <div className="rounded-[15px] bg-[#2BB592] text-white w-[132px] h-full flex items-center px-3">
                                    Category
                                </div>
                                <div className="grow text-[#939393] h-full flex items-center px-1">
                                    { row.category.title }
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
            <title>YORK - Inputs</title>

            <Card className="h-auto md:rounded-[15px] bg-transparent md:bg-white px-0 md:px-4 dark:bg-transparent md:dark:bg-gray-800" >
                <DataTable tableConfig={tableConfig} ref={datatableRef} />
            </Card>

            <DeleteConfirmationModal 
                isVisible={isModalVisible} 
                resourceID={resourceID} 
                remoteEndPoint='/api/inputs/delete' 
                onClose={closeModal}
                datatableRef={datatableRef} />
        </>
    )
}

export default Page;