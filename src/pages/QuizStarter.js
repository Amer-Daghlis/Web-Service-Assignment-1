import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Container, CircularProgress } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeColor } from '../components/ThemeContext';

const colors = {
  Easy: '#4caf50',
  Medium: '#ff9800',
  Hard: '#d32f2f'
};

const backgrounds = {
  Easy: 'https://i.imgur.com/zFG7DgA.png',
  Medium: 'https://i.imgur.com/IUfz7Od.png',
  Hard: 'https://i.imgur.com/DXZ61Kw.png'
};

function QuizStarter() {
  const { category, difficulty } = useParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const themeColor = colors[difficulty] || '#1976d2';
  const bgImage = backgrounds[difficulty] || '';
  const { changeColorByLevel } = useThemeColor();

  useEffect(() => {
    // Set header color to quiz level color or default if none
    changeColorByLevel(difficulty || null);

    return () => {
      // Reset to default blue when leaving the page (without relying on countdown)
      changeColorByLevel(null);
    };
  }, [difficulty, changeColorByLevel]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate(`/quiz/${category}/${difficulty}`);
    }
  }, [countdown, navigate, category, difficulty]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        position: 'relative',
        color: '#fff'
      }}
    >
      <Container maxWidth="sm" sx={{ zIndex: 2 }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: `2px solid ${themeColor}`,
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)'
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {countdown > 0 ? `Starting in...` : 'Launching Quiz!'}
          </Typography>

          <AnimatePresence mode="wait">
            {countdown > 0 ? (
              <motion.div
                key={countdown}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.5 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 'bold',
                    color: themeColor,
                    fontSize: '7rem'
                  }}
                >
                  {countdown}
                </Typography>
              </motion.div>
            ) : (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <CircularProgress size={60} thickness={4} sx={{ color: themeColor }} />
              </motion.div>
            )}
          </AnimatePresence>

          <Typography variant="h6" sx={{ mt: 4 }}>
            Category: <strong>{category}</strong> | Difficulty: <strong>{difficulty}</strong>
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
}

export default QuizStarter;
