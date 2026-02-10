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
const regex = [
  new RegExp(/data-v-\w+="[^"]*"/g),
  new RegExp(/<!--teleport [\s\S]*?-->/g)
]
const isString = (val: string): boolean => !!val && typeof val === 'string'
const isObject = (val: object): boolean => !!val && typeof val === 'object'

/**
 * Remove all scoped data-v-* attributes and/or teleport HTML comments via applicable components in order 
 * to match/test snapshots consistently between running scripts for both coverage and tests
 */
expect.addSnapshotSerializer({
  test: (val) => {
    return isString(val) && (regex[0].test(val) || regex[1].test(val)) || 
      isObject(val) && (regex[0].test(`${val.outerHTML}`) || regex[1].test(`${val.outerHTML}`))
  },
  serialize(val, config, indentation, depth, refs, printer) {
    let html = isObject(val) ? `${val.outerHTML}`.replace(regex[0], '') : val.replace(regex[0], '')
    html = regex[1].test(html) ? html.replace(regex[1], '') : html

    return printer(
      beautify(html, { format: 'html' }),
      config,
      indentation,
      depth,
      refs
    )
  }
} satisfies SnapshotSerializer)