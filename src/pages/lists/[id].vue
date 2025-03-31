<template>
  <div v-if="list_id !== 0" class="p-5 sm:p-0">
    <Modal>
      <ShowMovie v-if="modal_movie" :movie="modal_movie"></ShowMovie>
    </Modal>
    <h2 class="text-xl font-bold pb-5">{{ list.name }}</h2>
    <div class="grid grid-cols-2 rounded movie-card neon-border p-5">
      <div>
        <ul class="flex flex-row">
          <li>
            <label class="mr-2" for="hide_scheduled">Hide Scheduled</label>
            <input
                @change="hideScheduled"
                v-model="hide_scheduled" id="hide_scheduled" type="checkbox"/>
          </li>
        </ul>
      </div>
      <input v-model="movie_query"
             class="p-1 rounded"
             placeholder="Filter Movies"
             type="text"
             @input="filterMovies"
      />
    </div>

    <!-- MOVIE LIST -->
    <ul class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-5">
      <li v-for="movie in filtered_movies" :key="movie.id" class="rounded movie-card neon-border">
        <!-- POSTER -->
        <img
            :data-src="movie.poster"
            alt="movie poster"
            class="lazyload p-3 movie-poster hover-pointer mx-auto"
            @click="showModal(movie)"
        />
        <div class="p-5 flex flex-col">
          <!-- TITLE -->
          <span class="font-bold text-center mb-1">{{ movie.title }}</span>
          <span v-if="logged_in" class="text-center hover-pointer" @click="removeMovie(movie.id)">
            X
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ShowMovie from "~/components/modal-content/ShowMovie.vue";
import 'lazysizes';

export default {
  name: "list",
  components: {ShowMovie},
  data: () => ({
    list_id: 0,
    list: [],
    modal_movie: null,
    movies: [],
    filtered_movies: [],
    movie_query: "",
    logged_in: false,
    hide_scheduled: false,
  }),
  methods: {
    getList: function (list_id) {
      let config = useRuntimeConfig()
      fetch(`${config.public.apiURL}/lists/${list_id}`, {
        method: "GET",
        headers: {"Content-type": "application/json"}
      })
          .then(response => response.json())
          .then(json => {
            this.list = json.list;
            this.movies = json.movies;
            this.filtered_movies = this.movies;
          })
          .catch(err => console.log(err))
    },
    hideScheduled: function() {
      if(this.hide_scheduled) {
        this.filtered_movies = this.movies.filter(movie => {
          return movie.last_watched === null
        });
      } else {
        this.filtered_movies = this.movies;
      }
    },
    removeMovie: function (movie_id) {
      let config = useRuntimeConfig()
      let confirmed = confirm("Remove movie from list?");

      if (!confirmed) {
        return false;
      }

      return fetch(`${config.public.apiURL}/movies/l/${this.list_id}/m/${movie_id}`, {
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "token": useCookie("token").value,
        }
      })
          .then(response => response.json())
          .then(_json => {
            this.filtered_movies = this.filtered_movies.filter((movie) => {
              return movie.id !== movie_id
            })
          })
          .catch(err => console.log(err));
    },
    filterMovies: function () {
      if (!this.movie_query) {
        this.filtered_movies = this.movies;
        return;
      }

      this.filtered_movies = this.movies.filter(movie => {
        return movie.title.toLowerCase()
            .search(this.movie_query.toLowerCase()) > -1
      });
    },
    showModal: function (movie) {
      this.modal_movie = movie;
      document.getElementById("movie-modal").classList.remove("hidden");
    },
  },
  mounted() {
    const route = useRoute();
    this.list_id = route.params.id
    this.getList(this.list_id)

    const token = useCookie("token").value;
    if (token) {
      this.logged_in = true;
    }
  }
}
</script>

<style scoped>

</style>