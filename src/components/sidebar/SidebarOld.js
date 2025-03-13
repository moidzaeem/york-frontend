'use client'

import { usePathname } from 'next/navigation'
import NavLink from '@/components/sidebar/NavLink'
import Home from '../icons/Home';
import Tasks from '../icons/Tasks';
import SidebarCalendar from '../icons/SidebarCalendar';
import SidebarTenders from '../icons/SidebarTenders';
import SidebarFiles from '../icons/SidebarFiles';
import SidebarProjects from '../icons/SidebarProjects';
import SidebarHr from '../icons/SidebarHr';
import SidebarTools from '../icons/SidebarTools';
import SidebarExtras from '../icons/SidebarExtras';

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

const SidebarOld = ({ isOpen = true, isFixed = true, ...props }) => {

    const pathName = usePathname();

    return <aside className={`h-[calc(100vh-76px)] md:h-[calc(100vh-102px)] p-2 px-4 bg-white xl:bg-transparent border-transparent text-slate-800 dark:text-slate-300 dark:bg-gray-800 border-r-[1px] dark:border-gray-800 overflow-x-hidden transition-[width] duration-300 ease-in-out ${
        isFixed
            ? "fixed left-0 top-[76px] md:top-[102px] shadow-md"
            : "sticky left-0 top-[76px] md:top-[102px]"
    } ${
        !isOpen 
            ? "w-0 !px-0"
            : "w-[240px] 2xl:w-[275px] p-2"
    } ${
        isOpen && isFixed 
            ? "!w-[275px]"
            : ""
    }`}>
        <div className={`h-full transition-[hidden] duration-300 ease-in-out ${
            !isOpen 
                ? "hidden"
                : ""
        }`}>

        <PerfectScrollbar className="w-[cacl(100%+20px)] pr-5 h-full">
            
            <div className={` ${ isFixed ? "hidden" : "" } flex items-center justify-start mt-7 mb-9 overflow-x-hidden`}>
                <h3 className="font-bold text-2xl text-black dark:text-white text-nowrap text-ellipsis">Good Day 😎 <br/>Let’s Start Rolling</h3>
            </div>

            <div className="flex flex-col gap-2">
                <NavLink
                    href="/dashboard"
                    active={pathName === '/dashboard'}>
                    <div className="flex flex-1 items-center justify-start gap-2">
                        <Home className="fill-slate-800 dark:fill-slate-300 group-[.active-link]:fill-slate-100 dark:group-[.active-link]:fill-slate-100 group-hover:fill-slate-100" />
                        <span>Dashboard</span>
                    </div>
                </NavLink>

                <NavLink
                    href="/tasks"
                    active={pathName === '/tasks'}>
                    <div className="flex flex-1 items-center justify-start gap-2">
                        <Tasks className="size-[16px] stroke-slate-800 dark:stroke-slate-300 group-[.active-link]:stroke-slate-100 dark:group-[.active-link]:stroke-slate-100 group-hover:stroke-slate-100" />
                        <span>Tasks</span>
                    </div>
                </NavLink>

                <NavLink
                    href="/calendar"
                    active={pathName === '/calendar'}>
                    <div className="flex flex-1 items-center justify-start gap-2">
                        <SidebarCalendar className="size-[16px] stroke-slate-800 dark:stroke-slate-300 group-[.active-link]:stroke-slate-100 dark:group-[.active-link]:stroke-slate-100 group-hover:stroke-slate-100" />
                        <span>Calendar</span>
                    </div>
                </NavLink>

                <NavLink
                    href="/tenders"
                    active={pathName === '/tenders'}>
                    <div className="flex flex-1 items-center justify-start gap-2">
                        <SidebarTenders className="size-[16px] fill-slate-800 dark:fill-slate-300 group-[.active-link]:fill-slate-100 dark:group-[.active-link]:fill-slate-100 group-hover:fill-slate-100" />
                        <span>Tenders</span>
                    </div>
                </NavLink>

                <NavLink
                    href="/files"
                    active={pathName === '/files'}>
                    <div className="flex flex-1 items-center justify-start gap-2">
                        <SidebarFiles className="size-[16px] stroke-slate-800 dark:stroke-slate-300 group-[.active-link]:stroke-slate-100 dark:group-[.active-link]:stroke-slate-100 group-hover:stroke-slate-100" />
                        <span>Files</span>
                    </div>
                </NavLink>

                <NavLink
                    href="/projects"
                    active={pathName === '/projects'}>
                    <div className="flex flex-1 items-center justify-start gap-2">
                        <SidebarProjects className="fill-slate-800 dark:fill-slate-300 group-[.active-link]:fill-slate-100 dark:group-[.active-link]:fill-slate-100 group-hover:fill-slate-100" />
                        <span>Projects</span>
                    </div>
                </NavLink>

                <NavLink
                    href="/hr/employees"
                    active={pathName === '/hr/employees'}>
                    <div className="flex flex-1 items-center justify-start gap-2">
                        <SidebarHr className="fill-slate-800 dark:fill-slate-300 group-[.active-link]:fill-slate-100 dark:group-[.active-link]:fill-slate-100 group-hover:fill-slate-100" />
                        <span>HR</span>
                    </div>
                </NavLink>

                <NavLink
                    href="/tools"
                    active={pathName === '/tools'}>
                    <div className="flex flex-1 items-center justify-start gap-2">
                        <SidebarTools className="fill-slate-800 dark:fill-slate-300 group-[.active-link]:fill-slate-100 dark:group-[.active-link]:fill-slate-100 group-hover:fill-slate-100" />
                        <span>Tools</span>
                    </div>
                </NavLink>

                <NavLink
                    href="/extras/settings/departments"
                    active={pathName === '/extras/settings/departments'}>
                    <div className="flex flex-1 items-center justify-start gap-2">
                        <SidebarExtras className="fill-slate-800 dark:fill-slate-300 group-[.active-link]:fill-slate-100 dark:group-[.active-link]:fill-slate-100 group-hover:fill-slate-100" />
                        <span>Extras</span>
                    </div>
                </NavLink>
            </div>
        </PerfectScrollbar>
            
        </div>
    </aside>
}

export default SidebarOld
