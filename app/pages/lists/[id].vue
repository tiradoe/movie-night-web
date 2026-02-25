<script lang="ts" setup>
import PageTitle from "~/components/common/page-title.vue";
import {type Movie} from "~/types/movie";
import {type MovieList} from "~/types/movie-list";
import MovieDetails from "~/components/panels/movie-details.vue";
import MovieSearch from "~/components/panels/movie-search.vue";

const route = useRoute();

const movieListId = route.params.id as string;
const settingsActive = ref(false);
const movieSearchActive = ref(false);
const toggleSettings = () => settingsActive.value = !settingsActive.value
const toggleMovieSearch = () => movieSearchActive.value = !movieSearchActive.value

const selectedMovie = ref<Movie | null>(null);

const {data: list} = await useApiData<MovieList>(`/api/movielists/${movieListId}`);

const updateList = (updatedList: MovieList) => {
  list.value = updatedList;
}

const removeMovieFromList = (movieId: number) => {
  $api<MovieList>(`/api/movielists/${list.value.id}/movies/${movieId}`, {
    method: "DELETE"
  }).then((data) => {
    selectedMovie.value = null;
    list.value = data;
  }).catch((error) => {
    alert(error.message)
  });
}
///const list: MovieList = {
///  id: 1,
///  name: 'MovieList Name',
///  isPublic: true,
///  listSettings: {
///    listName: 'MovieList Name',
///    isPublic: true,
///    collaborators: [],
///    roles: []
///  }
///};

const movies: Movie[] = []
</script>

<template>
  <div v-if="list">
    <div class="page-header">
      <PageTitle :title="list.name"/>
      <Icon class="settings-icon" name="solar:settings-bold" @click="toggleSettings"/>
    </div>

    <ListSettings
        v-if="settingsActive"
        :list="list"
        v-on:back-to-list="toggleSettings"
    />

    <MovieList
        v-else
        :movies="list.movies"
        @movie-clicked="selectedMovie = $event"
        @add-movie="toggleMovieSearch"
    />
  </div>

  <SlideoutPanel :open="!!selectedMovie" @close="selectedMovie = null">
    <MovieDetails v-if="selectedMovie" :selectedMovie="selectedMovie" @remove-movie="removeMovieFromList"/>
  </SlideoutPanel>

  <SlideoutPanel :open="movieSearchActive"
                 @close="movieSearchActive = false">
    <MovieSearch v-if="movieListId" :movie-list-id="movieListId" @add-movie="updateList"/>
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