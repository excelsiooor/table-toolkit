import { Box, Container } from '@mui/material';
import React, { FC } from 'react';

interface ILyoutProps {
  children: React.ReactElement | React.ReactNode;
}

const Lyout: FC<ILyoutProps> = ({children}) => {
  return (
    <Container>
      <Box sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          padding: 1,
          margin: 1,
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
        {children}
      </Box>
    </Container>
  );
};

export default Lyout;