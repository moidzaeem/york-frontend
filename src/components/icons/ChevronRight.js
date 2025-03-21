

const ChevronRight = ({ className }) => {
    return (
        <svg 
            className={`fill-current h-4 w-4 ${ className }`} 
            viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
        </svg>
    );
}

export default ChevronRight;