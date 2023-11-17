import { createApp } from "vue";
import { createPinia } from "pinia";
import { initVeeValidate } from "./plugins/vee-validate";
import axios from "axios";

import App from "./App.vue";
import router from "./router";

import "./style.scss";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";

const app = createApp(App);

app.use(createPinia());
app.use(router);
initVeeValidate();

// Check if there is something in the LocalStorage
if (localStorage.getItem("token")) {
  axios.defaults.headers.common["x-access-token"] = `${localStorage.getItem(
    "token"
  )}`;
}

app.mount("#app");
