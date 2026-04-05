<script lang="ts" setup>
const emit = defineEmits(['refreshLists']);
const refreshLists = () => emit('refreshLists');
const listName = ref("");

const createList = () => {
  $api('/api/movielists', {
    body: {
      name: listName.value,
    },
    method: "POST"
  }).then(() => {
    listName.value = "";
    refreshLists();
  }).catch((error) => {
    alert(error.message)
  });
}
</script>

<template>
  <form @submit.prevent="createList">
    <label for="list_name">Add MovieList</label>
    <div class="form-group">
      <input v-model="listName"
             name="list_name"
             placeholder="MovieList Name"
             type="text">
      <button>Add</button>
    </div>
  </form>
</template>
<style scoped>

form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

button {
  background-color: #4caf50;
  color: white;
  padding: .5rem 1rem;
  border: none;
  border-radius: 0 4px 4px 0;
}

input {
  padding: .5rem;
  border: 1px solid #ccc;
  border-right: none;
  border-radius: 4px 0 0 4px;
}

label {
  font-weight: bold;
}

</style>