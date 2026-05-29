const mongoose = require('mongoose');

const empleadoSchema = new mongoose.Schema({
  nombre:           { type: String, required: true, trim: true },
  apellido_paterno: { type: String, required: true, trim: true },
  apellido_materno: { type: String, required: true, trim: true },
  direccion:        { type: String, required: true, trim: true },
  edad:             { type: Number, required: true, min: 18, max: 75 },
  genero:           { type: String, required: true, enum: ['Masculino', 'Femenino', 'Otro'] },
  puesto:           { type: String, required: true, trim: true },
  sueldo:           { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Empleado', empleadoSchema);
