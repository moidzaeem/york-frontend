import { useState } from "react"
import axios from '@/lib/axios'
import dynamic from 'next/dynamic';

const CustomEditor = dynamic( () => {
  return import( '../editors/CustomEditor' );
}, { ssr: false } );

// import CustomEditor from "../editors/CustomEditor";


const NewSnippet = ({ setSnippets }) => {

    const [pending, setPending] = useState(false)
    const [message, setMessage] = useState(null)
    const [frameworks, setFrameworks] = useState(null)
    const [descriptionEditor, setDescriptionEditor] = useState(null)

    const successMessage = <span className="text-lg text-green-500 px-4 py-2 border border-green-600 rounded-sm">Code snippet saved!</span>
    const failureMessage = <span className="text-lg text-red-500 px-4 py-2 border border-red-600 rounded-sm">Failed to save code snippet!</span>

    // Fetch Frameworks
    const fetchFrameworks = (event) => {
        const language = event.target.value

        if(!language || language === "-") return false

        // do api call to get frameworks
        console.log(`Loading frameworks for language: ${language}`)

        // set frameworks here...
    }

    // Saving new code snippet
    const saveCodeSnippet = async (event) => {
        event.preventDefault()

        setPending(prevState => true)

        const formData = new FormData(event.target)

        axios
            .post('/api/code-snippets', formData)
            .then((res) => {
                event.target.reset()
                descriptionEditor.setData("<p>Write something about your snippet...</p>")
                setSnippets(snippets => res.data.data)
                setPending(prevState => false)
                setMessage(successMessage)
            })
            .catch(error => {
                console.log(error);
                if (error.response.status !== 422) throw error

                // setErrors(error.response.data.errors)
                setPending(prevState => false)
                setMessage(failureMessage)
            })
    }

    return (
        <form method="post" onSubmit={saveCodeSnippet}>

            <fieldset className="border border-gray-500 rounded-sm p-4">
                <legend className="m-2 px-2 text-slate-300">Snippet Metadata</legend>

                <div className="w-full flex flex-col sm:flex-row gap-5">
                    <select className="text-input flex-1 " name="language" onChange={fetchFrameworks}>
                        <option value="-">Choose Language/Framework</option>
                        <option value="php">PHP</option>
                        <option value="javascript">JavaScript</option>
                        <option value="css">CSS</option>
                    </select>

                    <select className="text-input flex-1 " name="framework">
                        <option value="-">Select Framework</option>
                        <option value="laravel">Laravel</option>
                        <option value="react">React</option>
                        <option value="angular">Angular</option>
                    </select>
                </div>
                
                <div className="w-full mt-5 flex flex-col sm:flex-row gap-5">
                    <input type="text" placeholder='Snippet title' className="text-input flex-1" name="title" />
                </div>

                <div className="w-full mt-5 flex flex-row gap-5">
                    <CustomEditor setDescriptionEditor={ setDescriptionEditor } />
                    {/* <CKEditor
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
                    /> */}
                </div>
            </fieldset>
            
            <fieldset className="border border-gray-500 rounded-sm p-4 my-5">
                <legend className="m-2 px-2 text-slate-300">Snippet Contents</legend>
                
                <div className="w-full flex flex-col sm:flex-row gap-5">
                    <textarea rows={5} placeholder='Snippet Contents' className="text-input flex-1" name="contents" />
                </div>
            </fieldset>
            
            <div className="w-full mt-5 flex justify-end gap-5">
                { message }
                <button type="submit" className="btn btn-primary"  disabled={pending}>Save Changes</button>
            </div>
        </form>
    )
}

export default NewSnippet