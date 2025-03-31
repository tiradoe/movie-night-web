<template>
  <form class="py-3 p-sm-0 align-items-center" @submit="findMovies">
    <label class="px-0 " for="search-field">Search</label>
    <div class="px-0 mx-0">
      <input id="search-field" class="p-1" name="search-field" type="text"/>
      <button class="btn p-1" type="button" @click="findMovies">Submit</button>
    </div>
  </form>
  <ul class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
    <li v-for="movie in movies" class="p-1 movie-card">
      <img :src="movie.Poster" alt="movie poster" class="neon-border hover-pointer" @click="$parent.showModal(movie)"/>
      <div class="p-2">
        <h5 class="text-center">{{ movie.Title }} {{ movie.year }}</h5>
      </div>
    </li>
  </ul>

</template>

<script>
export default {
  name: "search",
  data: () => ({
    movies: [],
  }),
  methods: {
    findMovies: function (e) {
      let config = useRuntimeConfig();
      e.preventDefault();
      let searchTerm = document.getElementById('search-field').value

      return fetch(`${config.public.apiURL}/movies/search/${searchTerm}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "token": useCookie("token").value,
        },
      })
          .then(response => response.json())
          .then(json => {
            this.movies = json;
          })
          .catch(err => console.log(err))
    },
  }
}
</script>

<style scoped>

</style>