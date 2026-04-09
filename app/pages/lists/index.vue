<script lang="ts" setup>

import PageTitle from "~/components/common/page-title.vue";
import CreateListForm from "~/components/forms/create-list-form.vue";
import Card from "~/components/common/card.vue";
import type {MovieListGroup} from "~/types/movie-list-group";

const {data: listGroup, refresh, error} = await useApiData<MovieListGroup>("/api/movielists")
if (error.value) {
  alert(error.value)
}

const refreshLists = () => {
  refresh()
}

</script>

<template>
  <div class="content">
    <PageTitle title="Lists"/>
    <Card class="card">

      <div class="user-list-container">
        <h2 class="">Your Lists</h2>
        <span v-if="!listGroup?.movie_lists?.length" class="not-found-message">No lists found.</span>
        <ul v-else class="movie-list">
          <li v-for="list in listGroup?.movie_lists"
              :key="list.id"
          >
            <NuxtLink :to="`/lists/${list.id}`" class="movielist-details">
              <span>{{ list.name }}</span>
              <span>{{ list.is_public ? 'Public' : 'Private' }}</span>
            </NuxtLink>
          </li>
        </ul>
        <CreateListForm @refreshLists="refreshLists"/>
      </div>

      <div>
        <h2>Shared With You</h2>
        <span v-if="!listGroup?.shared_lists?.length" class="not-found-message">No shared lists found.</span>
        <ul v-else class="movie-list">
          <li v-for="list in listGroup?.shared_lists"
              :key="list.id"
          >
            <NuxtLink :to="`/lists/${list.id}`" class="movielist-details">
              <span>{{ list.name }}</span>
              <span>{{ list.is_public ? 'Public' : 'Private' }}</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </Card>
  </div>

</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.movie-list {
  display: grid;
}

.movie-list li {
  display: flex;
  justify-content: space-between;
  margin: 0 -1rem;
  border-radius: 0.5rem;
  padding: 1rem;
}

.movielist-details {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  width: 100%;
}

.movie-list li:hover {
  background-color: #eee;
}

.not-found-message {
  display: block;
  padding: 1em 0;
}

.user-list-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

</style>