import { Alert, AlertTitle, Box, Button } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { FC } from 'react';

interface IErrorProps {
  children: string;
}

const Error: FC <IErrorProps> = ({children}) => {

  function refreshPage() {
    window.location.reload();
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100%'}}>
      <Alert 
        variant="outlined"
        severity='error'
        action={
          <Button 
            color="inherit" 
            onClick={refreshPage}
            sx={{height: '100%'}}
          >
            <ReplayIcon/>
          </Button>
        }
      >
        <AlertTitle>Error</AlertTitle>{children}
      </Alert>
    </Box>
  );
}

export default Error;