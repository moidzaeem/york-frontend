

const Container = ({ className = "", children }) => {

    return (
        <div className={`2xl:container mx-auto px-6 lg:px-8 ${ className }`}>
            { children }
        </div>
    )
}

export default Container