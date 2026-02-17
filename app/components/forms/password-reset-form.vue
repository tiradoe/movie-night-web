<script lang="ts" setup>

</script>

<template>
  <form class="password-form">
    <div class="form-group">
      <label for="current-password">Current Password</label>
      <input id="current-password" type="password"/>
    </div>

    <div class="form-group">
      <label for="new-password">New Password</label>
      <input id="new-password" type="password"/>
    </div>
  </form>
</template>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>