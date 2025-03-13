'use client'

import { useAuth } from '@/hooks/auth'
import Loading from '@/app/(app)/Loading'
import Sidebar from '@/components/sidebar/Sidebar'
// import SidebarOld from '@/components/sidebar/SidebarOld'
import Header from '@/components/header/Header'
import Brand from '@/components/header/Brand'

// these imports are optional, I have commented it for now, but can be used in feature
import useSidebar from '@/hooks/sidebar'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import MobileHeader from '@/components/header/MobileHeader'
import { useEffect, useState } from 'react'
import SearchModal from '@/components/modal/SearchModal'
import { usePathname } from 'next/navigation';


import Home from '@/components/icons/Home'
import Tasks from '@/components/icons/Tasks'
import SidebarCalendar from '@/components/icons/SidebarCalendar'
import SidebarTenders from '@/components/icons/SidebarTenders'
import SidebarFiles from '@/components/icons/SidebarFiles'
import SidebarProjects from '@/components/icons/SidebarProjects'
import SidebarHr from '@/components/icons/SidebarHr'
import SidebarTools from '@/components/icons/SidebarTools'
import SidebarExtras from '@/components/icons/SidebarExtras'
import AuthContext from '@/lib/authContext'


const AppLayout = ({ children, header }) => {

    const { user } = useAuth({ middleware: 'auth' })

    const pathname = usePathname();

    // const user = { name: "Jawad khan", email: "jawadk116@gmail.com"};
    const [ sidebarState, isFixed, setSidebarState ] = useSidebar(true);

    const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);

    const [menuIcon, setMenuIcon] = useState(<Home key="0" size="size-5" className="fill-slate-300 dark:fill-slate-800" />);
    

    
    useEffect(() => {
        
        const myMenuIcons = [
            <Home key="0" size="size-5" className="fill-slate-300 dark:fill-slate-800" />,
            <Tasks key="1" size="size-5" className="stroke-slate-300 dark:stroke-slate-800" />,
            <SidebarCalendar key="2" size="size-5" className="stroke-slate-300 dark:stroke-slate-800" />,
            <SidebarTenders key="3" size="size-5" className="fill-slate-300 dark:fill-slate-800" />,
            <SidebarFiles key="4" size="size-5" className="stroke-slate-300 dark:stroke-slate-800" />,
            <SidebarProjects key="5" size="size-5" className="fill-slate-300 dark:fill-slate-800" />,
            <SidebarHr key="6" size="size-5" className="fill-slate-300 dark:fill-slate-800" />,
            <SidebarTools key="7" size="size-5" className="fill-slate-300 dark:fill-slate-800" />,
            <SidebarExtras key="8" size="size-5" className="fill-slate-300 dark:fill-slate-800" />,
        ];

        // console.log(`Route changed successfully. ${ pathname}`);
        const currentPath = pathname.split("/");

        if (currentPath.includes("dashboard"))
            setMenuIcon(prev => myMenuIcons[0]);
        if (currentPath.includes("tasks")) 
            setMenuIcon(prev => myMenuIcons[1]);
        if (currentPath.includes("calendar")) 
            setMenuIcon(prev => myMenuIcons[2]);
        if (currentPath.includes("tenders")) 
            setMenuIcon(prev => myMenuIcons[3]);
        if (currentPath.includes("files")) 
            setMenuIcon(prev => myMenuIcons[4]);
        if (currentPath.includes("projects")) 
            setMenuIcon(prev => myMenuIcons[5]);
        if (currentPath.includes("hr")) 
            setMenuIcon(prev => myMenuIcons[6]);
        if (currentPath.includes("tools")) 
            setMenuIcon(prev => myMenuIcons[7]);
        if (currentPath.includes("extras")) 
            setMenuIcon(prev => myMenuIcons[8]);

    }, [pathname]);


    const handleSearchPopup = () => {
        setIsSearchModalVisible(true);
    }
    
    const closeSearchPopup = () => {
        setIsSearchModalVisible(false);
    };

    if (!user) {
        return <Loading />
    }

    return (
        <AuthContext.Provider value={ user }>
            <div className="min-h-screen bg-[#f5f5f5]  md:bg-white dark:bg-gray-800 relative">
                <Header 
                    className="hidden md:block"
                    isFixed={ true }
                    user={ user }
                    openSearch={ handleSearchPopup }
                    // navigation={ <Navigation /> }
                    // responsiveNavigation={ <ResponsiveNavigation /> }
                    >
                        <Brand sidebarStateHandler={ setSidebarState } icon={ menuIcon } />
                </Header>
                
                <MobileHeader 
                    className="block md:hidden"
                    isFixed={ true }
                    user={ user }
                    sidebarStateHandler={ setSidebarState }
                    openSearch={ handleSearchPopup }
                    icon={ menuIcon }
                    >
                </MobileHeader>

                <div className="flex flex-col lg:flex-row justify-start gap-2 2xl:gap-4">
                    <Sidebar isOpen={ sidebarState } isFixed={ isFixed } setSidebar={ setSidebarState } />

                    <main className="flex-1 mx-0 xl:m-4 xl:ml-0 p-3 2xl:p-7 rounded-[15px] 2xl:rounded-[30px] bg-[#f5f5f5] dark:bg-gray-900">
                        
                        {/* mobile view sub header start */}
                        <div className={`${ !isFixed ? "hidden": "flex" } items-center justify-center my-7`}>
                            <h3 className="font-bold text-3xl text-black dark:text-white">Good Day 😎 <br/>Let’s Start Rolling</h3>
                        </div>
                        {/* mobile view sub header end */}

                        { children }
                    </main>
                </div>
            </div>

            <SearchModal 
                    isVisible={isSearchModalVisible} 
                    onClose={closeSearchPopup} />

            <ToastContainer />
        </AuthContext.Provider>
    )
}

export default AppLayout
