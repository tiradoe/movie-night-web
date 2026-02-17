<script lang="ts" setup>

</script>

<template>
  <form class="profile-form">
    <div class="form-group">
      <label for="profile-first-name">First Name</label>
      <input id="profile-first-name" type="text"/>
    </div>

    <div class="form-group">
      <label for="profile-last-name">Last Name</label>
      <input id="profile-last-name" type="text"/>
    </div>

    <div class="form-group">
      <label for="profile-location">Location</label>
      <input id="profile-location" type="text"/>
    </div>

    <div class="form-group">
      <label for="profile-pic">Profile Picture</label>
      <input id="profile-pic" type="file"/>
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