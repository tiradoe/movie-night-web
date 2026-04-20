<script lang="ts" setup>
import ButtonAction from "~/components/common/button-action.vue";

const {resetPassword} = useAuth();

const currentPassword = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");
const errors = ref<string[]>([]);
const successMessage = ref("");

const handlePasswordReset = async () => {
  errors.value = []
  try {
    await resetPassword(newPassword.value, confirmNewPassword.value, currentPassword.value);
    successMessage.value = "Password reset successful!";
  } catch (error) {
    const fieldErrors = Object.values((error as any)?.errors ?? {}).flat() as string[]
    errors.value = fieldErrors.length ? fieldErrors : [error?.message ?? "An error occurred. Please try again."]
    successMessage.value = "";
  }
}

</script>

<template>
  <form class="password-form" @submit.prevent>
    <div class="form-group">
      <label for="new-password">Current Password</label>
      <input id="new-password" v-model="currentPassword" type="password"/>
    </div>
    <div class="form-group">
      <label for="current-password">New Password</label>
      <input id="current-password" v-model="newPassword" type="password"/>
    </div>
    <div class="form-group">
      <label for="current-password">New Password (again)</label>
      <input id="current-password" v-model="confirmNewPassword" type="password"/>
    </div>


    <ButtonAction button-text="Reset Password" @action="handlePasswordReset"/>
    <ul v-if="errors.length" class="error-message">
      <li v-for="msg in errors" :key="msg">{{ msg }}</li>
    </ul>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </form>
</template>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.error-message {
  color: var(--color-error-text);
}

.success-message {
  color: var(--color-button-primary);
}
</style>