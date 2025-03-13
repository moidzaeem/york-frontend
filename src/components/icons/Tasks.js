

const Tasks = ({ className, size="size-[16px]" }) => {
    return (
        <svg viewBox="0 0 27 27" className={`fill-none ${ size } ${ className }`}>
            <path d="M10.4346 6.9834H22.3911" strokeWidth="1.63043" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.78223 6.76626L5.65179 7.63582L7.82569 5.46191" strokeWidth="1.63043" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.78223 13.2877L5.65179 14.1573L7.82569 11.9834" strokeWidth="1.63043" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.78223 19.8097L5.65179 20.6793L7.82569 18.5054" strokeWidth="1.63043" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.4346 13.5054H22.3911" strokeWidth="1.63043" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M10.4346 20.0269H22.3911" strokeWidth="1.63043" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

export default Tasks;