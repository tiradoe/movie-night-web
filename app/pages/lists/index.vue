<script lang="ts" setup>

import PageTitle from "~/components/common/page-title.vue";
import CreateListForm from "~/components/forms/create-list-form.vue";
</script>

<template>
  <PageTitle title="Lists"/>

  <div class="content">
    <CreateListForm/>

    <div class="w-full flex flex-col gap-5">
      <h2 class="text-2xl font-bold">Your Lists</h2>
      <ul class="w-full flex flex-col gap-3">
        <li class="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors">
          <NuxtLink to="lists/1">List 1</NuxtLink>
        </li>
      </ul>
    </div>

    <div class="w-full flex flex-col gap-5">
      <h2 class="text-2xl font-bold">Shared With You</h2>
      <ul class="w-full flex flex-col gap-3">
        <li class="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors">
          <NuxtLink to="lists/2">Bob's List</NuxtLink>
        </li>
      </ul>
    </div>
  </div>

</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

</style>