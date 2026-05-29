const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre:           { type: String, required: true, trim: true },
  apellido_paterno: { type: String, required: true, trim: true },
  apellido_materno: { type: String, required: true, trim: true },
  direccion:        { type: String, required: true, trim: true },
  telefono:         { type: String, required: true, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Cliente', clienteSchema);
