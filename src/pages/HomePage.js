import React, { useState } from 'react';
import { categories } from '../api/categories';
import CategoryCard from '../components/CategoryCard';
import {
  Grid,
  Typography,
  Container,
  Box,
  TextField,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  FormGroup,
  Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';

const filterTypes = ['Frontend', 'Backend', 'DevOps', 'Database', 'Infrastructure'];

function HomePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);

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
        background: 'linear-gradient(to right, #fdfbfb, #ebedee)',
        py: 6,
      }}
    >
      <Container maxWidth="xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Typography variant="h3" align="center" gutterBottom>
            Select Your Quiz Category
          </Typography>
        </motion.div>

        <Grid container spacing={4} mt={4}>
          {/* ✅ Left Sidebar Filters */}
          <Grid item xs={12} md={3}>
            <Paper
              elevation={4}
              sx={{
                borderRadius: 3,
                padding: 2,
                backgroundColor: '#ffffffee',
                backdropFilter: 'blur(6px)',
              }}
            >
              <Typography variant="h6" gutterBottom>
                Filter by Type
              </Typography>
              <FormGroup>
                {filterTypes.map((type) => (
                  <FormControlLabel
                    key={type}
                    control={
                      <Checkbox
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleCheckboxChange(type)}
                      />
                    }
                    label={type}
                  />
                ))}
              </FormGroup>
            </Paper>
          </Grid>

          {/* ✅ Main Section: Search + Cards */}
          <Grid item xs={12} md={9}>
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

            <Grid container spacing={2} justifyContent="center">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <Grid item key={category.name}>
                    <CategoryCard
                      name={category.name}
                      image={category.image}
                      onClick={() => handleCategoryClick(category.name)}
                    />
                  </Grid>
                ))
              ) : (
                <Typography variant="h6" color="text.secondary">
                  No matching categories found.
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HomePage;
