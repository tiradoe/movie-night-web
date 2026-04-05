<script lang="ts" setup>

import RegistrationForm from "~/components/forms/auth/registration-form.vue";

const showForm = ref(true);

definePageMeta({
  layout: 'auth'
})

const onRegistered = () => {
  showForm.value = false;
}
</script>

<template>
  <div class="content">
    <h1>Register</h1>
    <registration-form v-if="showForm" @registered="onRegistered"/>
    <div v-else>Registration successful! Check your email to set your password and log in.</div>
  </div>

</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

</style>