import { AnimatePresence, motion } from "framer-motion";
import Scrollbars from "react-custom-scrollbars";

const JkModal = ({ width = false, height = false, modalStatus = false, closeModal = undefined, closeOnBackdrop = true, center = true, children }) => {

    if (typeof closeModal == undefined) {
        closeModal = () => {}
    }

    const animationVariant = {
        open: {
            x: "-50%",
            y: center ? "-50%" : "0px",
            top: center ? "50%" : "20px",
            opacity: 1,
            transition: {
                duration: 0.4
            }
        },
        close: {
            x: "-50%",
            y: center ? "50%" : "0px",
            top: center ? "100%" : "-100%",
            opacity: 0,
            transition: {
                duration: 0.4
            }
        }
    };

    let modalClasses = `${ width ? width : "min-w-96" } ${ height ? height : "h-96" }`;


    const onModalClosed = () => {
        let documentBody = document.querySelector("body");
        let drawerCount = documentBody.dataset.drawers ? parseInt(documentBody.dataset.drawers) : 0;
        
        if (drawerCount <= 1) {
            documentBody.style.overflow = "auto";
        }

        documentBody.dataset.drawers = drawerCount - 1;
    }

    return (
        <AnimatePresence 
            mode="wait"
            onExitComplete={onModalClosed}
            >
            {modalStatus && (
                <>
                    <motion.div 
                        key="modalBackdrop"
                        className={`fixed top-0 left-0 w-[100vw] h-[calc(100vh-0rem)] bg-gray-900/75 backdrop-blur-md`} 
                        onClick={ closeOnBackdrop ? closeModal : () => {} }
                        initial={ { display: "none" } }
                        animate={ { display: "block" } }
                        exit={ { display: "none", transition: { delay: 0.2, duration: 0.1 } } }
                        >
                    </motion.div>

                    <motion.div
                        key="modal"
                        className={`fixed left-[50%] ${ modalClasses } shadow-lg shadow-gray-400 dark:shadow-gray-700 ring-1 ring-gray-700 dark:ring-blue-900 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-slate-400 overflow-x-hidden overflow-y-auto`}
                        initial="close"
                        animate="open"
                        exit="close"
                        variants={ animationVariant }
                        >
                            <Scrollbars style={{ width: "100%" }} autoHeightMax="100%">
                                {
                                    children
                                }
                            </Scrollbars>
                            
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}

export default JkModal