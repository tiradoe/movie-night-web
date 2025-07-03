<template>
  <div>
    <div id="add-list-container" class="my-5">
      <label class="text-md font-bold" for="add-list">Add List</label>
      <div class="flex">
        <input
          id="add-list"
          class="p-1 rounded-l"
          placeholder="List Title"
          type="text"
          v-on:keyup.enter="addList"
        />

        <button class="btn p-1 rounded-r" @click="addList">Add</button>
      </div>
    </div>
    <ul class="grid grid-rows gap-2">
      <li v-for="list in lists" class="movie-card p-3 neon-border">
        <span class="mb-2">{{ list.name }}</span> <br />
        <button
          class="btn mt-2 p-1 rounded"
          type="button"
          @click="deleteList(list.id)"
        >
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import type { MovieList } from "~/types/movielist";

const lists = defineModel<MovieList[]>("lists", { default: [] });

const addList = async function () {
  let config = useRuntimeConfig();
  let list_name = (document.getElementById("add-list") as HTMLInputElement)
    .value;

  if (!list_name) {
    alert("Please add list name.");
    return;
  }
  await $fetch<MovieList>(`${config.public.apiURL}/lists/`, {
    method: "POST",
    body: JSON.stringify({
      name: list_name,
      public: false,
    }),
    headers: {
      "Content-type": "application/json",
      Authorization: `Token ${useCookie("token").value}`,
    },
  })
    .then((data) => {
      lists.value = [...lists.value, data];
      (document.getElementById("add-list") as HTMLInputElement).value = "";
    })
    .catch((err) => console.log(err));
};
const deleteList = function (list_id: number) {
  const config = useRuntimeConfig();
  let confirmed = confirm("Delete list?");

  if (!confirmed) {
    return false;
  }

  $fetch(`${config.public.apiURL}/lists/${list_id}/`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Token ${useCookie("token").value}`,
    },
  })
    .then(() => {
      lists.value = lists.value.filter((list) => {
        return list.id !== list_id;
      });
    })
    .catch((err) => console.log(err));
};
const getLists = function () {
  const config = useRuntimeConfig();
  $fetch<MovieList[]>(`${config.public.apiURL}/lists`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Token ${useCookie("token").value}`,
    },
  })
    .then((data) => (lists.value = data))
    .catch((err) => console.log(err));
};

onMounted(() => {
  getLists();
});
</script>

<style scoped></style>
