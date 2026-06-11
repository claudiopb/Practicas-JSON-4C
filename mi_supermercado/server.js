// server.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Conexión a tu base de datos
mongoose.connect('mongodb://localhost:27017/supermercado_db');

// Definir los modelos (la estructura de tus colecciones)
// Usamos { strict: false } para permitir cualquier campo de tus JSONs
const Empleado = mongoose.model('empleados', new mongoose.Schema({}, { strict: false }));
const Cliente = mongoose.model('clientes', new mongoose.Schema({}, { strict: false }));
const Producto = mongoose.model('productos', new mongoose.Schema({}, { strict: false }));

app.use(express.static('public')); // Servir archivos de diseño

// Ruta para obtener datos según la colección elegida
app.get('/api/:coleccion', async (req, res) => {
    const col = req.params.coleccion;
    let data;
    
    // Consultamos la colección correcta
    if (col === 'empleados') data = await Empleado.find();
    else if (col === 'clientes') data = await Cliente.find();
    else if (col === 'productos') data = await Producto.find();
    
    res.json(data); // Enviamos los datos al navegador en formato JSON
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));