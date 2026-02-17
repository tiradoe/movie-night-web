<script lang="ts" setup>

</script>

<template>
  <form>
    <label for="list_name">Add List</label>
    <div>
      <input class="" name="list_name"
             placeholder="List Name"
             type="text">
      <button>Add</button>
    </div>
  </form>
</template>
<style scoped>
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

</style>