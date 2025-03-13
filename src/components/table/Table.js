import Paginator from "../pagination/Paginator";

const Table = ({ metaData = {}, tableConfig = {}, children }) => {

    // Table default configurations
    const Config = {
        tableFluid: true,
        tableClass: "",
        tableWrapperClass: "",
        search: false,
        searchAction: undefined,
        pagination: false,
        paginationAction: undefined,
        actionButtons: "",

        // override user provided configuration values
        ...tableConfig
    };

    if (Config.pagination && !Config.paginationAction ) throw new Error("Pagination action 'paginationAction' callback is not provided to Table component");
    if (Config.search && !Config.searchAction ) throw new Error("Search action 'searchAction' callback is not provided to Table component");

    const searchAction = (event) => {
        if (event.key === 'Enter' || event.target.value == "") {
            if (!Config.searchAction) {
                console.warn("please provide *searchAction* callback to table component, User Input: ", event.target.value);
                return false;
            }

            Config.searchAction(event.target.value);
        }
    }

    return (
        <div className={`flex flex-col gap-3 items-start justify-start ${ Config.tableFluid ? '-mx-6 lg:-mx-8' : '' } ${ Config.tableWrapperClass }`}>
            {
                (Config.search || Config.actionButtons) && (
                    <div className="w-full flex gap-3 items-center justify-between px-4">
                        {
                            Config.search ? 
                                <input type="text" className="w-full lg:max-w-96 text-input" placeholder="search..." onKeyUp={ searchAction } /> 
                                : <div></div>
                        }
                        

                        { Config.actionButtons }
                    </div>
                )
            }

            <table className={`
                w-full table-auto border-collapse 
                [&_thead]:bg-gray-200 [&_thead]:dark:bg-gray-700
                [&_thead_tr]:border-b [&_thead_tr]:border-gray-300 [&_thead_tr]:dark:border-gray-600
                [&_thead_tr_th]:py-3 [&_thead_tr_th]:px-4 [&_thead_tr_th]:text-left [&_thead_tr_th]:rtl:text-right [&_thead_tr_th:last-child]:text-right [&_thead_tr_th:rtl:last-child]:text-left 
                    [&_thead_tr_th]:text-gray-700 [&_thead_tr_th]:dark:text-slate-400 [&_thead_tr_th]:uppercase [&_thead_tr_th]:text-sm [&_thead_tr_th]:font-semibold
                [&_tbody_tr]:border-b [&_tbody_tr]:border-gray-200 [&_tbody_tr]:dark:border-gray-700
                [&_tbody_tr_td]:py-2 [&_tbody_tr_td]:px-4 [&_tbody_tr_td:last-child]:text-right [&_tbody_tr_td:rtl:last-child]:text-left [&_tbody_tr_td]:text-gray-700 [&_tbody_tr_td]:dark:text-slate-400
                    [&_tbody_tr_td]:text-sm
                ${ Config.tableClass }
            `}>
                { children }
            </table>

            {
                Config.pagination && <Paginator metaData={metaData} setCurrentPage={Config.paginationAction} />
            }

        </div>
    )
}

export default Table