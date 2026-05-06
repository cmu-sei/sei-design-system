# Tailwind CSS Audit and Simplification Plan

## Scope
This audit covers code under `sei-design-system/tailwindcss` and how those classes are consumed by components/composables in `sei-design-system/src`.

Goals of this audit:
- Drastically reduce CSS complexity and cascade risk.
- Lower maintenance burden.
- Remove reliance on `@tailwindcss/forms`.
- Make the system easier to reason about without priority fights and override hacks.

## Current State (Measured)

### Size and complexity metrics
- Total CSS in `tailwindcss`: 3,645 lines.
- Largest files:
	- `theme/prose.css`: 892 lines.
	- `components/tabs.css`: 451 lines.
	- `components/btn.css`: 433 lines.
	- `theme/tokens.css`: 381 lines.
	- `components/action-btn.css`: 361 lines.
- Construct counts across `tailwindcss`:
	- `@utility`: 77
	- `@custom-variant`: 42
	- `@apply`: 480
	- `:where(...)`: 555
	- `!important`: 5
	- `@plugin`: 1 (`@tailwindcss/forms`)

### Architectural signals
- The system already has strong tokenization (good direction): `theme/tokens.css` drives many button/link/tab styles.
- There are explicit cascade workarounds:
	- Unlayered selectors in `components/link.css` to beat utility layer output.
	- Unlayered selectors in `components/input-group.css` to beat `.btn`/`.action-btn` utility declarations.
	- `!important` in `theme/prose.css` to force `prose-invert` precedence.
- Dynamic class generation in `src/composables/useButtonClasses.ts` (12 template-literal patterns) requires explicit safelisting in `tailwindcss/tailwind.css`.

## Key Findings

## 1) Button and action button styling is over-expanded
`components/btn.css` and `components/action-btn.css` duplicate large blocks for kind/variant/size/dark combinations.

Why this hurts:
- Every new variant/kind/theme change multiplies edits.
- Logic is split between tokens and duplicated style branches.
- Dynamic class generation forces safelists and fragile build coupling.

Impact:
- High maintenance cost.
- High regression probability in dark/theme/disabled states.

## 2) Cascade/layering complexity is already a maintenance smell
The codebase repeatedly documents and works around priority issues with unlayered selectors and `!important`.

Why this hurts:
- Intent is hard to infer for future contributors.
- Source-order and layer-order dependence is brittle.
- Small refactors can silently break precedence.

Impact:
- Medium-high risk of override conflicts.

## 3) `@tailwindcss/forms` is used as global behavior, while SDS already defines form controls
You have a dedicated `components/form-control.css` plus per-component classes (`form-control`, `input-group`, validation classes). Plugin forms are likely doing generic normalization and select/checkbox/radio behavior globally.

Why this hurts:
- Global plugin styles increase hidden coupling.
- It is harder to understand what comes from SDS vs plugin defaults.
- Removing plugin later gets harder as dependency leaks spread.

Impact:
- Medium complexity and dependency burden.

## 4) Prose system is powerful but too custom for most teams
`theme/prose.css` is a highly bespoke typography system with many custom variants and specificity controls.

Why this hurts:
- Large surface area for relatively narrow use cases.
- Team must understand advanced selector and cascade patterns to safely modify it.

Impact:
- Medium maintenance burden.

## 5) Scoped component style islands still exist for complex components
`src/components/Multiselect/Multiselect.vue` and `src/components/Application/Application.vue` use `@reference` + local PostCSS styles. This is understandable for edge cases, but it increases style distribution and discoverability cost.

Why this hurts:
- Styling logic is split between global utility files and component-local CSS.
- Harder to build a single mental model of SDS styling.

Impact:
- Medium maintainability issue.

## 6) Some utility families are either low-usage or docs-only
- `tab-pill` is marked deprecated and appears mostly in docs/examples.
- `scroll-area-x` and `scroll-area-y` showed no source usage in `src`.

Why this helps simplification:
- Easy candidate set for staged deprecation/removal.

Impact:
- Low risk, high cleanup value.

## Drastic Simplification Opportunities

## A) Remove `@tailwindcss/forms` and own all form states in SDS

### What to change
1. Remove plugin registration from `tailwindcss/tailwind.css`:
	 - `@plugin '@tailwindcss/forms';`
2. Remove package from `package.json` devDependencies:
	 - `@tailwindcss/forms`
3. Expand `components/form-control.css` with explicit base styles for:
	 - `input`, `select`, `textarea`, `checkbox`, `radio`
	 - focus-visible ring
	 - disabled/readonly/valid/invalid
	 - `select` appearance and indicator behavior

### Why it works here
- Most form elements already use SDS classes (`form-control`, validation patterns).
- This gives full transparency and avoids plugin-default drift.

### Risk controls
- Snapshot compare for `Input`, `Select`, `Textarea`, `RadioGroup`, `Calendar`, `Datepicker`, `Paginator`, `Multiselect`.
- Visual regression for light/dark and forge/plaid.

## B) Collapse `btn` and `action-btn` into one primitive

### Current issue
Two parallel utility systems (`btn*` and `action-btn*`) duplicate state logic and color families.

### Simplified target
- Keep one primitive class family (example: `sds-btn`).
- Make size and shape token-driven (`--control-padding-x`, `--control-radius`, etc.).
- Keep semantic aliases temporarily (`btn-*` and `action-btn-*`) mapped to the same underlying utility for compatibility.

### Why it matters
- This is the single biggest reduction in style duplication and long-term maintenance.

## C) Eliminate safelist dependence for button classes

### Current issue
`useButtonClasses.ts` dynamically builds class names, requiring manual safelist entries in `tailwindcss/tailwind.css`.

### Simplified target
- Replace template-string assembly with static class-map objects that return known class literals.
- Ensure all emitted class names appear statically in source, then remove `@source inline(...)` safelists for button families.

### Benefits
- Less build fragility.
- Fewer hidden dependencies between runtime code and Tailwind scanner.

## D) Refactor prose to smaller layers

### Current issue
`prose.css` mixes base typography, color theming, responsive variants, inversion mechanics, and variant DSL.

### Simplified target
- Split into:
	- `prose-base.css`
	- `prose-scale.css`
	- `prose-color.css`
- Keep only high-value custom variants.
- Replace `!important` in invert path with stable layer ordering where feasible.

### Benefits
- Smaller cognitive chunks.
- Safer edits.

## E) Remove unlayered override blocks by design

### Current issue
Unlayered selectors are used to out-prioritize utility output.

### Simplified target
- Define explicit layer policy:
	- `@layer base`: resets and tokens
	- `@layer components`: component primitives
	- `@layer utilities`: optional variants only
- Move structural overrides into component primitives rather than fighting utilities with unlayered selectors.

### Benefits
- Fewer priority conflicts.
- Predictable override model.

## F) Consolidate component-local style islands

### Current issue
Complex components (for example `Multiselect`) keep large scoped PostCSS blocks.

### Simplified target
- Move mature stable styles into `tailwindcss/components/*.css`.
- Keep scoped CSS only for truly instance-specific behavior.

### Benefits
- Better discoverability and consistency.

## Step-by-Step Next Steps

## Phase 0: Baseline and guardrails (1-2 days)
1. Capture current visual baselines in Storybook for key components and states.
2. Add a small style-governance doc (`tailwindcss/README.md`) defining layer usage and selector rules.
3. Add lint/check rule to flag new unlayered top-level selectors in `tailwindcss/components`.

## Phase 1: Forms plugin removal (2-3 days)
1. Remove `@plugin '@tailwindcss/forms'` in `tailwindcss/tailwind.css`.
2. Remove `@tailwindcss/forms` from `package.json` and lock file.
3. Expand `components/form-control.css` with explicit styles for controls currently indirectly handled by plugin.
4. Run tests and visual checks for all form-heavy components.
5. Fix any regressions only in SDS classes, not ad hoc overrides.

Acceptance criteria:
- No visual regressions for standard form controls in supported themes/modes.
- No consumer requirement for plugin forms.

## Phase 2: Button/action-button convergence (4-6 days)
1. Define canonical primitive API for controls (kind, variant, size, block, pending, dark type).
2. Rebuild styles around one tokenized utility family.
3. Keep backward-compatible aliases (`btn-*`, `action-btn-*`) as wrappers.
4. Update `useButtonClasses.ts` to static mappings and literals.
5. Remove button safelist entries from `tailwindcss/tailwind.css`.

Acceptance criteria:
- Existing button and action button tests pass.
- Style file size for button families reduced by at least 35 percent.

## Phase 3: Layer cleanup and override removal (3-4 days)
1. Remove unlayered override blocks in link/input-group by re-layering and primitive adjustments.
2. Replace precedence hacks with deterministic layer ordering.
3. Keep specificity near-zero where practical, but stop over-using workaround patterns.

Acceptance criteria:
- No top-level unlayered selectors needed for core components.
- No new `!important` introduced.

## Phase 4: Prose modularization (3-5 days)
1. Split `theme/prose.css` into base/scale/color files.
2. Audit and prune custom variants that are not providing meaningful value.
3. Verify docs typography and markdown content in light/dark/themes.

Acceptance criteria:
- Prose behavior unchanged for public docs examples.
- File size and rule count reduced with clearer ownership.

## Phase 5: Deprecation cleanup (1-2 days)
1. Mark docs-only deprecated styles (`tab-pill`) for removal in next major or after migration window.
2. Remove unused utilities (`scroll-area-x`, `scroll-area-y`) if no external package consumers rely on them.
3. Move or retire residual scoped CSS where possible.

Acceptance criteria:
- Deprecation list documented.
- No breaking removals without migration notice.

## Proposed Priority Order
1. Remove plugin forms (dependency and hidden global behavior).
2. Converge button systems (largest complexity multiplier).
3. Remove unlayered overrides and safelist dependence.
4. Modularize prose.
5. Perform cleanup deprecations.

## What Success Looks Like
- Developers can style SDS components by reading a small number of predictable token + utility files.
- No dependency on `@tailwindcss/forms`.
- Minimal priority conflicts and almost no need for unlayered hacks or `!important`.
- Fewer generated utility permutations and less safelist burden.
- Clear migration path with backward-compatible aliases during transition.

## Recommended Immediate Action (This Week)
1. Execute Phase 1 fully.
2. Start Phase 2 with compatibility aliases to avoid breaking consumers.
3. Add governance checks to prevent new complexity while refactor is in progress.
