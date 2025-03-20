'use client'

import DataTable from '@/components/table/DataTable';
import Card from '@/components/card/Card';
import BaseLink from '@/components/buttons/BaseLink';
import Archieved from '@/components/icons/Archieved';
import SimpleIconButton from '@/components/buttons/SimpleIconButton';
import ButtonGroupH from '@/components/buttons/ButtonGroupH';
import SimpleIconLink from '@/components/buttons/SimpleIconLink';
import SidebarFiles from '@/components/icons/SidebarFiles';
import Link from 'next/link';
import Plus from '@/components/icons/Plus';
import BaseButton from '@/components/buttons/BaseButton';
import { useRef, useState, useEffect } from 'react';
import FileInput from '@/components/buttons/FileInput';
import Camera from '@/components/icons/Camera';
import axios from "@/lib/axios"
import { toast } from 'react-toastify';
import CreateFolderModal from '@/components/modal/CreateFolderModal';
import DeleteConfirmationModal from '@/components/modal/deleteConfirm';
import { useRouter } from 'next/navigation';
import { useAccessControl } from '@/hooks/accessControl';
// import Container from '@/components/container/Container';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import GoogleDrive from './googleDrive';

const Samples = () => {

    const datatableRef = useRef(null);
    const [dataUrl, setDataUrl] = useState('');
    const [resourceID, setResourceID] = useState(0);
    const [isDeletionModalVisible, setIsDeletionModalVisible] = useState(false);
    const [isFolderModalVisible, setIsFolderModalVisible] = useState(false);
    const [currentDirectory, setCurrentDirectory] = useState(null);
    const [directoryStack, setDirectoryStack] = useState([]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const router = useRouter();
    const { permissions, can } = useAccessControl();
    const [googleFolders, setGoogleFolders] = useState([]);
    const [googleFiles, setGoogleFiles] = useState([]);

    if (!can("Files & Folders")) {
        // navigate to 403 page.
        // router.push(process.env.NEXT_PUBLIC_UNAUTHORIZED_ROUTE);
    }



    // const loadGoogleFiles = async () => {
    //     try {
    //         const response = await axios.get(`/api/google-drive-files`);
    //         // console.log(response.data.folders);
    //         setGoogleFolders(response.data.folders);
    //         setGoogleFiles(response.data.files)

    //     } catch (error) {
    //         alert(error)
    //         // notify(error.data);

    //         // throw error;
    //     }
    // }


    // useEffect(() => {
    //     loadGoogleFiles();
    // }, []);

    const changeDirectory = (directoryID = null, naviagate = "in") => {

        let directories = directoryStack;

        if (directoryID && naviagate == "in") {
            directories.push(directoryID);

            if (datatableRef.current) {
                datatableRef.current.setTableFilter({
                    dirID: directoryID
                });
            }

            setCurrentDirectory(prev => directoryID);
        }
        else {
            directories.pop();

            if (!directories.length) {
                setCurrentDirectory(prev => null);

                if (datatableRef.current) {
                    datatableRef.current.setTableFilter({
                        dirID: null
                    });
                }
            } else {
                let newParent = directories[directories.length - 1];

                setCurrentDirectory(prev => newParent);

                if (datatableRef.current) {
                    datatableRef.current.setTableFilter({
                        dirID: newParent
                    });
                }
            }

        }

        setDirectoryStack(prev => directories);
    }

    const notify = (data) => {

        data.status == 201 ?
            toast.success(data.message, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            :
            toast.error(data.message, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
    }

    const handleFoldersPopup = () => {
        setIsFolderModalVisible(true);
    }

    const closeFolderModal = () => {
        setIsFolderModalVisible(false);
    };


    const handleFileUpload = async () => {

        let formData = new FormData();
        formData.append("directory", currentDirectory);

        let files = [...event.target.files];

        files.forEach((item, idx) => {
            formData.append(`file[${idx}]`, item);
        })

        let data = null;

        try {
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            data = response.data;

            if (datatableRef.current) {
                datatableRef.current.reloadDatatable();
            }

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
    }


    const closeDeletionModal = () => {
        setIsDeletionModalVisible(false);
    };


    const handleFileDeletionPopup = (fileID) => {
        setResourceID(fileID);
        setIsDeletionModalVisible(true);
    }


    const showFile = async (slug) => {
        const response = await axios.get(`/api/file/${slug}`, {
            responseType: 'blob',
        });

        // Extract the file's mime type from the response headers if necessary
        const contentType = response.headers['content-type'] || 'application/octet-stream';
        console.log(contentType);
        // Create a Blob from the response
        const blob = new Blob([response.data], { type: contentType });

        // Create an Object URL for the Blob
        const url = URL.createObjectURL(blob);

        // Open the Blob in a new tab
        window.open(url, '_blank');
    }


    const actionButtons = (
        <>
            {/* <BaseLink href="/files/archieve" className="bg-white md:bg-[#f5f5f5] text-xs md:text-base" >
                <Archieved className="fill-slate-500" />
                Archieved
            </BaseLink> */}
            <BaseButton className="bg-white md:bg-[#f5f5f5] text-base md:text-base" onClick={handleFoldersPopup} >
                <Plus className="fill-slate-500" />
                New Folder
            </BaseButton>

            <FileInput
                id="files"
                name="files"
                onChange={handleFileUpload}
                className="mt-1 !bg-[#080808] !text-white group cursor-pointer"
                multiple={true}
            >
                <span>Upload Files</span>
                <Camera className="stroke-slate-300  group-hover:stroke-slate-100" />
            </FileInput>

            {/* <BaseLink href="/files/folders" className="bg-white md:bg-[#f5f5f5] text-base md:text-base" >
                <Archieved className="fill-slate-500" />
                Folders
            </BaseLink> */}
        </>
    );


      

    const breadcrumb = (
        <ul className="flex items-center justify-start gap-3">
            <li className="capitalize text-base text-gray-800 font-bold hover:text-blue-500 hover:underline cursor-pointer" >
                <Link href="/dashboard">Dashboard</Link>
            </li>
            <li >&gt;</li>
            <li className="capitalize text-base text-gray-500 font-bold">
                Files
            </li>
        </ul>
    )

    const tableConfig = {
        remoteURL: "/api/files",
        title: <div className="flex items-center justify-start gap-3 text-xl md:text-xl font-semibold">
            <span className="size-[31px] rounded-full bg-[#f5f5f5] dark:bg-gray-900 inline-flex items-center justify-center">
                <SidebarFiles size="size-[23px] md:size-[23px]" className="stroke-slate-800 dark:stroke-slate-300" />
            </span>
            Files

            {
                directoryStack.length ? <SimpleIconButton className="border border-gray-600 px-2" onClick={() => changeDirectory(null, "out")} title="go back"> Back &nbsp; &nbsp;
                    <svg fill="currentColor" className="size-4" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5" />
                    </svg>
                </SimpleIconButton>
                    : ''
            }
        </div>,
        tableFluid: false,
        actionButtons: actionButtons,
        tableWrapperClass: "pb-4 rounded-[15px] 2xl:rounded-[30px]",
        breadcrumb: breadcrumb,

        columns: [
            {
                label: "Name",
                key: "name",
                render: (data, row) => {
                    if (row.type == "file")
                        return <button href={`file/${row.slug}`} onClick={() => { showFile(row.slug) }} className="text-sm text-blue-500 hover:underline" target="_blank">{data}</button>
                    else
                        return <span className="text-sm text-blue-500 hover:cursor-pointer hover:underline" onClick={() => changeDirectory(row.id)}>{row.name}</span>
                }
            },
            {
                label: "Type",
                key: "type"
            },
            {
                label: "MimeType",
                key: "mimetype"
            },
            {
                label: "Created",
                key: "created_at"
            },
            {
                label: "Updated",
                key: "updated_at"
            },
            {
                label: "Action",
                key: null,
                render: (data, row) => {
                    return <ButtonGroupH>
                        {/* <SimpleIconLink href={`/files/${row.id}`} className="btn-warning" title="Edit">
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                            </svg>
                        </SimpleIconLink> */}
                        <SimpleIconButton className="btn-danger" onClick={() => handleFileDeletionPopup(row.id)} title="Delete">
                            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </SimpleIconButton>
                    </ButtonGroupH>
                }
            },
        ],
        mobile_view: {
            render: (row) => {
            }
        }
    };



    return (
        <>
            <title>YORK - Files</title>

            <Card className="h-auto md:rounded-[15px] bg-transparent md:bg-white px-0 md:px-4 dark:bg-transparent md:dark:bg-gray-800">
                <DataTable tableConfig={tableConfig} ref={datatableRef} />
                <GoogleDrive />

            </Card>



            <DeleteConfirmationModal
                isVisible={isDeletionModalVisible}
                resourceID={resourceID}
                remoteEndPoint='/api/filesystem/delete'
                onClose={closeDeletionModal}
                datatableRef={datatableRef} />

            <CreateFolderModal
                isVisible={isFolderModalVisible}
                onClose={closeFolderModal}
                datatableRef={datatableRef}
                parentDirID={currentDirectory} />
        </>
    )
}

export default Samples;