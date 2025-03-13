

const PageContentHeader = ({ background = "bg-gray-800", title, children }) => {
    return (
        <header className={`min-h-[200px] ${ background } pb-5 rounded-2xl`}>
            <div className="h-full 2xl:container mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-start">
                <h2 className="mt-5 font-semibold text-3xl text-white leading-tight">
                    {title}
                </h2>
            </div>

            {children}
        </header>
    )
}

export default PageContentHeader