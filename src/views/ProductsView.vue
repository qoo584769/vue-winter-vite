<template>
  <div>
    <Loading v-model:active="isLoading"></Loading>
    <table class="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products.data" :key="product.id">
          <td style="width: 200px">
            <div
              style="
                height: 100px;
                background-size: cover;
                background-position: center;
              "
              :style="{ backgroundImage: `url(${product.imageUrl})` }"
            ></div>
          </td>
          <td>
            {{ product.title }}
          </td>
          <td>
            <div class="h5" v-if="product.price === product.origin_price">
              {{ product.price }} 元
            </div>
            <div class="" v-else>
              <del class="h6">原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 {{ product.price }} 元</div>
            </div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="openModal(product.id)"
              >
                <i class="fas fa-spinner fa-pulse"></i>
                查看更多
              </button>
              <button
                type="button"
                class="btn btn-outline-danger"
                @click="addToCart(product.id)"
              >
                <i class="fas fa-spinner fa-pulse"></i>
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <ProductModal :id="productId" @emitToCart="addToCart"></ProductModal>
</template>

<script setup>
import { ref, reactive, inject, onMounted } from "vue";
import Loading from "vue-loading-overlay";
import ProductModal from "../components/ProductModal.vue";
// 網址路徑
const path = import.meta.env.VITE_PATH;
const url = import.meta.env.VITE_API;
// 取得的產品資料儲存變數
const products = reactive({ data: [] });
const axios = inject("axios");
// 取得產品id打開modal
const productId = ref("");
// loading變數
const isLoading = ref(false);
// 查看更多按鈕 打開modal
const openModal = (product_id) => {
  productId.value = product_id;
  console.log(productId.value);
};

// ---------------------------------------------------

// 取得產品資料
const getProducts = () => {
  isLoading.value = true;
  axios.get(`${url}/api/${path}/products/all`).then((res) => {
    products.data = res.data.products;
    isLoading.value = false;
  });
};
// 加入購物車
const addToCart = (product_id, qty = 1) => {
  const data = {
    product_id,
    qty,
  };
  isLoading.value = true;
  if (qty === 0) {
    productId.value = "";
    isLoading.value = false;
    return;
  }
  axios
    .post(`${url}/api/${path}/cart`, { data })
    .then(() => {
      productId.value = "";
      alert(`${data.qty} 個商品加入購物車成功`);
      isLoading.value = false;
      productId.value = "";
    })
    .catch((err) => {
      isLoading.value = false;
      alert(err);
    });
};

// ---------------------------------------------------

onMounted(() => {
  getProducts();
});
</script>

<style lang="scss" scoped></style>
