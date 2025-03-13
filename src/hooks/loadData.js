import axios from "@/lib/axios"
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useLoadData = (url, id, shouldLoad = true) => {

    const [data, setData] = useState([]);
    

    const notify = (data) => {

        data?.status == 201 ? 
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


    const loadData = useCallback( async () => {

        try {
            if(id <= 0) return false;
            if(!shouldLoad) return false;

            const response = await axios.get(`${url}/${id}`);
            setData(response.data.data);

        } catch (error) {
            notify(error.data);
        }
    }, [url, id, shouldLoad]);


    useEffect(() => {
        loadData();
    }, [loadData, shouldLoad]);


    return {
        data,
        loadData,
        setData
    };
    
}