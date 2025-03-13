
import Image from "next/image";
import SimpleIconButton from "../buttons/SimpleIconButton";

const Comment = ({ comment, handleDeletion = () => {} }) => {
    
    const formattedComment = comment.comment.replace(/\r\n/g, '<br />').replace(
        /https?:\/\/[^\s]+/g, 
        (url) => `<a href="${url}" class="underline text-blue-500 cursor-pointer" target="_blank">${url}</a>`
    );

    return (
        <div className="w-full my-6 comment">
            <div className="flex items-center justify-between gap-3 text-sm font-medium text-slate-800 dark:text-slate-300 mb-2">
                <div className="flex items-center justify-start gap-3">
                    {
                        comment.owner?.avatar ? (
                            <Image 
                                src={ comment.owner.avatar }
                                width={40} 
                                height={40} 
                                className="rounded-full size-[40px] aspect-square" 
                                alt="profile photo" />
                        )
                        : (
                            <span className="bg-gray-200 text-gray-800 rounded-full size-[40px] aspect-square text-base flex items-center justify-center">
                                { comment.owner.initial }
                            </span>
                        )
                    }

                    <div className="hidden md:flex flex-col gap-1 text-base lg:text-lg">
                        { comment.owner.name }
                    </div>
                </div>

                <div className="flex items-center justify-end gap-2">
                    {
                        comment.isOwner ? 
                            <SimpleIconButton className="border border-red-600 text-red-600" onClick={ () => { handleDeletion(comment.id) } } title="delete">
                                <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </SimpleIconButton>
                            :
                            ""
                    }
                </div>
            </div>

            <div className="p-2 lg:p-4 bg-gray-200 text-gray-800 text-base rounded-md"
                dangerouslySetInnerHTML={{ __html: formattedComment }} />

            <div className="flex items-center justify-between gap-2 mt-1 text-sm">
                <span>{ comment.time }</span>
                <span>{ comment.date }</span>
            </div>
            
        </div>
    );
};

export default Comment;
