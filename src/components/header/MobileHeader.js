
import { useAuth } from '@/hooks/auth'
import Dropdown from '@/components/Dropdown'
import { DropdownButton } from '@/components/DropdownLink'
import ChevronDown from '../icons/ChevronDown'
import Image from 'next/image'
import SidebarTools from '../icons/SidebarTools'
import ThemeSwitch from '../icons/ThemeSwitch'
import Bell from '../icons/Bell'
import SimpleIconButton from '../buttons/SimpleIconButton'
import ApplicationLogo from '../ApplicationLogo'
import Link from 'next/link'
import Search2 from '../icons/Search2'
import LogOut from '../icons/LogOut'
import { useNotification } from '@/hooks/notification'


const MobileHeader = ({ className = "", isFixed = true, user, sidebarStateHandler, openSearch = () => {}, icon, children }) => {

    const { logout } = useAuth()

    const { notifications } = useNotification();

    return (
        <nav className={`mx-5 py-2 rounded-full bg-white dark:bg-gray-800 border-b-[1px] border-white dark:border-gray-800 ${ className } ${
            isFixed
                ? "sticky inset-x-0 top-2 z-50"
                : ""
        }`}>
            {/* Primary Navigation Menu */}
            <div className="mx-auto px-4 sm:px-6 lg:px-8 md:pt-5">
                <div className="flex justify-between gap-5 h-">
                    <div className="flex items-center justify-start gap-3 grow shirnk">
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

                            <button className="grow-0 shrink-0 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full size-[40px] aspect-square flex items-center justify-center"onClick={openSearch}>
                                <Search2 className="fill-slate-500" size="size-[20px]" />
                            </button>
                        </div>
                    </div>

                    <div className="grow flex items-center justify-center">
                        <Link href="/dashboard">
                            <ApplicationLogo className="block h-10 w-auto fill-current text-slate-800 dark:text-slate-300" />
                        </Link>
                    </div> 

                    

                    <div className="flex items-center justify-end grow shrink gap-3">

                        {/* Notifications Dropdown */} 
                        <div className="flex items-center">
                            <Dropdown
                                align="right"
                                width="w-[90vw] max-w-[400px]"
                                trigger={
                                    <button className="grow-0 shrink-0 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full size-[40px] aspect-square flex items-center justify-center">
                                        <Bell size="size-[20px]" fill="fill-gray-600 hover:fill-gray-800" />
                                    </button>
                                }>
                                {/* Authentication */} 

                                <div className="px-4 py-4 flex items-center justify-start gap-2">
                                    <Bell size="size-[20px]" fill="fill-gray-600 hover:fill-gray-800" />
                                    <span className="font-bold text-lg">My Notifications</span>
                                </div>

                                <span className="w-full block my-[3px] h-[1px] border-t" />

                                <div className="mb-6"></div>

                                {
                                    notifications?.length ? notifications.map((item, idx) => (
                                        <div key={ idx } className="text-sm leading-5 text-gray-700 px-4 py-1">
                                            <div className="h-10 py-1 px-3 bg-[#1CA988] dark:bg-[#1CA988] !rounded-full flex items-center text-white dark:text-white font-normal text-base">
                                                { item.message }
                                            </div>
                                            {/* <NotificationItem notification="You have 1 new task" /> */}
                                        </div>
                                    ))
                                    : 
                                    (
                                        <p className="leading-5 text-gray-700 text-base text-center">No Notificaitons</p>
                                    )
                                }

                                <div className="mb-6"></div>
                            </Dropdown>
                        </div>

                        {/* Settings Dropdown */} 
                        <div className="flex items-center">
                            <Dropdown
                                align="right"
                                width="w-[60vw] max-w-[300px]"
                                trigger={
                                    <button className="grow-0 shrink-0 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full size-[40px] aspect-square flex items-center justify-center">
                                        {
                                            user?.avatar ? (
                                                <Image 
                                                    src={user?.avatar} 
                                                    width={40} 
                                                    height={40} 
                                                    className="rounded-full size-[40px] aspect-square" 
                                                    alt="profile photo" />
                                            )
                                            : (
                                                <span className="bg-gray-200 text-gray-800 rounded-full size-[40px] aspect-square">
                                                    { user?.name_initials }
                                                </span>
                                            )
                                        }

                                        <div className="hidden md:flex flex-col gap-1">
                                            <div className="w-full flex items-center justify-between text-sm">
                                                <span className="text-semibold">{user?.first_name}</span>
                                                <ChevronDown className="" />
                                            </div>
                                            <div className="text-xs">{user?.role_name}</div>
                                        </div>

                                        {/* <div className="ml-1">
                                        </div> */}
                                    </button>
                                }>
                                {/* Authentication */} 

                                <div className="flex items-center px-4 py-4">
                                    <div className="shrink-0">
                                        {
                                            user?.avatar ? (
                                                <Image 
                                                    src={user?.avatar} 
                                                    width={40} 
                                                    height={40} 
                                                    className="rounded-full size-[40px] aspect-square" 
                                                    alt="profile photo" />
                                            )
                                            : (
                                                <span className="bg-gray-200 text-gray-800 rounded-full size-[40px] aspect-square">
                                                    { user?.name_initials }
                                                </span>
                                            )
                                        }
                                    </div> 

                                    <div className="ml-3">
                                        <div className="font-medium text-base text-gray-800">
                                            {user?.name}
                                        </div>
                                        <div className="font-medium text-sm text-gray-500">
                                            {user?.email}
                                        </div>
                                    </div>
                                </div>

                                <span className="w-full block my-[3px] h-[1px] border-t" />

                                <div className="mb-6"></div>

                                <DropdownButton>
                                    <Link href="/extras/settings/general" className="flex items-center justify-start gap-2 py-1">
                                        <SidebarTools size="size-[23px]" className="size-[20px] fill-gray-600 hover:fill-gray-800 dark:fill-slate-300" />

                                        <div className="font-medium text-base text-gray-800">
                                            Settings
                                        </div>
                                    </Link> 
                                </DropdownButton>

                                <DropdownButton>
                                    <div className="flex items-center justify-start gap-2">
                                        <ThemeSwitch size="size-[23px]" fill="fill-gray-600 hover:fill-gray-800" />

                                        <div className="font-medium text-base text-gray-800">
                                            Theme
                                        </div>
                                    </div> 
                                </DropdownButton>

                                <span className="w-full block my-[3px] h-[1px] border-t" />

                                <DropdownButton onClick={logout}>
                                    <div className="flex items-center justify-start gap-2">
                                        <LogOut size="w-[23px]" className=" fill-gray-600 hover:fill-gray-800 dark:fill-slate-300 aspect-auto" />

                                        <div className="font-medium text-base text-gray-800">
                                            Logout
                                        </div>
                                    </div>
                                </DropdownButton>

                                <div className="mb-6"></div>
                            </Dropdown>
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default MobileHeader