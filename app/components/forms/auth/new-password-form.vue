<script lang="ts" setup>
const props = defineProps<{
  token: string,
  email: string
}>();

const {resetPassword} = useAuth();
const password = ref("");
const passwordConfirmation = ref("");
const tokenExpired = ref(false);

const handlePasswordReset = () => {
  try {
    resetPassword(password.value, passwordConfirmation.value, props.token, props.email);
  } catch (error: unknown) {
    if (error instanceof Error && error.message === "TOKEN_EXPIRED")
      tokenExpired.value = true;
  }
}
</script>

<template>
  <p v-show="tokenExpired" class="error">Your password reset token has expired. Please submit a new request.</p>
  <form class="password-form" @submit.prevent="handlePasswordReset">
    <div class="form-group">
      <label for="password">Password</label>
      <input id="password" v-model="password" autocomplete="new-password" type="password"/>
    </div>

    <div class="form-group">
      <label for="new-password">Confirm Password</label>
      <input id="confirm-password" v-model="passwordConfirmation" autocomplete="new-password" type="password"/>
    </div>

    <button type="submit">Submit</button>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.error {
  color: red;
  padding: 2em;
}
</style>