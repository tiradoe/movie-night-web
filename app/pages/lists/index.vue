<script lang="ts" setup>

import PageTitle from "~/components/common/page-title.vue";
import CreateListForm from "~/components/forms/create-list-form.vue";
import type {List} from "~/types/list";

const {data: lists, refresh} = await useApiData<List[]>("/api/movielists")

const refreshLists = () => {
  refresh()
}

</script>

<template>
  <PageTitle title="Lists"/>

  <div class="content">
    <CreateListForm @refreshLists="refreshLists"/>

    <div class="w-full flex flex-col gap-5">
      <h2 class="text-2xl font-bold">Your Lists</h2>
      <ul class="w-full flex flex-col gap-3">
        <li v-for="list in lists"
            :key="list.id"
            class="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors">
          <NuxtLink :to="`lists/${list.id}`">{{ list.name }}</NuxtLink>
        </li>
      </ul>
    </div>

    <!-- <div class="w-full flex flex-col gap-5">
      <h2 class="text-2xl font-bold">Shared With You</h2>
      <ul class="w-full flex flex-col gap-3">
        <li v-for="list in lists.share" class="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors">
          <NuxtLink to="lists/2">Bob's List</NuxtLink>
        </li>
      </ul>
    </div>
    -->
  </div>

</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

</style>