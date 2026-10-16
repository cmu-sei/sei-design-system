/** User-facing ComboBox copy. Override individual entries to localize the component. */
export interface ComboBoxMessages {
  all: string;
  categories: string;
  showSuggestions: string;
  suggestions: string;
  loading: string;
  selectAll: string;
  partiallySelected: string;
  navigate: string;
  navigationKeys: string;
  categoryKeys: string;
  enterKey: string;
  altKey: string;
  switchGroups: string;
  select: string;
  clearSearch: string;
  clearSelection: string;
  clearAllSelections: string;
  requiredSelect: string;
  requiredTaggable: string;
  emptyValue: string;
  chooseSuggestion: string;
  focusHint: string;
  add: (label: string) => string;
  alreadyAdded: (label: string) => string;
  remove: (label: string) => string;
  noMatches: (query: string) => string;
  selectedSummary: (labels: string[]) => string;
  selectedCount: (count: number) => string;
  added: (labels: string[]) => string;
  removed: (labels: string[]) => string;
  results: (count: number) => string;
  addHint: (query: string) => string;
}

export const comboBoxMessages: ComboBoxMessages = {
  all: 'All',
  categories: 'Suggestion categories',
  showSuggestions: 'Show suggestions',
  suggestions: 'Suggestions',
  loading: 'Loading suggestions.',
  selectAll: 'Select all',
  partiallySelected: 'Some suggestions are selected.',
  navigate: 'Navigate',
  navigationKeys: 'Up, down:',
  categoryKeys: 'Alt+Left, Alt+Right:',
  enterKey: 'Enter',
  altKey: 'Alt',
  switchGroups: 'Switch categories',
  select: 'Select',
  clearSearch: 'Clear search',
  clearSelection: 'Clear selection',
  clearAllSelections: 'Clear all selections',
  requiredSelect: 'Please select an item from the suggestions.',
  requiredTaggable: 'Please select or add an item.',
  emptyValue: 'Enter a value that is not empty or only whitespace.',
  chooseSuggestion: 'Choose an item from the suggestions.',
  focusHint: 'Press "/" to focus',
  add: label => `Add "${label}"`,
  alreadyAdded: label => `Already added "${label}".`,
  remove: label => `Remove ${label}`,
  noMatches: query => `No matches for "${query}"`,
  selectedSummary: labels => labels.length > 5
    ? `${labels.length} items selected.`
    : `Selected: ${labels.join(', ')}.`,
  selectedCount: count => `${count} ${count === 1 ? 'item' : 'items'} selected.`,
  added: labels => labels.length === 1 ? `${labels[0]} added.` : `${labels.length} items added.`,
  removed: labels => labels.length === 1 ? `${labels[0]} removed.` : `${labels.length} items removed.`,
  results: count => `${count} ${count === 1 ? 'suggestion' : 'suggestions'} available.`,
  addHint: query => `Press Enter to add "${query}", or use the arrow keys to choose a suggestion.`
}
