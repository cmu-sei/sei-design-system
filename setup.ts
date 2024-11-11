import type { SnapshotSerializer } from 'vitest'
import { vi, expect } from 'vitest'
import { config } from '@vue/test-utils'
import snapshotSerializer from 'jest-serializer-vue'
import SeiDesignSystem from './src/components'

const regex = new RegExp(/data-v-\w+="[^"]*"/g)

config.global.plugins.push(SeiDesignSystem)

config.global.provide = {
  emitter: vi.fn()
}

config.global.stubs = {
  transition: false
}

expect.addSnapshotSerializer(snapshotSerializer)

/**
 * Remove all scoped data-v-* attributes via applicable components in order to match/test 
 * snapshots consistently between running scripts for both coverage and tests
 */
expect.addSnapshotSerializer({
  test: (val) => {
    return val && regex.test(val) || val && regex.test(`${val.outerHTML}`)
  },
  serialize(val, config, indentation, depth, refs, printer) {
    const html = typeof val === 'object' ? `${val.outerHTML}`.replace(regex, '') : val.replace(regex, '')
    return printer(
      html,
      config,
      indentation,
      depth,
      refs
    )
  }
} satisfies SnapshotSerializer)