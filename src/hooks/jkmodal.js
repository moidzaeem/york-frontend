import { useState } from "react";

export const useJkModal = () => {
    const [modalStatus, toggleModal] = useState(false);

    const openModal = () => {
        toggleModal(prev => true);

        let documentBody = document.querySelector("body");
        let drawerCount = documentBody.dataset.drawers ? parseInt(documentBody.dataset.drawers) : 0;
        
        if (drawerCount <= 1) {
            documentBody.style.overflow = "hidden";
        }

        documentBody.dataset.drawers = drawerCount + 1;
    }

    const closeModal = () => {
        toggleModal(prev => false);
    }


    return [
        modalStatus,
        openModal,
        closeModal,
    ];
}