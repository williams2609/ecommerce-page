const express = require('express');
const router = express.Router();
const Category = require('../models/Category');


// Crear una nueva categoría
router.post('/', async (req, res) => {
    try {
      const { name, description } = req.body; 
      const category = await Category.create({ name, description });
      return res.status(201).json(category);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error al crear la categoría' });
    }
  });

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las categorías' });
  }
});

// Actualizar una categoría
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    category.name = name || category.name;
    category.description = description || category.description;
    await category.save();
    res.status(200).json(category);
  } catch (error) {
    console.error('Error al actualizar la categoría:', error);
    res.status(500).json({ error: 'Error al actualizar la categoría' });
  }
});

// Eliminar una categoría
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    await category.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar la categoría:', error);
    res.status(500).json({ error: 'Error al eliminar la categoría' });
  }
});


module.exports = router;