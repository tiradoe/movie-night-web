<script lang="ts" setup>
import LoginForm from "~/components/forms/auth/login-form.vue";

definePageMeta({
  layout: 'auth'
})
</script>

<template>
  <div class="content">
    <h1>Log in</h1>
    <login-form/>
    <NuxtLink class="link" to="/auth/forgot-password">Forgot Your Password?</NuxtLink>
  </div>

</template>

<style scoped>
.link {
  color: #007bff;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 2rem;
}

</style>