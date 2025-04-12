import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Header from './components/Header';

// Pages
import HomePage from './pages/HomePage';
import DifficultySelector from './pages/DifficultySelector';
import QuizStarter from './pages/QuizStarter';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      {/* 🔵 Dark Blue Header */}
      <Header />

      {/* 🚀 Animated Page Transitions */}
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/difficulty/:category" element={<DifficultySelector />} />
          <Route path="/start/:category/:difficulty" element={<QuizStarter />} />
          <Route path="/quiz/:category/:difficulty" element={<QuizPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
