import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import BaseDialog from "./components/UI/BaseDialog.vue";

const app = createApp(App);
app.component("base-dialog", BaseDialog);

app.use(router);
app.mount("#app");
