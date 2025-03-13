'use client'

import DataTable from '@/components/table/DataTable';
import Card from '@/components/card/Card';
import BaseLink from '@/components/buttons/BaseLink';
import Archieved from '@/components/icons/Archieved';
import SimpleIconButton from '@/components/buttons/SimpleIconButton';
import ButtonGroupH from '@/components/buttons/ButtonGroupH';
import SimpleIconLink from '@/components/buttons/SimpleIconLink';
import SidebarFiles from '@/components/icons/SidebarFiles';
// import Container from '@/components/container/Container';


const Page = () => {


    const handleFileDeletionPopup = (fileID) => {
        // Show confirmation modal and then delete the requested task.
    }


    const handleFilesDownloadPopup = (fileID) => {
        // Show confirmation modal and then archieve the requested task.
    }


    const actionButtons = (
        <>
            <BaseLink href="/hr/files/archieve" className="bg-white md:bg-[#f5f5f5] text-xs md:text-base" >
                <Archieved className="fill-slate-500" />
                Archieved
            </BaseLink>
        </>
    );

    const tableConfig = {
        remoteURL: "/api/hr/files",
        title: <div className="flex items-center justify-start gap-3 text-sm md:text-xl font-semibold">
                    <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                        <SidebarFiles className="size-[13px] md:size-[16px] stroke-slate-800 dark:stroke-slate-300" />
                    </span>
                    Files
                </div>,
        tableFluid: false,
        actionButtons: actionButtons,
        tableWrapperClass: "pb-4 rounded-[15px] 2xl:rounded-[30px]",

        columns: [
            {
                label: "Name",
                key: "name"
            },
            {
                label: "Category",
                key: "category"
            },
            {
                label: "Date & Time",
                key: "created_at"
            },
            {
                label: "Action",
                key: null,
                render: (data, row) => {
                    return <ButtonGroupH>
                        <SimpleIconLink href={`/files/${row.id}`} className="btn-warning" title="Edit">
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                        </SimpleIconLink>
                        <SimpleIconButton className="btn-danger" onClick={ () => handleFileDeletionPopup(row.id) } title="Delete">
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </SimpleIconButton>
                        <SimpleIconButton className="btn-warning" onClick={ () => handleFilesDownloadPopup(row.id) } title="Download">
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
                let progress_value = "30%";
                let progress_completed = "w-[30%]";
                let progress_fill = "bg-[#ff6333]";

                

                // return (
                //     <div 
                //         key={row.id} 
                //         className="w-full h-min p-4 bg-[#f5f5f5] rounded-[15px] flex flex-col items-start justify-start gap-2">
                //         <div
                //             className="text-xs text-gray-400 font-extrabold w-full flex items-center justify-between gap-5">
                //                 <span>ID: {row.id}</span>
                //                 <span>
                //                     <span className="font-medium">Start Date:</span>
                //                     {row.start_date}
                //                 </span>
                //         </div>
                //         <div
                //             className="w-full flex items-center justify-between gap-2">
                //                 <span className="text-xs text-gray-400 font-extrabold uppercase">Assigned To</span>
                //                 <ButtonGroupH>
                //                     <SimpleIconButton className="btn-primary" onClick={ () => handleCommentsPopup(row.id) } title="comments">
                //                         <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                //                             <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                //                         </svg>
                //                     </SimpleIconButton>
                //                     <SimpleIconButton className="btn-success" onClick={ () => handlePhotosPopup(row.id) } title="Photos">
                //                         <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                //                             <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                //                             <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                //                         </svg>
                //                     </SimpleIconButton>
                //                     <SimpleIconLink href="/tasks/edit" className="btn-warning" title="Edit">
                //                         <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                //                             <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                //                         </svg>
                //                     </SimpleIconLink>
                //                     <SimpleIconButton className="btn-danger" onClick={ () => handleTaskDeletionPopup(row.id) } title="Delete">
                //                         <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                //                             <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                //                         </svg>
                //                     </SimpleIconButton>
                //                     <SimpleIconButton className="btn-warning" onClick={ () => handleTaskArchievePopup(row.id) } title="Archive">
                //                         <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                //                             <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                //                         </svg>
                //                     </SimpleIconButton>
                //                 </ButtonGroupH>
                //         </div>
                //         <div
                //             className="text-xs text-[#202224] font-extrabold uppercase">
                //                 {row.assigned_to}
                //         </div>
                //         <div
                //             className="text-xs text-gray-400 font-light">
                //                 ipsum lorium, aslkdfjl s flkasdlj lfk lakflakd fl dlka dlkf lkfjiefj lkvxmi ewflsflaki
                //         </div>

                //         {/* Task Progress start */}
                //         <div className="w-full flex flex-col items-start gap-2 mt-5">
                //             <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700">
                //                 <div className={`${progress_completed} h-full rounded-full ${progress_fill}`}></div>
                //             </div>
                //             <div className="w-full flex items-start justify-between gap-2 text-lg text-black dark:text-gray-300 capitalize">
                //                 <span>Progress</span>
                //                 <span>{ progress_value }</span>
                //             </div>
                //         </div>
                //         {/* Task Progress end */}

                //         <div className="w-full h-[1px] border-t-2 border-gray-200 dark:border-gray-700 my-4"></div>

                //         {/* Task Deadline start */}
                //         <div className="w-full flex items-center justify-end">
                //             <span className="w-max px-4 py-1 bg-white dark:bg-gray-800 text-gray-400 text-xs font-extrabold rounded-full">
                //                 <span className="font-medium">End Date:</span>
                //                 {row.start_date}
                //             </span>
                //         </div>
                //         {/* Task Deadline end */}
                //     </div>
                // );
            }
        }
    };


    return (
        <>
            <title>YORK - Files</title>

            <Card className="h-auto md:rounded-[15px] bg-transparent md:bg-white px-0 md:px-4 dark:bg-transparent md:dark:bg-gray-800" >
                <DataTable tableConfig={tableConfig} />
            </Card>
        </>
    )
}

export default Page;