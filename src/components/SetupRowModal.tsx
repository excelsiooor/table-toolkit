import { Modal, Paper } from '@mui/material';
import { FC } from "react";
import { styleForModal } from "./UI/theme";

interface ISetupRowModalProps {
  children: React.ReactElement| React.ReactNode;
  status: boolean;
  closeModal: () => void;
}

const SetupRowModal: FC<ISetupRowModalProps> = ({children, status, closeModal}) => {
  return (
    <Modal
        keepMounted
        open={status}
        onClose={closeModal}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Paper component="form" sx={styleForModal}>
          {children}
        </Paper>
    </Modal>
  );
};

export default SetupRowModal;
