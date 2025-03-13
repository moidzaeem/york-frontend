
const FileInput = ({ name = "files", id = "files", onChange, multiple = false, className = "", children, ...props }) => {
    return (
            <label
                htmlFor={id} 
                className={`w-[189px] btn flex items-center justify-center gap-3 bg-[#f5f5f5] dark:bg-gray-900 font-normal text-slate-500 py-2 ${ className }`}
                {...props}>
                
                { children }
                <input className="opacity-0 hidden" type="file" id={id} name={name} multiple={ multiple ? true : false} onChange={onChange} />
            </label>
    )
}

export default FileInput