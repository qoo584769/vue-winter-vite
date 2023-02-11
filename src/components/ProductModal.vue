<template>
  <Loading v-model:active="isLoading"></Loading>

  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-white text-dark">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ product.data.title }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="closeModal"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img class="img-fluid" :src="product.data.imageUrl" alt="" />
            </div>
            <div class="col-sm-6 text-dark">
              <span class="badge bg-primary rounded-pill">{{}}</span>
              <p>商品描述：{{ product.data.description }}</p>
              <p>商品內容：{{ product.data.content }}</p>
              <div
                class="h5"
                v-if="product.data.price === product.data.origin_price"
              >
                {{ product.data.price }} 元
              </div>
              <div class="" v-else>
                <del class="h6">原價 {{ product.data.origin_price }} 元</del>
                <div class="h5">現在只要 {{ product.data.price }} 元</div>
              </div>
              <div>
                <div class="input-group">
                  <input type="number" class="form-control" min="1" ref="qty" />
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="modalAddToCart"
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
            <!-- col-sm-6 end -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref, reactive, watch } from "vue";
import Loading from "vue-loading-overlay";

import Modal from "bootstrap/js/dist/modal";

const axios = inject("axios");

const props = defineProps(["id"]);
const emits = defineEmits(["emitToCart"]);
// 網址路徑
const path = "vue-winter";
const url = "https://vue3-course-api.hexschool.io/v2";
const product = reactive({ data: {} });
// 取得modal dom元素
const modal = ref(null);
// bs modal控制變數
const bsModal = ref("");
// 商品數量
const qty = ref(null);
// loading變數
const isLoading = ref(false);
// -----------------------------------------
// 案X會關閉modal
const closeModal = () => {
  bsModal.value.hide();
  console.log(modal);
  emits("emitToCart", props.id, parseInt(0));
};
// emit函式
const modalAddToCart = () => {
  emits("emitToCart", props.id, parseInt(qty.value.value));
  qty.value.value = "";
};

// -----------------------------------------
watch(
  () => props.id,
  () => {
    if (props.id) {
      isLoading.value = true;
      axios
        .get(`${url}/api/${path}/product/${props.id}`)
        .then((res) => {
          product.data = res.data.product;
          isLoading.value = false;
          bsModal.value.show();
        })
        .catch((err) => {
          isLoading.value = false;
          alert(err);
        });
    } else {
      isLoading.value = false;
      bsModal.value.hide();

      return;
    }
  }
);

onMounted(() => {
  bsModal.value = new Modal(modal.value, {
    backdrop: "static",
  });
});
</script>

<style lang="scss" scoped></style>
