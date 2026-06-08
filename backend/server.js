const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();
app.use(cors());

// File aane ka rasta
const upload = multer({ dest: 'uploads/' });

// Test route - check karne ke liye
app.get('/', (req, res) => {
  res.json({ message: 'ConvertFlow API is running!' });
});

// File convert karne ka route
app.post('/convert', upload.single('file'), (req, res) => {
  console.log('File received:', req.file.originalname);
  
  // Abhi ke liye fake success bhej raha hoon
  // Baad mein real conversion laga lena
  res.json({ 
    success: true,
    message: 'File converted successfully!',
    downloadLink: 'https://google.com' // baad mein real link daal dena
  });
});

// Render apne aap port deta hai
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
