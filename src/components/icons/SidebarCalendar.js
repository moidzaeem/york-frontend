

const SidebarCalendar = ({ className, size="size-[16px]" }) => {
    return (
        <svg viewBox="0 0 27 27" className={`fill-none ${ size } ${ className }`}>
            <path d="M16.9561 5.20077V3.02686M16.9561 5.20077V7.37468M16.9561 5.20077H12.0648M3.9126 11.7225V21.5051C3.9126 22.7058 4.88589 23.679 6.08651 23.679H21.3039C22.5046 23.679 23.4778 22.7058 23.4778 21.5051V11.7225H3.9126Z" strokeWidth="1.63043" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3.9126 11.7224V7.3746C3.9126 6.17398 4.88589 5.20068 6.08651 5.20068H8.26042" strokeWidth="1.63043" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.26074 3.02686V7.37468" strokeWidth="1.63043" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M23.4781 11.7224V7.3746C23.4781 6.17398 22.5049 5.20068 21.3042 5.20068H20.7607" strokeWidth="1.63043" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
}

export default SidebarCalendar;