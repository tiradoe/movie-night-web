<script lang="ts" setup>

const emits = defineEmits(['registered']);
const {register} = useAuth();

const username = ref("");
const email = ref("");
const errorMessage = ref("");

const handleRegistration = async () => {
  try {
    await register(email.value, username.value);
  } catch (error: any) {
    console.error(error);
    errorMessage.value = error.message;
  }
}

</script>

<template>
  <form class="password-form" @submit.prevent="handleRegistration">
    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" v-model="email" type="email"/>
    </div>

    <div class="form-group">
      <label for="username">Username</label>
      <input id="username" v-model="username" type="text"/>
    </div>

    <button type="submit">Submit</button>
  </form>
  <div class="error-container">
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
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

.error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.error-message {
  color: red;
  text-align: center;
}

</style>