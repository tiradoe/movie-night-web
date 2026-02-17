<script lang="ts" setup>

import PageTitle from "~/components/common/page-title.vue";
import PasswordResetForm from "~/components/forms/password-reset-form.vue";
import ProfileForm from "~/components/forms/profile-form.vue";
</script>

<template>
  <PageTitle title="Account Settings"/>

  <div class="password-settings settings-section">
    <h2>Reset Password</h2>
    <PasswordResetForm/>


  </div>

  <div class="profile-settings settings-section">
    <div class="profile-header">
      <h2>Profile</h2>
      <span class="public-profile-link">View Public Profile</span>
    </div>

    <ProfileForm/>
  </div>

</template>

<style scoped>

.profile-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.public-profile-link {
  color: #007bff;
  text-decoration: underline;
  cursor: pointer;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem 0;
}

.settings-section {
  margin: 2rem 0;
}

</style>