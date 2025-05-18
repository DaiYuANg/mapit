import MyButton from './components/HelloWorld.vue'
import type {App} from 'vue'

export {MyButton}

export default {
  install(app: App) {
    app.component('MyButton', MyButton)
  }
}