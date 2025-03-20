import React, { useState, useEffect } from 'react';
import axios from "@/lib/axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';
import {
    faFilePdf,
    faFileImage,
    faFileWord,
    faFileExcel,
    faFilePowerpoint,
    faFile,
} from '@fortawesome/free-solid-svg-icons';

// Function to return the appropriate icon based on MIME type
const getFileIcon = (mimeType) => {
    switch (mimeType) {
        case 'application/pdf':
            return faFilePdf; // PDF file icon
        case 'image/png':
        case 'image/jpeg':
        case 'image/gif':
            return faFileImage; // Image file icon (JPEG, PNG, GIF)
        case 'application/msword':
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            return faFileWord; // Word document icon
        case 'application/vnd.ms-excel':
        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
        case 'text/csv':
            return faFileExcel; // Excel file icon
        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            return faFilePowerpoint; // PowerPoint file icon
        default:
            return faFile; // Default file icon for other types
    }
};

const GoogleDrive = () => {
    const [googleFolders, setGoogleFolders] = useState([]);
    const [googleFiles, setGoogleFiles] = useState([]);
    const [nextPageToken, setNextPageToken] = useState(null); // Track the next page token for pagination
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentFolder, setCurrentFolder] = useState(null);
    const [loading, setLoading] = useState(false); // State for loading spinner

    // Fetch Google Drive files and folders
    const fetchGoogleDriveData = async (nextToken = null) => {
        setLoading(true); // Set loading state to true when fetching
        try {
            const response = await axios.get('/api/google-drive-files', {
                params: {
                    nextPageToken: nextToken || '',
                },
            });

            // Append new files to existing files (preserve old ones)
            setGoogleFolders(response.data.folders);
            setGoogleFiles(prevFiles => [...prevFiles, ...response.data.files]); // Append files

            setNextPageToken(response.data.nextPageToken); // Update next page token for further requests
        } catch (error) {
            console.error('Error fetching data from Google Drive:', error);
        } finally {
            setLoading(false); // Set loading state to false after fetching is complete
        }
    };

    // Open folder popup
    const openPopup = (folder) => {
        setCurrentFolder(folder);
        setIsPopupOpen(true);
    };

    // Close folder popup
    const closePopup = () => {
        setIsPopupOpen(false);
        setCurrentFolder(null);
    };

    // Open file in a new tab
    const openFileLink = (fileLink) => {
        window.open(fileLink, '_blank');
    };

    // Fetch data when component mounts
    useEffect(() => {
        fetchGoogleDriveData();
    }, []);

    // Load more files when clicking the "Load More" button
    const loadMoreFiles = () => {
        if (nextPageToken) {
            fetchGoogleDriveData(nextPageToken); // Pass nextPageToken to fetch the next set of files
        }
    };

    return (
        <div className="p-6">
            <h4 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Google Drive Files</h4>

            {/* Display loading state */}
            {loading && (
                <div className="text-center">
                    <span>Loading...</span>
                </div>
            )}

            {/* Display the list of folders and files */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* Render folders */}
                {googleFolders && googleFolders.map((item, index) => (
                    <li
                        key={index}
                        className="file-item flex flex-col items-center space-y-2 p-6 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md hover:shadow-lg transition duration-200 ease-in-out transform hover:scale-105 cursor-pointer"
                        onClick={() => openPopup(item)} // Open popup only for folders
                    >
                        <FontAwesomeIcon icon={faFolder} className="folder-icon text-yellow-500 text-5xl mb-2" />
                        <span className="text-center text-sm">{item.name}</span>
                    </li>
                ))}

                {/* Render files */}
                {googleFiles && googleFiles.map((file, index) => (
                    <li
                        key={index}
                        className="file-item flex flex-col items-center space-y-4 p-6 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer bg-white dark:bg-gray-800"
                        onClick={() => openFileLink(file.webViewLink)} // Open file link when clicked
                    >
                        {/* File Icon based on MimeType */}
                        <div className="flex items-center justify-center bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full">
                            <FontAwesomeIcon
                                icon={getFileIcon(file.mimeType)}
                                className="text-blue-500 text-3xl"
                            />
                        </div>

                        {/* File Name */}
                        <span className="text-center text-sm font-semibold text-gray-800 dark:text-white truncate w-full max-w-[150px] text-ellipsis overflow-hidden">
                            {file.name}
                        </span>

                        {/* File Type (Optional) */}
                        <span className="text-xs text-gray-500 dark:text-gray-300">{file.mimeType}</span>
                    </li>
                ))}

            </ul>

            {/* Load More Button */}
            {nextPageToken && !loading && (
                <div className="text-center mt-6">
                    <button
                        onClick={loadMoreFiles}
                        className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Load More
                    </button>
                </div>
            )}

            {/* Popup for showing folder files */}
            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96 max-h-80 overflow-auto flex flex-col">

                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{currentFolder.name} Files</h3>

                        <ul className="space-y-4 max-h-60 overflow-y-auto">
                            {currentFolder.files && currentFolder.files.map((file, index) => (
                                <li
                                    key={index}
                                    className="text-sm text-gray-800 dark:text-white hover:text-blue-500 cursor-pointer truncate"
                                    onClick={() => openFileLink(file.webViewLink)} // Open the file link when clicked
                                >
                                    {file.name}
                                </li>
                            ))}
                        </ul>

                        {/* Close button at the bottom */}
                        <div className="mt-auto">
                            <button
                                className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                                onClick={closePopup}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GoogleDrive;
