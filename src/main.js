import { createApp } from "vue";
import App from "./App.vue";
import UIComponents from '@/components/UI'
import directives from '@/directives'
import router from '@/router/router'
import store from '@/store'

const app = createApp(App)

UIComponents.forEach((component) => {
  app.component(component.name, component)
})

directives.forEach((directive) => {
  app.directive(directive.name, directive)
})

app.use(router)
app.use(store)
app.mount("#app")
