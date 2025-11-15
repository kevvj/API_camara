// app.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Ruta de prueba para recibir datos
app.post('/api/test', (req, res) => {
  console.log('Datos recibidos:', req.body);
  res.json({ status: 'ok', received: req.body });
});

// Ruta GET de prueba
app.get('/api/test', (req, res) => {
  res.json({ message: 'API funcionando' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
