
import Search2 from "../icons/Search2"

const DataTableSearch = ({ className = "", searchAction = () => {}, children }) => {
    return (
        <label 
            className={`w-full lg:max-w-48 dark:bg-gray-900 text-input border-0 flex items-center justify-start gap-3  ${ className }`} 
            >
            <Search2 className="fill-slate-500" />
            
            <input 
                type="text" 
                className="w-[calc(100%-26px)] px-0 border-0 focus:outline-0 focus:ring-0 bg-transparent " 
                placeholder="search here..." 
                onKeyUp={ searchAction } />
        </label>
    )
}

export default DataTableSearch
