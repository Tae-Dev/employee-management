import React, { FC } from "react";
import { Modal } from "rsuite";

type Props = {
  handleClose: () => void;
  title: string;
  open: boolean;
  children: React.ReactNode;
};

const Modals: FC<Props> = ({ handleClose, title, open, children }) => {
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <h4 className="text-black">{title}</h4>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};

export default Modals;
