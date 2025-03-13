import { useRef } from "react"
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const CustomEditor = ({ setDescriptionEditor }) => {

    const snippetDescriptionElement = useRef(0)

    // Editor configuration
    const editorConfiguration = {
        toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            '|',
            'outdent',
            'indent',
            '|',
            'blockQuote',
            'insertTable',
            'mediaEmbed',
            'undo',
            'redo'
        ]
    };

    return (
        <>
            <textarea className="hidden" name="description" ref={ snippetDescriptionElement } />

            <CKEditor
                editor={ ClassicEditor }
                config={ editorConfiguration }
                onChange={ (event, editor ) => {
                    const data = editor.getData();
                    snippetDescriptionElement.current.value = data;
                    console.log( { event, editor, data } );
                } }
                onReady={ editor => {
                    setDescriptionEditor(prev => editor);
                } }
            />
        </>
    )
}

export default CustomEditor