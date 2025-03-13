import { AnimatePresence, motion } from "framer-motion";


/**
 * 
 * Tab Group
 */
const JkTabs = ({ className, children }) => {

    return (
            <div className={`w-full h-[400px] bg-slate-200 dark:bg-gray-700 rounded-md flex flex-col ${ className }`}>
                <nav className="w-full border-b-2 border-gray-300 dark:border-gray-600 rounded-tl-md rounded-tr-md">
                    <ul className="w-full flex p-0 m-0 text-lg font-normal flex-wrap">
                    {
                        children.map((child, idx) => (
                            <li
                                className={`h-[24px] mt-2 px-4 py-5 flex items-center justify-between flex-1 cursor-pointer text-gray-800 dark:text-slate-300 relative ${ child.props.active ? "bg-slate-300 dark:bg-gray-600 rounded-tl-md rounded-tr-md" : "" }`}
                                onClick={ child.props.switchTab }
                                key={ child.key ?? idx }
                            >
                                {
                                    child.props.label
                                }

                                { 
                                    child.props.active ? (
                                        <motion.div className="absolute bottom-[-2px] left-0 right-0 h-[2px] bg-blue-500" layoutId={ child.props.tabGroupId } />
                                    ) : null
                                }
                            </li>
                        ))
                    }
                    </ul>
                </nav>
                <main className="w-full h-full">
                    <AnimatePresence>
                        {
                            children
                        }
                    </AnimatePresence>
                </main>
            </div>
    )
}



/**
 * 
 * Individual Tab
 */
const JkTab = ({ className, active = false, tabKey = null, children }) => {
    
    const animationVariant = {
        initial: {
            y: 10,
            opacity: 0
        },
        animate: {
            y: 0,
            opacity: 1
        },
        exit: {
            y: -10,
            opacity: 0
        }
    };

    return (
        active
        && 
        <motion.div
            className={`p-2 text-gray-700 dark:text-slate-400 ${ className }`}
            key={tabKey ? tabKey : "empty"}
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
    )
}


export default JkTabs

export { JkTab }
