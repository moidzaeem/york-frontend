import { paginatorPages } from "@/lib/helpers"
import ChevronRight from "../icons/ChevronRight"
import ChevronLeft from "../icons/ChevronLeft"

const Paginator = ({ metaData, setCurrentPage, className = "" }) => {

    const links = paginatorPages(metaData)

    const requestPage = (page) => {
        if (page === "prev")
            page = metaData?.current_page - 1;
        else if (page === "next")
            page = metaData?.current_page + 1;

        if (page < 1 || page > metaData?.last_page)
            return false;

        setCurrentPage(page);
    }

    return (
        <div className="w-full flex gap-2 items-center justify-between px-4">
            <div className="grid grid-flow-col auto-cols-max pagination-wrapper">
                <button 
                    className={`flex items-center justify-center pagination-link ${ metaData?.current_page !== 1 ? "hover-effect" : "" }`} 
                    title="Previous" 
                    disabled={ metaData?.current_page === 1 }
                    onClick={() => requestPage("prev")}>

                    <ChevronLeft />
                </button>

                {
                    links.map((item, idx) => {
                        return <button 
                                    key={ idx } 
                                    className={`flex items-center justify-center pagination-link hover-effect ${ metaData?.current_page === item ? "active" : "" }`} 
                                    onClick={() => requestPage(item)}
                                    >{ item }</button>
                    })
                }

                <button 
                    className={`flex items-center justify-center pagination-link ${ metaData?.last_page !== metaData?.current_page ? "hover-effect" : "" }`} 
                    title="Next" 
                    disabled={ metaData?.last_page === metaData?.current_page }
                    onClick={() => requestPage("next")}>
                    
                    <ChevronRight />
                </button>
            </div>
            
            <p className="w-max text-gray-600 dark:text-slate-200 text-sm font-semibold">
                <span className="text-gray-500">showing</span> { metaData?.from } - { metaData?.to } <span className="text-gray-500">of</span> { metaData?.total }
            </p>
        </div>
    )
}

export default Paginator