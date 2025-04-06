<template>
  <div>
    <div class="p-5 movie-card neon-border">
      <h3 class="bloodseeker mb-5">Login</h3>
      <form
        class="grid p-1 p-sm-5"
        method="post"
        name="login-form"
        v-on:keyup.enter="login"
      >
        <div class="mx-auto">
          <!-- USERNAME -->
          <div class="row pb-5">
            <label class="fw-bold pb-1 mx-0 px-0" for="username">Username</label
            ><br />
            <input
              id="username"
              class="p-2 rounded"
              placeholder="username"
              type="text"
            />
          </div>

          <!-- PASSWORD -->
          <div class="row">
            <label class="fw-bold pb-1 px-0" for="password">Password</label
            ><br />
            <input
              id="password"
              class="p-2 rounded"
              placeholder="password"
              type="password"
            />
          </div>
        </div>
        <!-- SUBMIT BUTTON -->
        <div class="mx-auto">
          <button class="btn my-5 p-3 rounded" type="button" @click="login">
            Submit
          </button>
        </div>
        <div class="mx-auto pt-5">
          <img
            id="password-incorrect"
            alt="password-incorrect"
            class="hidden"
            src="https://i.imgur.com/6pXxxyZ.gif"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  methods: {
    login: async function (e) {
      const config = useRuntimeConfig();
      e.preventDefault();
      document.getElementById("password-incorrect").classList.add("hidden");
      let username = document.getElementById("username").value;
      let password = document.getElementById("password").value;

      let response = await fetch(`${config.public.apiURL}/auth/login/`, {
        method: "POST",
        body: JSON.stringify({ username: username, password: password }),
        headers: { "Content-type": "application/json" },
      })
        .then((response) => {
          if (!response.ok) {
            document
              .getElementById("password-incorrect")
              .classList.remove("hidden");
            return false;
          }

          return response.json();

          //window.location = "/admin"
        })
        .catch((err) => {
          return false;
        });

      if (response) {
        let token = useCookie("token", {
          sameSite: "lax",
        });
        token.value = response.token;

        return navigateTo("/admin");
      }
    },
  },
  mounted() {
    let token = useCookie("token");
    if (token.value) {
      navigateTo("/admin");
    }
  },
};
</script>

<style scoped></style>
