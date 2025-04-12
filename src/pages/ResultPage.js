import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Paper,
  Container,
  Divider,
  Stack
} from '@mui/material';

function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.questions || !state.selectedAnswers) {
    return (
      <Container sx={{ py: 10 }}>
        <Typography variant="h5" align="center">
          No quiz data found.
        </Typography>
        <Box textAlign="center" mt={4}>
          <Button variant="contained" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </Box>
      </Container>
    );
  }

  const { questions, selectedAnswers } = state;

  const getCorrectAnswerKeys = (correctAnswersObj) => {
    return Object.entries(correctAnswersObj)
      .filter(([_, value]) => value === 'true')
      .map(([key]) => key.replace('_correct', ''));
  };

  const results = questions.map((q, index) => {
    const correctKeys = getCorrectAnswerKeys(q.correct_answers);
    const userKey = selectedAnswers[index];
    const isCorrect = correctKeys.includes(userKey);

    return {
      question: q.question,
      userAnswer: userKey ? q.answers[userKey] : null,
      correctAnswers: correctKeys.map((key) => q.answers[key]),
      isCorrect
    };
  });

  const score = results.filter((r) => r.isCorrect).length;
  const percentage = ((score / questions.length) * 100).toFixed(0);

  const handleRestart = () => {
    const { category, difficulty } = questions[0];
    navigate(`/difficulty/${category || 'Linux'}`);
  };

  return (
    <Box sx={{ py: 6, backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
      <Container maxWidth="md">
        <Paper elevation={5} sx={{ p: 5, borderRadius: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Quiz Results
          </Typography>

          <Typography variant="h6" align="center" gutterBottom>
            You got <strong>{score}</strong> out of <strong>{questions.length}</strong> correct (
            <strong>{percentage}%</strong>)
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* 🎯 Breakdown */}
          {results.map((r, idx) => (
            <Paper
              key={idx}
              sx={{
                mb: 2,
                p: 3,
                backgroundColor: r.isCorrect ? '#e8f5e9' : '#ffebee',
                borderLeft: `6px solid ${r.isCorrect ? '#4caf50' : '#f44336'}`,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold">
                Q{idx + 1}: {r.question}
              </Typography>
              <Typography sx={{ mt: 1 }}>
                <strong>Your Answer:</strong>{' '}
                {r.userAnswer || (
                  <span style={{ fontStyle: 'italic', color: '#888' }}>No Answer</span>
                )}
              </Typography>
              {!r.isCorrect && (
                <Typography sx={{ mt: 1 }} color="primary">
                  <strong>Correct Answer{r.correctAnswers.length > 1 ? 's' : ''}:</strong>{' '}
                  {r.correctAnswers.join(', ')}
                </Typography>
              )}
            </Paper>
          ))}

          {/* 🔁 Buttons */}
          <Box textAlign="center" mt={4}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button
                variant="outlined"
                onClick={() => navigate('/')}
                sx={{ px: 4 }}
              >
                Home
              </Button>
              <Button
                variant="contained"
                onClick={handleRestart}
                sx={{ px: 4 }}
              >
                Try Again
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default ResultPage;
