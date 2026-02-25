<script lang="ts" setup>
const email = ref("");
const password = ref("");
const {login} = useAuth();

const handleLogin = () => login(email.value, password.value)
</script>

<template>
  <form class="password-form" @submit.prevent="handleLogin">
    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" v-model="email" type="email"/>
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input id="password" v-model="password" type="password"/>
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<style scoped>
.password-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 50rem;
  margin: 0 auto;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>