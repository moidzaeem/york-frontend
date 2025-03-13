import { useCallback, useEffect, useRef, useState } from "react";


const useSidebar = () => {
    
    const [ sidebarState, setSidebarState ] = useState(false);

    const [ isFixed, setSidebarPosition ] = useState(true);

    // let isShown = false;
    const isShown = useRef(false);


    const handleWindowResizing = useCallback(() => {

        if (window?.innerWidth >= parseInt(process.env.NEXT_PUBLIC_SIDEBAR_DESKTOP_VIEW_BREAKPOINT)) {
            if (isShown.current) return false;

            isShown.current = true;
            setSidebarState(prevState => isShown.current);
            setSidebarPosition(prevState => false);

        } else {
            if (!isShown.current) return false;

            isShown.current = false;
            setSidebarState(prevState => isShown.current);
            setSidebarPosition(prevState => true);
        }
    }, []);


    useEffect(() => {
        handleWindowResizing();
        window?.addEventListener("resize", handleWindowResizing);
    }, [handleWindowResizing]);


    return [
        sidebarState,
        isFixed,
        setSidebarState
    ]
}

export default useSidebar;