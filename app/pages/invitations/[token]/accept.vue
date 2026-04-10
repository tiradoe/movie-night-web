<script lang="ts" setup>

import type {InviteStatus} from "~/types/invitation-status";

definePageMeta({
  layout: 'auth'
})
const route = useRoute();

const token = route.params.token as string;
let isAuthorized = ref(false);
let isProcessed = ref(false);
let failed = ref(false);
let errorMessage = ref("An error occurred while accepting the request.");


const acceptInvitation = () => {
  $api<InviteStatus>(`/api/invitations/${token}/accept`, {
    method: "GET",
    onResponseError({response}) {
      if (response.status === 401) {
        isAuthorized.value = false
        isProcessed.value = true
        return;
      } else if (response.status === 404) {
        errorMessage.value = "Invitation not found."
        isProcessed.value = true
      }

      failed.value = true;
      return;
    }
  }).then((invitationStatus) => {
    navigateTo('/lists')
  })
}

acceptInvitation();
</script>

<template>
  <div class="content">
    <div v-if="!isAuthorized && !isProcessed  && !failed">
      <span class="status-message">Checking your invitation...</span>
    </div>
    <div v-else-if="!isAuthorized && isProcessed && !failed" class="auth-message">
      <span>You'll need to <NuxtLink class="link" to="/auth/login">log in</NuxtLink> or
      <NuxtLink class="link" to="/auth/register">create an account</NuxtLink> to view this list.</span>
      <span>If you're creating a new account, be sure to use the email address where you received this invitation.</span>
    </div>

    <div v-show="failed">
      <span>{{ errorMessage }}</span>
    </div>
  </div>
</template>

<style scoped>
.auth-message {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1rem;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
}

.link {
  text-decoration: underline;
  color: #007bff;
  cursor: pointer;
}

.link:hover {
  color: #0056b3;
}

</style>