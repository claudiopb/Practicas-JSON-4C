const express = require('express');
const router = express.Router();
const Empleado = require('../models/Empleado');

// GET todos
router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    const filtro = q
      ? { $or: [
          { nombre: new RegExp(q, 'i') },
          { apellido_paterno: new RegExp(q, 'i') },
          { puesto: new RegExp(q, 'i') }
        ]}
      : {};
    const empleados = await Empleado.find(filtro).sort({ createdAt: -1 });
    res.json(empleados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET por ID
router.get('/:id', async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) return res.status(404).json({ error: 'No encontrado' });
    res.json(empleado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST crear
router.post('/', async (req, res) => {
  try {
    const empleado = new Empleado(req.body);
    await empleado.save();
    res.status(201).json(empleado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT actualizar
router.put('/:id', async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!empleado) return res.status(404).json({ error: 'No encontrado' });
    res.json(empleado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE eliminar
router.delete('/:id', async (req, res) => {
  try {
    const empleado = await Empleado.findByIdAndDelete(req.params.id);
    if (!empleado) return res.status(404).json({ error: 'No encontrado' });
    res.json({ message: 'Empleado eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
