'use client'

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
import Menu from './Menu';
import { useAccessControl } from '@/hooks/accessControl';

const Sidebar = ({ isOpen = true, isFixed = true, setSidebar = () => {}, ...props }) => {

    let {permissions, can} = useAccessControl();

    // console.log("can view tasks: " + can("Tasks - View"));
    // console.log("can do any: " + can(["Tasks - View", "Tasks - Create", "Tasks - Edit", "Tasks - Delete"]));

    const menu = {
        parent: {
            isActive: true,
            children: [
                { title: 'Dashboard', link: '/dashboard', isActive: false, show: true, icon: <Home className="fill-slate-800 dark:fill-slate-300 group-[.active-link]:fill-slate-100 dark:group-[.active-link]:fill-slate-100 group-hover:fill-slate-100" /> },
                { title: 'Tasks', link: '/tasks', isActive: false, show: can(["Tasks - View", "Tasks - Create", "Tasks - Edit", "Tasks - Delete"]), icon: <Tasks className="size-[16px] stroke-slate-800 dark:stroke-slate-300 group-[.active-link]:stroke-slate-100 dark:group-[.active-link]:stroke-slate-100 group-hover:stroke-slate-100" /> },
                { title: 'Calendar', link: '/calendar', isActive: false, show: can(["Calendar", "Events - Create"]), icon: <SidebarCalendar className="size-[16px] stroke-slate-800 dark:stroke-slate-300 group-[.active-link]:stroke-slate-100 dark:group-[.active-link]:stroke-slate-100 group-hover:stroke-slate-100" /> },
                { title: 'Tenders', link: '/tenders', isActive: false, show: can(["Tenders - View", "Tenders - Create", "Tenders - Edit", "Tenders - Delete"]), icon: <SidebarTenders className="size-[16px] fill-slate-800 dark:fill-slate-300 group-[.active-link]:fill-slate-100 dark:group-[.active-link]:fill-slate-100 group-hover:fill-slate-100" /> },
                { 
                    title: 'Files & Folders', 
                    link: '/files', 
                    isActive: false,
                    show: can("Files & Folders"),
                    icon: <SidebarFiles className="size-[16px] stroke-slate-800 dark:stroke-slate-300 group-[.active-link]:stroke-slate-100 dark:group-[.active-link]:stroke-slate-100 group-hover:stroke-slate-100" />,
                    // children: [
                    //     { title: 'Files', link: '/files', isActive: false, icon: null },
                    //     { title: 'Folders', link: '/files/folders', isActive: false, icon: null },
                    // ],
                },
                { 
                    title: 'Projects', 
                    link: null, 
                    isActive: false,
                    show: can([
                        "Projects - View", "Projects - Create", "Projects - Edit", "Projects - Delete",
                        "Clients - View", "Clients - Create", "Clients - Edit", "Clients - Delete",
                        "Sales - View", "Sales - Create", "Sales - Edit", "Sales - Delete",
                        "Installations - View", "Installations - Create", "Installations - Edit", "Installations - Delete",
                        "ChangeOrders - View", "ChangeOrders - Create", "ChangeOrders - Edit", "ChangeOrders - Delete",
                        "BackCharges - View", "BackCharges - Create", "BackCharges - Edit", "BackCharges - Delete",
                        "Punch Lists - View", "Punch Lists - Create", "Punch Lists - Edit", "Punch Lists - Delete", 
                    ]),
                    icon: <SidebarProjects className="fill-slate-800 dark:fill-slate-300 group-[.active-link]:fill-slate-100 dark:group-[.active-link]:fill-slate-100 group-hover:fill-slate-100" />,
                    children: [
                        { title: 'Clients', link: '/projects/clients', isActive: false, show: can(["Clients - View", "Clients - Create", "Clients - Edit", "Clients - Delete"]), icon: null },
                        { title: 'Project Management', link: '/projects', isActive: false, show: can(["Projects - View", "Projects - Create", "Projects - Edit", "Projects - Delete"]), icon: null },
                        { title: 'Sales', link: '/projects/sales', isActive: false, show: can(["Sales - View", "Sales - Create", "Sales - Edit", "Sales - Delete"]), icon: null },
                        { title: 'Installations', link: '/projects/installations', isActive: false, show: can(["Installations - View", "Installations - Create", "Installations - Edit", "Installations - Delete"]), icon: null },
                        { title: 'Change Order', link: '/projects/change_orders', isActive: false, show: can(["ChangeOrders - View", "ChangeOrders - Create", "ChangeOrders - Edit", "ChangeOrders - Delete"]), icon: null },
                        { title: 'BackCharge', link: '/projects/back_charges', isActive: false, show: can(["BackCharges - View", "BackCharges - Create", "BackCharges - Edit", "BackCharges - Delete"]), icon: null },
                        { title: 'Punch List', link: '/projects/punch_lists', isActive: false, show: can(["Punch Lists - View", "Punch Lists - Create", "Punch Lists - Edit", "Punch Lists - Delete"]), icon: null },
                    ],
                },
                { title: 'HR', link: '/hr/employees', isActive: false, show: can(["Employees - View", "Employees - Create", "Employees - Edit", "Employees - Delete"]), icon: <SidebarHr className="fill-slate-800 dark:fill-slate-300 group-[.active-link]:fill-slate-100 dark:group-[.active-link]:fill-slate-100 group-hover:fill-slate-100" /> },
                { 
                    title: 'Tools', 
                    link: null, 
                    isActive: false,
                    show: can([
                        "Converter",
                        "Logistics - View", "Logistics - Create", "Logistics - Edit", "Logistics - Delete",
                    ]),
                    icon: <SidebarTools className="fill-slate-800 dark:fill-slate-300 group-[.active-link]:fill-slate-100 dark:group-[.active-link]:fill-slate-100 group-hover:fill-slate-100" />,
                    children: [
                        { title: 'Converter', link: '/tools/converter', isActive: false, show: can(["Converter"]), icon: null },
                        { title: 'Logistics', link: '/tools/logistics', isActive: false, show: can(["Logistics - View", "Logistics - Create", "Logistics - Edit", "Logistics - Delete"]), icon: null }
                    ],
                },
                { 
                    title: 'Extras', 
                    link: null, 
                    isActive: false,
                    show: can([
                        "Education - View", "Education - Create", "Education - Edit", "Education - Delete",
                        "Tickets - View", "Tickets - Create", "Tickets - Edit", "Tickets - Delete",
                        "Inputs - View", "Inputs - Create", "Inputs - Edit", "Inputs - Delete",
                        "Categories - View", "Categories - Create", "Categories - Edit", "Categories - Delete",
                        "General Settings",
                        "Departments - View", "Departments - Create", "Departments - Edit", "Departments - Delete",
                        "Users - View", "Users - Change Status", "Users - Change Role",
                    ]),
                    icon: <SidebarExtras className="fill-slate-800 dark:fill-slate-300 group-[.active-link]:fill-slate-100 dark:group-[.active-link]:fill-slate-100 group-hover:fill-slate-100" />,
                    children: [
                        { title: 'Education', link: '/extras/educations', isActive: false, show: can(["Education - View", "Education - Create", "Education - Edit", "Education - Delete"]), icon: null },
                        { title: 'Tickets', link: '/extras/tickets', isActive: false, show: can(["Tickets - View", "Tickets - Create", "Tickets - Edit", "Tickets - Delete"]), icon: null },
                        {
                            title: 'Inputs',
                            link: null,
                            show: can([
                                "Inputs - View", "Inputs - Create", "Inputs - Edit", "Inputs - Delete",
                                "Categories - View", "Categories - Create", "Categories - Edit", "Categories - Delete",
                            ]),
                            children: [
                                { title: 'All Inputs', link: '/extras/inputs', isActive: false, show: can(["Inputs - View", "Inputs - Create", "Inputs - Edit", "Inputs - Delete"]), icon: null },
                                { title: 'Categories', link: '/extras/inputs/categories', isActive: false, show: can(["Categories - View", "Categories - Create", "Categories - Edit", "Categories - Delete"]), icon: null },
                            ],
                        },
                        {
                            title: 'Settings',
                            link: null,
                            show: can([
                                "General Settings",
                                "Departments - View", "Departments - Create", "Departments - Edit", "Departments - Delete",
                                "Users - View", "Users - Change Status", "Users - Change Role",
                            ]),
                            children: [
                                { title: 'General', link: '/extras/settings/general', isActive: false, show: can("General Settings"), icon: null },
                                { title: 'Departments', link: '/extras/settings/departments', isActive: false, show: can(["Departments - View", "Departments - Create", "Departments - Edit", "Departments - Delete"]), icon: null },
                                { title: 'Users', link: '/extras/settings/users', isActive: false, show: can(["Users - View", "Users - Change Status", "Users - Change Role"]), icon: null },
                            ],
                        },
                        { title: 'Logs', link: '/extras/logs', isActive: false, show: can(["Logs - View", "Logs - Delete"]), icon: null },
                    ],
                },
            ],
        },
    };

    return <aside className={`h-[calc(100vh-76px)] md:h-[calc(100vh-102px)] z-50 p-2 px-4 bg-white xl:bg-transparent border-transparent text-slate-800 dark:text-slate-300 dark:bg-gray-800 border-r-[1px] dark:border-gray-800 overflow-x-hidden transition-[width] duration-300 ease-in-out ${
        isFixed
            ? "fixed left-0 top-[76px] md:top-[102px] shadow-md"
            : "sticky left-0 top-[76px] md:top-[102px]"
    } ${
        !isOpen 
            ? "w-0 !px-0"
            : "w-[240px] 2xl:w-[275px] p-2 pl-1 pr-0"
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

        <PerfectScrollbar className="w-[cacl(100%+20px)] pr-3 h-full">
            
            <div className={` ${ isFixed ? "hidden" : "" } flex items-center justify-start mt-7 mb-9 overflow-x-hidden`}>
                <h3 className="font-bold text-2xl text-black dark:text-white text-nowrap text-ellipsis">Good Day 😎 <br/>Let’s Start Rolling</h3>
            </div>

            <Menu menu={ menu.parent } isFixed={ isFixed } setSidebar={setSidebar} />
        </PerfectScrollbar>
            
        </div>
    </aside>
}

export default Sidebar
