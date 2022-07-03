import { useState } from 'react';

export const useModal = () => {
  const [isShowModal, setShowModal] = useState(false);
  const showModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return {
    isShowModal,
    showModal,
    closeModal
  };
};
