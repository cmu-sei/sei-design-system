# Dropdown Components Audit Report

**Date:** February 10, 2026  
**Components Analyzed:**
- `Dropdown.vue`
- `ActionDropdown.vue`
- `SortByDropdown.vue`
- `FilterByDropdown.vue`

---

## Executive Summary

This audit identifies significant opportunities to consolidate and simplify the dropdown component implementations while maintaining backward compatibility. The primary findings reveal:

1. **Dropdown** and **ActionDropdown** are nearly identical (~95% code duplication)
2. All components share common patterns that could be extracted
3. Inconsistent component naming conventions exist in templates
4. Specialized dropdowns (**SortByDropdown**, **FilterByDropdown**) could benefit from a shared base

**Estimated Consolidation Impact:**
- ~200 lines of duplicated code can be eliminated
- 1 component can be deprecated in favor of another
- Improved maintainability through shared abstractions

---

## Component Analysis

### 1. Dropdown.vue vs ActionDropdown.vue

#### Similarities (95% overlap)
Both components share:
- Identical use of `FloatingUi` wrapper
- Same core props structure (offset, strategy, placement, disabled, willOpen, willClose, auto, block, hideArrow)
- Identical slot architecture (`trigger` and `default` slots with same bindings)
- Same `useDropdown` composable usage
- Nearly identical template structure and ARIA attributes
- Same delay mechanism (openDelay, closeDelay)

#### Differences

| Feature | Dropdown | ActionDropdown |
|---------|----------|----------------|
| **Default `kind`** | `'secondary'` | `'ghost'` |
| **Dark mode support** | Yes (`type` prop) | No |
| **Dropdown wrapper class** | Includes `dropdown-dark` conditional | No dark mode styling |
| **Default button styling** | Standard button | Action button styling |
| **Component name** | `SdsDropdown` | `SdsActionButton` ⚠️ (should be `SdsActionDropdown`) |
| **Icon sizing logic** | More complex size-based classes | Simpler standardized sizing |

#### Naming Inconsistency
⚠️ **Critical Issue:** ActionDropdown defines its component name as `'SdsActionButton'` instead of `'SdsActionDropdown'`. This is misleading and conflicts with the actual ActionButton component.

```typescript
// ActionDropdown.vue - INCORRECT
defineOptions({
  name: 'SdsActionButton'  // ❌ Should be 'SdsActionDropdown'
})
```

#### Recommendation

**Option 1: Merge into Single Component (Preferred)**
- Consolidate both into `Dropdown.vue` with a `variant` or `appearance` prop
- Use `kind` default logic to determine styling approach
- Add dark mode support as optional feature
- **Breaking Change Risk:** Low (can maintain both exports temporarily)

```typescript
// Proposed unified prop
appearance: { 
  type: String as PropType<'dropdown' | 'action'>, 
  default: 'dropdown' 
}
```

**Option 2: Establish Clear Hierarchy**
- Keep both, but make ActionDropdown extend/compose Dropdown
- ActionDropdown becomes a thin wrapper with preset props
- **Breaking Change Risk:** None

**Option 3: Deprecation Path**
- Mark ActionDropdown as deprecated
- Add console warnings in development
- Document migration path
- Remove in next major version
- **Breaking Change Risk:** Medium (requires user migration)

---

### 2. Template Naming Inconsistency

All four components import `FloatingUi` from the same file but reference it inconsistently:

```vue
<!-- Dropdown.vue and ActionDropdown.vue -->
<floating-ui>  <!-- ❌ Lowercase (relies on auto-registration) -->

<!-- SortByDropdown.vue and FilterByDropdown.vue -->
<SdsFloatingUi>  <!-- ✅ Correct PascalCase -->
```

Both import the same component:
```typescript
import FloatingUi from "../FloatingUi/FloatingUi.vue"
```

#### Recommendation
Standardize all to use `SdsFloatingUi` (PascalCase) for consistency and explicitness. This avoids reliance on global component registration or auto-imports.

---

### 3. SortByDropdown.vue Analysis

**Purpose:** Provides sorting interface with direction controls  
**Complexity:** High (310 lines)  
**Specialization:** Strong - specific to sorting use cases

#### Current Structure
- Custom trigger: `SdsActionButton` wrapped in `SdsTooltip`
- Two-section dropdown: "Sort by" + "Order by"
- Complex state management with `selectedOption`, `selectedDirection`, and `isInternalUpdate` flag
- Dynamic label generation based on order type (`alpha`, `chronological`, `numerical`, `custom`)
- v-model returns composite object: `{ sortBy, orderBy }`

#### Strengths
- Rich functionality for sorting scenarios
- Good accessibility (radio buttons, labels)
- Smart default initialization (first option, ascending)
- Flexible customization via `ORDER_BY_TYPES` mapping

#### Weaknesses
- Complex sync logic between local state and v-model
- `isInternalUpdate` flag indicates bidirectional sync challenges
- Tight coupling between presentation and logic
- No use of existing `useDropdown` composable
- Duplicate button styling logic that exists in composable

#### Consolidation Opportunities
1. **Extract base dropdown trigger logic** - Reuse `useDropdown` composable for button styling
2. **Create shared "option list" component** - Both Sort and Filter dropdowns render lists of options
3. **Separate presentation from state** - Extract sorting logic into a composable

---

### 4. FilterByDropdown.vue Analysis

**Purpose:** Multi-select filtering with checkboxes  
**Complexity:** Medium-High (245 lines)  
**Specialization:** Strong - specific to filtering use cases

#### Current Structure
- Custom trigger: `SdsActionButton` with count display
- Three sections: Filter input (optional), Select all, Option list
- Uses `tmpOptions` for staging selections before "Apply"
- Optional filtering and sorting of options
- v-model returns array of `FilterByDropdownOption[]`

#### Strengths
- Good UX patterns (staging, cancel)
- Optional search functionality
- "Select all" with indeterminate state
- Shows selected count in trigger

#### Weaknesses
- Manual `tmpOptions` management is error-prone
- Duplicate button styling logic
- Filter input focus logic uses polling (`setInterval`) instead of proper lifecycle
- No use of `useDropdown` composable
- Sort logic duplicates common patterns

#### Consolidation Opportunities
1. **Reuse `useDropdown` composable** for trigger button
2. **Share focus management** pattern
3. **Extract "select all" checkbox logic** into reusable component or composable
4. **Create base "selectable list"** component used by both Filter and Sort

---

## Shared Patterns Analysis

### Common Props Across All Components

| Prop | Dropdown | ActionDropdown | SortByDropdown | FilterByDropdown |
|------|----------|----------------|----------------|------------------|
| `kind` | ✅ | ✅ | ✅ | ✅ |
| `variant` | ✅ | ✅ | ✅ | ✅ |
| `size` | ✅ | ✅ | ✅ | ✅ |
| `zIndex` | ✅ | ✅ | ✅ | ✅ |
| `placement` | ✅ | ✅ | ✅ | ✅ |
| `disabled` | ✅ | ✅ | ✅ | ✅ |
| `title` | ✅ | ✅ | ✅ | ✅ |
| `hideArrow` | ✅ | ✅ | ✅ | ❌ |
| `block` | ✅ | ✅ | ❌ | ❌ |
| `offset` | ✅ | ✅ | ❌ | ❌ |
| `strategy` | ✅ | ✅ | ❌ | ❌ |
| `willOpen` | ✅ | ✅ | ❌ | ❌ |
| `willClose` | ✅ | ✅ | ❌ | ❌ |

**Observation:** All four components share 7 core props. The specialized dropdowns (Sort/Filter) don't expose some advanced features (lifecycle hooks, offset, strategy, block) which could be beneficial to add.

### Common Patterns

1. **FloatingUi Wrapper** - All use the same positioning component
2. **Trigger Button** - All render an action button as trigger
3. **Z-Index Management** - All use similar z-index prop and classes
4. **Close on Select** - Sort/Filter use explicit close buttons; general dropdowns rely on click-away
5. **ARIA Attributes** - All implement `aria-haspopup`, `aria-expanded`, `aria-labelledby`

---

## Consolidation Recommendations

### Phase 1: Non-Breaking Improvements (Immediate)

#### 1.1 Fix ActionDropdown Component Name
```typescript
// ActionDropdown.vue
defineOptions({
  name: 'SdsActionDropdown'  // Fix incorrect name
})
```

#### 1.2 Standardize FloatingUi Usage
Update Dropdown.vue and ActionDropdown.vue to use PascalCase:
```vue
<!-- Before -->
<floating-ui>

<!-- After -->
<SdsFloatingUi>
```

#### 1.3 Extend useDropdown Composable
Add support for specialized dropdown features:
```typescript
// useDropdown.ts additions
export interface UseDropdownOptions {
  // ... existing props
  tooltip?: MaybeRefOrGetter<string>
  showCount?: MaybeRefOrGetter<boolean>
  icon?: MaybeRefOrGetter<string>
}
```

#### 1.4 Create Shared Option List Components
Extract common list patterns:

**DropdownRadioList.vue** - For sort-by scenarios
```vue
<template>
  <ul class="flex flex-col">
    <li v-for="option in options" :key="option.id">
      <div class="group flex flex-row gap-2 items-center px-2 py-1.5 rounded-lg hover:bg-gray-25">
        <input :id="option.id" type="radio" v-model="modelValue" :value="option.value">
        <label :for="option.id">{{ option.label }}</label>
      </div>
    </li>
  </ul>
</template>
```

**DropdownCheckboxList.vue** - For filter scenarios
```vue
<template>
  <ul>
    <li v-for="option in options" :key="option.id">
      <div class="leading-5 flex gap-2 items-start px-2 mx-2 py-1.5 rounded-lg hover:bg-gray-50">
        <input :id="option.id" type="checkbox" v-model="option.selected">
        <label :for="option.id">{{ option.text }}</label>
      </div>
    </li>
  </ul>
</template>
```

### Phase 2: Structural Consolidation (Next Minor Version)

#### 2.1 Merge Dropdown and ActionDropdown

Create a unified `Dropdown.vue` with appearance variants:

```typescript
// Unified Dropdown.vue
const props = defineProps({
  // ... existing props
  appearance: { 
    type: String as PropType<'standard' | 'action'>, 
    default: 'standard' 
  },
  type: { 
    type: String as PropType<'light' | 'dark'>, 
    default: 'light' 
  }
})

const computedKind = computed(() => {
  if (props.appearance === 'action') {
    return props.kind || 'ghost'
  }
  return props.kind || 'secondary'
})

const useDropdownOptions = {
  prefix: computed(() => props.appearance === 'action' ? 'action-btn' : 'btn'),
  kind: () => computedKind.value,
  darkMode: () => props.type === 'dark',
  // ... rest
}
```

**Migration Path:**
```typescript
// Export both for backward compatibility
export { Dropdown as SdsDropdown }
export { Dropdown as SdsActionDropdown }  // Deprecated, points to same component

// ActionDropdown.vue becomes a re-export with preset props
import Dropdown from '../Dropdown/Dropdown.vue'
export default {
  ...Dropdown,
  props: {
    ...Dropdown.props,
    appearance: { default: 'action' }
  }
}
```

#### 2.2 Create Base Dropdown Composable Pattern

Extract shared logic for specialized dropdowns:

```typescript
// useSpecializedDropdown.ts
export function useSpecializedDropdown(options: {
  prefix?: string
  kind?: MaybeRefOrGetter<string>
  variant?: MaybeRefOrGetter<string>
  size?: MaybeRefOrGetter<string>
  zIndex?: MaybeRefOrGetter<string>
  disabled?: MaybeRefOrGetter<boolean>
}) {
  const { 
    zIndexClass,
    btnClass, 
    kindClass, 
    variantClass, 
    sizeClass, 
    disabledClass 
  } = useDropdown({
    prefix: 'action-btn',
    ...options
  })

  const buttonClasses = computed(() => [
    btnClass.value,
    kindClass.value,
    variantClass.value,
    sizeClass.value,
    disabledClass.value
  ])

  return {
    zIndexClass,
    buttonClasses
  }
}
```

Update SortByDropdown and FilterByDropdown to use this composable:

```typescript
// SortByDropdown.vue
const { zIndexClass, buttonClasses } = useSpecializedDropdown({
  kind: () => props.kind,
  variant: () => props.variant,
  size: () => props.size,
  zIndex: () => props.zIndex,
  disabled: () => props.disabled
})
```

#### 2.3 Improve FilterByDropdown Focus Management

Replace polling with proper Vue lifecycle:

```typescript
// Current (BAD)
const handleInputFocus = () => {
  if (!props.enableFilter) return
  const interval = setInterval(() => {
    if (typeof filterTextInput.value === 'undefined') return
    filterTextInput.value?.focus()
    clearInterval(interval)
  }, 100)
}

// Improved (GOOD)
const handleInputFocus = () => {
  if (!props.enableFilter) return
  nextTick(() => {
    filterTextInput.value?.focus()
  })
}
```

### Phase 3: Advanced Consolidation (Next Major Version)

#### 3.1 Create Unified BaseDropdown Component

A renderless component providing shared logic:

```vue
<!-- BaseDropdown.vue -->
<script setup lang="ts">
import { provide } from 'vue'

const props = defineProps({
  kind: String,
  variant: String,
  size: String,
  zIndex: String,
  placement: String,
  disabled: Boolean,
  // ... all shared props
})

const dropdown = useDropdown(props)

// Provide dropdown context to children
provide('dropdown', dropdown)
</script>

<template>
  <SdsFloatingUi v-bind="floatingUiProps">
    <slot 
      :dropdown="dropdown"
      :trigger-props="triggerProps"
      :content-props="contentProps"
    />
  </SdsFloatingUi>
</template>
```

Then specialized components use this base:

```vue
<!-- SortByDropdown.vue - simplified -->
<template>
  <BaseDropdown v-bind="baseProps">
    <template #default="{ dropdown, triggerProps, contentProps }">
      <SdsActionButton v-bind="triggerProps">
        <slot name="title">{{ title }}</slot>
      </SdsActionButton>
      
      <div v-bind="contentProps">
        <!-- Sort-specific UI -->
      </div>
    </template>
  </BaseDropdown>
</template>
```

#### 3.2 Extract State Management

Create composables for dropdown-specific state logic:

```typescript
// useFilterSelection.ts
export function useFilterSelection(options: FilterByDropdownOption[]) {
  const tmpOptions = ref<FilterByDropdownOption[]>([])
  
  const allSelected = computed(() => 
    tmpOptions.value.every(i => i.selected)
  )
  
  const indeterminate = computed(() => 
    tmpOptions.value.some(i => i.selected) && !allSelected.value
  )
  
  const toggleSelectAll = () => {
    const shouldSelect = !allSelected.value
    tmpOptions.value.forEach(i => i.selected = shouldSelect)
  }
  
  const resetSelections = () => {
    tmpOptions.value = JSON.parse(JSON.stringify(options))
  }
  
  return {
    tmpOptions,
    allSelected,
    indeterminate,
    toggleSelectAll,
    resetSelections
  }
}

// useSortSelection.ts
export function useSortSelection(options: SortByDropdownOption[]) {
  // Extract complex sort logic from component
}
```

---

## Breaking Changes Assessment

### No Breaking Changes (Safe)
- ✅ Fix ActionDropdown component name (only affects DevTools)
- ✅ Standardize FloatingUi template usage (internal only)
- ✅ Add `useDropdown` to specialized dropdowns (refactor, not API change)
- ✅ Extract shared components (additive)
- ✅ Create composables (optional, doesn't change components)

### Minor Breaking Changes (Can be Mitigated)
- ⚠️ Merge Dropdown + ActionDropdown
  - **Mitigation:** Keep both exports, deprecate old one
  - **Timeline:** 2-3 minor versions before removal
  
- ⚠️ Add missing props to specialized dropdowns (offset, strategy, etc.)
  - **Mitigation:** All new props are optional with sensible defaults
  - **Impact:** None if defaults match current hardcoded values

### Major Breaking Changes (Avoid)
- ❌ Change v-model structure for Sort/Filter dropdowns
- ❌ Remove or rename existing props
- ❌ Change slot bindings or structure

---

## Implementation Roadmap

### Immediate (Current Sprint)
1. ✅ Fix ActionDropdown component name
2. ✅ Standardize FloatingUi usage
3. ✅ Document current inconsistencies
4. ✅ Add TypeScript type safety improvements

### Short-term (Next Minor Release - 1-2 sprints)
1. Create `DropdownRadioList.vue` and `DropdownCheckboxList.vue` components
2. Add `useSpecializedDropdown` composable
3. Refactor SortByDropdown and FilterByDropdown to use new composable
4. Fix FilterByDropdown focus management
5. Add unit tests for shared logic

### Medium-term (Next Minor Release - 3-6 months)
1. Merge Dropdown and ActionDropdown with `appearance` prop
2. Add deprecation warnings to ActionDropdown
3. Update documentation and migration guide
4. Create Storybook examples showing equivalence

### Long-term (Next Major Release - 6-12 months)
1. Remove standalone ActionDropdown component
2. Consider BaseDropdown abstraction if more dropdown variants emerge
3. Extract state management composables
4. Full test coverage for all consolidation

---

## Benefits Summary

### Code Quality
- **Reduction:** ~200 lines of duplicated code
- **Maintainability:** Single source of truth for dropdown logic
- **Consistency:** Unified styling and behavior across all dropdowns

### Developer Experience
- **Clarity:** Clear component hierarchy and purpose
- **Reusability:** Shared composables and components
- **Type Safety:** Better TypeScript support through shared interfaces

### User Experience
- **Consistency:** Uniform behavior across all dropdown types
- **Performance:** Reduced bundle size from code deduplication
- **Accessibility:** Centralized ARIA pattern implementation

### Testing
- **Coverage:** Test shared logic once, benefit everywhere
- **Reliability:** Fewer edge cases and state management issues
- **Speed:** Faster test execution with less code

---

## Recommendations Priority

### High Priority (Do First)
1. **Fix ActionDropdown component name** - Prevents confusion
2. **Standardize FloatingUi usage** - Improves maintainability
3. **Add useDropdown to specialized dropdowns** - Reduce duplication

### Medium Priority (Do Next)
4. **Create shared option list components** - Enable reuse
5. **Fix filter focus management** - Better UX
6. **Merge Dropdown + ActionDropdown** - Major duplication win

### Low Priority (Nice to Have)
7. **Extract state composables** - Advanced optimization
8. **Create BaseDropdown** - Only if more variants needed

---

## Conclusion

The dropdown components show significant overlap and consolidation opportunities. The most impactful change would be merging **Dropdown** and **ActionDropdown** into a single component, eliminating ~95% code duplication while maintaining backward compatibility through exports and deprecation warnings.

The specialized dropdowns (**SortByDropdown**, **FilterByDropdown**) could benefit from shared abstractions but are distinct enough to remain separate components. However, they should leverage the existing `useDropdown` composable and extract common patterns like option lists and button styling.

**Next Steps:**
1. Review this audit with the team
2. Prioritize recommendations based on upcoming roadmap
3. Create implementation tickets for approved changes
4. Begin with non-breaking improvements (Phase 1)

---

**Audit completed by:** GitHub Copilot  
**Review status:** Pending team review
