const express = require('express');
const router = express.Router();
const CartManager = require('../CartManager'); //

const cartManager = new CartManager('./carts.json'); // 

// Ruta para crear un nuevo carrito (POST /)
router.post('/', async (req, res) => {
  try {
    const newCart = {
      id: generateUniqueCartId(), 
      products: [] // Inicializo el carrito con un array de productos vacío
    };

    // Agrego nuevo carrito
    await cartManager.createCart(newCart);

    res.status(201).json({ message: 'Carrito creado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

router.get('/:cid', async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await cartManager.getCartById(cartId);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  const cartId = req.params.cid;
  const productId = parseInt(req.params.pid);
  const quantity = req.body.quantity;
  try {
    await cartManager.addProductToCart(cartId, productId, quantity);
    res.json({ message: 'Producto agregado al carrito con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});


function generateUniqueCartId() {
  return 'cart_' + Date.now();
}

module.exports = router;
