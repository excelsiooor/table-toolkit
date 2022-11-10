import { Modal, Paper} from '@mui/material';
import { FC } from "react";

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
        <Paper 
          component="form" 
          sx={{
            position: 'absolute' as 'absolute',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 400,
            width: '100%',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 2,
            '& > :not(style)': { m: 1 },
          }}
          >
          {children}
        </Paper>
    </Modal>
  );
};

export default SetupRowModal;
