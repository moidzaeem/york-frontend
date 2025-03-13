

const LogOut = ({ className, size = "size-[16px]" }) => {
    return (
        <svg fill="currentColor" className={`${ size} ${ className }`} viewBox="0 0 16 16">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2"/>
        </svg>
    );
}

export default LogOut;