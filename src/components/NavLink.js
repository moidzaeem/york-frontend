import Link from 'next/link'

const NavLink = ({ active = false, children, ...props }) => (
    <Link
        {...props}
        className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 focus:outline-none transition duration-150 ease-in-out ${
            active
                ? 'border-indigo-400 text-slate-100 focus:border-indigo-700'
                : 'border-transparent text-slate-300 hover:text-slate-200 hover:border-gray-600 focus:text-slate-200 focus:border-gray-600'
        }`}>
        {children}
    </Link>
)

export default NavLink
