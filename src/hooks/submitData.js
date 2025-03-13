import axios from "@/lib/axios"
import { useState } from "react";
import { toast } from "react-toastify";
import { usePathname, useRouter } from 'next/navigation';

export const useSubmitData = (url) => {
    if (!url) throw new Error("API endpoint is not provided to Submit Data Hook.");

    const router = useRouter();
    const currentPath = usePathname();


    /**
     * 
     * *******************************************************************************
     * ********************** Submit Data FUNCTIONALITY
     * *******************************************************************************
     *  
     */

    const [isSubmitted, setIsSubmitted] = useState(false);

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


    const redirectBack = () => {
        let path = currentPath.split("/");

        if (path[path.length - 1] == "new") {

            path.pop();

            setTimeout(() => {
                router.push(`${path.join("/")}`);
            }, 3500);

        }

        else {

            if (!isNaN(path[path.length - 1])) {
                path.pop();

                setTimeout(() => {
                    router.push(`${path.join("/")}`);
                }, 1500);

            }

        }
    }



    const submitData = async (payload, params = { resetForm: false }) => {

        let { resetForm } = params;

        event.preventDefault();

        if (payload.files) {
            let formData = new FormData();

            for (const key in payload) {
                if (Array.isArray(payload[key])) {
                    payload[key].forEach((item, index) => {
                        formData.append(`${key}[${index}]`, item);
                    });
                } else {
                    formData.append(key, payload[key]);
                }
            }

            payload = formData;
            formData = undefined;
        }

        setIsSubmitted(prev => true);
        
        let data = null;

        try {
            const response = await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            data = response.data;

            if (resetForm)
                resetForm();
            
            redirectBack();

        } catch (error) {

            // form validation error
            if (error.response.status === 422) {
                let message = "";

                for (let key in error.response.data.errors) {
                    message += `${error.response.data.errors[key]} \n`
                }

                data = {
                    status: 422,
                    message: message
                }
            } else {
                data = error.data;
            }
        } finally {

            setIsSubmitted(prev => false);

            notify(data);
        }
    };

    return {
        isSubmitted,
        submitData
    };
    
}