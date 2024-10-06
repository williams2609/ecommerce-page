const express = require('express');
const router = express.Router();
const Product = require('../models/product'); // Asegúrate de que la ruta sea correcta
const Category = require('../models/Category');

// Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const { title, price, description, stock, thumbnail, category, discountPercentage } = req.body;
    const newProduct = await Product.create({ title, price, description, stock, thumbnail, category, discountPercentage });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "error al obtener los productos" });
  }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el producto" });
  }
});

router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        console.error('Error al obtener las categorías:', error);
        res.status(500).json({ error: 'Error al obtener las categorías' });
    }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, description, stock, thumbnail, category, discountPercentage } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    product.title = title || product.title;
    product.price = price || product.price;
    product.description = description || product.description;
    product.stock = stock || product.stock; 
    product.thumbnail = thumbnail || product.thumbnail;
    product.category = category || product.category;
    product.discountPercentage = discountPercentage || product.discountPercentage;

    await product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    await product.destroy();
    res.status(204).send(); // Cambié 202 por 204 para indicar que no hay contenido
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

module.exports = router;