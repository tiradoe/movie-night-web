<template>
  <div class="p-5 sm:p-0">
    <div v-if="lists.length < 1">
      <p>No lists found</p>
    </div>
    <ul class="grid grid-cols-2 gap-3 mt-5">
      <li v-for="list in lists" class="movie-card neon-border p-5 rounded">
        <div class="grid grid-rows-2 gap-3">
          <NuxtLink :to="`/lists/${list.id}`" class="underline">
            <h2 class="text-lg">{{ list.name }}</h2>
          </NuxtLink>
          <span>Movies: {{ list.movie_count || 0 }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { MovieList } from "~/types/movielist";
import { useCookie } from "#app";

const lists = defineModel<MovieList[]>("movie_list", { default: [] });
const updateLists = async function () {
  let config = useRuntimeConfig();
  let headers: any = {
    "Content-type": "application/json",
  };

  if (typeof useCookie("token").value !== "undefined") {
    headers["Authorization"] = `Token ${useCookie("token").value}`;
  }

  const { data, error } = await useFetch<MovieList[]>(
    `${config.public.apiURL}/lists`,
    {
      method: "GET",
      headers: headers,
    },
  );

  if (error.value) {
    if (error.value.statusCode === 401) {
      navigateTo("/");
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
