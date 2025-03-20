
import { useAuth } from '@/hooks/auth'
import Dropdown from '@/components/Dropdown'
import { DropdownButton } from '@/components/DropdownLink'
import ChevronDown from '../icons/ChevronDown'
import Image from 'next/image'
import SidebarTools from '../icons/SidebarTools'
import ThemeSwitch from '../icons/ThemeSwitch'
import Bell from '../icons/Bell'
import Link from 'next/link'
import LogOut from '../icons/LogOut'
import Search2 from '../icons/Search2'
import { useNotification } from '@/hooks/notification'
import axios from '@/lib/axios'


const Header = ({ className = "", isFixed = true, user, children, navigation = "", openSearch = () => { }, responsiveNavigation = "" }) => {

    const { logout } = useAuth()

    const { notifications } = useNotification();

    const handleMarkAllAsRead = async () => {
        try {
            // Make the API call to mark all notifications as read
            const response = await axios.patch('/api/notifications/mark-all-read');

            if (response.status === 200) {

            }
        } catch (error) {
            console.error('Error marking all notifications as read:', error);
        }
    };

    return (
        <nav className={`bg-white dark:bg-gray-800 border-b-[1px] border-white dark:border-gray-800 ${className} ${isFixed
            ? "sticky inset-x-0 top-0 z-50"
            : ""
            }`}>
            {/* Primary Navigation Menu */}
            <div className="mx-auto px-4 sm:px-6 lg:px-8 md:pt-5">
                <div className="flex justify-between gap-20 h-20">
                    <div className="flex">
                        {children}
                        {navigation}
                    </div>



                    <div className="flex items-center justify-end w-full gap-3">

                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full grow shrink h-[40px] flex items-center justify-between gap-2 px-4 py-5" onClick={openSearch}>
                            <div className="flex items-center justify-start gap-2">
                                <Search2 className="fill-slate-500" size="size-[20px]" />
                                search...
                            </div>
                        </button>

                        {/* <button className="grow-0 shrink-0 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full size-[40px] aspect-square flex items-center justify-center">
                            <ThemeSwitch size="size-[13px] md:size-[20px]" fill="fill-gray-600 hover:fill-gray-800" />
                        </button> */}

                        {/* Notifications Dropdown */}
                        <div className="flex items-center">
                            <Dropdown
                                align="right"
                                width="w-[90vw] max-w-[400px]"
                                trigger={
                                    <button className="grow-0 shrink-0 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full size-[40px] aspect-square hidden md:flex items-center justify-center" onClick={handleMarkAllAsRead}>
                                        <Bell size="size-[13px] md:size-[20px]" fill="fill-gray-600 hover:fill-gray-800" isUnread={notifications?.unread} />
                                    </button>
                                }>
                                {/* Authentication */}

                                <div className="px-4 py-4 flex items-center justify-start gap-2">
                                    <Bell size="size-[13px] md:size-[20px]" fill="fill-gray-600 hover:fill-gray-800" isUnread={notifications?.unread} />
                                    <span className="font-bold text-lg">My Notifications</span>
                                </div>

                                <span className="w-full block my-[3px] h-[1px] border-t" />

                                <div className="mb-6"></div>

                                {
                                    notifications?.data?.length ? notifications.data?.map((item, idx) => (
                                        <div key={idx} className="text-sm leading-5 text-gray-700 px-4 py-1">
                                            <div className={`h-10 py-1 px-3 ${notifications?.unread ? 'bg-[#1CA988]' : 'bg-gray-500'} dark:bg-[#1CA988] !rounded-full flex items-center text-white dark:text-white font-normal text-base`}>
                                                {item.message}
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

                        {/* <Link href="/extras/settings/general" className="grow-0 shrink-0 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full size-[40px] aspect-square hidden md:flex items-center justify-center">
                            <SidebarTools size="size-[13px] md:size-[23px]" className="size-[13px] md:size-[20px] fill-gray-600 hover:fill-gray-800 dark:fill-slate-300" />
                        </Link> */}

                        {/* Settings Dropdown */}
                        <div className="flex items-center">
                            <Dropdown
                                align="right"
                                width="w-[60vw] max-w-[400px]"
                                trigger={
                                    <button className="flex items-center justify-end gap-3 md:mr-6 text-sm font-medium text-slate-800 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-200 focus:outline-none transition duration-150 ease-in-out">
                                        {
                                            user?.avatar ? (
                                                <Image
                                                    src={user.avatar}
                                                    width={40}
                                                    height={40}
                                                    className="rounded-full size-[40px] aspect-square"
                                                    alt="profile photo" />
                                            )
                                                : (
                                                    <span className="bg-gray-200 text-gray-800 rounded-full size-[40px] aspect-square">
                                                        {user?.name_initials}
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
                                                        {user?.name_initials}
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
                                        <SidebarTools size="size-[13px] md:size-[23px]" className="size-[13px] md:size-[20px] fill-gray-600 hover:fill-gray-800 dark:fill-slate-300" />

                                        <div className="font-medium text-base text-gray-800">
                                            Settings
                                        </div>
                                    </Link>
                                </DropdownButton>

                                <DropdownButton onClick={logout}>
                                    <div className="flex items-center justify-start gap-2">
                                        <LogOut size="w-[13px] md:w-[23px]" className=" fill-gray-600 hover:fill-gray-800 dark:fill-slate-300 aspect-auto" />

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

export default Header
