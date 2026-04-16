<script lang="ts" setup>
import incorrectPasswordGif from '~/assets/img/incorrect-password.gif';

const email = ref("");
const password = ref("");
const {login} = useAuth();

const errorMessage = ref("");

const handleLogin = async () => {
  try {
    await login(email.value, password.value)
  } catch (error) {
    errorMessage.value = "Invalid email or password";
  }
}
</script>

<template>
  <form class="password-form" @submit.prevent="handleLogin">
    <div class="form-group">
      <label for="email">Email</label>
      <input
          id="email"
          v-model="email"
          autocomplete="email"
          type="email"
      />
    </div>

    <div class="form-group">
      <label for="password">Password</label>
      <input
          id="password"
          v-model="password"
          autocomplete="current-password"
          type="password"
      />
    </div>

    <button type="submit">Submit</button>
    <div class="error-container">
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <img v-if="errorMessage" :src="incorrectPasswordGif" alt="You didn't say the magic word." class="error-image"
           height="200" width="300"/>
    </div>
  </form>
</template>

<style scoped>
.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.error-message {
  color: var(--color-error-text, red);
}

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

.error-message {
  color: red;
  text-align: center;
}
</style>