import Link from "next/link"

const NotFoundPage = () => {
    return (
        <div className="relative flex items-center justify-center min-h-screen bg-white">
            <div className="w-[calc(100%-100px)] xl:w-[70%] mx-auto bg-white rounded-md  p-8 min-h-[400px] relative">
                <div className="flex flex-col gap-8 items-left">
                    <div className="px-4 text-7xl lg:text-[350px] text-[#498062] font-bold  tracking-wider text-left">
                        404
                    </div>



                    <div className="ml-4 text-3xl lg:text-[60px] text-black font-semibold tracking-wider">
                        Page not found
                    </div>

                    <Link href="/dashboard" className="ml-4 text-xl lg:text-2xl text-black font-bold hover:text-green-900 hover:underline uppercase text-right tracking-wider w-full flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-5">
                        <span className="text-nowrap">Move to main page</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-arrow-right !text-sm w-12" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                        </svg>
                    </Link>
                </div>

                <div className="absolute size-36 -bottom-14 lg:bottom-24 right-28">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-bug text-red-950 text-9xl" viewBox="0 0 16 16">
                        <path d="M4.355.522a.5.5 0 0 1 .623.333l.291.956A5 5 0 0 1 8 1c1.007 0 1.946.298 2.731.811l.29-.956a.5.5 0 1 1 .957.29l-.41 1.352A5 5 0 0 1 13 6h.5a.5.5 0 0 0 .5-.5V5a.5.5 0 0 1 1 0v.5A1.5 1.5 0 0 1 13.5 7H13v1h1.5a.5.5 0 0 1 0 1H13v1h.5a1.5 1.5 0 0 1 1.5 1.5v.5a.5.5 0 1 1-1 0v-.5a.5.5 0 0 0-.5-.5H13a5 5 0 0 1-10 0h-.5a.5.5 0 0 0-.5.5v.5a.5.5 0 1 1-1 0v-.5A1.5 1.5 0 0 1 2.5 10H3V9H1.5a.5.5 0 0 1 0-1H3V7h-.5A1.5 1.5 0 0 1 1 5.5V5a.5.5 0 0 1 1 0v.5a.5.5 0 0 0 .5.5H3c0-1.364.547-2.601 1.432-3.503l-.41-1.352a.5.5 0 0 1 .333-.623M4 7v4a4 4 0 0 0 3.5 3.97V7zm4.5 0v7.97A4 4 0 0 0 12 11V7zM12 6a4 4 0 0 0-1.334-2.982A3.98 3.98 0 0 0 8 2a3.98 3.98 0 0 0-2.667 1.018A4 4 0 0 0 4 6z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage
