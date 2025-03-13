// components/Modal.js

import { useSubmitData } from '@/hooks/submitData';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FormAction from '../forms/FormAction';
import TextArea from '../TextArea';
import InputError from '../InputError';
import Label from '../Label';
import Loading from '@/app/(app)/Loading';
import Comment from '../comment/Comment';
import { useLoadData } from '@/hooks/loadData';
import BaseButton from '../buttons/BaseButton';
import DeleteConfirmationModal from './deleteConfirm';
import { useState } from 'react';
import SimpleIconButton from '../buttons/SimpleIconButton';
import Camera from '../icons/Camera';
import FileInput from '../buttons/FileInput';
import Image from 'next/image';
import axios from '@/lib/axios';

const PhotosModal = ({ isVisible, resourceID, onClose, photosEndpoint, newPhotoEndpoint }) => {


    const {isSubmitted, submitData} = useSubmitData(newPhotoEndpoint);
    
    const {data: photos, loadData, setData: setPhotos} = useLoadData(photosEndpoint, resourceID, isVisible);

    const [isDeletionModalVisible, setIsDeletionModalVisible] = useState(false);
    const [photoID, setPhotoID] = useState(0);

    const SUPPORTED_FORMATS = [
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/svg+xml',
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
        'application/vnd.openxmlformats-officedocument.presentationml.presentation', // .pptx
        'text/plain' // .txt
    ];
    const FILE_SIZE = 1024 * 1024 * 12; // 12MB


    const closeDeletionModal = () => {
        setIsDeletionModalVisible(false);
    };
    

    const handleDeletionPopup = (photoID) => {
        console.log("logging: ");
        console.log(photoID);
        setPhotoID(photoID);
        setIsDeletionModalVisible(true);
    }

    const handleFileInputChange = () => {
        formik.setFieldValue("files", [...event.target.files])

        event.target.closest("form").querySelector("button[type=submit]").click();
    }

    const formik = useFormik({
        initialValues: {
            id: resourceID,
            files: []
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            id: Yup.number()
                .required('Required')
                .integer("Must be valid task"),
            files: Yup.array()
                .of(
                    Yup.mixed()
                        .test(
                            'fileSize',
                            'File too large',
                            value => value && value.size <= FILE_SIZE
                        )
                        .test(
                            'fileFormat',
                            'Unsupported Format',
                            value => value && SUPPORTED_FORMATS.includes(value.type)
                        )
                )
        }),
        onSubmit: async (payload, params) => {
            await submitData(payload, params);

            loadData();
        }
    });

    const showFile = (slug) => {
        axios.get(`/api/file/${slug}`, {
            responseType: 'blob',
        }).then(response => {

            // Extract the file's mime type from the response headers if necessary
            const contentType = response.headers['content-type'] || 'application/octet-stream';
            console.log(contentType);
            // Create a Blob from the response
            const blob = new Blob([response.data], { type: contentType });
    
            // Create an Object URL for the Blob
            const url = URL.createObjectURL(blob);
    
            // Open the Blob in a new tab
            window.open(url, '_blank');
        });

    }

    const previewFile = (p, i) => {

        switch (p.mimetype) {
            case "image/jpeg":
            case "image/jpg":
            case "image/png": {

                return <img 
                            src={ p.path } 
                            onClick={ () => { showFile(p.slug) }}
                            className="rounded-md w-auto h-40 aspect-auto cursor-pointer" 
                            alt="Photo" />
                break;
            }
        
            default:
                return <span className="px-3 text-blue-500 hover:underline text-wrap cursor-pointer" onClick={ () => { showFile(p.slug) }}>{ p.name }</span>
                break;
        }
    }

    if (!isVisible) return null;

    return (

        <>
            <div className="fixed inset-0  overflow-y-auto h-full w-full z-50">
                <div className="relative top-20 mx-auto p-5 border max-w-[1080px] shadow-xl rounded-2xl shadow-teal-200 bg-white">

                    <div className="w-full flex flex-row items-center justify-end gap-5 mt-6">
                        <SimpleIconButton className="" onClick={ () => { setPhotos(prev => []); onClose(); } } title="close">
                            <svg fill="currentColor" className="size-6" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                        </SimpleIconButton>
                    </div>

                    <div className="w-full px-4 mt-3">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-11 gap-y-6">

                                <input type="hidden" name="id" value={ resourceID } />

                                <div className="col-span-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4 py-4 px-2 bg-gray-100 rounded-xl">
                                    <h3 className="text-black text-xl text-semibold">Photos & Files</h3>

                                    <FileInput 
                                        id="files" 
                                        name="files" 
                                        onChange={ handleFileInputChange }
                                        className="mt-1 !bg-[#080808] !text-white group cursor-pointer" 
                                        multiple={true}
                                        >
                                        <span>Upload Files</span>
                                        <Camera className="stroke-slate-300  group-hover:stroke-slate-100" />
                                    </FileInput>
                                </div>
                            </div>

                            <FormAction className="md:justify-end hidden" isSubmitted={isSubmitted} />
                        </form>

                        <div className="mt-6">
                            <h3 className="text-black text-base text-semibold"></h3>

                            <div className="flex flex-col md:flex-row gap-x-4 gap-y-4 flex-wrap">

                                {
                                    photos?.length ? photos.map((p, i) => (

                                        <div key={ i } className="w-full my-6 comment">
                                            <div className="flex items-center justify-between gap-3 text-sm font-medium text-slate-800 dark:text-slate-300 mb-2">
                                                <div className="flex items-center justify-start gap-3">
                                                    {
                                                        p.owner?.avatar ? (
                                                            <Image 
                                                                src={ p.owner.avatar }
                                                                width={40} 
                                                                height={40} 
                                                                className="rounded-full size-[40px] aspect-square" 
                                                                alt="profile photo" />
                                                        )
                                                        : (
                                                            <span className="bg-gray-200 text-gray-800 rounded-full size-[40px] aspect-square text-base flex items-center justify-center">
                                                                { p.owner.initial }
                                                            </span>
                                                        )
                                                    }

                                                    <div className="hidden md:flex flex-col gap-1 text-base lg:text-lg">
                                                        { p.owner.name }
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-end gap-2">
                                                    {
                                                        p.isOwner ? 
                                                            <SimpleIconButton className="border border-red-600 text-red-600" onClick={ () => { handleDeletionPopup(p.id) } } title="delete">
                                                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                                </svg>
                                                            </SimpleIconButton>
                                                            :
                                                            ""
                                                    }
                                                </div>
                                            </div>

                                            <div className="p-2 lg:p-4 bg-gray-200 text-gray-800 text-base rounded-md" >
                                                {
                                                    previewFile(p, i)
                                                }
                                            </div>

                                            <div className="flex items-center justify-between gap-2 mt-1 text-sm">
                                                <span>{ p.time }</span>
                                                <span>{ p.date }</span>
                                            </div>
                                            
                                        </div>
                                    ))
                                    :
                                    <div className="w-full my-6 p-2 lg:p-4 bg-gray-200 text-gray-800 text-base text-center rounded-md">
                                        Photos not found.
                                    </div>

                                }

                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <DeleteConfirmationModal 
                isVisible={ isDeletionModalVisible } 
                resourceID={ photoID } 
                remoteEndPoint='/api/filesystem/delete' 
                onClose={ closeDeletionModal }
                callback={ loadData } />
        </>
    );
};

export default PhotosModal;
