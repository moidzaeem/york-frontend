import Link from 'next/link'

const NavLink = ({ active = false, children, ...props }) => (
    <Link {...props} 
        className={`group p-2 px-4 text-sm font-medium truncate overflow-x-hidden transition duration-150 ease-in-out flex items-center justify-between rounded-3xl ${
            active
                ? 'bg-[#EC2C2C] dark:bg-gray-700 text-slate-100 dark:text-slate-100 active-link'
                : 'text-slate-800 dark:text-slate-300 hover:text-slate-100 focus:text-slate-100 dark:hover:text-slate-200 dark:focus:text-slate-200 hover:bg-[#EC2C2C] dark:hover:bg-gray-700 focus:bg-[#EC2C2C] dark:focus:bg-gray-700 hover:cursor-pointer'
        }`}>
            {children}
    </Link>
)

export default NavLink
