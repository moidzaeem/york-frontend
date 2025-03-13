// components/Modal.js
import React, { useState } from 'react';
import BaseButton from '../buttons/BaseButton';
import { useSubmitData } from '@/hooks/submitData';

const ChangeRoleModal = ({ isVisible, resourceID = 0, resourceRole = "", remoteEndPoint="", onClose, datatableRef, children }) => {

    const { isSubmitted, submitData } = useSubmitData(remoteEndPoint);

    const sendRequest = async () => {

        try {
            await submitData({ id: resourceID, role: resourceRole });
            
            onClose();

            if (datatableRef.current) {
                datatableRef.current.reloadDatatable();
            }

        } catch (error) {
            
        }
    }

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0  overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-xl rounded-2xl shadow-teal-200 bg-white">
                <div className="mt-3 w-full">
                    <div className="flex flex-col gap-5">    
                        
                        <h3>Are you sure to <strong>swtich</strong> this resource role?</h3>
                        
                        { children }
                    </div>

                    <div className="grid grid-cols-2 gap-2 px-4 py-3 mt-3">
                        {
                            !isSubmitted ? (
                                <>
                                    <BaseButton className="bg-green-500 text-white !w-full lg:!justify-center" onClick={onClose}>Abort</BaseButton>
                                    <BaseButton className="bg-blue-500 text-white !w-full lg:!justify-center" onClick={sendRequest}>Yes, proceed</BaseButton>
                                </>
                            ) : <BaseButton className="col-span-2 bg-teal-500 text-white !w-full lg:!justify-center">Please wait ...</BaseButton>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChangeRoleModal;
