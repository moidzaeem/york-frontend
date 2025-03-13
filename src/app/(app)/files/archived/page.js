'use client'

import { useState } from 'react';
import DataTable from '@/components/table/DataTable';
import Card from '@/components/card/Card';
import Link from 'next/link';
// import Container from '@/components/container/Container';


const Page = () => {

    const [blukActionTargets, setBulkActionTargets] = useState([]);
    // const [ modalStatus, openModal, closeModal ] = useJkModal();

    const handleFilter = (event) => {
        setTableFilter({
            status: event.target.dataset.value,
        })
    }

    const actionButtons = (
        <>
            <Link href="/files" className="btn bg-[#f5f5f5] dark:bg-gray-900 font-normal text-slate-500 py-2">Samples</Link>
            <Link href="/files/folders" className="btn bg-[#f5f5f5] dark:bg-gray-900 font-normal text-slate-500 py-2">Folders</Link>
        </>
    );

    const breadcrumb = (
        <ul className="flex items-center justify-start gap-3">
            <li className="capitalize text-base text-gray-800 font-bold hover:text-blue-500 hover:underline cursor-pointer" >
                <Link href="/dashboard">Dashboard</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-800 font-bold hover:text-blue-500 hover:underline cursor-pointer" >
                <Link href="/files">Files</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-500 font-bold">
                Archived Files
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
        remoteURL: "/api/files/archeived",
        title: <div className="text-xl font-semibold">Files - Archeived</div>,
        tableFluid: false,
        actionButtons: actionButtons,
        breadcrumb: breadcrumb,
        // allowBulkOperation: true,
        // bulkOperationButtons: bulkOperationButtons,
        // handleBulkActionTargets: setBulkActionTargets,

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
                key: "archeived_at"
            },
            {
                label: "Action",
                key: null,
                render: (data, row) => {
                    return <button className="btn btn-success">three dots dropdown menu here</button>
                }
            },
        ]
    };


    return (
        <>
            <title>YORK - Files - Archeived</title>

            <Card className="h-auto bg-white dark:bg-gray-800" >
                <DataTable tableConfig={tableConfig} />
            </Card>
        </>
    )
}

export default Page;