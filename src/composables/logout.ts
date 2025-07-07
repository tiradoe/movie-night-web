import { useCookie } from "#app";

export function logout() {
  let config = useRuntimeConfig();
  fetch(`${config.public.apiURL}/auth/logout/`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Token ${useCookie("token").value}`,
    },
  })
    .then((response) => response)
    .then((_json) => {
      let token = useCookie("token");
      token.value = null;
      navigateTo("/");
    })
    .catch((err) => console.log(err));
}

onMounted(() => {
  const token = useCookie("token").value;
  if (!token) {
    navigateTo("/");
  }
});
