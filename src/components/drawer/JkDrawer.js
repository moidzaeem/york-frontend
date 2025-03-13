import { AnimatePresence, motion } from "framer-motion";
import Scrollbars from "react-custom-scrollbars";

const JkDrawer = ({ width = false, height = false, dir, drawerStatus = false, closeDrawer = undefined, closeOnBackdrop = true, children }) => {

     if (typeof closeDrawer == undefined) {
        closeDrawer = () => {}
    }

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

    const onDrawerClosed = () => {
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
            onExitComplete={onDrawerClosed}
            >
            {drawerStatus && (
                <>
                    <motion.div 
                        key="drawerBackdrop"
                        className={`fixed top-0 left-0 w-[100vw] h-[calc(100vh-0rem)] bg-gray-900/75 backdrop-blur-md`} 
                        onClick={ closeOnBackdrop ? closeDrawer : () => {} }
                        initial={ { display: "none" } }
                        animate={ { display: "block" } }
                        exit={ { display: "none", transition: { delay: 0.2, duration: 0.1 } } }
                        >
                    </motion.div>

                    <motion.div
                        key="drawer"
                        className={`fixed ${ drawerClasses } shadow-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-slate-400 overflow-x-hidden`}
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

export default JkDrawer