import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#1976d2',
        height: '90px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Toolbar sx={{ justifyContent: 'center', width: '100%' }}>
        <Box>
          <Typography
            variant="h4"
            component="div"
            sx={{ fontWeight: 'bold', textAlign: 'center' }}
          >
            🎓 Quizzy Brainiac!
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
