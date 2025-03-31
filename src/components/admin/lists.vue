<template>
  <div>
    <div id="add-list-container" class="my-5">
      <label class="text-md font-bold" for="add-list">Add List</label>
      <div class="flex">
        <input id="add-list" class="p-1 rounded-l" placeholder="List Title" type="text" v-on:keyup.enter="addList"/>

        <button class="btn p-1 rounded-r" @click="addList">Add</button>
      </div>
    </div>
    <ul class="grid grid-rows gap-2">
      <li v-for="list in lists" class="movie-card p-3 neon-border">
        <span class="mb-2">{{ list.name }}</span> <br/>
        <button class="btn mt-2 p-1 rounded" type="button" @click="deleteList(list.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "lists",
  data: () => ({
    lists: [],
  }),
  methods: {
    addList: async function () {
      let config = useRuntimeConfig();
      const list_name = document.getElementById("add-list").value;
      if (!list_name) {
        alert("Please add list name.");
        return
      }
      let list_json = await fetch(`${config.public.apiURL}/lists`, {
        method: "POST",
        body: JSON.stringify({
          name: list_name,
          public: false
        }),
        headers: {
          "Content-type": "application/json",
          "token": useCookie("token").value,
        }
      })
          .then(response => response.json())
          .then(json => json)
          .catch(err => console.log(err))

      list_json.list.movie_count = 0;
      this.lists.push(list_json.list);
    },
    deleteList: function (list_id) {
      const config = useRuntimeConfig();
      let confirmed = confirm("Delete list?");

      if (!confirmed) {
        return false;
      }

      return fetch(`${config.public.apiURL}/lists/${list_id}`, {
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "token": useCookie("token").value,
        }
      })
          .then(response => response.json())
          .then(_json => {
            window.location.reload();
          });
    },
    getLists: function () {
      const config = useRuntimeConfig();
      fetch(`${config.public.apiURL}/lists`, {
        method: "GET",
        headers: {"Content-type": "application/json"}
      })
          .then(response => response.json())
          .then(json => this.lists = json)
          .catch(err => console.log(err))
    },
  },
  mounted() {
    this.getLists();
  }
}
</script>

<style scoped>

</style>