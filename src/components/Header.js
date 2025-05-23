import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useThemeColor } from '../components/ThemeContext';
import { motion } from 'framer-motion';

function Header() {
  const { levelColor, showHeader } = useThemeColor(); // 👈 get showHeader state

  if (!showHeader) return null; // 👈 hide the header if set to false

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, backgroundColor: levelColor }}
      transition={{ duration: 0.5 }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
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
              💻QuizHub!
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
}

export default Header;
