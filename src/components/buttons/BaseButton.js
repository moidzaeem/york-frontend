
const BaseButton = ({ type = "button", className = "", onClick = () => {}, children, ...props }) => {
    return (
        <button 
            type={type} 
            className={` btn flex items-center justify-center lg:justify-between gap-3 bg-[#f5f5f5] dark:bg-gray-900 font-normal text-slate-500 py-2 ${ className }`} 
            onClick={onClick}
            {...props}>
            
            { children }
        </button>
    )
}

export default BaseButton