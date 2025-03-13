'use client';

import { useState } from 'react';
import DataTable from '@/components/table/DataTable';
import Container from '@/components/container/Container';
import { useJkModal } from '@/hooks/jkmodal';
import JkModal from '@/components/modals/JkModal';

const ManagedAccounts = ({ className = "" }) => {

    const [blukActionTargets, setBulkActionTargets] = useState([]);
    const [ modalStatus, openModal, closeModal ] = useJkModal();

    const handleFilter = (event) => {
        setTableFilter({
            status: event.target.dataset.value,
        })
    }

    const actionButtons = (
        <div className="flex items-center justify-end gap-3">
            <button type="button" className="btn btn-success" onClick={ openModal }>Add Account</button>
            <button type="button" className="btn btn-warning" data-value="active" onClick={handleFilter}>Filter Active Accounts</button>
        </div>
    );

    const bulkOperationButtons = (
        <div className="flex items-center justify-end gap-3">
            <button type="button" className="btn btn-warning">Deactivate Selected Rows</button>
            <button type="button" className="btn btn-danger">Delete Selected Rows</button>
        </div>
    );

    const tableConfig = {
        remoteURL: "/api/managed-accounts",
        actionButtons: actionButtons,
        allowBulkOperation: true,
        bulkOperationButtons: bulkOperationButtons,
        handleBulkActionTargets: setBulkActionTargets,

        columns: [
            {
                label: "Account Name",
                key: "account_name"
            },
            {
                label: "Account Name",
                key: "account_name"
            },
            {
                label: "Role",
                key: "role"
            },
            {
                label: "Host",
                key: "host"
            },
            {
                label: "Status",
                key: "status",
                render: (data, row) => {
                    return data
                }
            },
            {
                label: "Date",
                key: "date"
            },
            {
                label: "Action",
                key: null,
                render: (data, row) => {
                    return <button className="btn btn-success">Manage</button>
                }
            },
        ]
    };

    return (
        <>
            <DataTable tableConfig={tableConfig} />
            
            <JkModal width="w-[80vw]" height="h-[40%]" modalStatus ={ modalStatus } closeModal={ closeModal } closeOnBackdrop={ false } center={ false } title="Open Outer Modal" >
                <Container>
                    <h3 className="py-3 text-uppercase text-2xl text-gray-800 dark:text-slate-300 font-bold border-b border-gray-600">Add New Account To Manage</h3>
                </Container>

                <Container className="py-5 flex flex-col items-start justify-between">
                    <p>New Account Information here.</p>
                    <p>New Account Information here.</p>
                    <p>New Account Information here.</p>
                    <p>New Account Information here.</p>
                    <p>New Account Information here.</p>
                    <p>New Account Information here.</p>
                    <p>New Account Information here.</p>
                    <p>New Account Information here.</p>
                    <button className="btn btn-danger" onClick={ closeModal }>Close</button>
                </Container>
            </JkModal>
        </>
    )
}

export default ManagedAccounts