<template>
  <div>
    <LoadingIcon
      v-if="loading"
      class="w-full p-5 sm:p-0 max-w-2xl"
      show-quote="true"
    />

    <div v-if="lists.length < 1 && !loading" class="flex flex-col gap-10">
      <p>No lists found</p>
      <MovieQuote />
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

const lists = ref<MovieList[]>(new Array<MovieList>());
const loading = ref(true);

const updateLists = async function () {
  loading.value = true;
  let config = useRuntimeConfig();
  let headers: any = {
    "Content-type": "application/json",
  };

  if (typeof useCookie("token").value !== "undefined") {
    headers["Authorization"] = `Token ${useCookie("token").value}`;
  }

  await $fetch<MovieList[]>(`${config.public.apiURL}/lists`, {
    method: "GET",
    headers: headers,
  })
    .then((data) => {
      lists.value = data || new Array<MovieList>();
      loading.value = false;
    })
    .catch((err) => {
      if (err.statusCode === 401) {
        useCookie("token").value = null;
        navigateTo("/");
      }
    });
};

onMounted(() => {
  updateLists();
});
</script>

<style scoped></style>
