import { App } from 'vue'
import Component from './List.vue'

Component.install = (Vue: App) => {
  Vue.component(Component.name!, Component)
}

export default Component
export { default as SdsListItem } from './ListItem.vue'