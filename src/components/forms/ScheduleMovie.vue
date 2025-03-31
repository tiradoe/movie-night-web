<template>
  <div>
    <form id="schedule-form" class="visually-hidden" method="post" onsubmit="return false">
      <!-- SCHEDULE -->
      <label class="pb-1 text-start font-bold" for="schedule-date">Date</label><br/>
      <input id="schedule-input" class="rounded-l p-1" name="schedule-date"
             type="date"/>
      <button class="btn mt-5 sm:mt-0 p-1 rounded sm:rounded-none sm:rounded-r" type="button" @click="schedule">Schedule
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "ScheduleMovie",
  methods: {
    schedule: function (e) {
      const config = useRuntimeConfig();
      e.preventDefault();

      let showtime_input = document.getElementById("schedule-input").value;
      if (!showtime_input) {
        alert("Please set showtime.");
        return false;
      }
      let showtime = showtime_input + " " + "00:00:00";

      fetch(`${config.public.apiURL}/schedules/movie`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          "schedule_id": 1,
          "movie_id": this.movie.id,
          "showtime": showtime,
          "owner": 1,
          "public": false
        }),
        headers: {
          "Content-type": "application/json",
          "token": useCookie("token").value,
        }
      })
          .then(response => response.json())
          .then(_json => {
                this.$parent.$parent.closeModal();
              }
          )
          .catch(err => alert("Unable to schedule movie. Error:\n" + err))
    }
  },
  props: ["movie"]
}
</script>

<style scoped>

</style>