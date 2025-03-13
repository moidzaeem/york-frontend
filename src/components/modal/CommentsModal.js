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

const CommentsModal = ({ isVisible, resourceID, onClose, commentsEndpoint, newCommentEndpoint }) => {

    const {isSubmitted, submitData} = useSubmitData(newCommentEndpoint);
    
    const {data: comments, loadData, setData: setComments } = useLoadData(commentsEndpoint, resourceID, isVisible);

    const [isDeletionModalVisible, setIsDeletionModalVisible] = useState(false);
    const [commentID, setCommentID] = useState(0);


    const closeDeletionModal = () => {
        setIsDeletionModalVisible(false);
    };
    

    const handleDeletionPopup = (commentID) => {
        console.log("logging: ");
        console.log(commentID);
        setCommentID(commentID);
        setIsDeletionModalVisible(true);
    }

    const formik = useFormik({
        initialValues: {
            comment: "",
            id: resourceID
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            id: Yup.number()
                .required('Required')
                .integer("Must be valid task"),
            comment: Yup.string()
                .required('Required')
                .max(10000, 'Comment is too long')
        }),
        onSubmit: async (payload, params) => {
            await submitData(payload, params);

            loadData();
        }
    });

    if (!isVisible) return null;

    return (

        <>
            <div className="fixed inset-0  overflow-y-auto h-full w-full z-50">
                <div className="relative top-20 mx-auto p-5 border max-w-[1080px] shadow-xl rounded-2xl shadow-teal-200 bg-white">

                    <div className="w-full flex flex-row items-center justify-end gap-5 mt-6">
                        <SimpleIconButton className="" onClick={ () => { setComments(prev => []); onClose(); } } title="close">
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

                                {/* Form Group start */}
                                <div className="md:col-span-2">
                                    <Label htmlFor="comment">
                                        Comment
                                        <InputError message={formik.touched.comment && formik.errors.comment ? formik.errors.comment : ''} />
                                    </Label>

                                    <TextArea
                                        id="comment"
                                        rows="4"
                                        name="comment"
                                        value={ formik.values.comment }
                                        className="block mt-1 w-full bg-[#f5f5f5]"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                {/* Form Group end */}
                            </div>

                            <FormAction className="md:justify-end" isSubmitted={isSubmitted} />
                        </form>

                        <div className="mt-3">
                            <h3 className="text-black text-base text-semibold">All Comments</h3>

                            {
                                comments?.length ? comments.map((c, i) => <Comment key={ i } comment={c} handleDeletion={ handleDeletionPopup } />)
                                :
                                <div className="w-full my-6 p-2 lg:p-4 bg-gray-200 text-gray-800 text-base text-center rounded-md">
                                    Comments not found.
                                </div>

                            }
                        </div>
                    </div>
                </div>
            </div>

            <DeleteConfirmationModal 
                isVisible={ isDeletionModalVisible } 
                resourceID={ commentID } 
                remoteEndPoint='/api/comments/delete' 
                onClose={ closeDeletionModal }
                callback={ loadData } />
        </>
    );
};

export default CommentsModal;
