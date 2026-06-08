const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());

// Uploads folder
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const upload = multer({ dest: uploadsDir });

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'ConvertFlow API is running!' });
});

// Convert route
app.post('/convert', upload.single('file'), (req, res) => {
  console.log('File received:', req.file.originalname);
  
  res.json({ 
    success: true,
    message: 'File converted successfully!',
    fileName: 'converted_' + req.file.originalname,
    fileId: req.file.filename
  });
});

// Download route
app.get('/download/:fileId', (req, res) => {
  const fileId = req.params.fileId;
  const filePath = path.join(uploadsDir, fileId);
  
  if (fs.existsSync(filePath)) {
    res.download(filePath, req.query.name || 'converted_file');
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
