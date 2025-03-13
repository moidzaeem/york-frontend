import Link from "next/link"

const SimpleIconLink = ({ href = "", className = "", title = "", children }) => {
    return (
        <Link
            href={href}  
            title={title}
            className={`btn p-1 rounded-full flex items-center justify-center font-normal ${ className }`} >
            
            { children }
        </Link>
    )
}

export default SimpleIconLink;