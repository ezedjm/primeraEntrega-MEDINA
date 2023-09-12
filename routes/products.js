const express = require('express');
const router = express.Router();
const ProductManager = require('../ProductManager'); 
const CartManager = require('../CartManager'); 

const productManager = new ProductManager('./productos.json'); 
const cartManager = new CartManager('./carts.json'); 



router.get('/', async (req, res) => {
  const limit = req.query.limit;
  try {
    const products = await productManager.getProducts();
    //console.log(limit)
    if (limit) {
      res.json(products.slice(0, parseInt(limit)));
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos..'});
    console.log(limit);
  }
});

router.get('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    const product = await productManager.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

router.post('/', async (req, res) => {
  const newProduct = req.body;
  try {
    await productManager.addProduct(newProduct);
    res.status(201).json({ message: 'Producto agregado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto' });
  }
});

router.put('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  const updatedFields = req.body;
  try {
    await productManager.updateProduct(productId, updatedFields);
    res.json({ message: 'Producto actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
});

router.delete('/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid);
  try {
    await productManager.deleteProduct(productId);
    res.json({ message: 'Producto eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
});

module.exports = router;
