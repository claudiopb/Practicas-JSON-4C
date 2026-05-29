const mongoose = require('mongoose');

const CATEGORIAS = [
  'Frutas y verduras', 'Lácteos', 'Bebidas', 'Higiene personal',
  'Línea blanca', 'Hogar', 'Salchichonería', 'Panadería',
  'Electrónicos', 'Enlatados'
];

const productoSchema = new mongoose.Schema({
  nombre:           { type: String, required: true, trim: true },
  precio:           { type: Number, required: true, min: 0 },
  iva:              { type: Number, default: 0.16 },
  precio_con_iva:   { type: Number },
  fecha_caducidad:  { type: Date, required: true },
  fecha_inventario: { type: Date, required: true },
  categoria:        { type: String, required: true, enum: CATEGORIAS }
}, { timestamps: true });

// Calcular precio_con_iva automáticamente antes de guardar
productoSchema.pre('save', function (next) {
  this.precio_con_iva = parseFloat((this.precio * (1 + this.iva)).toFixed(2));
  next();
});

productoSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  if (update.precio !== undefined) {
    const iva = update.iva !== undefined ? update.iva : 0.16;
    update.precio_con_iva = parseFloat((update.precio * (1 + iva)).toFixed(2));
  }
  next();
});

module.exports = mongoose.model('Producto', productoSchema);
