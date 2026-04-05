<script lang="ts" setup>

const route = useRoute();

const token = route.params.token as string;
let isAuthorized = ref(false);
let isProcessed = ref(false);
let failed = ref(false);

enum InviteStatusEnum {
  PENDING = "pending",
  ACCEPTED = "accepted",
  DECLINED = "declined",
  NOT_FOUND = "not_found",
  FAILED = "failed",
}

type InviteStatus = {
  message: string
  status: InviteStatusEnum
}

// check if the email from the invite has an existing user
const acceptInvitation = () => {
  $api<InviteStatus>(`/api/invitations/${token}/accept`, {
    method: "GET",
    onResponseError({response}) {
      if (response.status === 401) {
        isAuthorized.value = false
        isProcessed.value = true
        return;
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

  <div v-if="!isAuthorized && !isProcessed  && !failed">
    <span>Processing...</span>
  </div>
  <div v-else-if="!isAuthorized && isProcessed && !failed">
    <span>You need to <NuxtLink to="/auth/login">log in</NuxtLink> or <NuxtLink
        to="/auth/register">create an account</NuxtLink></span>
  </div>

  <div v-show="failed">
    <span>An error occurred while accepting the request.</span>
  </div>
</template>

<style scoped>

</style>