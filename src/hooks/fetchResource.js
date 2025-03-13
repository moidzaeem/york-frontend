import axios from "@/lib/axios"
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useFetchResource = (url, id) => {
    if (!url) throw new Error("API endpoint is not provided to Submit Data Hook.");


    /**
     * 
     * *******************************************************************************
     * ********************** Submit Data FUNCTIONALITY
     * *******************************************************************************
     *  
     */

    const [initialData, setInitialData] = useState([]);
    

    const notify = (data) => {

        data.status == 201 ? 
            toast.success(data.message, {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }) 
            :
            toast.error(data.message, {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
    }


    const fetchResource = useCallback(async (id) => {

        try {
            if(id <= 0) return false;
            
            const response = await axios.get(`${url}/${id}`);
            return response.data.data;
        } catch (error) {
            notify(error.data);

            throw error;
        }
    }, [url]);


    useEffect(() => {
        async function fetchData() {
            try {
                const data = await fetchResource(id);
                setInitialData(data);
            } catch (error) {
                notify(error.data);
            }
        }

        fetchData();
    }, [fetchResource, id]);

    return {
        initialData
    };
    
}