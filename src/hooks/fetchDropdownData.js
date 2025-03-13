import axios from "@/lib/axios"
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useFetchDropdownData = (url) => {
    if (!url) throw new Error("API endpoint is not provided to Submit Data Hook.");


    /**
     * 
     * *******************************************************************************
     * ********************** Submit Data FUNCTIONALITY
     * *******************************************************************************
     *  
     */

    const [dropdowns, setDropdowns] = useState(null);
    
    const notify = (message) => {
        toast.error(message, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }


    const fetchResource = useCallback( async () => {

        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.log(error);
            notify("Oops! something went wrong while loading categories.");
        }
    }, [url]);


    useEffect(() => {
        async function fetchData() {
            const data = await fetchResource();
            setDropdowns(data);
        }

        fetchData();
    }, [fetchResource]);

    return {
        dropdowns,
        setDropdowns
    };
    
}