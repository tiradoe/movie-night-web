<script lang="ts" setup>

import PageTitle from "~/components/common/page-title.vue";
import CreateListForm from "~/components/forms/create-list-form.vue";
import type {MovieList} from "~/types/movie-list";

const {data: lists, refresh, error} = await useApiData<MovieList[]>("/api/movielists")
if (error.value) {
  alert(error.value)
}

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
      <ul class="movie-list">
        <li v-for="list in lists"
            :key="list.id"
        >
          <NuxtLink :to="`/lists/${list.id}`" class="movielist-details">
            <span>{{ list.name }}</span>
            <span>{{ list.is_public ? 'Public' : 'Private' }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>

    <!-- <div class="w-full flex flex-col gap-5">
      <h2 class="text-2xl font-bold">Shared With You</h2>
      <ul class="w-full flex flex-col gap-3">
        <li class="flex justify-between items-center p-4 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors">
          <NuxtLink to="lists/2">Bob's MovieList</NuxtLink>
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

.movie-list {
  display: grid;
  gap: 1rem;
}

.movie-list li {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
}

.movielist-details {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  width: 100%;
}

.movie-list li:hover {
  background-color: #eee;
  padding: 1rem 0;
  border-radius: 0.5rem;
}

</style>