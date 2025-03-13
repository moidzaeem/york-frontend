// components/Modal.js
import React from 'react';
import BaseButton from '../buttons/BaseButton';
import { useSubmitData } from '@/hooks/submitData';

const DeleteConfirmationModal = ({ isVisible, resourceID = 0, remoteEndPoint="", onClose, datatableRef, callback = false }) => {

    const { isSubmitted, submitData } = useSubmitData(remoteEndPoint);

    const deleteResource = async () => {
        try {
            await submitData({ id: resourceID });
            
            onClose();

            if (callback)
                callback();

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
                    <div className="flex flex-col gap-5 items-center justify-center">    
                        <svg className="fill-red-500 h-28"
                            viewBox="0 0 367.011 367.01"
                                >
                            <g>
                                <g>
                                    <path d="M365.221,329.641L190.943,27.788c-1.542-2.674-4.395-4.318-7.479-4.318c-3.084,0-5.938,1.645-7.48,4.318L1.157,330.584
                                        c-1.543,2.674-1.543,5.965,0,8.639c1.542,2.674,4.395,4.318,7.48,4.318h349.65c0.028,0,0.057,0,0.086,0
                                        c4.77,0,8.638-3.863,8.638-8.639C367.011,332.92,366.342,331.1,365.221,329.641z M23.599,326.266L183.464,49.381l159.864,276.885
                                        H23.599z"/>
                                    <path d="M174.826,136.801v123.893c0,4.773,3.867,8.638,8.638,8.638c4.77,0,8.637-3.863,8.637-8.638V136.801
                                        c0-4.766-3.867-8.637-8.637-8.637C178.693,128.165,174.826,132.036,174.826,136.801z"/>
                                    <path d="M183.464,279.393c-5.922,0-10.725,4.8-10.725,10.722s4.803,10.729,10.725,10.729c5.921,0,10.725-4.809,10.725-10.729
                                        C194.189,284.193,189.386,279.393,183.464,279.393z"/>
                                </g>
                            </g>
                        </svg>
                        <h3>Are you sure to <strong>delete</strong> this resource?</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-2 px-4 py-3 mt-3">
                        {
                            !isSubmitted ? (
                                <>
                                    <BaseButton className="bg-green-500 text-white !w-full lg:!justify-center" onClick={onClose}>Abort</BaseButton>
                                    <BaseButton className="bg-red-500 text-white !w-full lg:!justify-center" onClick={deleteResource}>Yes, delete</BaseButton>
                                </>
                            ) : <BaseButton className="col-span-2 bg-blue-500 text-white !w-full lg:!justify-center">Please wait ...</BaseButton>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
