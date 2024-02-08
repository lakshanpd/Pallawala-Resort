const express = require('express');
const app = express();
const db = require('./db'); // Import the database connection
const routes = require('./routes'); // Import the route definitions

// Middleware for parsing JSON bodies
app.use(express.json());

// Use the routes defined in routes.js
app.use('/', routes);

// Start the server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});


