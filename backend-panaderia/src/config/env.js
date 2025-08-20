// src/config/env.js
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || 'dev_secret';

// Render pasa el puerto en process.env.PORT
const PORT = Number(process.env.PORT) || 8080;

module.exports = { SECRET_KEY, PORT };
