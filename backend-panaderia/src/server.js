require('dotenv').config();
console.log('🚀  Levantando ▶ src/server.js');

const { app, PORT } = require('./app');

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Escuchando en http://0.0.0.0:${PORT}`);
});
