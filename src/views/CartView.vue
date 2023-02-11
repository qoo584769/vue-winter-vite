<template>
  <Loading v-model:active="isLoading"></Loading>
  <p class="text-center">這邊是購物車與建立訂單頁面</p>
  <div class="text-end">
    <button class="btn btn-outline-danger" type="button" @click="delCart()">
      清空購物車
    </button>
  </div>
  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th>單價</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="cart.carts">
        <tr v-for="cart in cart.carts.carts" :key="cart.id">
          <td>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="delCart(cart.id)"
            >
              <i class="fas fa-spinner fa-pulse"></i>
              x
            </button>
          </td>
          <td>
            {{ cart.product.title }}
            <div class="text-success">已套用優惠券</div>
          </td>
          <td>
            <div class="input-group input-group-sm">
              <div class="input-group mb-3">
                <input
                  min="1"
                  type="number"
                  class="form-control"
                  v-model="cart.qty"
                  @change="updateCart(cart.id, cart.product_id, cart.qty)"
                  ref="productQty"
                />
                <span class="input-group-text" id="basic-addon2">{{
                  cart.product.unit
                }}</span>
              </div>
            </div>
          </td>
          <td class="text-end">
            <small class="text-success">折扣價：</small>
            {{ cart.product.price }}
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ cart.carts.total }}</td>
      </tr>
      <tr>
        <td colspan="3" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{ cart.carts.final_total }}</td>
      </tr>
    </tfoot>
  </table>

  <CreateList :cart="cart" @emitGetCart="getCart()"></CreateList>
</template>

<script setup>
import { reactive, inject, onMounted, ref } from "vue";
import CreateList from "../components/CreateList.vue";
import Loading from "vue-loading-overlay";

const axios = inject("axios");
// 網址路徑
const path = import.meta.env.VITE_PATH;
const url = import.meta.env.VITE_API;
// 取得購物車資料變數
const cart = reactive({ carts: [] });
// loading變數
const isLoading = ref(false);
// -----------------------------------------------
// 取得購物車
const getCart = () => {
  isLoading.value = true;
  axios.get(`${url}/api/${path}/cart`).then((res) => {
    cart.carts = res.data.data;
    isLoading.value = false;
  });
};
// 修改購物車項目
const updateCart = (cart_id, product_id, qty) => {
  const data = {
    product_id,
    qty,
  };
  isLoading.value = true;
  axios
    .put(`${url}/api/${path}/cart/${cart_id}`, { data })
    .then(() => {
      isLoading.value = false;
      getCart();
      alert("已修改購物車商品數量");
    })
    .catch((err) => {
      alert(err);
      isLoading.value = false;
    });
};
// 刪除單一購物車 / 全部購物車
const delCart = (cart_id = "") => {
  isLoading.value = true;
  if (cart_id === "") {
    axios
      .delete(`${url}/api/${path}/carts`)
      .then(() => {
        isLoading.value = false;
        getCart();
        alert("已刪除全部購物車");
      })
      .catch((err) => {
        isLoading.value = false;
        alert(err);
      });
  } else {
    axios
      .delete(`${url}/api/${path}/cart/${cart_id}`)
      .then(() => {
        getCart();
        isLoading.value = false;
        alert("已刪除所選購物車");
      })
      .catch((err) => {
        isLoading.value = false;
        alert(err);
      });
  }
};

// -----------------------------------------------
onMounted(() => {
  getCart();
});
</script>

<style lang="scss" scoped></style>
