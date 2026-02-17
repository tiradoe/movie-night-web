<script lang="ts" setup>
import PageTitle from "~/components/common/page-title.vue";
import {type Movie} from "~/types/movie";
import {type List} from "~/types/list";
import MovieDetails from "~/components/panels/movie-details.vue";

const settingsActive = ref(false);
const movieSearchActive = ref(false);
const toggleSettings = () => settingsActive.value = !settingsActive.value
const toggleMovieSearch = () => movieSearchActive.value = !movieSearchActive.value

const selectedMovie = ref<Movie | null>(null);

const list: List = {
  id: 1,
  name: 'List Name',
  isPublic: true,
  listSettings: {
    listName: 'List Name',
    isPublic: true,
    collaborators: [],
    roles: []
  }
};

const movies: Movie[] = []
</script>

<template>
  <div class="page-header">
    <PageTitle title="List Name"/>
    <Icon class="settings-icon" name="solar:settings-bold" @click="toggleSettings"/>
  </div>

  <ListSettings
      v-if="settingsActive"
      :list="list"
      v-on:back-to-list="toggleSettings"
  />

  <MovieList
      v-else
      :movies="movies"
      @movie-clicked="selectedMovie = $event"
      @add-movie="toggleMovieSearch"
  />

  <SlideoutPanel :open="!!selectedMovie" @close="selectedMovie = null">
    <MovieDetails v-if="selectedMovie" :selectedMovie="selectedMovie"/>
  </SlideoutPanel>

  <SlideoutPanel :open="movieSearchActive" class="movie-search-panel"
                 @close="movieSearchActive = false">
    <p>Movie Search</p>
  </SlideoutPanel>

</template>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.settings-icon {
  cursor: pointer;
  font-size: 1.5rem;
}
</style>