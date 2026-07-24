import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { CHART_CONFIG_KEY, provideChartConfig, useChartConfig, type ChartConfig } from './index'
import { describe, it, expect } from 'vitest'

describe('useChartConfig', () => {
  it('returns an empty config when nothing is provided', () => {
    const Consumer = {
      setup() {
        const config = useChartConfig()
        return { config }
      },
      template: '<div />',
    }

    const wrapper = mount(Consumer)
    expect(wrapper.vm.config).toEqual({})
  })

  it('reads config provided through provideChartConfig', () => {
    const isDarkMode = ref(true)
    const providedConfig: ChartConfig = {
      colors: {
        light: ['#111111'],
        dark: ['#eeeeee'],
      },
      isDarkMode,
    }

    const Parent = {
      components: {
        Child: {
          name: 'ChartConfigChild',
          setup() {
            const config = useChartConfig()
            return { config }
          },
          template: '<div />',
        },
      },
      setup() {
        provideChartConfig(providedConfig)
      },
      template: '<Child />',
    }

    const wrapper = mount(Parent)
    const child = wrapper.findComponent({ name: 'ChartConfigChild' })
    expect(child.vm.config.colors?.light).toEqual(['#111111'])
    expect(child.vm.config.colors?.dark).toEqual(['#eeeeee'])
    expect(child.vm.config.isDarkMode?.value).toBe(true)
  })

  it('reads config provided through the injection key', () => {
    const isDarkMode = ref(false)
    const providedConfig: ChartConfig = {
      colors: { light: ['#abc'], dark: ['#def'] },
      isDarkMode,
    }

    const Consumer = {
      setup() {
        const config = useChartConfig()
        return { config }
      },
      template: '<div />',
    }

    const wrapper = mount(Consumer, {
      global: {
        provide: {
          [CHART_CONFIG_KEY]: providedConfig,
        },
      },
    })

    expect(wrapper.vm.config).toBe(providedConfig)
  })
})