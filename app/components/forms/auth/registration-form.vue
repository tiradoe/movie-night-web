<script lang="ts" setup>

const emits = defineEmits(['registered']);
const {register} = useAuth();

const username = ref("");
const email = ref("");

const handleRegistration = () => {
  register(email.value, username.value);
}

</script>

<template>
  <form class="password-form" @submit.prevent="handleRegistration">
    <div class="form-group">
      <label for="username">Username</label>
      <input id="username" v-model="username" type="text"/>
    </div>

    <div class="form-group">
      <label for="email">Email</label>
      <input id="email" v-model="email" type="email"/>
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