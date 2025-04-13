import React, { useState, useEffect } from 'react';
import { categories } from '../api/categories';
import CategoryCard from '../components/CategoryCard';
import {
  Typography,
  Container,
  Box,
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import { useThemeColor } from '../components/ThemeContext';

const filterTypes = ['Frontend', 'Backend', 'DevOps', 'Database', 'Operating System'];

function HomePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const { changeColorByLevel } = useThemeColor();

  useEffect(() => {
    changeColorByLevel(null);
  }, [changeColorByLevel]);

  const handleCategoryClick = (categoryName) => {
    navigate(`/difficulty/${categoryName}`);
  };

  const handleCheckboxChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const filteredCategories = categories.filter((cat) => {
    const matchesSearch = cat.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(cat.type);
    return matchesSearch && matchesType;
  });

  return (
    <Box
  sx={{
    minHeight: '100vh',
    backgroundColor: '#23368CFF', // اللون الأساسي للخلفية
    // إذا بدك تضيف صورة بخلفية شفافة فوق اللون:
    backgroundImage: `linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.1)), url('/assets/quiz.jpg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    py: 6,
  }}
>
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ color: '#FFFFFFFF', fontWeight: 'bold' }}
          >
            Select Your Quiz Category
          </Typography>
        </motion.div>

        <Box display="flex" gap={4} mt={4}>
          {/* Sidebar Filter */}
          <Box
            sx={{
              flex: '0 0 250px',
              position: 'sticky',
              top: 100,
              height: 'fit-content',
              transition: '0.3s ease-in-out',
            }}
          >
            <Paper
              elevation={4}
              sx={{
                borderRadius: 3,
                padding: 2,
                backgroundColor: '#ffffffee',
                backdropFilter: 'blur(6px)',
                boxShadow: 3,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Filter by Type
              </Typography>
              <FormGroup>
                {filterTypes.map((type) => (
                  <motion.div
                    key={type}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedTypes.includes(type)}
                          onChange={() => handleCheckboxChange(type)}
                          sx={{
                            '& .MuiCheckbox-root': {
                              transition: '0.3s ease-in-out',
                            },
                          }}
                        />
                      }
                      label={type}
                    />
                  </motion.div>
                ))}
              </FormGroup>
            </Paper>
          </Box>

          {/* Main Content */}
          <Box sx={{ flex: 1 }}>
            {/* Search Box */}
            <Box mb={3} display="flex" justifyContent="center">
              <TextField
                placeholder="Search categories..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  borderRadius: 5,
                  backgroundColor: '#fff',
                  boxShadow: 3,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 5,
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {/* Cards */}
            <Box display="flex" flexWrap="wrap" justifyContent="flex-start" gap={2}>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <motion.div
                    key={category.name}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CategoryCard
                      name={category.name}
                      image={category.image}
                      onClick={() => handleCategoryClick(category.name)}
                    />
                  </motion.div>
                ))
              ) : (
                <Typography variant="h6" color="text.secondary">
                  No matching categories found.
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;
