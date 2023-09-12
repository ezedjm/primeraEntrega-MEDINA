const express = require('express');
const fs = require('fs').promises;
const app = express();
const port = 8080;

app.use(express.json());

const ProductManager = require('./ProductManager');
const CartManager = require('./CartManager'); 

const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

const productosFilePath = './productos.json';
const productManager = new ProductManager(productosFilePath);
const cartManager = new CartManager('./carts.json'); 

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando el puerto ${port}`);
});
