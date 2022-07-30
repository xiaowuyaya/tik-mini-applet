import { createSSRApp } from "vue";
import App from "./App.vue";
import uView from 'vk-uview-ui'
import * as Pinia from 'pinia';

export function createApp() {
  const app = createSSRApp(App);

  app.use(Pinia.createPinia());

  app.use(uView)

  return { app, Pinia };
}
