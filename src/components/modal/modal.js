// components/Modal.js
import React from 'react';
import BaseButton from '../buttons/BaseButton';

const Modal = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0  overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-xl rounded-2xl shadow-teal-200 bg-white">
        <div className="mt-3 w-full">
            {children}
          <div className="flex items-center justify-end gap-2 px-4 py-3 mt-3">
            <BaseButton className="bg-green-500 text-white" onClick={onClose}>Abort</BaseButton>
            <BaseButton className="bg-red-500 text-white" >Yes, delete</BaseButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
