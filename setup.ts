import type { SnapshotSerializer } from 'vitest'
import { vi, expect } from 'vitest'
import { config } from '@vue/test-utils'
import beautify from 'beautify'
import SeiDesignSystem from './src/components'

config.global.plugins.push(SeiDesignSystem)

config.global.provide = {
  emitter: vi.fn()
}

config.global.stubs = {
  transition: false
}

// Helpers
const regex = new RegExp(/data-v-\w+="[^"]*"/g)
const isString = (val: any): boolean => !!val && typeof val === 'string'
const isObject = (val: any): boolean => !!val && typeof val === 'object'

/**
 * Remove all scoped data-v-* attributes via applicable components in order to match/test 
 * snapshots consistently between running scripts for both coverage and tests
 */
expect.addSnapshotSerializer({
  test: (val) => {
    return isString(val) && regex.test(val) || isObject(val) && regex.test(`${val.outerHTML}`)
  },
  serialize(val, config, indentation, depth, refs, printer) {
    const html = beautify(
      isObject(val) ? `${val.outerHTML}`.replace(regex, '') : val.replace(regex, ''),
      { 
        format: 'html'
      }
    )
    return printer(
      html,
      config,
      indentation,
      depth,
      refs
    )
  }
} satisfies SnapshotSerializer)