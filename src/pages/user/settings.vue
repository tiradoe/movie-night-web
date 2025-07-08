<script lang="ts" setup>
import PasswordResetForm from "~/components/forms/PasswordReset.vue";

const timezones = Intl.supportedValuesOf("timeZone");
</script>

<template>
  <div>
    <h2 class="page-header">Settings</h2>

    <div class="movie-card neon-border">
      <form action="#" class="flex flex-col gap-5">
        <label class="text-bold text-xl" for="site-name">Site Name</label>
        <input
          id="site-name"
          class="p-3"
          name="site-name"
          placeholder="Movie Night"
          type="text"
        />

        <h3 class="text-bold text-xl">Locale</h3>
        <!--SET TIMEZONE -->
        <div class="flex flex-col gap-2">
          <label for="timezone">Timezone</label>
          <select id="timezone" name="timezone">
            <option v-for="timezone in timezones" :value="timezone">
              {{ timezone }}
            </option>
          </select>
        </div>

        <hr class="my-5 neon-border" />

        <PasswordResetForm />
      </form>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  padding: 2em;
}

#timezone {
  color: black;
  padding: 1em;
}
</style>
