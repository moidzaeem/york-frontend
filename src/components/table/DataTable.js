import { useRemoteDatatable } from "@/hooks/remoteDatatable";
import { useRowSelector } from "@/hooks/selectAll";
import Paginator from "../pagination/Paginator";
import DataTableSearch from "./DataTableSearch";
import React, { forwardRef, useImperativeHandle } from "react";
// import { usePathname, useRouter } from 'next/navigation';
import { useBreadcrumb } from "@/hooks/breadcrumb";

const DataTable = forwardRef(function Datatable(props, ref) {
    const { tableConfig = {} } = props;

    // Table default configurations
    const Config = {
        title: null,
        search: true,
        pagination: true,
        remoteURL: null,
        allowBulkOperation: false,
        tableFluid: true,
        tableWrapperClass: "",
        tableClass: "",
        actionButtons: "",
        bulkOperationButtons: "",
        handleBulkActionTargets: undefined,
        columns: [],
        mobile_view: {
            render: false
        },

        // override user provided configuration values
        ...tableConfig,
    };

    Config.searchables = [];
    Config.columns.forEach((item, idx) => {
        if (item.key != null) {
            if (item.field)
                Config.searchables.push(item.field);
            else 
                Config.searchables.push(item.key); 
        }
    });

    const {
        loading,
        data, 
        setCurrentPage, 
        setTableSearch, 
        setTableFilter, 
        setTableSortColumn,
        reloadDatatable,
        allRowsChecked, 
        toggleRowSelection,
        showBulkActions,
        desktopView,
        requestParams
    } = useRemoteDatatable(Config, 1);

    useImperativeHandle(ref, () => ({
        reloadDatatable,
        setTableFilter,
    }));


    let sort = "desc";

    // const {checkedRows, allRowsChecked, toggleRowSelection, toggleAllRowsSelection, showBulkActions} = useRowSelector(data?.data)


    const handleColumnSorting = (col) => {

        if (requestParams.sort.dir == "desc") {
            sort = "asc";
        } else {
            sort = "desc";
        }

        
        if (col.field) {
            
            if (!Config.searchables.includes(col.field)) return false;

            setTableSortColumn({
                col: col.field,
                dir: sort
            });
        } 
        else {
            
            if (!Config.searchables.includes(col.key)) return false;

            setTableSortColumn({
                col: col.key,
                dir: sort
            });

        }


    }
    

    const searchAction = (event) => {
        if (event.key === 'Enter' || event.target.value == "") {
            if (!Config.search) {
                console.warn("please provide *searchAction* callback to table component, User Input: ", event.target.value);
                return false;
            }

            setTableSearch(event.target.value);
        }
    }


    if (desktopView || !Config.mobile_view.render) return (

        <div className={`bg-white dark:bg-gray-800 flex flex-col gap-3 items-start justify-start ${ Config.tableFluid ? '-mx-6 lg:-mx-8' : '' } ${ Config.tableWrapperClass }`}>
            {/* Desktop view start */}

            { Config?.breadcrumb }
            
            {
                (Config.search || Config.actionButtons) 
                    && ((!showBulkActions && Config.bulkOperationButtons) || !Config.bulkOperationButtons) 
                    && (
                    <div className="w-full flex flex-col md:flex-row gap-3 md:items-center md:justify-between px-4 my-8">
                        {
                            Config.title ?
                                Config.title
                                : <div></div>
                        }

                        <div className="grow flex flex-col md:flex-row gap-3 md:items-center md:justify-end">
                        {
                            Config.search ? 
                                <DataTableSearch className="" searchAction={searchAction} />
                                : <div></div>
                        }
                        

                        { Config.actionButtons }
                        </div>
                    </div>
                )
            }

            {
                (Config.allowBulkOperation && Config.bulkOperationButtons && showBulkActions) && (
                    <div className="w-full flex flex-col md:flex-row gap-3 md:items-center md:justify-start lg:justify-end px-4 my-8">
                        { Config.bulkOperationButtons }
                    </div>
                )
            }

            <table className={`
                w-full table-auto border-collapse 
                [&_thead]:bg-[#f5f5f5] [&_thead]:dark:bg-gray-900
                [&_thead_tr]:border-b [&_thead_tr]:border-gray-300 [&_thead_tr]:dark:border-gray-600
                [&_thead_tr_th]:py-3 [&_thead_tr_th]:px-4 [&_thead_tr_th]:text-left [&_thead_tr_th]:rtl:text-right [&_thead_tr_th:last-child]:text-right [&_thead_tr_th:rtl:last-child]:text-left 
                    [&_thead_tr_th]:text-gray-700 [&_thead_tr_th]:dark:text-slate-400 [&_thead_tr_th]:uppercase [&_thead_tr_th]:text-sm [&_thead_tr_th]:font-semibold
                [&_tbody_tr]:border-b [&_tbody_tr]:border-gray-200 [&_tbody_tr]:dark:border-gray-700
                [&_tbody_tr_td]:py-2 [&_tbody_tr_td]:px-4 [&_tbody_tr_td:last-child]:text-right [&_tbody_tr_td:rtl:last-child]:text-left [&_tbody_tr_td]:text-gray-700 [&_tbody_tr_td]:dark:text-slate-400
                    [&_tbody_tr_td]:text-sm [&_tbody_tr_td]:font-semibold
                ${ Config.tableClass }
            `}>
                <thead>
                    <tr>
                        {
                            Config.allowBulkOperation ? (
                                <th>
                                    <input type="checkbox" className="size-5 rounded-md row-selector" value="all" checked={ allRowsChecked }  onChange={ () => toggleRowSelection("all") } />
                                </th>
                            ) : ""
                        }

                        {
                            Config.columns.map((col, idx) => (
                                <th key={idx} className="hover:cursor-pointer hover:text-gray-500 dark:hover:bg-slate-600" onClick={ () => { handleColumnSorting(col) }  }>
                                    {col.label}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    data?.data?.length ? data?.data?.map(row => (
                        <tr key={row.id}>
                            {
                                Config.allowBulkOperation ? (
                                    <td>
                                        <input type="checkbox" className="size-5 rounded-md row-selector" value={ row.id } checked={ row.is_checked } onChange={(event) => { toggleRowSelection(event.target.value) }} />
                                    </td>
                                ) : ""
                            }

                            {
                                Config?.columns?.map((col, idx) => (
                                    <td key={`${row.id}-${idx}`} className={`${ col?.label == "Action" ? "flex items-center justify-end text-right" : "" }`}>
                                        {
                                            col?.render ? col?.render(row[col?.key], row) : row[col?.key]
                                        }
                                    </td>
                                ))
                            }
                        </tr>
                    )) : (!data?.data?.length && loading ? (
                        <tr>
                            <td colSpan={Config?.columns?.length ?? 1} className="!text-center">Loading ...</td>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan={Config?.columns?.length ?? 1} className="!text-center">data not found</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>

            {
                Config.pagination && <Paginator metaData={data?.meta} setCurrentPage={setCurrentPage} />
            }

            {/* Desktop view end */}

        </div>
    )

    else  return (

        <>
        
            {/* Mobile view start */}

            {
                <div className="grow flex flex-col gap-3  mb-5">
                    { Config.actionButtons }
                </div>
            }

            {
                (Config.allowBulkOperation && Config.bulkOperationButtons && showBulkActions) && (
                    <div className="w-full flex flex-col gap-3 px-4 my-8">
                        { Config.bulkOperationButtons }
                    </div>
                )
            }

            <div className={`bg-white dark:bg-gray-800 flex flex-col gap-3 items-start justify-start ${ Config.tableFluid ? '-mx-6 lg:-mx-8' : '' } ${ Config.tableWrapperClass }`}>
                

                {
                    (Config.search || Config.actionButtons) 
                        && ((!showBulkActions && Config.bulkOperationButtons) || !Config.bulkOperationButtons) 
                        && (
                        <div className="w-full flex flex-col gap-3 px-4 my-8 mb-4">
                            {
                                Config.title ?
                                    Config.title
                                    : <div></div>
                            }

                            <div className="grow flex gap-3 items-center justify-end">
                            {
                                Config.search ? 
                                    <DataTableSearch className="" searchAction={searchAction} />
                                    : <div></div>
                            }
                            </div>
                        </div>
                    )
                }

                {
                    Config.mobile_view.render ? (
                        <div className="w-full bg-transparent flex flex-col gap-8 px-4">
                            {
                                data?.data?.length ? data?.data?.map(row => Config.mobile_view.render(row)) : (
                                    <div className="!text-center bg-red-500 text-slate-100 font-semibold text-xl">data not found</div>
                                )
                            }
                        </div>
                    ) : ""
                }

                {
                    Config.pagination && <Paginator metaData={data?.meta} setCurrentPage={setCurrentPage} />
                }

            </div>

        </>
        
    )

});

export default DataTable