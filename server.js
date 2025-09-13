// server.js
// This file actually runs my app.
// It pulls in app.js, fires up an HTTP server, and listens on port 3000.

const http = require('http');       // Node's built-in HTTP module
const app = require('./app');       // My Express app (configured in app.js)

// Pick a port (3000 is the default for this project)
const port = process.env.PORT || 3000;

// Create the server and pass in my Express app
const server = http.createServer(app);

// Start listening — now I can hit http://localhost:3000/ in my browser
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});