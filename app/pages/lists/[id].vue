<script lang="ts" setup>
import PageTitle from "~/components/common/page-title.vue";
import {type Movie} from "~/types/movie";
import {type MovieList} from "~/types/movie-list";
import MovieDetails from "~/components/panels/movie-details.vue";
import MovieSearch from "~/components/panels/movie-search.vue";
import type {ResourceResponse} from "~/types/api";

const route = useRoute();

const movieListId = route.params.id as string;
const settingsActive = ref(false);
const movieSearchActive = ref(false);
const toggleSettings = () => settingsActive.value = !settingsActive.value
const toggleMovieSearch = () => movieSearchActive.value = !movieSearchActive.value

const selectedMovie = ref<Movie | null>(null);

const {data: listResponse} = await useApiData<ResourceResponse<MovieList>>(`/api/movielists/${movieListId}`, {
  onResponseError: (error) => {
    if (error.response.status === 401) {
      navigateTo('/auth/login')
    }

    if (error.response.status === 403 || error.response.status === 404) {
      navigateTo('/lists')
    }
  }
});

const isAdmin = computed(() => ['ADMIN', 'OWNER'].includes(listResponse.value.data.role));
const canEdit = computed(() => listResponse.value.data.role === 'EDITOR' || isAdmin.value);

const refreshList = (updatedList: MovieList) => {
  listResponse.value = {data: updatedList};
}

const updateList = (updatedList: MovieList) => {
  $api<ResourceResponse<MovieList>>(`/api/movielists/${route.params.id}`, {
    method: "PUT",
    body: updatedList
  }).then((response) => {
    listResponse.value = {data: response.data};
  }).catch((error) => {
    alert(error.message)
  });

}

const removeMovieFromList = (movieId: number) => {
  $api<ResourceResponse<MovieList>>(`/api/movielists/${listResponse.value.data.id}/movies/${movieId}`, {
    method: "DELETE"
  }).then((response) => {
    selectedMovie.value = null;
    listResponse.value.data = response.data;
  }).catch((error) => {
    alert(error.message)
  });
}

</script>

<template>
  <div v-if="listResponse" class="content">
    <div class="page-header">
      <PageTitle :title="listResponse.data.name"/>
      <Icon v-if="isAdmin" class="settings-icon" name="solar:settings-bold" @click="toggleSettings"/>
    </div>

    <ListSettings
        v-if="settingsActive"
        :list="listResponse.data"
        @back-to-list="toggleSettings"
        @update-list="updateList"
    />

    <MovieList
        v-else
        :can-edit="canEdit"
        :movies="listResponse.data.movies"
        @movie-clicked="selectedMovie = $event"
        @add-movie="toggleMovieSearch"
    />
  </div>

  <!-- MOVIE DETAILS SLIDEOUT -->
  <SlideoutPanel :open="!!selectedMovie" @close="selectedMovie = null">
    <MovieDetails v-if="selectedMovie" :can-edit="canEdit" :selectedMovie="selectedMovie"
                  @remove-movie="removeMovieFromList"/>
  </SlideoutPanel>

  <!-- MOVIE SEARCH SLIDEOUT -->
  <SlideoutPanel :open="movieSearchActive"
                 @close="movieSearchActive = false">
    <MovieSearch v-if="movieListId" :movie-list-id="movieListId" @add-movie="refreshList"/>
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