<template>
  <div class="header">
    <span>CROMA HEADER</span>
  </div>
  <div class="container">
    <h1>Croma Televisions & Accessories - Product Cards</h1>
    
    <div class="product-grid">
      <div
        v-for="product in products"
        :key="product.product_id"
        class="product-card"
      >
        <h2>{{ product.title }}</h2>
        <p><s>{{ product.price }}</s></p>
        <p class="sale-price">{{ product.sale_price }}</p>
        <p class="discount">{{ product.discount_message }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },
  async mounted() {
    try {
      const res = await fetch('http://localhost:5000/products');
      const data = await res.json(); // because this route just returns a raw array
      this.products = data;
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }
}
</script>

<style scoped>
.header {
  background-color: #000;
  padding: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}
.header span {
  color: #fff;
}
.container {
  padding: 20px;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
.product-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 16px;
  background-color: #f9f9f9;
}
.sale-price {
  font-weight: bold;
  color: green;
}
.discount {
  color: red;
}
</style>