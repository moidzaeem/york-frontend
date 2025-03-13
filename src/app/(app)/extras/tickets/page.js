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
import CommentsModal from '@/components/modal/CommentsModal';
import PhotosModal from '@/components/modal/PhotosModal';
import { useRouter } from 'next/navigation';
import { useAccessControl } from '@/hooks/accessControl';


const Page = () => {

    const datatableRef = useRef(null);
    const [isDeletionModalVisible, setIsDeletionModalVisible] = useState(false);
    const [resourceID, setResourceID] = useState(0);
    const [isCommentsModalVisible, setIsCommentsModalVisible] = useState(false);
    const [isPhotosModalVisible, setIsPhotosModalVisible] = useState(false);
    const router = useRouter();
    const {permissions, can} = useAccessControl();

    if (!can(["Tickets - View", "Tickets - Create", "Tickets - Edit", "Tickets - Delete"])) {
        // navigate to 403 page.
        router.push(process.env.NEXT_PUBLIC_UNAUTHORIZED_ROUTE);
    }

    
    const closePhotosModal = () => {
        setIsPhotosModalVisible(false);
    };


    const handlePhotosPopup = (ticketID) => {
        setResourceID(ticketID);
        setIsPhotosModalVisible(true);
    }

    const closeCommentsModal = () => {
        setIsCommentsModalVisible(false);
    };

    const handleCommentsPopup = (ticketID) => {
        setResourceID(ticketID);
        setIsCommentsModalVisible(true);
    }

    const closeDeletionModal = () => {
        setIsDeletionModalVisible(false);
    };


    const handleDeletionPopup = (ticketID) => {
        setResourceID(ticketID);
        setIsDeletionModalVisible(true);
    }


    const actionButtons = (
        <>
            {
                can("Tickets - Create") ? 
                    <BaseLink href="/extras/tickets/new" className="bg-white md:bg-[#f5f5f5] text-base md:text-base" >
                        <Plus className="fill-slate-500" />
                        New Ticket
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
                Tickets
            </li>
        </ul>
    )

    const tableConfig = {
        remoteURL: "/api/tickets",
        title: <div className="flex items-center justify-start gap-3 text-sm md:text-xl font-semibold">
                    <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                        <SidebarExtras size="size-[23px] md:size-[23px]" className="stroke-slate-800 dark:stroke-slate-300" />
                    </span>
                    Tickets
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
                label: "User",
                key: "owner_name",
                field: "owner.name"
            },
            {
                label: "Subject",
                key: "subject"
            },
            {
                label: "Category",
                key: "category_name",
                field: "category.title"
            },
            {
                label: "Date",
                key: "created_at"
            },
            {
                label: "Status",
                key: "status",
                render: (data, row) => {
                    if (data == "New") {
                        return <span className="text-blue-500">{data}</span>
                    }
                    else if (data == "Solved") {
                        return <span className="text-green-500">{data}</span>
                    }
                    else if (data == "Accepted") {
                        return <span className="text-yellow-500">{data}</span>
                    }
                    else if (data == "Not Accepted") {
                        return <span className="text-orange-500">{data}</span>
                    }
                    else if (data == "Delayed") {
                        return <span className="text-danger-500">{data}</span>
                    }
                }
            },
            {
                label: "Action",
                key: null,
                render: (data, row) => {
                    return <ButtonGroupH>

                        {
                            can("Comments Popup") ? 
                                <SimpleIconButton className="border border-gray-600" onClick={ () => handleCommentsPopup(row.id) } title="comments">
                                    {
                                        row.total_comments > 0 ? 
                                            (
                                                <span className="size-4 text-sm flex items-center justify-center">{ row.total_comments }</span>
                                            ) : (
                                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                                </svg>
                                            )
                                    }
                                </SimpleIconButton>
                                :
                                ""
                        }

                        {
                            can("Photos Popup") ? 
                                <SimpleIconButton className="border border-gray-600" onClick={ () => handlePhotosPopup(row.id) } title="Photos">
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                    </svg>
                                </SimpleIconButton>
                                :
                                ""
                        }

                        {
                            can("Tickets - Edit") ? 
                                <SimpleIconLink href={`/extras/tickets/${row.id}`} className="border border-gray-600" title="Edit">
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                </SimpleIconLink>
                                :
                                ""
                        }

                        {
                            can("Tickets - Delete") ? 
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
                                        can("Comments Popup") ? 
                                            <SimpleIconButton className="border border-gray-600" onClick={ () => handleCommentsPopup(row.id) } title="comments">
                                                {
                                                    row.total_comments > 0 ? 
                                                        (
                                                            <span className="size-3 text-sm flex items-center justify-center">{ row.total_comments }</span>
                                                        ) : (
                                                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                                                            </svg>
                                                        )
                                                }
                                            </SimpleIconButton>
                                            :
                                            ""
                                    }

                                    {
                                        can("Photos Popup") ? 
                                            <SimpleIconButton className="border border-gray-600" onClick={ () => handlePhotosPopup(row.id) } title="Photos">
                                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                                                </svg>
                                            </SimpleIconButton>
                                            :
                                            ""
                                    }

                                    {
                                        can("Tickets - Edit") ? 
                                            <SimpleIconLink href={`/extras/tickets/${row.id}`} className="border border-gray-600" title="Edit">
                                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                </svg>
                                            </SimpleIconLink>
                                            :
                                            ""
                                    }

                                    {
                                        can("Tickets - Delete") ?
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
                                <span className="text-base text-gray-600 font-extrabold capitalize">User</span>
                        </div>
                        <div
                            className="text-base text-[#202224] font-extrabold uppercase">
                                { row.owner_name }
                        </div>
                        <div
                            className="w-full flex items-center justify-between gap-2">
                                <span className="text-base text-gray-600 font-extrabold capitalize">Subject</span>
                        </div>
                        <div
                            className="text-base text-[#202224] font-extrabold uppercase">
                                { row.subject }
                        </div>

                        <div className="flex flex-col gap-2 w-full mt-4">                            
                            <div className="w-full h-[30px] bg-white rounded-[15px] flex items-center justify-start gap-2 font-semibold text-sm">
                                <div className="rounded-[15px] bg-[#2BB592] text-white w-[132px] h-full flex items-center px-3">
                                    Category
                                </div>
                                <div className="grow text-[#939393] h-full flex items-center px-1">
                                    { row.category_name }
                                </div>
                            </div>
                            
                            <div className="w-full h-[30px] bg-white rounded-[15px] flex items-center justify-start gap-2 font-semibold text-sm">
                                <div className="rounded-[15px] bg-[#2BB592] text-white w-[132px] h-full flex items-center px-3">
                                    Date
                                </div>
                                <div className="grow text-[#939393] h-full flex items-center px-1">
                                    { row.created_at }
                                </div>
                            </div>
                            
                            <div className="w-full h-[30px] bg-white rounded-[15px] flex items-center justify-start gap-2 font-semibold text-sm">
                                <div className="rounded-[15px] bg-[#2BB592] text-white w-[132px] h-full flex items-center px-3">
                                    Status
                                </div>
                                <div className="grow text-[#939393] h-full flex items-center px-1">
                                    { row.status }
                                </div>
                            </div>
                            
                            <div
                                className="text-base text-gray-500 font-light">
                                    { row.description }
                            </div>
                        </div>
                    </div>
                );
            }
        }
    };


    return (
        <>
            <title>YORK - Tickets</title>

            <Card className="h-auto md:rounded-[15px] bg-transparent md:bg-white px-0 md:px-4 dark:bg-transparent md:dark:bg-gray-800" >
                <DataTable tableConfig={tableConfig} ref={datatableRef} />
            </Card>

            <DeleteConfirmationModal 
                isVisible={isDeletionModalVisible} 
                resourceID={resourceID} 
                remoteEndPoint='/api/tickets/delete' 
                onClose={closeDeletionModal}
                datatableRef={datatableRef} />

            <CommentsModal
                isVisible={ isCommentsModalVisible }
                commentsEndpoint= "/api/tickets/comments"
                newCommentEndpoint= "/api/tickets/comment"
                resourceID={ resourceID }
                onClose={ closeCommentsModal } />

            <PhotosModal
                isVisible={ isPhotosModalVisible }
                photosEndpoint= "/api/tickets/files"
                newPhotoEndpoint= "/api/tickets/file"
                resourceID={ resourceID }
                onClose={ closePhotosModal } />
        </>
    )
}

export default Page;