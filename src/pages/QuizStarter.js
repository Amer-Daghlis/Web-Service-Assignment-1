import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Container } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const colors = {
  Easy: '#4caf50',    // Green
  Medium: '#ff9800',  // Orange
  Hard: '#d32f2f'     // Red
};

function QuizStarter() {
  const { category, difficulty } = useParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const themeColor = colors[difficulty] || '#1976d2';

  // Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      clearInterval(timer);
      navigate(`/quiz/${category}/${difficulty}`);
    }

    return () => clearInterval(timer);
  }, [countdown, navigate, category, difficulty]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="sm">
        {/* 💨 Slide Left Box */}
        <AnimatePresence>
          {countdown === 5 && (
            <motion.div
              initial={{ x: 0 }}
              animate={{ x: -500 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              style={{
                backgroundColor: themeColor,
                padding: '30px',
                borderRadius: '20px',
                color: '#fff',
                textAlign: 'center',
                boxShadow: '0px 4px 20px rgba(0,0,0,0.2)'
              }}
            >
              <Typography variant="h4">Get Ready!</Typography>
              <Typography variant="h6">{category} - {difficulty}</Typography>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ⏱️ Countdown Circle */}
        <motion.div
          key={countdown}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1.2, opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{
            marginTop: '40px',
            textAlign: 'center'
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: '6rem',
              fontWeight: 'bold',
              color: themeColor
            }}
          >
            {countdown}
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
}

export default QuizStarter;
