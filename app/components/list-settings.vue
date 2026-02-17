<script lang="ts" setup>
import type {List} from "~/types/list";
import {type ListSettings} from "~/types/list-settings";

const emit = defineEmits(['back-to-list'])
const props = defineProps<{
  list: List
}>()

const listSettings: ListSettings = {
  listName: 'My List',
  isPublic: true,
  collaborators: [
    {id: 1, name: 'Ed', role: 3},
    {id: 2, name: 'Bob', role: 2}
  ],
  roles: [
    {id: 1, name: 'Viewer'},
    {id: 2, name: 'Editor'},
    {id: 3, name: 'Admin'}
  ]
}
</script>

<template>
  <div class="settings-header">
    <div @click="$emit('back-to-list')">
      <Icon name="solar:arrow-left-linear"/>
      <span>Back to List</span>
    </div>
  </div>

  <ul class="settings-list">
    <li class="list-setting">
      <label for="list-name-input">List Name</label>

      <div>
        <input id="list-name-input" :value="listSettings.listName" type="text"/>
        <button>Save</button>
      </div>
    </li>
    <li class="list-setting">
      <div>
        <label for="make-list-public">Make list public</label>
        <input id="make-list-public" :checked="listSettings.isPublic" type="checkbox"/>
      </div>
    </li>
    <li class="list-setting collaborator-list">
      <span>Collaborators</span>
      <details>
        <summary>Permission levels</summary>

        <ul>
          <li>Viewer: Can view the list, but cannot make any changes.</li>
          <li>Editor: Can add/remove movies from the list.</li>
          <li>Admin: Can make any changes to the list including deleting it. Can also invite other users to collaborate
            on
            this list.
          </li>
        </ul>
      </details>

      <ul class="collaborators">
        <li v-for="collaborator in listSettings.collaborators" :key="collaborator.id">
          <span>{{ collaborator.name }}</span>
          <select v-model="collaborator.role">
            <option
                v-for="role in listSettings.roles"
                :value="role.id"
            >
              {{ role.name }}
            </option>
          </select>
        </li>
      </ul>
    </li>
    <li class="list-setting">
      <label for="invite-collaborators-input">Invite Collaborators</label>
      <textarea name="invite-collaborators-input" type="text"></textarea>
    </li>
    <li class="list-setting">
      <label for="delete-list-button">Delete List</label>
      <button name="delete-list-button">Delete</button>
    </li>
  </ul>
</template>

<style scoped>
.collaborator-list {
  gap: 1rem;
}

.collaborators li {
  display: flex;
  justify-content: space-between;
}

.list-setting {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  cursor: pointer;
}

.settings-header > div {
  display: flex;
  align-items: center;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.settings-list > li {
  display: flex;
  border: gray 1px solid;
  padding: 1rem;
}

details ul > li {
  padding: 1rem;
  border: black 1px solid;
}

details ul > li:not(:last-child) {
  border-bottom: none;
}
</style>