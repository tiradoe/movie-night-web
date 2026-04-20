<script lang="ts" setup>
import type {MovieList} from "~/types/movie-list";
import Card from "~/components/common/card.vue";
import InputAction from "~/components/common/input-action.vue";
import ButtonAction from "~/components/common/button-action.vue";
import type {Role} from "~/types/role";
import type {ResourceResponse} from "~/types/api";
import type {User} from "~/types/user";

const emits = defineEmits(['back-to-list', 'update-list'])
const props = defineProps<{
  list: MovieList
}>()

const localName = ref(props.list.name)

const collaboratorInvites = ref("");
const responseMessage = ref("");
type BasicResponse = {
  message: string
}
const sendInvites = () => {
  $api<BasicResponse>(`/api/invitations/`, {
    method: 'POST',
    body: {
      emails: collaboratorInvites.value.split(',').map(email => email.trim()),
      movie_list_id: props.list.id
    }
  }).then((response) => {
    collaboratorInvites.value = "";
    responseMessage.value = response.message;
  })
}

const updateCollaboratorRole = (collaborator: User) => {
  $api<ResourceResponse<MovieList>>(`/api/movielists/${props.list.id}/collaborators/${collaborator.id}/`, {
    method: 'PATCH',
    body: {
      role_id: collaborator.role
    }
  }).then((response) => {
    emits('update-list', response.data)
  })
}

const deleteList = () => {
  if (!confirm("Are you sure you want to delete this list?")) return

  $api(`/api/movielists/${props.list.id}`, {
    method: 'DELETE',
  }).then(() => {
    navigateTo('/lists')
  })
}

const roles = ref<Role[]>([])

const isOwner = computed(() => props.list.role === 'OWNER');

const getRoles = () => {
  return $api<ResourceResponse<Role[]>>(`/api/roles`, {
    method: 'GET'
  }).then((response) => {
    roles.value = response.data
  }).catch((error) => {
    alert(error.message)
  })
}

getRoles()
</script>

<template>
  <Card class="card">
    <div class="settings-header">
      <div @click="$emit('back-to-list')">
        <Icon name="solar:arrow-left-linear"/>
        <span class="back-to-list">Back to MovieList</span>
      </div>
    </div>

    <ul class="settings-list">
      <li class="list-setting">
        <label for="list-name-input">MovieList Name</label>
        <InputAction
            v-model="localName"
            buttonText="Save"
            inputName="list-name-input"
            placeholder="List Name"
            @action="$emit('update-list', { ...list, name: localName })"
        />
      </li>
      <li class="list-setting-row">
        <label for="make-list-public">Make list public</label>
        <input id="make-list-public" :checked="list.is_public" type="checkbox"
               @change="$emit('update-list', { ...list, is_public: ($event.target as HTMLInputElement).checked })"/>
      </li>
      <li class="list-setting collaborator-list">
        <span>Collaborators</span>
        <details>
          <summary>Permission levels</summary>
          <ul>
            <li v-for="role in roles">
              {{ role.display_name }}: {{ role.description }}
            </li>
          </ul>
        </details>

        <div v-if="!list.collaborators?.length">No collaborators found</div>
        <ul v-else class="collaborators">
          <li v-for="collaborator in list.collaborators" :key="collaborator.id">
            <span>{{ collaborator.username }}</span>
            <select v-model="collaborator.role" @change="updateCollaboratorRole(collaborator)">
              <option
                  v-for="role in roles"
                  :value="role.id"
              >
                {{ role.display_name }}
              </option>
            </select>
          </li>
        </ul>
      </li>
      <li class="list-setting">
        <form class="list-setting" @submit.prevent="sendInvites">
          <label for="invite-collaborators-input">Invite Collaborators</label>
          <textarea v-model="collaboratorInvites" name="invite-collaborators-input" type="text"></textarea>
          <button>Send Invites</button>
          <span v-if="responseMessage">{{ responseMessage }}</span>
        </form>
      </li>
      <li v-if="isOwner" class="list-setting">
        <label for="delete-list-button">Delete MovieList</label>
        <ButtonAction button-color="danger" button-text="Delete" @action="deleteList"/>
      </li>
    </ul>
  </Card>
</template>

<style scoped>
select {
  padding: 0.5rem;
}

.back-to-list:hover {
  text-decoration: underline;
}

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

.list-setting > button {
  background-color: var(--color-button-primary, #4caf50);
  color: white;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.list-setting-row {
  display: flex;
  gap: 1rem;
}

.settings-header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
}

.settings-header > div {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.settings-list > li {
  display: flex;
  border: rgba(0, 0, 0, 0.2) 1px solid;
  padding: 1rem;
}

summary {
  cursor: pointer;
}

details ul > li {
  padding: 1rem;
  border: rgba(0, 0, 0, 0.3) 1px solid;
}

details ul > li:not(:last-child) {
  border-bottom: none;
}


</style>