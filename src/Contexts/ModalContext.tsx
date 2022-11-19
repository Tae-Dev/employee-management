import React, { createContext, FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modals from "../Components/Modal/Modals";

type ModalContextType = {
  handleOpenModal: (title: string, children: React.ReactNode ) => void;
  handleCloseModal: () => void
};

const ModalContext = createContext<ModalContextType>({
  handleOpenModal: () => {},
  handleCloseModal: () => {},
});

const ModalProvider: FC<any> = ({ children }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState({title: "", open: false, children})

  const handleOpenModal = (title: string, children: React.ReactNode ) => {
    setOpenModal({title: title,open: true, children: children})
  };

  const handleCloseModal = () => {
    setOpenModal({...openModal, open: false});
  };

  return (
    <ModalContext.Provider value={{ handleOpenModal, handleCloseModal }}>
      {children}
      {openModal.open && <Modals
        handleClose={handleCloseModal}
        title={openModal.title}
        open={openModal.open}
        children={openModal.children}
      />}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
export const useModal = () => useContext(ModalContext);
