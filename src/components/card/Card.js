
const Card = ({ className = "", children }) => {
    return (
        <div className={`rounded-[10.48px] shadow-sm py-6 px-4 2xl:px-8 overflow-x-hidden ${ className }`}>
            { children }
        </div>
    )
}

export default Card