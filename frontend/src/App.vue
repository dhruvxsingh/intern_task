<template>
  <div class="header">
    <span>CROMA HEADER</span>
  </div>
  <div class="container">
    <h1>Croma Televisions & Accessories - Product Cards</h1>

    <div class="product-grid">
      <div
        v-for="(product, index) in products"
        :key="index"
        class="product-card"
      >
        <h2>{{ product.title }}</h2>

        <p class="old-price"><s>{{ product.price }}</s></p>
        <p class="sale-price">{{ product.sale_price }}</p>
        <p class="discount">{{ product.discount_message }}</p>

        <div v-if="product.rating || product.review_count">
          <strong>Rating:</strong>
          {{ product.rating }} ⭐
          <span v-if="product.review_count">({{ product.review_count }} reviews)</span>
        </div>

        <div v-if="product.delivery_info">
          <strong>Delivery:</strong> {{ product.delivery_info }}
        </div>

        <div v-if="product.extra_tags && product.extra_tags.length">
          <strong>Extra Offers:</strong>
          <ul class="tags">
            <li v-for="(tag, i) in product.extra_tags" :key="i">{{ tag }}</li>
          </ul>
        </div>
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
      const res = await fetch('http://127.0.0.1:5000/scraped-content');
      const data = await res.json();
      this.products = data.data;
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  background-color: #000;
}
* {
  box-sizing: border-box;
}
</style>

<style scoped>
body {
  margin: 0;
  background-color: #000;
}

.header {
  background-color: #000;
  padding: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  border-bottom: 2px solid #333;
}

.header span {
  color: #fff;
}

.container {
  padding: 20px;
  background-color: #000;
  min-height: 100vh;
}

.container h1 {
  color: #fff;
  text-align: center;
  margin-bottom: 30px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.product-card {
  border: 1px solid #444;
  border-radius: 10px;
  padding: 20px;
  background-color: #333;
  color: #fff;
}

.product-card h2 {
  color: #fff;
  font-size: 18px;
  margin-bottom: 15px;
  line-height: 1.4;
}

.old-price {
  color: #999;
  text-decoration: line-through;
  margin-bottom: 5px;
}

.sale-price {
  font-weight: bold;
  color: #fff;
  font-size: 24px;
  margin-bottom: 10px;
}

.discount {
  display: inline-block;
  background-color: #000;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 15px;
}

.product-card strong {
  color: #fff;
}

.tags {
  list-style: none;
  padding-left: 0;
  margin-top: 8px;
}

.tags li {
  display: inline-block;
  background-color: #90EE90;  
  padding: 6px 12px;
  border-radius: 20px;
  margin-right: 6px;
  margin-bottom: 6px;
  font-size: 12px;
  color: #006400;  
  font-weight: 500;
}

.product-card div {
  margin-bottom: 10px;
}

:deep(body) {
  background-color: #000 !important;
}
</style>