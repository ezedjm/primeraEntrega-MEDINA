const fs = require('fs').promises;

class CartManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async createCart(cart) {
    const carts = await this.getCarts();
    const newCart = {
      id: generateUniqueId(), //
      products: []
    };
    carts.push(newCart);
    await this.saveCarts(carts);
  }

  async getCartById(cartId) {
    const carts = await this.getCarts();
    return carts.find(cart => cart.id === cartId);
  }

  async addProductToCart(cartId, productId, quantity) {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex(cart => cart.id === cartId);
    if (cartIndex !== -1) {
      const cart = carts[cartIndex];
      const existingProductIndex = cart.products.findIndex(product => product.id === productId);

      if (existingProductIndex !== -1) {
        // Si el producto ya existe en el carrito, aumenta
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        // agrega
        cart.products.push({ id: productId, quantity });
      }

      await this.saveCarts(carts);
    }
  }

  async getCarts() {
    try {
      const data = await fs.readFile(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async saveCarts(carts) {
    await fs.writeFile(this.path, JSON.stringify(carts, null, 2));
  }
}


function generateUniqueId() {
  return 'cart_' + Date.now(); // fecha, si quiero enteros consecutivos necesito un archivo 
}

module.exports = CartManager;
