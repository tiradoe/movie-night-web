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
          <button
            class="btn p-1 rounded"
            type="button"
            @click="deleteShowing(showing.id)"
          >
            Delete
          </button>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { Showing } from "~/types/showing";
import { useCookie } from "#app";
import type { Schedule } from "~/types/schedule";
import { $fetch } from "ofetch";

const showings = ref<Showing[]>([]);
const previous_showings = ref<Showing[]>([]);
const got_previous = ref(false);

onMounted(() => {
  getShowings();
});

const formatDate = function (date_string: string) {
  let parsed_date = new Date(Date.parse(date_string));
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[parsed_date.getMonth()];

  return `${month} ${parsed_date.getDate()}, ${parsed_date.getFullYear()}`;
};

const deleteShowing = function (showing_id: number) {
  let config = useRuntimeConfig();
  let confirmed = confirm("Delete showing?");

  if (!confirmed) {
    return false;
  }

  fetch(`${config.public.apiURL}/showings/${showing_id}/`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Token ${useCookie("token").value}`,
    },
  })
    .then((_json) => {
      showings.value = showings.value.filter((showing) => {
        return showing.id !== showing_id;
      });
    })
    .catch((err) => console.log(err));
};

const getShowings = function (previous = false) {
  let config = useRuntimeConfig();
  let params = "";
  if (previous) params = "?previous=true";

  $fetch<Schedule>(`${config.public.apiURL}/schedules/1${params}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Token ${useCookie("token").value}`,
    },
  })
    .then((data) => {
      if (previous) {
        got_previous.value = true;
        previous_showings.value = data.showings;
      } else {
        showings.value = data.showings;
      }
    })
    .catch((err) => {
      if (err.statusCode === 401) {
        useCookie("token").value = null;
        navigateTo("/");
      }
    });
};
</script>

<style scoped></style>
