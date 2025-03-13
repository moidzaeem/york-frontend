import Link from 'next/link'
import ApplicationLogo from '@/components/ApplicationLogo'
import SimpleIconButton from '../buttons/SimpleIconButton'

const Brand = ({ sidebarStateHandler, icon }) => {

    return (
        <div className="flex-shrink-0 flex items-center gap-3">
            <SimpleIconButton 
                className="bg-[#231f20] text-slate-100 hover:text-white focus:text-white dark:bg-gray-100 dark:text-gray-700 dark:hover:text-gray-800 dark:focus:text-gray-800 text-3xl p-[6px]" 
                onClick={ () => sidebarStateHandler(prevState => !prevState) } 
                title="Toggle Sidebar">

                {/* <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                </svg> */}

                { icon }

                {/* <BsList /> */}
            </SimpleIconButton>

            <Link href="/dashboard">
                <ApplicationLogo className="block h-10 w-auto fill-current text-slate-800 dark:text-slate-300" />
            </Link>

        </div>
    )
}

export default Brand