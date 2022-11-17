import React, { createContext, FC, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modals from "../Components/Modal/Modals";

type ModalContextType = {
  handleOpen: (title: string, children: React.ReactNode ) => void;
  handleClose: () => void
};

const ModalContext = createContext<ModalContextType>({
  handleOpen: () => {},
  handleClose: () => {},
});

const ModalProvider: FC<any> = ({ children }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState({title: "", open: false, children})

  const handleOpen = (title: string, children: React.ReactNode ) => {
    setOpenModal({title: title,open: true, children: children})
  };

  const handleClose = () => {
    setOpenModal({...openModal, open: false});
  };

  return (
    <ModalContext.Provider value={{ handleOpen, handleClose }}>
      {children}
      {openModal.open && <Modals
        handleClose={handleClose}
        title={openModal.title}
        open={openModal.open}
        children={openModal.children}
      />}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
export const useModal = () => useContext(ModalContext);
