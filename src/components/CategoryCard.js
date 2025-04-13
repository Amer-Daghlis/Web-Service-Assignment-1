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
      <Card
        sx={{
          width: 220,
          margin: 2,
          borderRadius: 5, // حواف مستديرة أكبر
          boxShadow: 4, // إضافة ظل أقوى
          backgroundColor: '#fff', // خلفية بيضاء
          transition: '0.3s', // تأثيرات خفيفة عند التحريك
          '&:hover': {
            boxShadow: 8, // ظل أقوى عند التحويم
            transform: 'translateY(-5px)', // رفع الكارد عند التحويم
          },
        }}
      >
        <CardActionArea onClick={onClick}>
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt={name}
            sx={{
              objectFit: 'contain', // للحفاظ على تناسق الصورة
              padding: 1, // مسافة داخلية للصورة
              borderRadius: 3, // حواف مستديرة للصورة
            }}
          />
          <CardContent>
            <Typography
              variant="h6"
              align="center"
              sx={{
                color: '#333', // لون النص
                fontWeight: 'bold', // زيادة سمك النص
              }}
            >
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </motion.div>
  );
}

export default CategoryCard;
