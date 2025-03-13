import { AnimatePresence, motion } from "framer-motion";

const Modal = ({ width = false, height = false, modalStatus = false, toggleModal = undefined, closeOnBackdrop = true, title, children }) => {

    const animationVariant = {
        open: {
            x: "-50%",
            y: "-50%",
            // x: 0,
            // y: 0,
            opacity: 1,
            transition: {
                duration: 0.4
            }
        },
        close: {
            x: "-50%",
            y: "50%",
            opacity: 0,
            transition: {
                duration: 0.4
            }
        }
    };

    let modalClasses = `${ width ? width : "min-w-96" } ${ height ? height : "min-h-96" }`;


    const openModal = () => {
        toggleModal();

        let documentBody = document.querySelector("body");
        let drawerCount = documentBody.dataset.drawers ? parseInt(documentBody.dataset.drawers) : 0;
        
        if (drawerCount <= 1) {
            documentBody.style.overflow = "hidden";
        }

        documentBody.dataset.drawers = drawerCount + 1;
    }


    const onModalClosed = () => {
        let documentBody = document.querySelector("body");
        let drawerCount = documentBody.dataset.drawers ? parseInt(documentBody.dataset.drawers) : 0;
        
        if (drawerCount <= 1) {
            documentBody.style.overflow = "auto";
        }

        documentBody.dataset.drawers = drawerCount - 1;
    }

    return (
        <>
            <button className="px-5 py-1 rounded-md bg-cyan-600 hover:bg-cyan-700 text-slate-100 text-lg hover:shadow-md" onClick={ openModal }>{ title }</button>

            <AnimatePresence
                onExitComplete={onModalClosed}
                >
                {modalStatus && (
                    <>
                        <motion.div 
                            key="modalBackdrop"
                            className={`fixed top-0 left-0 w-[100vw] h-[calc(100vh-0rem)] bg-gray-900/75 backdrop-blur-md`} 
                            onClick={ closeOnBackdrop ? toggleModal : () => {} }
                            initial={ { display: "none" } }
                            animate={ { display: "block" } }
                            exit={ { display: "none", transition: { delay: 0.2, duration: 0.1 } } }
                            >
                        </motion.div>

                        <motion.div
                            key="modal"
                            className={`fixed left-[50%] top-[50%] ${ modalClasses } shadow-md rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-slate-400 overflow-x-hidden`}
                            initial="close"
                            animate="open"
                            exit="close"
                            variants={ animationVariant }
                            >
                                {
                                    children
                                }
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export default Modal