---
applyTo: "tailwindcss/**/*.css"
description: "Use when: writing, refactoring, reviewing, or simplifying CSS in the Tailwind CSS directory, including component utilities, theme tokens, variants, and Tailwind v4 directives."
---

# Tailwind CSS Authoring Guidelines

Use `tailwindcss/components/form-control.css` as the baseline for clean, maintainable Tailwind CSS in this directory: compose small named utilities, group related rules by responsibility, keep native selectors low-specificity, and prefer design tokens and Tailwind utilities over ad hoc CSS.

## Scope and Structure

- Put reusable class APIs in `@utility` blocks. Use one utility per public class, such as `form-control`, `form-control-sm`, `input-group`, or `focus-ring`.
- Put broad native element selectors in `@layer components` or `@layer base`, depending on intent. Use `@layer components` for component-like element defaults and `@layer base` for global browser compatibility resets.
- Put theme variables in `tailwindcss/theme/**` and component class utilities in `tailwindcss/components/**`. Put shared/global custom variants in `tailwindcss/variants/**`; colocate family-specific custom variants with their shipped utility family when they are part of that public API, such as prose and table-prose variants.
- Keep imports centralized in `tailwindcss/tailwind.css`. When adding a new CSS file that should ship with the system, add the import there in the matching section.
- Keep utilities narrow and composable. Extract repeated foundations into a smaller utility, as `form-border` and `focus-ring` do, then compose them with `@apply`.
- Add `@source inline(...)` safelists in `tailwindcss/tailwind.css` only when classes are assembled dynamically and Tailwind cannot discover them statically.

## Public API and Governance

- Treat shipped utilities, custom variants, and theme classes as npm consumer API, even when there is no local usage in `src` or the docs workspace.
- Do not remove or rename shipped class APIs based only on repository search results. Local non-usage is a weak deprecation signal, not proof that consumers are not using the API.
- For low-use or obsolete utilities, prefer documentation, deprecation comments, and migration guidance first. Remove them only in an approved breaking-change window.
- Internal implementation rules may be simplified freely when public class names, selectors, and expected behavior remain compatible.
- Do not add top-level unlayered selectors in `tailwindcss/components/**`. Put component APIs in `@utility` or native defaults inside an explicit layer.
- Before completing CSS refactors, run `npm run check:tailwindcss` to catch accidental top-level unlayered selectors in component CSS files.

## Tailwind v4 Patterns

- Prefer Tailwind v4 directives: `@utility`, `@theme`, `@custom-variant`, `@source`, and layered CSS where appropriate.
- Prefer `@apply` when Tailwind can express the declaration clearly, including spacing, sizing, typography, color, backgrounds, borders, radius, layout, focus rings, states, dark mode, arbitrary values, arbitrary properties, and CSS custom property assignment.
- Put state and structural selectors inside `@apply` variants whenever Tailwind can express them. Prefer built-in variants like `hover:`, `active:`, `focus:`, `focus-visible:`, `disabled:`, `dark:`, `after:`, `data-*`, `has-*`, and `not-*` before reaching for arbitrary variants, except when an SDS custom variant intentionally preserves public CSS compatibility or low-specificity legacy behavior.
- Use SDS state variants for shared public component states: `sds-disabled:` covers `.disabled`, `[disabled]`, and `:disabled`; `where-hover:` and `where-active:` preserve legacy `:where(:hover)` and `:where(:active, .active)` specificity where consumer override-friendliness matters.
- Use arbitrary variants only for selector shapes Tailwind does not provide as built-ins, such as custom state classes (`[&.active]:shadow-inner`), compound component classes (`[&.btn-primary.btn-white]:bg-white/90`), or structural selectors that cannot be expressed cleanly with built-in variants.
- When a selector combines a built-in or SDS state variant with a custom selector, stack the state variant instead of embedding the state in the arbitrary selector. Prefer `where-hover:[&.btn-primary]:bg-white`, `where-active:[&.btn-primary]:shadow-inner`, `sds-disabled:[&.btn-primary]:opacity-50`, and `data-[pending=true]:after:hidden` over `[&.btn-primary:hover]:bg-white`, `[&.btn-primary:active]:shadow-inner`, `[&[disabled].btn-primary]:opacity-50`, or `[&[data-pending="true"]::after]:hidden`.
- Put pseudo-element utility styling behind built-in pseudo-element variants whenever Tailwind can express it. Prefer `@apply after:content-[''] after:inline-flex [&.size]:after:h-2.75` over selector blocks like `&::after { @apply ... }` or arbitrary variants like `[&::after]:inline-flex` when `after:` works.
- When an arbitrary variant targets the current utility with pseudo-elements, pseudo-classes, attributes, or combined selectors that Tailwind cannot simplify safely, include `&` in each selector arm, such as `[&.disabled.btn-primary::after]:bg-gray-100` and `[&[disabled].btn-primary::after]:bg-gray-100`. For simple current-selector class combinations, prefer Tailwind's shorter form when diagnostics suggest it, such as `[.btn-primary,.btn-secondary]:text-white`. Do not rely on comma groups without `&` for complex selectors, because they can compile to empty selectors like `.btn-cta:is()`.
- Prefer Tailwind token shorthands like `@apply text-gray-900`, `@apply bg-blue-600`, and CSS variable shorthands like `@apply text-(--component-text)`, `@apply bg-(--component-bg)`, or `@apply border-(--component-border)` over raw `color`, `background-color`, or `border-color` declarations when the value is a token or custom property.
- Express CSS custom property assignment with arbitrary-property utilities whenever possible, including variant-scoped assignments such as `@apply [--component-text:var(--color-gray-900)]` and `@apply dark:[--component-text:var(--color-gray-100)]`.
- In arbitrary values and arbitrary properties, use Tailwind's diagnostic-preferred spelling. Preserve fallback spaces with underscores, such as `w-[var(--component-width,_1rem)]`, but keep slash-separated `--alpha()` values compact, such as `[--component-bg:--alpha(var(--color-blue-600)/20%)]`.
- Use raw CSS declarations when Tailwind utilities are not expressive enough or would make the rule harder to understand, such as long descendant typography rules, inherited prose variables, pseudo-element setup that cannot compile through `@apply`, data URI backgrounds, `scrollbar-gutter`, complex calculated values, or browser-specific compatibility declarations.
- Keep variant-capable class APIs in `@utility` blocks so responsive and state prefixes can work where needed.
- Prefer token references like `var(--color-gray-900)`, `var(--radius-md)`, or component-specific custom properties when values need to participate in theming.

## Selectors and Specificity

- Use low-specificity selectors for defaults: prefer `:where(...)` for native element defaults and grouped descendant rules.
- Use `:is(...)`, `:has(...)`, and attribute selectors when they express state clearly, but keep the selector readable.
- Do not create nested selector blocks for `hover`, `active`, `focus`, `focus-visible`, `disabled`, `.active`, `.disabled`, or simple `:has()` conditions when the same behavior can live in an `@apply` variant on the utility itself.
- Avoid increasing specificity with IDs, deep descendant chains, or repeated classes unless there is a documented cascade reason.
- Keep state styling near the base utility it modifies. For example, `disabled`, `readonly`, `valid`, `invalid`, `hover`, `active`, `focus`, and `focus-visible` rules should live with the utility they affect.
- Use arbitrary variants intentionally, as in `[&.invalid]:border-red-500` or `[&:has([readonly]:not(.no-readonly-style))>.input-group-addon]:bg-gray-50`, when the variant is part of the reusable class behavior.

## Theming and Color

- Prefer SDS theme tokens and Tailwind color tokens over one-off colors.
- Use actual color tokens and opacity values instead of `color-mix()`. Prefer Tailwind opacity utilities like `bg-white/55`, `text-gray-900/60`, and `border-white/75`, or token opacity helpers like `--alpha(var(--color-blue-600) / 20%)` when assigning CSS custom properties.
- Include dark-mode behavior at the same time as light-mode behavior when the utility renders visible color, border, background, placeholder, focus, or disabled states.
- Prefer token inheritance for theme variants. Avoid hard-coding theme class names inside base utilities when custom properties can carry the variant behavior.
- Use theme-specific selectors only for structural differences that cannot be represented with tokens.
- Keep color variants focused on token reassignment when possible, instead of duplicating the full property set for every variant.

## Component Utility Design

- Separate base, size, kind, color, and state utilities when that produces a smaller and clearer API.
- Keep size utilities limited to sizing concerns: padding, dimensions, font size, icon size, and related background positioning.
- Keep group utilities responsible for parent-child coordination, such as rounded corners, add-ons, disabled/read-only child state, and border sharing.
- Preserve native control behavior unless the utility intentionally replaces it. When using `appearance-none`, restore the expected affordance with tokens, background images, spacing, or other accessible visual cues.
- Use semantic class names that describe the component API, not implementation details.

## Accessibility and Interaction States

- Always account for keyboard focus. Prefer `focus-visible` where it improves pointer experience, and keep focus rings tokenized or aligned with SDS focus colors.
- Do not remove outlines or native affordances unless an equivalent visible focus or interaction state is provided.
- Style `disabled` and `readonly` separately when their interaction behavior differs.
- For form controls, preserve validation states and native validation compatibility. Use visible classes like `.valid` and `.invalid` only as presentation hooks.
- Keep pointer behavior explicit for non-interactive states, such as `disabled:pointer-events-none` or readonly exceptions.

## Maintainability

- Group related declarations in a stable order: base layout, sizing, typography, color, border/radius, states, then theme or structural overrides.
- Put CSS custom property assignments in `@apply` arbitrary-property utilities, grouped by role when useful. Split groups across lines so token changes stay easy to audit.
- Split long `@apply` lists across multiple lines by concern. This keeps diffs small and makes audits easier.
- Convert raw declarations to `@apply` during refactors whenever there is an equivalent Tailwind utility, arbitrary-value utility, or arbitrary-property utility.
- Use concise comments only for non-obvious cascade, theme, browser compatibility, or Tailwind scanner behavior.
- Remove duplicated declarations when refactoring. Treat apparently unused shipped utilities and custom variants as public API: document or deprecate them before removal unless they are clearly internal-only.
- Do not introduce new one-off classes when an existing utility can be extended cleanly.
- Keep generated or encoded assets, such as SVG data URIs, minimal and purposeful. Prefer `currentColor` or tokenized color where possible.

## Review Checklist

Before finishing CSS changes in `tailwindcss/**`, verify:

- The CSS uses existing tokens, utilities, and variants before adding new ones.
- Tailwind `@apply` is used wherever Tailwind can express the declaration cleanly, including CSS custom property assignments and variant-scoped token overrides.
- Color transparency uses explicit opacity utilities or token opacity helpers, not `color-mix()`.
- State styling uses Tailwind variants or arbitrary variants inside `@apply` instead of selector-only wrapper rules where possible.
- Light, dark, disabled, readonly, hover, active, focus, and validation states are covered where relevant.
- Selectors remain low-specificity and understandable.
- Arbitrary variants compile to valid selectors; after selector-heavy refactors, build and search generated CSS for empty `:is()` or `:where()` output and malformed combined-class selectors.
- New files are imported from `tailwindcss/tailwind.css` if they should ship.
- Dynamically generated class names are safelisted with `@source inline(...)` only when necessary.
- The change is scoped to the intended utility or layer and does not create broad global side effects.
