import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { useComboBoxSuggestions, type ComboBoxSuggestion, type ComboBoxType } from './useComboBoxSuggestions'

const groupedSuggestions: ComboBoxSuggestion[] = [
  {
    section: 'Fruits',
    items: [
      { name: 'Apple' },
      { name: 'Banana' }
    ]
  },
  {
    section: 'Vegetables',
    items: [
      { name: 'Beetroot' },
      { name: 'Kale' }
    ]
  }
]

const createSuggestions = (overrides: Partial<{
  suggestions: ComboBoxSuggestion[];
  query: string;
  type: ComboBoxType;
  filterSuggestions: boolean;
  optionLabel: string | undefined;
  optionGroupLabel: string | undefined;
  optionGroupChildren: string | undefined;
  disableGroupTabs: boolean;
  activeGroupKey: number;
}> = {}) => {
  const suggestions = ref<ComboBoxSuggestion[]>(overrides.suggestions ?? groupedSuggestions)
  const query = ref(overrides.query ?? '')
  const type = ref<ComboBoxType>(overrides.type ?? 'select')
  const filterSuggestions = ref(overrides.filterSuggestions ?? false)
  const optionLabel = ref<string | undefined>(overrides.optionLabel ?? 'name')
  const optionGroupLabel = ref<string | undefined>(overrides.optionGroupLabel ?? 'section')
  const optionGroupChildren = ref<string | undefined>(overrides.optionGroupChildren ?? 'items')
  const disableGroupTabs = ref(overrides.disableGroupTabs ?? false)
  const activeGroupKey = ref(overrides.activeGroupKey ?? -1)

  const comboBoxSuggestions = useComboBoxSuggestions({
    suggestions,
    query,
    type,
    filterSuggestions,
    optionLabel,
    optionGroupLabel,
    optionGroupChildren,
    disableGroupTabs,
    activeGroupKey
  })

  return {
    suggestions,
    query,
    type,
    filterSuggestions,
    optionLabel,
    optionGroupLabel,
    optionGroupChildren,
    disableGroupTabs,
    activeGroupKey,
    ...comboBoxSuggestions
  }
}

describe('useComboBoxSuggestions', () => {
  it('normalizes string suggestions using the configured label key', () => {
    const comboBoxSuggestions = createSuggestions({
      suggestions: ['Apple', 'Banana'],
      optionLabel: 'title',
      optionGroupLabel: undefined,
      optionGroupChildren: undefined
    })

    expect(comboBoxSuggestions.allSuggestions.value).toEqual([
      { title: 'Apple' },
      { title: 'Banana' }
    ])
  })

  it('filters grouped suggestions while preserving matching groups', () => {
    const comboBoxSuggestions = createSuggestions({
      query: 'app',
      filterSuggestions: true
    })

    expect(comboBoxSuggestions.suggestionOptions.value).toEqual([
      {
        section: 'Fruits',
        items: [{ name: 'Apple' }]
      }
    ])
    expect(comboBoxSuggestions.allCount.value).toBe(1)
    expect(comboBoxSuggestions.hasCategories.value).toBe(false)
  })

  it('returns only the active group options when a group tab is selected', () => {
    const comboBoxSuggestions = createSuggestions({ activeGroupKey: 1 })

    expect(comboBoxSuggestions.suggestionOptions.value).toEqual([
      {
        section: 'Vegetables',
        items: [
          { name: 'Beetroot' },
          { name: 'Kale' }
        ]
      }
    ])
  })

  it('detects nested taggable matches before showing a new suggestion', () => {
    const comboBoxSuggestions = createSuggestions({
      query: 'banana',
      type: 'taggable-select'
    })

    expect(comboBoxSuggestions.matchesSuggestion.value).toBe(true)
    expect(comboBoxSuggestions.shouldShowNewSuggestion.value).toBe(false)

    comboBoxSuggestions.query.value = 'Dragonfruit'

    expect(comboBoxSuggestions.matchesSuggestion.value).toBe(false)
    expect(comboBoxSuggestions.shouldShowNewSuggestion.value).toBe(true)
    expect(comboBoxSuggestions.hasDropdownSuggestion.value).toBe(true)
  })

  it('reports no matches only when filtering hides every option', () => {
    const comboBoxSuggestions = createSuggestions({
      query: 'zzzz',
      filterSuggestions: true,
      type: 'select'
    })

    expect(comboBoxSuggestions.hasDropdownSuggestion.value).toBe(false)
    expect(comboBoxSuggestions.hasNoMatches.value).toBe(true)
  })

  it('keeps the active category when filtering removes an earlier category', () => {
    const suggestions = createSuggestions({
      suggestions: [
        { section: 'Fruits', items: [{ name: 'Apple' }] },
        { section: 'Vegetables', items: [{ name: 'Carrot' }] },
        { section: 'Animals', items: [{ name: 'Cat' }] }
      ],
      activeGroupKey: 1,
      filterSuggestions: true
    })
    expect(suggestions.groups.value[2]?.label).toBe('Vegetables')

    suggestions.query.value = 'Ca'

    expect(suggestions.suggestionOptions.value).toEqual([
      { section: 'Vegetables', items: [{ name: 'Carrot' }] }
    ])
    expect(suggestions.hasNoMatches.value).toBe(false)
  })

  it('preserves category identity when remote groups are reordered', () => {
    const suggestions = createSuggestions({ activeGroupKey: 1 })
    expect(suggestions.groups.value[2]?.label).toBe('Vegetables')

    suggestions.suggestions.value = [...groupedSuggestions].reverse()

    expect(suggestions.groupSuggestionOptions.value[0]).toMatchObject({ section: 'Vegetables' })
  })

  it('reports no matches for empty remote results without local filtering', () => {
    const suggestions = createSuggestions({ suggestions: [], query: 'missing', filterSuggestions: false })

    expect(suggestions.hasNoMatches.value).toBe(true)
  })

  it('keeps an empty active category visible so users can return to All', () => {
    const suggestions = createSuggestions({ activeGroupKey: 1, filterSuggestions: true, query: 'Apple' })

    expect(suggestions.suggestionOptions.value).toEqual([])
    expect(suggestions.groups.value).toContainEqual({ key: 1, label: 'Vegetables', count: 0 })
    expect(suggestions.hasCategories.value).toBe(true)
  })
})