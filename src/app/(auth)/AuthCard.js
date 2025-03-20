const AuthCard = ({ logo, children }) => (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-white">
    {/* <div>{logo}</div> */}

    <div className="w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mt-6 px-8 py-6 bg-white overflow-hidden sm:rounded-xl">
        {children}
    </div>
</div>

)

export default AuthCard
