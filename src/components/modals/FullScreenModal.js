import { useState } from "react"
import { AnimatePresence, motion, useCycle } from "framer-motion";

const FullScreenModal = ({ width = false, height = false, dir, title, children }) => {

    const [drawerStatus, toggleDrawer] = useCycle(false, true);

    const xAxis = ["left", "right"]
    const yAxis = ["top", "bottom"]
    const animationVariant = {
        open: {
            transition: {
                duration: 0.4
            }
        },
        close: {
            transition: {
                duration: 0.4
            }
        }
    };

    let drawerClasses = `${ width ? width : "w-full" } ${ height ? height : "h-[calc(100vh-0rem)]" } `;

    
    if (xAxis.includes(dir)) {
        drawerClasses += `top-0 bottom-0 ${ dir == "left" ? "left-0" : "right-0" }`;

        if (dir == "left") {
            animationVariant['close']['x'] = "-100%";
            animationVariant['open']['x'] = 0;
        } else {
            animationVariant['close']['x'] = "100%";
            animationVariant['open']['x'] = 0
        }
    } 
    else if (yAxis.includes(dir)) {
        drawerClasses += `left-0 right-0 ${ dir == "top" ? "top-0" : "bottom-0" }`;

        if (dir == "top") {
            animationVariant['close']['y'] = "-100%";
            animationVariant['open']['y'] = 0
        } else {
            animationVariant['close']['y'] = "100%";
            animationVariant['open']['y'] = 0
        }
    }

    const openDrawer = () => {
        toggleDrawer();

        let documentBody = document.querySelector("body");
        let drawerCount = documentBody.dataset.drawers ? parseInt(documentBody.dataset.drawers) : 0;
        
        if (drawerCount <= 1) {
            documentBody.style.overflow = "hidden";
        }

        documentBody.dataset.drawers = drawerCount + 1;
    }


    const onDrawerClosed = () => {
        let documentBody = document.querySelector("body");
        let drawerCount = documentBody.dataset.drawers ? parseInt(documentBody.dataset.drawers) : 0;
        
        if (drawerCount <= 1) {
            documentBody.style.overflow = "auto";
        }

        documentBody.dataset.drawers = drawerCount - 1;
    }

    return (
        <>
            <button className="px-5 py-1 rounded-md bg-cyan-600 hover:bg-cyan-700 text-slate-100 text-lg hover:shadow-md" onClick={ openDrawer }>{ title }</button>

            <AnimatePresence
                onExitComplete={onDrawerClosed}
                >
                {drawerStatus && (
                    <>
                        <motion.div 
                            key="backdrop"
                            className={`fixed top-0 left-0 w-full h-[calc(100vh-0rem)] bg-gray-900/75 backdrop-blur-md`} 
                            onClick={ toggleDrawer }
                            initial={ { display: "none" } }
                            animate={ { display: "block" } }
                            exit={ { display: "none", transition: { delay: 0.2, duration: 0.1 } } }
                            >
                        </motion.div>

                        <motion.div
                            key="drawer"
                            className={`fixed ${ drawerClasses } bg-gray-800 text-slate-300 overflow-x-hidden`}
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

export default FullScreenModal