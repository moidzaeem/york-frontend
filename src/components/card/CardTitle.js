
const CardTitle = ({ className = "", children }) => {
    return (
        <h3 className={`${ className } text-xl`}>
            { children }
        </h3>
    )
}

export default CardTitle