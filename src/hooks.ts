import { useState } from "react";
const useModal = () => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  return { showModal, handleCloseModal, handleShowModal };
};

export { useModal };
