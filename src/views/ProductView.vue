<template>
  <div class="container">
    <Loading v-model:active="isLoading"></Loading>
    <div class="row">
      <div class="col-6">
        <img :src="product.data.imageUrl" alt="" class="img-fluid" />
        <div class="row mt-3">
          <div
            class="col"
            v-for="(image, index) in product.data.imagesUrl"
            :key="index"
          >
            <img :src="image" alt="" class="img-fluid" />
          </div>
        </div>
      </div>

      <div class="col-6">
        <h1 class="">商品名稱 : {{ product.data.title }}</h1>
        <p class="">商品描述 : {{ product.data.description }}</p>
        <p class="">商品內容 : {{ product.data.content }}</p>
        <div class="h5" v-if="product.data.price === product.data.origin_price">
          {{ product.data.price }} 元
        </div>
        <div class="" v-else>
          <del class="h6">原價 {{ product.data.origin_price }} 元</del>
          <div class="h5">現在只要 {{ product.data.price }} 元</div>
        </div>

        <div class="input-group">
          <input
            type="number"
            class="form-control"
            min="1"
            value="1"
            ref="qty"
          />
          <button
            type="type"
            class="btn btn-outline-secondary"
            @click="addToCart(product.data.id, qty.value)"
          >
            加入購物車
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import Loading from "vue-loading-overlay";

// ----------------------------------------
const axios = inject("axios");

// 路由參數與變數
const route = useRoute();

// ----------------------------------------
// 網址路徑
const path = import.meta.env.VITE_PATH;
const url = import.meta.env.VITE_API;
// 單一商品變數
const product = reactive({ data: {} });
const qty = ref(null);
// loading變數
const isLoading = ref(false);

// ----------------------------------------
// 取得單一商品資訊
const getProductDetail = async (id) => {
  isLoading.value = true;

  try {
    const res = await axios.get(`${url}/api/${path}/product/${id}`);
    product.data = res.data.product;
    isLoading.value = false;
  } catch (error) {
    alert(error);
    isLoading.value = false;
  }
};
// 加入購物車
const addToCart = (product_id, qty = 1) => {
  isLoading.value = true;
  if (qty === "") {
    qty = 1;
  }
  const data = {
    product_id,
    qty: parseInt(qty),
  };
  axios
    .post(`${url}/api/${path}/cart`, { data })
    .then(() => {
      isLoading.value = false;
      alert(`${qty} 個商品成功加入購物車`);
    })
    .catch((err) => {
      alert(err);
      isLoading.value = false;
    });
};

// ----------------------------------------
onMounted(() => {
  const { id } = route.params;
  getProductDetail(id);
});
</script>

<style lang="scss" scoped></style>
