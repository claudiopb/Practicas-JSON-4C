const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

router.get('/', async (req, res) => {
  try {
    const { q } = req.query;
    const filtro = q
      ? { $or: [
          { nombre: new RegExp(q, 'i') },
          { apellido_paterno: new RegExp(q, 'i') },
          { telefono: new RegExp(q, 'i') }
        ]}
      : {};
    const clientes = await Cliente.find(filtro).sort({ createdAt: -1 });
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'No encontrado' });
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).json(cliente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(
      req.params.id, req.body, { new: true, runValidators: true }
    );
    if (!cliente) return res.status(404).json({ error: 'No encontrado' });
    res.json(cliente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) return res.status(404).json({ error: 'No encontrado' });
    res.json({ message: 'Cliente eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
