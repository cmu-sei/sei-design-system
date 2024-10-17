import type { SnapshotSerializer } from 'vitest'
import { vi, expect } from 'vitest'
import { config } from '@vue/test-utils'
import SeiDesignSystem from './src/components'

config.global.plugins.push(SeiDesignSystem)

config.global.provide = {
  emitter: vi.fn()
}

config.global.stubs = {
  transition: false
}

/**
 * Remove all scoped data-v-* attributes via applicable components in order to match/test 
 * snapshots consistently between running scripts for both coverage and tests
 */
expect.addSnapshotSerializer({
  test: (val) => val,
  serialize(val, _config, _indentation, _depth, _refs, _printer) {
    const regex = new RegExp(/data-v-\w+="[^"]*"/g)
    return regex.test(`${val.outerHTML}`) ? `${val.outerHTML}`.replace(regex, '') : `${val.outerHTML}`
  }
} satisfies SnapshotSerializer)