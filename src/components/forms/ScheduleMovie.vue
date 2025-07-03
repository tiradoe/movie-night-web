<template>
  <div>
    <form
      id="schedule-form"
      class="visually-hidden"
      method="post"
      onsubmit="return false"
    >
      <!-- SCHEDULE -->
      <label class="pb-1 text-start font-bold" for="schedule-date">Date</label
      ><br />
      <input
        id="schedule-input"
        class="rounded-l p-1"
        name="schedule-date"
        type="date"
      />
      <button
        class="btn mt-5 sm:mt-0 p-1 rounded sm:rounded-none sm:rounded-r"
        type="button"
        @click="schedule"
      >
        Schedule
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(["movie"]);
const emits = defineEmits(["closeModal"]);

const schedule = function (e: Event) {
  const config = useRuntimeConfig();
  e.preventDefault();

  let showtime_input = (
    document.getElementById("schedule-input") as HTMLInputElement
  ).value;

  if (!showtime_input) {
    alert("Please set showtime.");
    return false;
  }

  let date = new Date(`${showtime_input}T23:00:00`);
  convertToUserTimezone(date);

  fetch(`${config.public.apiURL}/showings/`, {
    method: "POST",
    body: JSON.stringify({
      schedule: 1,
      movie: props.movie.id,
      showtime: date.toISOString(),
      public: "False",
    }),
    headers: {
      "Content-type": "application/json",
      Authorization: `Token ${useCookie("token").value}`,
    },
  })
    .then((_resp) => {
      emits("closeModal");
    })
    .catch((err) => alert("Unable to schedule movie. Error:\n" + err));
};

// @todo pull the timezone from a user setting
const convertToUserTimezone = function (date: Date) {
  date.toLocaleString("en-US", { timeZone: "America/Chicago" });
};
</script>

<style scoped></style>
