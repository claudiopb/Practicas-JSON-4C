require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
app.use('/api/empleados', require('./routes/empleados'));
app.use('/api/clientes',  require('./routes/clientes'));
app.use('/api/productos', require('./routes/productos'));

// SPA fallback
app.get('/{*splat}', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Conexión MongoDB
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/supermercado_db';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅  MongoDB conectado →', MONGO_URI);
    app.listen(PORT, () => console.log(`🚀  Servidor en http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌  Error MongoDB:', err.message);
    process.exit(1);
  });
