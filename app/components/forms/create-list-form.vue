<script lang="ts" setup>
import InputAction from "~/components/common/input-action.vue";

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
    <label for="list_name">Add List</label>
    <InputAction
        v-model="listName"
        :buttonText="'Add'"
        :inputName="'list_name'"
        :placeholder="'List Name'"
    />
  </form>
</template>
<style scoped>

form {
  display: flex;
  flex-direction: column;
}


label {
  font-weight: bold;
}


</style>