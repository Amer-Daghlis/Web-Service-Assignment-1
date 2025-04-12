import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { motion } from 'framer-motion';

function CategoryCard({ name, image, onClick }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <Card sx={{ width: 220, margin: 2, borderRadius: 3, boxShadow: 4 }}>
        <CardActionArea onClick={onClick}>
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt={name}
            sx={{ objectFit: 'contain', padding: 1 }} // 👈 This keeps images nice and neat
          />
          <CardContent>
            <Typography variant="h6" align="center">
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
}

export default CategoryCard;
