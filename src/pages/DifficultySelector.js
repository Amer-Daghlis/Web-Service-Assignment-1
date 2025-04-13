import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Container,
  Stack
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeColor } from '../components/ThemeContext'; // ✅ correct path

// 🎨 Backgrounds & Colors
const themes = {
  Easy: {
    color: '#4caf50',
  },
  Medium: {
    color: '#ff9800',
  },
  Hard: {
    color: '#d32f2f',
  }
};

function DifficultySelector() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [backgroundKey, setBackgroundKey] = useState(0);
  const { changeColorByLevel } = useThemeColor();

  const handleStart = () => {
    navigate(`/start/${category}/${selectedDifficulty}`);
  };

  const theme = themes[selectedDifficulty] || {};

  useEffect(() => {
    if (selectedDifficulty) {
      changeColorByLevel(selectedDifficulty);
      setBackgroundKey((prev) => prev + 1);
    }
  }, [selectedDifficulty, changeColorByLevel]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 🎥 Full-page animated video background */}
      <AnimatePresence mode="wait">
        {selectedDifficulty && (
          <motion.video
            key={backgroundKey}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            src={theme.background}
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0
            }}
          />
        )}
      </AnimatePresence>

      {/* 💬 Quiz Content Box */}
      <Container
        maxWidth="sm"
        sx={{
          zIndex: 1,
          position: 'relative',
          bgcolor: '#ffffffdd',
          borderRadius: 5,
          padding: 4,
          textAlign: 'center',
          boxShadow: 5,
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: theme.color || '#000' }}
        >
          {category} Quiz
        </Typography>

        <Typography variant="h6" gutterBottom>
          Choose your difficulty level
        </Typography>

        {/* 🔘 Difficulty Buttons */}
        <Stack spacing={2} mt={3}>
          {['Easy', 'Medium', 'Hard'].map((level) => {
            const levelColors = {
              Easy: '#4caf50',
              Medium: '#ff9800',
              Hard: '#d32f2f',
            };

            const isSelected = selectedDifficulty === level;

            return (
              <Button
                key={level}
                variant={isSelected ? 'contained' : 'outlined'}
                size="large"
                onClick={() => setSelectedDifficulty(level)}
                sx={{
                  width: '100%',
                  borderRadius: 3,
                  paddingY: 1.5,
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  backgroundColor: isSelected ? levelColors[level] : 'transparent',
                  color: isSelected ? '#fff' : levelColors[level],
                  borderColor: levelColors[level],
                  '&:hover': {
                    backgroundColor: levelColors[level],
                    color: '#fff',
                  },
                }}
              >
                {level}
              </Button>
            );
          })}
        </Stack>

        {/* ▶️ Start Button */}
        <AnimatePresence>
          {selectedDifficulty && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ marginTop: '2rem' }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleStart}
                sx={{
                  borderRadius: 10,
                  paddingX: 5,
                  backgroundColor: theme.color,
                  '&:hover': {
                    backgroundColor: theme.color,
                  },
                }}
              >
                Start Quiz
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}

export default DifficultySelector;
