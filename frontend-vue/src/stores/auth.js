import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", () => {
  const errors = ref({});
  const user = ref({});
  const isAuthenticated = ref(localStorage.getItem("token"));

  function setAuth(authUser) {
    isAuthenticated.value = true;
    user.value = authUser;
    errors.value = {};
    localStorage.setItem("token", user.value.accessToken);
  }

  function setError(error) {
    errors.value = { ...error };
  }

  function purgeAuth() {
    isAuthenticated.value = false;
    user.value = {};
    errors.value = [];
    localStorage.removeItem("token");
  }

  function signin(credentials) {
    return axios
      .post("api/auth/signin", credentials)
      .then(({ data }) => {
        setAuth(data);
        axios.defaults.headers.common["x-access-token"] = `${data.accessToken}`;
      })
      .catch(({ response }) => {
        if (!response?.data) {
          setError({ message: response.statusText });
        } else {
          setError(response.data);
        }
      });
  }

  function signup(credentials) {
    return axios
      .post("api/auth/signup", credentials)
      .then()
      .catch(({ response }) => {
        if (!response?.data) {
          setError({ message: response.statusText });
        } else {
          setError(response.data);
        }
      });
  }

  function logout() {
    purgeAuth();
    delete axios.defaults.headers.common["x-access-token"];
  }

  // function verifyAuth() {
  //   if (JwtService.getToken()) {
  //     ApiService.setHeader();
  //     ApiService.get("api/auth", "check")
  //       .then(({ data }) => {
  //         setAuth(data.data);
  //       })
  //       .catch(({ response }) => {
  //         setError(response.data.errors);
  //         purgeAuth();
  //       });
  //   } else {
  //     purgeAuth();
  //   }
  // }

  return {
    errors,
    user,
    isAuthenticated,
    signin,
    signup,
    logout,
    // verifyAuth,
  };
});
