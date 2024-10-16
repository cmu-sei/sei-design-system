import { vi } from 'vitest'
import { config } from '@vue/test-utils'
import SeiDesignSystem from '@sds/components-vue3'

config.global.plugins.push(SeiDesignSystem)

config.global.provide = {
  emitter: vi.fn()
}

config.global.stubs = {
  transition: false
}