import axios from "@/lib/axios"
import { useCallback, useEffect, useRef, useState } from "react"

export const useRemoteDatatable = (Config, page = 1) => {
    let url = Config.remoteURL;
    let handleBulkActionTargets = Config.handleBulkActionTargets;
    
    if (!url) throw new Error("API endpoint is not provided to Remote DataTable.");

    const isDesktop = useRef(true);

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({})
    const [desktopView, setDesktopView] = useState(isDesktop.current);
    
    // Required for bulk operation
    // const [checkedRows, setCheckedRow] = useState([])
    const [allRowsChecked, setAllRowsChecked] = useState(false)
    const [showBulkActions, setBulkActionVisibility] = useState(false)

    const [requestParams, setRequestParams] = useState({
        page: 1,
        sort: {
            col: "created_at",
            dir: "desc"
        },
        search: "",
        searchables: Config.searchables ?? [],
        filter: {},
        perPage: 10,
        archive: url.includes("?archive=true")
    })

    url = url.includes("?archive=true") ? url.slice(0, url.indexOf("?")) : url;


    const handleWindowResizing = useCallback(() => {

        if (window.outerWidth >= parseInt(process.env.NEXT_PUBLIC_DATATABLE_DESKTOP_VIEW_BREAKPOINT)) {
            if (isDesktop.current) return false;

            isDesktop.current = true;
            setDesktopView(prevState => true);

        } else {
            if (!isDesktop.current) return false;

            isDesktop.current = false;
            setDesktopView(prevState => false);
        }
    }, []);


    /**
     * 
     * *******************************************************************************
     * ********************** DATATABLE FUNCTIONALITY
     * *******************************************************************************
     *  
     */

    // handle page change request
    const setCurrentPage = (page) => {
        setRequestParams(prevParams => ({
            ...prevParams,
            page: page ?? 1,
        }))
    }

    // set datatable search value
    const setTableSearch = (search) => {
        setRequestParams(prevParams => ({
            ...prevParams,
            search: search ?? "",
        }))
    }

    // set datatable rows per page 
    const setTableRowsPerPage = (perPage) => {
        setRequestParams(prevParams => ({
            ...prevParams,
            perPage: perPage ?? 10,
        }))
    }

    // set datatable rows per page 
    const setTableFilter = (filter) => {
        setRequestParams(prevParams => ({
            ...prevParams,
            filter: filter ?? {},
        }))
    }

    // set datatable sorting
    const setTableSortColumn = (sort) => {
        setRequestParams(prevParams => ({
            ...prevParams,
            sort: sort ?? prevParams.sort,
        }))
    }

    // Reset datatable [search, filter, sorting, rowsPerPage and page]
    const resetDatatable = () => {
        setRequestParams(prevParams => ({
            page: 1,
            sort: {
                col: "created_at",
                dir: "desc"
            },
            search: "",
            filter: {},
            perPage: 10
        }))
    }

    // Reload datatable current page
    const reloadDatatable = () => {
        fetchData();
    }


    // window.addEventListener("resize", handleWindowResizing)


    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            axios
                .get(url, {
                    params: requestParams
                })
                .then(res => {
                    let data = {
                        links: res.data.links,
                        meta: res.data.meta,
                        data: []
                    };

                    res.data.data.forEach(row => {
                        data.data.push({
                            ...row,
                            is_checked: false
                        })
                    });

                    setData(data)
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error)
                })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }, [requestParams, url]);


    useEffect(() => {
        handleWindowResizing();
        window?.addEventListener("resize", handleWindowResizing);

        return () => {
            window.removeEventListener("resize", handleWindowResizing);
        };

    }, [handleWindowResizing]);


    useEffect(() => {
        // handleWindowResizing();
        fetchData();
    }, [fetchData, requestParams, desktopView])



    
    /**
     * 
     * *******************************************************************************
     * ********************** BULK OPERATION FUNCTIONALITY
     * *******************************************************************************
     *  
     */
    const toggleRowSelection = (id) => {

        if (id !== "all")  {

            let newData = {
                links: data.links,
                meta: data.meta,
                data: []
            };

            let checkedRows = 0;

            data.data.forEach(row => {
                checkedRows = row.is_checked ? checkedRows + 1 : checkedRows;

                if (row.id != id)  newData.data.push(row);
                
                else  {      
                    checkedRows = row.is_checked ? checkedRows - 1 : checkedRows + 1;
                    newData.data.push({
                        ...row,
                        is_checked: !row.is_checked
                    });

                    if (typeof handleBulkActionTargets === "function") {

                        handleBulkActionTargets(prevTargets => {
                            let targets = Object.values(prevTargets) ?? [];
                            let index = targets.indexOf(row.id);

                            index >= 0 && row.is_checked ? targets.splice(index, 1) : targets.push(row.id);

                            return targets;
                        });
                    }
                }
            });

            setData(newData)
            setBulkActionVisibility(prevState => (checkedRows > 0 ? true : false))
        }

        else 
            toggleAllRowsSelection();

    }

    const toggleAllRowsSelection = () => {

        if (!allRowsChecked) selectAllRows();
        else unselectAllRows();
        
        setAllRowsChecked(prevState => !allRowsChecked);
    }

    const selectAllRows = () => {
        let newData = {
            links: data.links,
            meta: data.meta,
            data: []
        };

        data.data.forEach(row => {
            newData.data.push({
                ...row,
                is_checked: true
            });
        });

        setData(newData)

        setBulkActionVisibility(prevState => true);
    }

    const unselectAllRows = () => {
        let newData = {
            links: data.links,
            meta: data.meta,
            data: []
        };

        data.data.forEach(row => {
            newData.data.push({
                ...row,
                is_checked: false
            });
        });

        setData(newData)

        setBulkActionVisibility(prevState => false);
    }

    return {
        loading,
        data,
        setCurrentPage,
        setTableSearch,
        setTableFilter,
        setTableSortColumn,
        setTableRowsPerPage,
        resetDatatable,
        reloadDatatable,
        allRowsChecked,
        toggleRowSelection,
        showBulkActions,
        desktopView,
        requestParams
    }
}