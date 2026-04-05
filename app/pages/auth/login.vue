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
  </div>

</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 2rem;
}

</style>