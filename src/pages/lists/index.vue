<template>
  <div class="p-5 sm:p-0">
    <ul class="grid grid-cols-2 gap-3 mt-5">
      <li v-for="list in lists" class="movie-card neon-border p-5 rounded">
        <div class="grid grid-rows-2 gap-3">
          <NuxtLink :to="`/lists/${list.id}`" class="underline">
            <h2 class="text-lg">{{ list.name }}</h2>
          </NuxtLink>
          <span>Movies: {{ list.movie_count }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { MovieList } from "~/types/movielist";

const lists = defineModel<MovieList[]>("movie_list", { default: [] });
const updateLists = async function () {
  let config = useRuntimeConfig();
  const { data, status, error } = await useFetch<MovieList[]>(
    `${config.public.apiURL}/lists`,
    {
      method: "GET",
      headers: { "Content-type": "application/json" },
    },
  );

  if (error) {
    if (error.value?.statusCode === 401) {
      console.log("unauthorized");
    }
  } else {
    lists.value = data.value || [];
  }
};

onMounted(() => {
  updateLists();
});
</script>

<style scoped></style>
