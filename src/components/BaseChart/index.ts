import type { App } from 'vue'
import Component from './BaseChart.vue'

Component.install = (Vue: App) => {
  Vue.component(Component.name!, Component)
}

export default Component