const express = require('express');
const path = require('path');
const app = express();

// Serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok', framework: 'express', module: 'CS-465 M1' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Express running on http://localhost:${PORT}`);
});