<script lang="ts" setup>
import NewPasswordForm from "~/components/forms/auth/new-password-form.vue";

definePageMeta({
  layout: 'auth'
})

const route = useRoute();

const passwordResetToken = route.params.token as string;
const email = route.query.email as string;
</script>

<template>
  <div class="content">
    <h1>Reset Your Password</h1>
    <new-password-form :email="email" :token="passwordResetToken"/>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  gap: 2rem;
}

</style>