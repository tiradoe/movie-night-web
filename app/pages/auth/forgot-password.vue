<script lang="ts" setup>

import ButtonAction from "~/components/common/button-action.vue";

definePageMeta({
  layout: 'auth'
})

const {forgotPassword} = useAuth();
const email = ref("");
const handlePasswordReset = () => {
  forgotPassword(email.value);
}

</script>

<template>
  <div>
    <form class="forgot-password-form">
      <label for="email">Email</label>
      <input id="email" v-model="email" type="email"/>
      <ButtonAction button-text="Send Reset Link" @action="handlePasswordReset"/>
    </form>
  </div>

</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

</style>