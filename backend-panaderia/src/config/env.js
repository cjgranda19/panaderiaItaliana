require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY || 'dev_secret';

// Render pasa el puerto en process.env.PORT, nunca usar fijo
const PORT = Number(process.env.PORT) || 4000;

module.exports = { SECRET_KEY, PORT };
