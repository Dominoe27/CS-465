// server.js
// Boots the Express app and listens on the configured port.

require('dotenv').config();           // Load .env (so PORT is available)

const http = require('http');
const app = require('./app');         // Your Express app (configured in app.js)

const port = process.env.PORT || 3000;
const server = http.createServer(app);

// Basic error handler for common listen errors 
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use`);
  } else {
    console.error('Server error:', err.message);
  }
  process.exit(1);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
