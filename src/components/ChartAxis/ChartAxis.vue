<template>
  <g 
    ref="axisRef" 
    class="sds-chart-axis"
  />
</template>

<script setup lang="ts">
import type { Axis, AxisDomain } from '@/lib/d3'
import { select } from '@/lib/d3'

interface ChartAxisProps {
  /** D3 axis generator (axisBottom, axisLeft, etc.) */
  axis: Axis<AxisDomain>
  /** Available width of the inner chart area. Used for x-axis label sizing. */
  innerWidth: number
  /** Available height of the inner chart area. Used for y-axis label sizing. */
  innerHeight: number
  /** Axis orientation — determines truncation strategy. */
  orientation: 'x' | 'y'
  /** Font size in px for tick labels. @default 14 */
  maxFontSize?: number
  /** Minimum font size in px for x-axis tick labels when shrinking to fit. @default 9 */
  minFontSize?: number
  /** Maximum available width (px) for y-axis labels. Falls back to 60. */
  maxLabelWidth?: number
}

defineOptions({ 
  name: 'SdsChartAxis' 
})

const props = withDefaults(defineProps<ChartAxisProps>(), {
  maxFontSize: 14,
  minFontSize: 9,
  maxLabelWidth: 60,
})

const axisRef = useTemplateRef<SVGGElement>('axisRef')

watchEffect(
  () => {
    const el = axisRef.value
    if (!el || !props.axis) return

    // Render the D3 axis
    select(el).call(props.axis)

    // Post-process tick labels for responsive wrapping
    const tickGroups = el.querySelectorAll<SVGGElement>('.tick')
    if (!tickGroups.length) return

    if (props.orientation === 'x') {
      const tickCount = tickGroups.length
      // Available width per tick label — only shrink font if needed, never add tspans
      const availablePerTick = tickCount > 0 ? props.innerWidth / tickCount : props.innerWidth

      tickGroups.forEach((tickG) => {
        const textEl = tickG.querySelector<SVGTextElement>('text')
        if (!textEl) return
        const fullText = textEl.textContent ?? ''
        const fontSize = fitFontSize(textEl, fullText, availablePerTick * 0.9)
        textEl.setAttribute('font-size', `${fontSize}px`)
      })
    } else {
      // y-axis: wrap labels to maxLabelWidth using multiple <text> elements
      const maxW = props.maxLabelWidth * 0.9
      const tickGroups = el.querySelectorAll<SVGGElement>('.tick')
      // Approximate available height per band
      const bandHeight =
        tickGroups.length > 0 ? props.innerHeight / tickGroups.length : props.innerHeight

      tickGroups.forEach((tickG) => {
        // Remove previously added wrap <text> elements from prior runs
        tickG.querySelectorAll<SVGTextElement>('text[data-wrap]').forEach((t) => t.remove())

        const textEl = tickG.querySelector<SVGTextElement>('text')
        if (!textEl) return
        textEl.removeAttribute('display')

        const fullText = textEl.textContent ?? ''
        if (!fullText.trim()) return

        // Find the largest font size where the wrapped block fits within the band.
        // Start at maxFontSize and step down by 1px until it fits or we hit minFontSize.
        let fontSize = props.maxFontSize
        let lines: string[] = []

        while (fontSize >= props.minFontSize) {
          textEl.setAttribute('font-size', `${fontSize}px`)
          lines = computeLines(textEl, fullText, maxW)
          const blockHeight = lines.length * fontSize * 1.2
          if (blockHeight <= bandHeight * 0.9) break
          fontSize -= 1
        }

        if (lines.length <= 1) {
          // Single line — leave D3's text element as-is
          textEl.textContent = fullText
          return
        }

        // Multi-line: hide original and create one <text> per line
        const x = textEl.getAttribute('x') ?? '0'
        const anchor = textEl.getAttribute('text-anchor') ?? 'end'
        const fill = getComputedStyle(textEl).fill || 'currentColor'
        textEl.setAttribute('display', 'none')

        const lineHeight = fontSize * 1.2
        const totalHeight = (lines.length - 1) * lineHeight
        const startY = -(totalHeight / 2)

        lines.forEach((lineText, i) => {
          const t = document.createElementNS('http://www.w3.org/2000/svg', 'text')
          t.setAttribute('data-wrap', '')
          t.setAttribute('x', x)
          t.setAttribute('y', String(startY + i * lineHeight))
          t.setAttribute('text-anchor', anchor)
          t.setAttribute('dominant-baseline', 'central')
          t.setAttribute('font-size', `${fontSize}px`)
          t.setAttribute('fill', fill)
          t.textContent = lineText
          tickG.appendChild(t)
        })
      })
    }
  },
  { flush: 'post' },
)

/**
 * Compute word-wrapped lines for the given text within maxWidth.
 * Uses the provided textEl for measurement (must be attached to the DOM).
 */
function computeLines(textEl: SVGTextElement, fullText: string, maxWidth: number): string[] {
  const words = fullText.split(/\s+/).filter((w) => w.length > 0)
  if (!words.length) return [fullText]

  const lines: string[] = []
  let line: string[] = []

  for (const word of words) {
    const candidate = [...line, word].join(' ')
    textEl.textContent = candidate
    const len = textEl.getComputedTextLength()
    // If measurement returns 0 (not yet laid out), fall back to char-based estimate
    if (len === 0) {
      return computeLinesFallback(fullText, maxWidth, props.maxFontSize)
    }
    if (len > maxWidth && line.length > 0) {
      lines.push(line.join(' '))
      line = [word]
    } else {
      line.push(word)
    }
  }
  lines.push(line.join(' '))
  return lines
}

/**
 * Fallback line computation when getComputedTextLength() returns 0.
 * Estimates ~0.6em average character width.
 */
function computeLinesFallback(fullText: string, maxWidth: number, fontSize: number): string[] {
  const avgCharWidth = fontSize * 0.6
  const maxChars = Math.max(1, Math.floor(maxWidth / avgCharWidth))
  const words = fullText.split(/\s+/).filter((w) => w.length > 0)
  const lines: string[] = []
  let line: string[] = []
  let lineLen = 0

  for (const word of words) {
    const newLen = lineLen + (line.length ? 1 : 0) + word.length
    if (newLen > maxChars && line.length > 0) {
      lines.push(line.join(' '))
      line = [word]
      lineLen = word.length
    } else {
      line.push(word)
      lineLen = newLen
    }
  }
  lines.push(line.join(' '))
  return lines
}

/**
 * Shrinks font size (between minFontSize and maxFontSize) until the label fits
 * within maxWidth. Starts at maxFontSize and steps down if needed.
 */
function fitFontSize(textEl: SVGTextElement, text: string, maxWidth: number): number {
  textEl.textContent = text
  textEl.setAttribute('font-size', `${props.maxFontSize}px`)
  if (textEl.getComputedTextLength() <= maxWidth) return props.maxFontSize
  let low = props.minFontSize
  let high = props.maxFontSize
  let best = props.minFontSize
  while (high - low > 0.5) {
    const mid = (low + high) / 2
    textEl.setAttribute('font-size', `${mid}px`)
    if (textEl.getComputedTextLength() <= maxWidth) {
      best = mid
      low = mid
    } else high = mid
  }
  return best
}
</script>