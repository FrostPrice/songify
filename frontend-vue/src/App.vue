<template>
  <!-- <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top m-10"> -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark m-10">
    <div class="container-fluid">
      <div>
        <RouterLink class="navbar-brand" to="/">Catalogo de Músicas</RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExampleDefault"
          aria-controls="navbarsExampleDefault"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <RouterLink class="nav-link" to="/"
                >Home
                <span
                  class="sr-only"
                  v-show="$router.currentRoute.value.fullPath === '\/'"
                  >(Atual)</span
                ></RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/artists"
                >Artistas
                <span
                  class="sr-only"
                  v-show="$router.currentRoute.value.fullPath === '\/artists'"
                  >(Atual)</span
                ></RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/albums"
                >Albuns
                <span
                  class="sr-only"
                  v-show="$router.currentRoute.value.fullPath === '\/albums'"
                  >(Atual)</span
                ></RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/musics"
                >Músicas
                <span
                  class="sr-only"
                  v-show="$router.currentRoute.value.fullPath === '\/musics'"
                  >(Atual)</span
                ></RouterLink
              >
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/genres"
                >Gêneros
                <span
                  class="sr-only"
                  v-show="$router.currentRoute.value.fullPath === '\/genres'"
                  >(Atual)</span
                ></RouterLink
              >
            </li>
            <!-- <li class="nav-item">
              <RouterLink class="nav-link" to="/users"
                >Usuários
                <span
                  class="sr-only"
                  v-show="$router.currentRoute.value.fullPath === '\/users'"
                  >(Atual)</span
                ></RouterLink
              >
            </li> -->
          </ul>
        </div>
      </div>

      <div class="navbar-nav">
        <RouterLink to="/signup" class="text-green nav-link"
          >Cadastro</RouterLink
        >
        <div v-if="!computedIsAuthenticated">
          <RouterLink to="/signin" class="nav-link">Login</RouterLink>
        </div>
        <div v-else>
          <button @click="logout" class="text-danger nav-link">Logout</button>
        </div>
      </div>
    </div>
  </nav>
  <main role="main" class="container p-5">
    <RouterView />
  </main>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useAuthStore } from "./stores/auth";
import { useRouter } from "vue-router";

export default defineComponent({
  // eslint-disable-next-line vue/multi-word-component-names
  name: "app",

  setup() {
    const storeAuth = useAuthStore();
    const router = useRouter();

    const logout = async () => {
      await storeAuth.logout();
      router.push({ path: "/" });
    };

    const computedIsAuthenticated = computed(() => {
      return storeAuth.isAuthenticated;
    });

    return { computedIsAuthenticated, logout };
  },
});
</script>
