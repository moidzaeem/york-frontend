
const ButtonGroupH = ({ className = "", onClick = () => {}, title = "", children }) => {
    return (
        <div 
            className={`
                p-1 rounded-full 
                flex items-center justify-start gap-2 
                font-normal 
                ${ className }
            `} >
            
            { children }
        </div>
    )
}

export default ButtonGroupH;