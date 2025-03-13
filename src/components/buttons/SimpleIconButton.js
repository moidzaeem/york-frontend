
const SimpleIconButton = ({ className = "", onClick = () => {}, title = "", children }) => {
    return (
        <button 
            type="button" 
            title={title}
            className={`btn p-1 rounded-full flex items-center justify-center font-normal ${ className }`} 
            onClick={onClick}>
            
            { children }
        </button>
    )
}

export default SimpleIconButton