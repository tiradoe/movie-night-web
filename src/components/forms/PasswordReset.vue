<script lang="ts" setup>
import FormButton from "~/components/common/ui/FormButton.vue";
</script>

<template>
  <h3 class="text-bold text-xl">Reset Password</h3>
  <div class="flex flex-col gap-2">
    <div class="flex flex-col gap-2">
      <label for="old_password">Old Password</label>
      <input id="old_password" class="p-3" name="password" type="password" />
    </div>
  </div>

  <div class="flex flex-col gap-2">
    <label for="password">New Password</label>
    <input id="password" class="p-3" name="password" type="password" />
  </div>
  <FormButton>Update Password</FormButton>
</template>

<style scoped></style>
