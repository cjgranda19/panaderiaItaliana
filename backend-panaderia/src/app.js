console.log('🛠️  Cargando ▶ src/app.js');
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const { PORT } = require('./config/env');

const authRoutes  = require('./routes/auth.routes');
const userRoutes  = require('./routes/users.routes');
const catRoutes   = require('./routes/categorias.routes');
const prodRoutes  = require('./routes/productos.routes');
const ordenRoutes = require('./routes/orden.routes');

const errorHandler = require('./middlewares/errorHandler.middleware');

const app = express();

// ───── Middlewares base ─────
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Logging sencillo
app.use((req, _res, next) => {
  console.log(`📥 ${req.method} ${req.originalUrl}`, 'body=', req.body);
  next();
});

// ───── Rutas de “vida” (antes de todo) ─────
app.get('/', (_req, res) => {
  res.send('✅ Servidor funcionando en el puerto ' + PORT);
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, port: PORT, uptime: process.uptime(), date: new Date() });
});

// Render a veces hace HEAD /
app.head('/', (_req, res) => res.status(200).end());

app.post('/ping', (req, res) => {
  console.log('🔖 [ping] body:', req.body);
  res.json({ pong: true, recibimos: req.body });
});

// ───── Tus routers ─────
app.use('/auth',       authRoutes);
app.use('/usuarios',   userRoutes);
app.use('/categorias', catRoutes);
app.use('/productos',  prodRoutes);
app.use('/ordenes',    ordenRoutes);

// ───── Error handler SIEMPRE al final ─────
app.use(errorHandler);

module.exports = { app, PORT };
