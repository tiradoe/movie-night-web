<template>
  <div class="grid grid-rows-2 text-center sm:text-left sm:grid-rows-none sm:grid-cols-2 my-5 navbar w-full">
    <NuxtLink class="block" to="/admin">
      <h1 class="block site-title bloodseeker">Cinema Corona</h1>
    </NuxtLink>

    <ul class="mt-3 sm:mt-0 justify-self-center sm:justify-self-end inline-flex space-x-5 bloodseeker leading-10">
      <li>
        <NuxtLink class="text-xl header-link" to="/lists">Lists</NuxtLink>
      </li>
      <li>
        <NuxtLink class="text-xl header-link" to="/schedule">Schedule</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "navbar",
}
</script>

<style scoped>

</style>