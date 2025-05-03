import React from 'react';
import { Dialog } from '@headlessui/react';

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <Dialog open={show} onClose={onClose} className="relative z-50 w-full max-w-md mx-auto">
        <div className="bg-white rounded shadow-lg p-6">
          <Dialog.Panel>{children}</Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Modal;
