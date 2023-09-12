const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  async addProduct(product) {
    const products = await this.getProducts();
    const newProduct = {
      id: products.length + 1,
      ...product
    };
    products.push(newProduct);
    await this.saveProducts(products);
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    return products.find(product => product.id === parseInt(id));
  }

  async updateProduct(id, updatedFields) {
    const products = await this.getProducts();
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex !== -1) {
      const updatedProduct = { ...products[productIndex], ...updatedFields };
      products[productIndex] = updatedProduct;
      await this.saveProducts(products);
    }
  }

  async deleteProduct(id) {
    const products = await this.getProducts();
    const updatedProducts = products.filter(product => product.id !== id);
    await this.saveProducts(updatedProducts);
  }

  async saveProducts(products) {
    await fs.writeFile(this.path, JSON.stringify(products, null, 2));
  }
}

module.exports = ProductManager;
