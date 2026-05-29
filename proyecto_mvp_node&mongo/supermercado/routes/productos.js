const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

router.get('/', async (req, res) => {
  try {
    const { q, categoria } = req.query;
    let filtro = {};
    if (categoria) filtro.categoria = categoria;
    if (q) filtro.$or = [
      { nombre: new RegExp(q, 'i') },
      { categoria: new RegExp(q, 'i') }
    ];
    const productos = await Producto.find(filtro).sort({ createdAt: -1 });
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ error: 'No encontrado' });
    res.json(producto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.status(201).json(producto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!producto) return res.status(404).json({ error: 'No encontrado' });
    res.json(producto);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) return res.status(404).json({ error: 'No encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
