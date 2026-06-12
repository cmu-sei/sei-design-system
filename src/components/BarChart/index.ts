import type { App } from 'vue'
import Component from './BarChart.vue'

Component.install = (Vue: App) => {
  Vue.component(Component.name!, Component)
}

export default Component
