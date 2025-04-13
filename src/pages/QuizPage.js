import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchQuestions } from '../api/quizApi';
import {
  Box,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  CircularProgress,
  Container,
  Paper,
  FormControl
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

// 🎨 Theme & background by difficulty
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

function QuizPage() {
  const { category, difficulty } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  const theme = themes[difficulty] || { color: '#1976d2', background: 'none' };

  useEffect(() => {
    async function loadQuiz() {
      const data = await fetchQuestions({ category, difficulty, limit: 10 });
      setQuestions(data);
      setLoading(false);
    }
    loadQuiz();
  }, [category, difficulty]);

  const handleAnswerChange = (event) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentIndex]: event.target.value
    });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigate('/result', {
        state: {
          questions,
          selectedAnswers
        }
      });
    }
  };

  const renderAnswers = () => {
    return Object.entries(questions[currentIndex].answers)
      .filter(([_, answer]) => answer !== null)
      .map(([key, answer]) => (
        <FormControlLabel
          key={key}
          value={key}
          control={
            <Radio
              sx={{
                color: theme.color,
                '&.Mui-checked': {
                  color: theme.color
                }
              }}
            />
          }
          label={answer}
        />
      ));
  };

  if (loading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: theme.background,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center" alignItems="stretch" gap={3}>

          {/* 📦 Question Card */}
          <Paper
            elevation={6}
            sx={{
              flex: 1,
              minHeight: '64vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              p: 5,
              borderRadius: 5,
              backgroundColor: '#ffffffee',
              backdropFilter: 'blur(4px)'
            }}
          >
            {/* 💬 Animated Question Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: '1.5rem', my: 3, fontWeight: 600 }}
                >
                  {questions[currentIndex].question}
                </Typography>

                <FormControl component="fieldset">
                  <RadioGroup
                    value={selectedAnswers[currentIndex] || ''}
                    onChange={handleAnswerChange}
                  >
                    {renderAnswers()}
                  </RadioGroup>
                </FormControl>
              </motion.div>
            </AnimatePresence>

            <Box textAlign="center" mt={4}>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!selectedAnswers[currentIndex]}
                sx={{
                  mt: 2,
                  px: 5,
                  py: 1.5,
                  fontSize: '1rem',
                  borderRadius: 3,
                  backgroundColor: theme.color,
                  '&:hover': {
                    backgroundColor: theme.color
                  }
                }}
              >
                {currentIndex === questions.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Box>
          </Paper>

          {/* 🧮 Question Counter Card */}
          <Box
            sx={{
              minWidth: 160,
              backgroundColor: theme.color,
              color: '#fff',
              borderRadius: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              px: 2,
              py: 4,
              boxShadow: 4,
              fontWeight: 'bold',
              textAlign: 'center'
            }}
          >
            <Typography variant="h5" sx={{ fontSize: '1.2rem' }}>
              Question
            </Typography>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Typography
                  variant="h3"
                  sx={{ my: 1, fontSize: '2.8rem', lineHeight: 1 }}
                >
                  {currentIndex + 1}
                </Typography>
              </motion.div>
            </AnimatePresence>

            <Typography variant="body1" sx={{ fontSize: '1rem' }}>
              of {questions.length}
            </Typography>
          </Box>

        </Box>
      </Container>
    </Box>
  );
}

export default QuizPage;
