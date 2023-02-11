<template>
  <div class="my-5 row justify-content-center">
    <Form ref="form" class="col-md-6" v-slot="{ errors }" @submit="onSubmit">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <Field
          id="email"
          name="email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors['email'] }"
          placeholder="請輸入 Email"
          rules="email|required"
          v-model="user.email"
        ></Field>
        <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <Field
          id="name"
          name="姓名"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['姓名'] }"
          placeholder="請輸入姓名"
          rules="required"
          v-model="user.name"
        ></Field>
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <Field
          id="tel"
          name="電話"
          type="tel"
          class="form-control"
          :class="{ 'is-invalid': errors['電話'] }"
          placeholder="請輸入電話"
          rules="required"
          v-model="value"
          :value="user.tel"
        ></Field>
        <span class="text-danger mt-2 d-block fs-6" v-if="isrequired">{{
          errorMessage
        }}</span>
        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <Field
          id="address"
          name="地址"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['地址'] }"
          placeholder="請輸入地址"
          rules="required"
          v-model="user.address"
        ></Field>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea
          id="message"
          class="form-control"
          cols="30"
          rows="10"
          v-model="message"
        ></textarea>
      </div>
      <div class="text-end">
        <button
          type="submit"
          class="btn btn-danger"
          :disabled="props.cart?.carts?.carts?.length === 0"
        >
          送出訂單
        </button>
      </div>
    </Form>
  </div>
</template>

<script setup>
import { inject, reactive, ref, toRef } from "vue";
import { Form, Field, ErrorMessage, useField } from "vee-validate";

const axios = inject("axios");
// ---------------------------------------------
// 網址路徑
const path = import.meta.env.VITE_PATH;
const url = import.meta.env.VITE_API;
// 收件者資料
const user = reactive({});
// 收件者訊息
const message = ref("");

// ---------------------------------------------
const props = defineProps(["cart", "phone"]);
// 驗證電話
const isrequired = (value) => {
  if (value && value.trim()) {
    const phoneNumber = /^(09)[0-9]{8}$/;
    user.tel = value;
    return phoneNumber.test(value) ? true : "需要正確的電話號碼";
  } else if (value === "") {
    return value;
  }
};
const phoneRef = toRef(props, "phone");
const { errorMessage, value } = useField(phoneRef, isrequired);

// 建立訂單按鈕
const onSubmit = () => {
  if (user.tel === undefined || user.tel === "") {
    return;
  }
  const data = {
    user,
    message: message.value,
  };
  axios
    .post(`${url}/api/${path}/order`, { data })
    .then(() => {
      user.email = "";
      user.name = "";
      user.tel = "";
      user.address = "";
      message.value = "";
      alert("訂單建立成功");
    })
    .catch((err) => {
      alert(err);
    });
};
</script>

<style lang="scss" scoped></style>
