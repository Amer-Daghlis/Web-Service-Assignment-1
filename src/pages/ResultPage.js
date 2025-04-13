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
      answers: q.answers,
      correctKeys,
      userKey,
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

          {/* 🎯 Final Score Circle + Message */}
          <Box textAlign="center" mt={2} mb={4}>
            {score >= 6 ? (
              <>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    backgroundColor: '#4caf50',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    animation: 'pop 0.6s ease',
                  }}
                >
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {score}/{questions.length}
                  </Typography>
                </Box>
                <Typography variant="h5" color="success.main" sx={{ fontWeight: 'bold' }}>
                  🎉🎊 Great job, Brainiac! 🎊🎉
                </Typography>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    backgroundColor: '#f44336',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    animation: 'shake 0.4s ease-in-out',
                  }}
                >
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                    {score}/{questions.length}
                  </Typography>
                </Box>
                <Typography variant="h5" color="error.main" sx={{ fontWeight: 'bold' }}>
                  😡 Oops... Better luck next time!
                </Typography>
                
              </>
            )}
          </Box>

          <Typography variant="h6" align="center" gutterBottom>
            You got <strong>{score}</strong> out of <strong>{questions.length}</strong> correct (
            <strong>{percentage}%</strong>)
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* 🧠 Question Breakdown */}
          {results.map((r, idx) => (
            <Paper
              key={idx}
              sx={{
                mb: 3,
                p: 3,
                backgroundColor: r.isCorrect ? '#e8f5e9' : '#ffebee',
                borderLeft: `6px solid ${r.isCorrect ? '#4caf50' : '#f44336'}`,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                Q{idx + 1}: {r.question}
              </Typography>

              <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, fontWeight: 'bold' }}>
                Select one:
              </Typography>

              {Object.entries(r.answers).map(([key, value]) => {
                if (!value) return null;

                const isCorrect = r.correctKeys.includes(key);
                const isUserAnswer = r.userKey === key;

                return (
                  <Box key={key} display="flex" alignItems="center" mb={0.8}>
                    <Box
                      sx={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        backgroundColor: isUserAnswer ? '#333' : '#bbb',
                        marginRight: 1.5,
                        mt: '2px'
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        color: isCorrect
                          ? '#4caf50'
                          : isUserAnswer
                          ? '#f44336'
                          : 'inherit',
                        fontWeight: isCorrect || isUserAnswer ? 'bold' : 'normal',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {value}
                      {isCorrect && <span style={{ marginLeft: 8 }}>✅</span>}
                      {!isCorrect && isUserAnswer && <span style={{ marginLeft: 8 }}>❌</span>}
                    </Typography>
                  </Box>
                );
              })}
            </Paper>
          ))}

          {/* 🔁 Buttons */}
          <Box textAlign="center" mt={4}>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button variant="outlined" onClick={() => navigate('/')} sx={{ px: 4 }}>
                Home
              </Button>
              <Button variant="contained" onClick={handleRestart} sx={{ px: 4 }}>
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
