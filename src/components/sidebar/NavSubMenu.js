import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

const NavSubMenu = ({ id, isOpen = false, title, icon, toggleSubMenu, children, ...props }) => {

    if (typeof toggleSubMenu === undefined) {
        toggleSubMenu = () => {}
    }

    const animationVariant = {
        initial: {
            height: 0,
            opacity: 0
        },
        animate: {
            height: "max-content",
            opacity: 1
        },
        exit: {
            height: 0,
            opacity: 0
        }
    };

    useEffect(() => {
        children.map(child => {
            if (child.props.active) {
                console.log("toggling sub menu open state")
                toggleSubMenu(id)
            }
        })

    }, [])

    return <>
        

        <div 
            className={`p-2 px-4 text-sm font-medium truncate overflow-x-hidden transition duration-150 ease-in-out flex flex-col gap-2 rounded-3xl ${
                isOpen 
                    ? 'bg-[#EC2C2C] dark:bg-gray-700 text-slate-100 dark:text-slate-100'
                    : 'hover:bg-[#EC2C2C] focus:bg-[#EC2C2C] dark:hover:bg-gray-700 dark:focus:bg-gray-700 text-slate-800 dark:text-slate-300 hover:text-slate-100 focus:text-slate-100 dark:hover:text-slate-200 dark:focus:text-slate-200 hover:cursor-pointer'
            }`}>

            <div 
                className="hover:cursor-pointer flex flex-1 items-center justify-between gap-2" 
                onClick={ () => toggleSubMenu(id) }
            >
                <div className="flex flex-1 items-center justify-start gap-2">
                    { icon }
                    <span>{ title }</span>
                </div>
                <svg className={`w-4 h-4 ${isOpen ? 'transform rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            <AnimatePresence>
                {
                    isOpen && <motion.div
                        className={`-ml-2`}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.4 }}
                        variants={ animationVariant }
                    >
                        {
                            children
                        }
                    </motion.div>
                }
            </AnimatePresence>

        
        </div>
    </>
}

export default NavSubMenu
