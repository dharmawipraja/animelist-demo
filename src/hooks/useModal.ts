import { useState } from 'react';

interface UseModalOutput {
  isShowModal: boolean;
  showModal: () => void;
  closeModal: () => void;
}

export const useModal = (): UseModalOutput => {
  const [isShowModal, setShowModal] = useState<boolean>(false);
  const showModal = (): void => setShowModal(true);
  const closeModal = (): void => setShowModal(false);

  return {
    isShowModal,
    showModal,
    closeModal
  };
};
