import axios from "@/lib/axios"
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useShowOrDownload = () => {


    /**
     * 
     * *******************************************************************************
     * ********************** Submit Data FUNCTIONALITY
     * *******************************************************************************
     *  
     */

    const [loading, setLoading] = useState(false);
    
    const notify = (message) => {
        toast.error(message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }


    const showOrDownload = async (slug, isPDF, id) => {

        try {
            
            setLoading(prev => true);

            // const response = await axios.get(url);
            // return response.data;

            let testURL = `/api/export/${slug}`;

            // Only append the format if isPDF is true
            if (isPDF) {
                testURL += '?format=pdf';
            }

            if(isPDF && id){
                testURL += `&id=${id}`;
            }
            
            const response = await axios.get(testURL, {
                responseType: 'blob',
            });
            

            // Extract the file's mime type from the response headers if necessary
            const contentType = response.headers['content-type'] || 'application/octet-stream';

            // console.log(response);

            // Create a Blob from the response
            const blob = new Blob([response.data], { type: contentType });

            // Create an Object URL for the Blob
            const url = URL.createObjectURL(blob);

            // Open the Blob in a new tab
            window.open(url, '_blank');

        } 
        catch (error) {
            console.log(error);
            notify("Oops! something went wrong while loading categories.");
        } 
        finally {
            setLoading(prev => false);
        }
    }

    return [
        showOrDownload,
        loading
    ];
    
}