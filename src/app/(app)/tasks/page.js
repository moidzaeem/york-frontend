'use client'

import { useRef, useState } from 'react';
import DataTable from '@/components/table/DataTable';
import Card from '@/components/card/Card';
import Plus from '@/components/icons/Plus';
import TasksIcon from '@/components/icons/Tasks';
import BaseLink from '@/components/buttons/BaseLink';
import BaseButton from '@/components/buttons/BaseButton';
import Download from '@/components/icons/Download';
import Archieved from '@/components/icons/Archieved';
import SimpleIconButton from '@/components/buttons/SimpleIconButton';
import ButtonGroupH from '@/components/buttons/ButtonGroupH';
import SimpleIconLink from '@/components/buttons/SimpleIconLink';
import DeleteConfirmationModal from '@/components/modal/deleteConfirm';
import ArchiveConfirmationModal from '@/components/modal/ArchiveConfirm';
import ChangeStatusModal from '@/components/modal/ChangeStatusModal';
import Label from '@/components/Label';
import Select from '@/components/Select';
import { useFetchDropdownData } from '@/hooks/fetchDropdownData';
import Link from 'next/link';
import { useShowOrDownload } from '@/hooks/showOrDownload';
import CommentsModal from '@/components/modal/CommentsModal';
import PhotosModal from '@/components/modal/PhotosModal';
import { useRouter } from 'next/navigation';
import { useAccessControl } from '@/hooks/accessControl';
// import Container from '@/components/container/Container';


const Page = () => {

    const {dropdowns} = useFetchDropdownData("/api/dropdowns/task");
    const [exportToExcel, loadingStatus] = useShowOrDownload();
    
    const datatableRef = useRef(null);
    const [isCommentsModalVisible, setIsCommentsModalVisible] = useState(false);
    const [isPhotosModalVisible, setIsPhotosModalVisible] = useState(false);
    const [isDeletionModalVisible, setIsDeletionModalVisible] = useState(false);
    const [isArchivingModalVisible, setIsArchivingModalVisible] = useState(false);
    const [isChangingStatusModalVisible, setIsChangingStatusModalVisible] = useState(false);
    const [resourceID, setResourceID] = useState(0);
    const [resourceStatus, setResourceStatus] = useState("");
    const router = useRouter();
    const {permissions, can} = useAccessControl();

    if (!can(["Tasks - View", "Tasks - Create", "Tasks - Edit", "Tasks - Delete"])) {
        // navigate to 403 page.
        // router.push(process.env.NEXT_PUBLIC_UNAUTHORIZED_ROUTE);
    }

    const handleStatusChange = () => {
        setResourceStatus(event.target.value);
    };

    const closeDeletionModal = () => {
        setIsDeletionModalVisible(false);
    };

    const closeArchivingModal = () => {
        setIsArchivingModalVisible(false);
    };

    const closeChangingStatusModal = () => {
        setIsChangingStatusModalVisible(false);
    };

    const closeCommentsModal = () => {
        setIsCommentsModalVisible(false);
    };

    const handleCommentsPopup = (taskID) => {
        setResourceID(taskID);
        setIsCommentsModalVisible(true);
    }
    
    const closePhotosModal = () => {
        setIsPhotosModalVisible(false);
    };


    const handlePhotosPopup = (taskID) => {
        setResourceID(taskID);
        setIsPhotosModalVisible(true);
    }


    const handleDeletionPopup = (taskID) => {
        setResourceID(taskID);
        setIsDeletionModalVisible(true);
    }

    const handleStatusChangingPopup = (taskID, taskStatus) => {
        setResourceID(taskID);
        setResourceStatus(taskStatus);
        setIsChangingStatusModalVisible(true);
    }


    const handleArchivePopup = (taskID) => {
        setResourceID(taskID);
        setIsArchivingModalVisible(true);
    }


    const actionButtons = (
        <>
            {
                can("Tasks - Create") ? 
                    <BaseLink href="/tasks/new" className="bg-white md:bg-[#f5f5f5] text-base md:text-base" >
                        <Plus className="fill-slate-500" />
                        New Task
                    </BaseLink>
                    :
                    ""
            }

            <BaseButton onClick={async () => { await exportToExcel("tasks") }} className="bg-white md:bg-[#f5f5f5] text-base md:text-base" >
                <Download className="fill-slate-500" />
                Download
            </BaseButton>
            <BaseLink href="/tasks/archive" className="bg-white md:bg-[#f5f5f5] text-base md:text-base" >
                <Archieved className="fill-slate-500" />
               Archives
            </BaseLink>
        </>
    );

    const breadcrumb = (
        <ul className="flex items-center justify-start gap-3">
            <li className="capitalize text-base text-gray-800 font-bold hover:text-blue-500 hover:underline cursor-pointer" >
                <Link href="/dashboard">Dashboard</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-500 font-bold">
                Tasks
            </li>
        </ul>
    )

    const bulkOperationButtons = (
        <div className="flex items-center justify-end gap-3">
            <button type="button" className="btn btn-warning">Deactivate Selected Rows</button>
            <button type="button" className="btn btn-danger">Delete Selected Rows</button>
        </div>
    );

    const tableConfig = {
        remoteURL: "/api/tasks",
        title: <div className="flex items-center justify-start gap-3 text-xl md:text-xl font-semibold">
                    <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                        <TasksIcon className="size-[23px] md:size-[23px] stroke-slate-800 dark:stroke-slate-300" />
                    </span>
                    Tasks
                </div>,
        tableFluid: false,
        actionButtons: actionButtons,
        tableWrapperClass: "pb-4 rounded-[15px] 2xl:rounded-[30px]",
        breadcrumb: breadcrumb,
        // allowBulkOperation: true,
        // bulkOperationButtons: bulkOperationButtons,
        // handleBulkActionTargets: setBulkActionTargets,

        columns: [
            {
                label: "ID",
                key: "id"
            },
            {
                label: "Title",
                key: "title",
                field: "title"
            },
            {
                label: "Assigned To",
                key: "assignee_name",
                field: "assignee.name"
            },
            {
                label: "Start Date",
                key: "start_date"
            },
            {
                label: "End Date",
                key: "end_date"
            },
            {
                label: "Priority",
                key: "priority",
                render: (data, row) => {
                    const currentDate = new Date();
                    const endDate = new Date(row.end_date);
                    const isEscalated = endDate < currentDate && row.status !== "100%";
            
                    return (
                        <div className="flex items-center">
                            {/* Priority label rendering */}
                            {data === "Normal" && <span className="text-blue-500">{data}</span>}
                            {data === "Medium" && <span className="text-orange-500">{data}</span>}
                            {data === "Low" && <span className="text-green-500">{data}</span>}
                            {data === "High" && <span className="text-red-500">{data}</span>}
            
                            {/* Escalation warning (Red color) */}
                            {isEscalated && (
    <span className="ml-2 text-red-500 text-2xl" title="Task is overdue">
        !
    </span>
)}

                        </div>
                    );
                }
            },            
            {
                label: "Status",
                key: "status",
                render: (data, row) => {
                    let progress_fill = "bg-green-500";
                    let progress_completed = "w-[0%]";
                    let progress_value = "0%";

                    if (row.status == "0%") {
                        progress_completed = "w-[0%]";
                        progress_value = "0%";
                    }
                    else if (row.status == "10%") {
                        progress_completed = "w-[10%]";
                        progress_value = "10%";
                    }
                    else if (row.status == "20%") {
                        progress_completed = "w-[20%]";
                        progress_value = "20%";
                    }
                    else if (row.status == "30%") {
                        progress_completed = "w-[30%]";
                        progress_value = "30%";
                    }
                    else if (row.status == "40%") {
                        progress_completed = "w-[40%]";
                        progress_value = "40%";
                    }
                    else if (row.status == "50%") {
                        progress_completed = "w-[50%]";
                        progress_value = "50%";
                    }
                    else if (row.status == "60%") {
                        progress_completed = "w-[60%]";
                        progress_value = "60%";
                    }
                    else if (row.status == "70%") {
                        progress_completed = "w-[70%]";
                        progress_value = "70%";
                    }
                    else if (row.status == "80%") {
                        progress_completed = "w-[80%]";
                        progress_value = "80%";
                    }
                    else if (row.status == "90%") {
                        progress_completed = "w-[90%]";
                        progress_value = "90%";
                    }
                    else if (row.status == "100%") {
                        progress_completed = "w-[100%]";
                        progress_value = "100%";
                    }

                    return (
                            <div className="w-full flex flex-col items-start gap-2">
                                <div className="w-full flex items-start justify-center gap-2 text-xs text-black dark:text-gray-300 capitalize">
                                    <span>{ progress_value }</span>
                                </div>
                                <div className="w-full min-w-[100px] h-2 rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div className={`${ progress_completed } h-full ${ progress_value === "100%" ? "rounded-full" : "rounded-s-full" } ${ progress_fill }`}></div>
                                </div>
                            </div>
                        );
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
                            can("Tasks - Edit") ?
                                <SimpleIconLink href={`/tasks/${row.id}`} className="border border-gray-600" title="Edit">
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                    </svg>
                                </SimpleIconLink>
                                :
                                ""
                        }

                        {
                            can("Tasks - Delete") ?
                                <SimpleIconButton className="border border-gray-600" onClick={ () => handleDeletionPopup(row.id) } title="Delete">
                                    <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </SimpleIconButton>
                                :
                                ""
                        }

                        <SimpleIconButton className="border border-gray-600" onClick={ () => handleArchivePopup(row.id) } title="Archive">
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                            </svg>
                        </SimpleIconButton>
                    </ButtonGroupH>
                }
            },
        ],
        mobile_view: {
            render: (row) => {
                let progress_fill = "bg-green-500";
                let progress_completed = "w-[0%]";
                let progress_value = "0%";
                let priorityClass = "";

                if (row.status == "0%") {
                    progress_completed = "w-[0%]";
                    progress_value = "0%";
                }
                else if (row.status == "10%") {
                    progress_completed = "w-[10%]";
                    progress_value = "10%";
                }
                else if (row.status == "20%") {
                    progress_completed = "w-[20%]";
                    progress_value = "20%";
                }
                else if (row.status == "30%") {
                    progress_completed = "w-[30%]";
                    progress_value = "30%";
                }
                else if (row.status == "40%") {
                    progress_completed = "w-[40%]";
                    progress_value = "40%";
                }
                else if (row.status == "50%") {
                    progress_completed = "w-[50%]";
                    progress_value = "50%";
                }
                else if (row.status == "60%") {
                    progress_completed = "w-[60%]";
                    progress_value = "60%";
                }
                else if (row.status == "70%") {
                    progress_completed = "w-[70%]";
                    progress_value = "70%";
                }
                else if (row.status == "80%") {
                    progress_completed = "w-[80%]";
                    progress_value = "80%";
                }
                else if (row.status == "90%") {
                    progress_completed = "w-[90%]";
                    progress_value = "90%";
                }
                else if (row.status == "100%") {
                    progress_completed = "w-[100%]";
                    progress_value = "100%";
                }

                // if (row.priority == "Normal") {
                //     priorityClass = "text-blue-500";
                // }
                // else if (row.priority == "Medium") {
                //     priorityClass = "text-orange-500";
                // }
                // else if (row.priority == "Low") {
                //     priorityClass = "text-green-500";
                // }
                // else if (row.priority == "High") {
                //     priorityClass = "text-red-500";
                // }

                return (
                    <div 
                        key={row.id} 
                        className="w-full h-min p-4 bg-[#f5f5f5] rounded-[15px] flex flex-col items-start justify-start gap-2">
                        <div
                            className="text-xs text-gray-700 font-extrabold w-full flex items-center justify-between gap-5">
                                <span className="text-gray-400">ID: {row.id}</span>
                                <span>
                                    <span className="font-medium">Start Date:</span>&nbsp;
                                    {row.start_date}
                                </span>
                        </div>
                        <div
                            className="w-full flex items-center justify-between gap-2">
                                <span className="text-xs text-gray-400 font-extrabold uppercase">Assigned To</span>
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
                                        can("Tasks - Edit") ?
                                            <SimpleIconLink href="/tasks/edit" className="border border-gray-600" title="Edit">
                                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                                                </svg>
                                            </SimpleIconLink>
                                            :
                                            ""
                                    }

                                    {
                                        can("Tasks - Delete") ?
                                            <SimpleIconButton className="border border-gray-600" onClick={ () => handleDeletionPopup(row.id) } title="Delete">
                                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                </svg>
                                            </SimpleIconButton>
                                            :
                                            ""
                                    }

                                    <SimpleIconButton className="border border-gray-600" onClick={ () => handleArchivePopup(row.id) } title="Archive">
                                        <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                        </svg>
                                    </SimpleIconButton>
                                </ButtonGroupH>
                        </div>
                        <div
                            className="text-base text-[#202224] font-extrabold uppercase">
                                {row.assignee_name}
                        </div>
                        <div
                            className="text-base text-gray-600 font-medium">
                                { row.title }
                        </div>
                        <div
                            className="text-base text-gray-400 font-light">
                                { row.notes }
                        </div>

                        {/* Task Progress start */}
                        <div className="w-full flex flex-col items-start gap-2 mt-5">
                            <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700">
                                <div className={`${progress_completed} h-full rounded-full ${progress_fill}`}></div>
                            </div>
                            <div className="w-full flex items-start justify-between gap-2 text-lg text-black dark:text-gray-300 capitalize">
                                <span>Progress</span>
                                <span>{ progress_value }</span>
                            </div>
                        </div>
                        {/* Task Progress end */}

                        <div className="w-full h-[1px] border-t-2 border-gray-200 dark:border-gray-700 my-4"></div>

                        {/* Task Deadline start */}
                        <div className="w-full flex items-center justify-end">
                            <span className="w-max px-4 py-1 bg-white dark:bg-gray-800 text-gray-400 text-sm font-extrabold rounded-full">
                                <span className="font-medium">End Date:</span>&nbsp;
                                {row.end_date}
                            </span>
                        </div>
                        {/* Task Deadline end */}
                    </div>
                );
            }
        }
    };


    return (
        <>
            <title>YORK - Tasks</title>

            <Card className="h-auto md:rounded-[15px] bg-transparent md:bg-white px-0 md:px-4 dark:bg-transparent md:dark:bg-gray-800" >
                <DataTable tableConfig={tableConfig} ref={datatableRef} />
            </Card>

            <DeleteConfirmationModal 
                isVisible={isDeletionModalVisible} 
                resourceID={resourceID} 
                remoteEndPoint='/api/tasks/delete' 
                onClose={closeDeletionModal}
                datatableRef={datatableRef} />

            <ArchiveConfirmationModal 
                isVisible={isArchivingModalVisible} 
                resourceID={resourceID} 
                remoteEndPoint='/api/tasks/archive' 
                onClose={closeArchivingModal}
                datatableRef={datatableRef} >
                <h3>Are you sure to <strong>archive</strong> this resource?</h3>
            </ArchiveConfirmationModal>

            <ChangeStatusModal 
                isVisible={isChangingStatusModalVisible} 
                resourceID={resourceID} 
                resourceStatus={resourceStatus} 
                remoteEndPoint='/api/tasks/change_status' 
                onClose={closeChangingStatusModal}
                datatableRef={datatableRef}>

                    {/* Form Group start */}
                    <div className="">
                        <Label htmlFor="status">Task Status</Label>

                        <Select
                            id="status"
                            name="status"
                            value={resourceStatus}
                            className="block mt-1 w-full bg-[#f5f5f5]"
                            onChange={handleStatusChange}
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

            <CommentsModal
                isVisible={ isCommentsModalVisible }
                commentsEndpoint= "/api/tasks/comments"
                newCommentEndpoint= "/api/tasks/comment"
                resourceID={ resourceID }
                onClose={ closeCommentsModal } />

            <PhotosModal
                isVisible={ isPhotosModalVisible }
                photosEndpoint= "/api/tasks/files"
                newPhotoEndpoint= "/api/tasks/file"
                resourceID={ resourceID }
                onClose={ closePhotosModal } />
        </>
    )
}

export default Page;