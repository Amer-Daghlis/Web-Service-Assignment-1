import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Container,
  Stack
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

// 🎨 Backgrounds & Colors
const themes = {
  Easy: {
    color: '#4caf50', // Green
    background: 'url(https://i.imgur.com/zFG7DgA.png)', // Chalkboard
  },
  Medium: {
    color: '#ff9800', // Orange
    background: 'url(https://i.imgur.com/IUfz7Od.png)', // Brain maze
  },
  Hard: {
    color: '#d32f2f', // Red
    background: 'url(https://i.imgur.com/DXZ61Kw.png)', // Hacker cave
  }
};

function DifficultySelector() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  const handleStart = () => {
    navigate(`/start/${category}/${selectedDifficulty}`);
  };

  const theme = themes[selectedDifficulty] || {};

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: theme.background || 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.5s',
        padding: 4,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
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
          {['Easy', 'Medium', 'Hard'].map((level) => (
            <Button
              key={level}
              variant={selectedDifficulty === level ? 'contained' : 'outlined'}
              onClick={() => setSelectedDifficulty(level)}
              sx={{
                borderRadius: 5,
                paddingY: 1.5,
                fontWeight: 'bold',
                color: selectedDifficulty === level ? '#fff' : undefined,
                backgroundColor: selectedDifficulty === level ? theme.color : undefined,
                '&:hover': {
                  backgroundColor: selectedDifficulty === level ? theme.color : undefined,
                }
              }}
            >
              {level}
            </Button>
          ))}
        </Stack>

        {/* ▶️ Start Button + Animation */}
        <AnimatePresence>
          {selectedDifficulty && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.5 }}
              style={{ marginTop: '30px' }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleStart}
                sx={{
                  borderRadius: 10,
                  paddingX: 5,
                  backgroundColor: theme.color,
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
