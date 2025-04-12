import axios from 'axios';

const API_KEY = 'I2ZLm76R3eoD2na4EvLrMoJ0dS4ayGeSu530a9Cq';
const BASE_URL = 'https://quizapi.io/api/v1/questions';

export const fetchQuestions = async ({ category, difficulty, limit = 10 }) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apiKey: API_KEY,
        category,
        difficulty,
        limit
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    return [];
  }
};
