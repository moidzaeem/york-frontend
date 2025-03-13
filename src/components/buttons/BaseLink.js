import Link from "next/link"

const BaseLink = ({ href = "", className = "", children }) => {
    return (
        <Link 
            className={`text-nowrap btn flex items-center justify-center lg:justify-between gap-3 bg-[#f5f5f5] dark:bg-gray-900 font-normal text-slate-500 py-2 ${ className }`} 
            href={ href }>
            
            { children }
        </Link>
    )
}

export default BaseLink