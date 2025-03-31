<template>
  <div>
    <ul>
      <li v-for="showing in showings" class="movie-card p-3 neon-border mb-2">
        <ul>
          <li class="pb-2">
            <span class="mb-3">{{ showing.title }}</span>
          </li>
          <li class="pb-2">
            <span class="mb-3">{{ formatDate(showing.showtime) }} </span>
          </li>
          <button class="btn p-1 rounded" type="button" @click="deleteShowing(showing.id)">Delete</button>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "showings",
  data: () => ({
    showings: [],
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  }),
  mounted() {
    this.getShowings()
  },
  methods: {
    formatDate: function (date_string) {
      let parsed_date = new Date(Date.parse(date_string));
      let month = this.months[parsed_date.getMonth()];

      return `${month} ${parsed_date.getDate()}, ${parsed_date.getFullYear()}`
    },
    deleteShowing: function (showing_id) {
      let config = useRuntimeConfig();
      let confirmed = confirm("Delete showing?");

      if (!confirmed) {
        return false;
      }

      return fetch(`${config.public.apiURL}/schedules/${showing_id}`, {
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "token": useCookie("token").value
        }
      })
          .then(response => response.json())
          .then(json => {
            this.showings = this.showings.filter((showing) => {
              return showing.id !== showing_id
            })
          });
    },
    getShowings: function (previous = false) {
      let config = useRuntimeConfig();
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
          })
          .catch(err => console.log(err));
    }
  }
}
</script>

<style scoped>

</style>