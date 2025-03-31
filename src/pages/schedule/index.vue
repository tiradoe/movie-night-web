<template>
  <div class="p-5 sm:p-0">
    <ul class="flex flex-col gap-5">
      <li v-for="showing in showings" class="p-5 movie-card neon-border">
        <div class="sm:grid grid-cols-2 lg:grid-cols-3">
          <img :src="showing.poster"
               alt="Movie Poster"
               class="mx-auto mb-5 sm:mb-0 sm:mx-0 neon-border bg-black schedule-poster"
          />

          <div class="self-center text-left">
            <h5 class="text-center sm:text-left mb-3 text-xl">{{ showing.title }}</h5>
            <h5 class="text-center sm:text-left mb-3">{{ formatDate(showing.showtime) }}</h5>
            <span class="">{{ showing.plot }}</span>
          </div>
        </div>
      </li>
    </ul>

    <!-- PREVIOUS SHOWINGS -->
    <div id="previous-showings" class="mt-5 list-group">
      <span class="block mb-5 hover-pointer underline" @click="getShowings(true)">
        Previous Showings
      </span>
      <span id="loader" class="hidden">Loading...</span>
      <ul class="flex flex-col gap-5">
        <li v-for="showing in previous_showings" class="p-5 movie-card neon-border">
          <div class="sm:grid grid-cols-2 lg:grid-cols-3">
            <img :src="showing.poster"
                 alt="Movie Poster"
                 class="mx-auto mb-5 sm:mb-0 sm:mx-0 neon-border bg-black schedule-poster"
            />

            <div class="self-center text-left">
              <h5 class="text-xl mb-3">{{ showing.title }}</h5>
              <h5 class="mb-3">{{ formatDate(showing.showtime) }}</h5>
              <span class="">{{ showing.plot }}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data: () => ({
    showings: [],
    previous_showings: [],
    got_previous: false,
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  }),
  methods: {
    formatDate: function (date_string) {
      console.log(date_string)
      let parsed_date = new Date(Date.parse(date_string));
      let month = this.months[parsed_date.getMonth()];

      return `${month} ${parsed_date.getDate()}, ${parsed_date.getFullYear()}`
    },
    getShowings: function (previous = false) {
      let config = useRuntimeConfig()
      if (this.got_previous) {
        return false;
      }

      document.getElementById("loader").classList.toggle("hidden")

      let params = "";
      if (previous) params = "?previous=true";

      return fetch(`${config.public.apiURL}/schedules/1${params}`, {
        method: "GET",
        headers: {"Content-type": "application/json"}
      })
          .then(response => response.json())
          .then(showings => {

            if (previous) {
              this.got_previous = true;
              this.previous_showings = showings;
            } else {
              this.showings = showings
            }
            document.getElementById("loader").classList.toggle("hidden")
          })
          .catch(err => console.log(err));

    }
  },
  mounted() {
    this.getShowings()
  }
}
</script>

<style scoped>

</style>