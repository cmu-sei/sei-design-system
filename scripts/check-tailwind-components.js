import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const componentsDir = join(process.cwd(), 'tailwindcss', 'components')
const cssFiles = readdirSync(componentsDir)
  .filter((fileName) => fileName.endsWith('.css'))
  .map((fileName) => join(componentsDir, fileName))

const allowedAtRules = [
  '@custom-variant',
  '@import',
  '@keyframes',
  '@layer',
  '@media',
  '@property',
  '@supports',
  '@theme',
  '@utility'
]

const failures = []

function countBraces(line) {
  let open = 0
  let close = 0
  let quote = null
  let escaped = false

  for (const char of line) {
    if (escaped) {
      escaped = false
      continue
    }

    if (char === '\\') {
      escaped = true
      continue
    }

    if (quote) {
      if (char === quote) quote = null
      continue
    }

    if (char === '"' || char === "'") {
      quote = char
      continue
    }

    if (char === '{') open += 1
    if (char === '}') close += 1
  }

  return { open, close }
}

for (const filePath of cssFiles) {
  const lines = readFileSync(filePath, 'utf8').split('\n')
  let depth = 0
  let inBlockComment = false

  lines.forEach((line, index) => {
    let trimmed = line.trim()

    if (inBlockComment) {
      if (trimmed.includes('*/')) {
        trimmed = trimmed.slice(trimmed.indexOf('*/') + 2).trim()
        inBlockComment = false
      } else {
        return
      }
    }

    while (trimmed.startsWith('/*')) {
      const commentEnd = trimmed.indexOf('*/')
      if (commentEnd === -1) {
        inBlockComment = true
        return
      }
      trimmed = trimmed.slice(commentEnd + 2).trim()
    }

    const startsAllowedAtRule = allowedAtRules.some((atRule) => trimmed.startsWith(atRule))
    const startsAtRule = trimmed.startsWith('@')

    if (
      depth === 0 &&
      trimmed &&
      !trimmed.startsWith('}') &&
      !startsAllowedAtRule &&
      !startsAtRule
    ) {
      failures.push(`${filePath}:${index + 1}: ${trimmed}`)
    }

    const { open, close } = countBraces(trimmed)
    depth = Math.max(0, depth + open - close)
  })
}

if (failures.length > 0) {
  console.error('Top-level unlayered selectors are not allowed in tailwindcss/components:')
  for (const failure of failures) console.error(`  ${failure}`)
  process.exit(1)
}

console.log('Tailwind component selector check passed.')
