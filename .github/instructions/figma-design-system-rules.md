---
applyTo: "Figma design files for SEI Design System"
---

# Figma Design System Rules

This document outlines the naming conventions, organizational structure, and best practices for maintaining the SEI Design System in Figma. These rules ensure consistency between design files and the implemented Vue 3 component library.

---

## Component Naming Conventions

### Component Names
- Use **PascalCase** for all component names to match the Vue component naming convention.
- Prefix all component names with **"Sds"** (e.g., `SdsButton`, `SdsInput`, `SdsBadge`).
- Component names should be descriptive and reflect their purpose or function.
- Avoid abbreviations unless they are widely understood (e.g., `SdsCta` for Call-to-Action).

**Examples:**
- `SdsButton`
- `SdsInput`
- `SdsBadge`
- `SdsDropdown`
- `SdsModal`
- `SdsActionButton`
- `SdsToggleSwitch`

### Variant Property Names
- Use **camelCase** for variant property names to match Vue component props.
- Property names should be clear, concise, and match the prop names in the implemented components.
- Use consistent terminology across all components.

**Common Property Names:**
- `kind` - Defines the purpose/function (e.g., primary, secondary, tertiary, ghost)
- `variant` - Defines the color scheme (e.g., gray, blue, red, white)
- `size` - Defines the size (e.g., lg, md, sm, xs)
- `type` - Defines the theme or HTML type (e.g., light, medium, dark)
- `disabled` - Boolean state for disabled appearance
- `active` - Boolean state for active/pressed appearance
- `pending` - Boolean state for loading/processing appearance

### Variant Values
- Use **lowercase with hyphens** for multi-word variant values (kebab-case).
- Use **lowercase** for single-word variant values.
- Match variant values exactly to the prop values used in Vue components.

**Examples:**
- Size: `lg`, `md`, `sm`, `xs`
- Kind: `primary`, `secondary`, `tertiary`, `ghost`
- Variant: `gray`, `blue`, `red`, `white`, `yellow`, `orange`, `purple`, `indigo`, `teal`, `green`, `tan`
- Type: `light-border`, `light`, `medium`, `dark`

---

## Component Structure & Organization

### Component Hierarchy
1. **Main Component** - The parent component with all variants
2. **States** - Interactive states as boolean properties or separate variants
3. **Content** - Text, icon, and slot layers
4. **Instances** - Nested component instances

### Layer Naming
- Use **descriptive, semantic names** for layers.
- Prefix boolean state layers with the state name (e.g., `Disabled State`, `Hover State`).
- Use `Content` or `Slot` for content areas that designers can customize.
- Use `Icon` for icon layers.
- Use `Label` or `Text` for text content.

**Examples:**
```
SdsButton
├── Background
├── Content
│   ├── Icon (optional)
│   └── Label
├── Hover State
├── Focus State
├── Active State
├── Disabled State
└── Loading State (for pending)
```

### Auto Layout Usage
- Use **Auto Layout** for all components to ensure consistent spacing and responsive behavior.
- Apply horizontal padding and vertical padding that match Tailwind spacing utilities.
- Set appropriate alignment and distribution settings.
- Use **min/max width constraints** where applicable.

### Spacing Guidelines
- Use **4px increments** for spacing (matching Tailwind's default spacing scale).
- Common spacing values: `4px`, `8px`, `12px`, `16px`, `24px`, `32px`, `48px`.
- Apply consistent padding within components.
- Use gaps in Auto Layout that correspond to Tailwind gap utilities: `gap-1` (4px), `gap-2` (8px), `gap-3` (12px), `gap-4` (16px), etc.

---

## Color System

### Color Token Naming
- Follow the **Tailwind CSS color scale** (25, 50, 100-900, 950).
- Use semantic color names that match the CSS custom properties.
- Organize colors by hue families.

**Color Families:**
- `Gray` - Neutral colors (25, 50, 100, 200, 300, 400, 500, 600, 700, 750, 800, 850, 900, 950)
- `Tan` - Earthy neutrals (25, 50, 100-900, 950)
- `Yellow` - Warning and highlight colors (25, 50, 100-900, 950)
- `Orange` - Alert and accent colors (25, 50, 100-900, 950)
- `Red` - Error and danger colors (25, 50, 100-900, 950)
- `Purple` - Brand and accent colors (25, 50, 100-900, 950)
- `Indigo` - Brand and accent colors (25, 50, 100-900, 950)
- `Blue` - Primary and info colors (25, 50, 100-900, 950)
- `Teal` - Secondary and accent colors (25, 50, 100-900, 950)
- `Green` - Success and confirmation colors (25, 50, 100-900, 950)

**Special Colors:**
- `Black` - Pure black (#000)
- `White` - Pure white (#fff)
- `Transparent` - Fully transparent
- `Current` - Current color value

### Color Variable Names
Use the format: `color/{family}/{shade}` or `color/{family}/{shade}/{mode}`

**Examples:**
- `color/gray/500`
- `color/blue/700`
- `color/red/500`
- `color/gray/900/dark` - for dark mode variants

### Applying Colors
- Use **color styles** from the design system library, not raw hex values.
- Apply dark mode variants as separate color styles or using Figma variables.
- Ensure sufficient color contrast for accessibility (see Accessibility section).

---

## Typography System

### Font Families
- **Sans Serif**: Open Sans - Default for UI components
- **Serif**: Source Serif - For content and editorial layouts

### Font Weights
**Open Sans:**
- Light (300)
- Light Italic (300)
- Regular (400)
- Regular Italic (400)
- SemiBold (600)
- SemiBold Italic (600)
- Bold (700)
- Bold Italic (700)
- ExtraBold (800)
- ExtraBold Italic (800)

**Source Serif:**
- Variable font with full weight range

### Text Style Naming
Use the format: `{family}/{weight}/{size}` or `{semantic-name}`

**Examples:**
- `Sans/Regular/16` - Body text
- `Sans/Bold/20` - Headings
- `Serif/Regular/18` - Editorial content
- `Button/Large` - Semantic style for button text
- `Label/Small` - Semantic style for form labels

### Typography Guidelines
- Use **rem-based sizing** when documenting component specs (matching the `pxToRem` helper in code).
- Maintain consistent line heights (typically 1.5 for body text, 1.2 for headings).
- Use proper letter spacing for all-caps text (e.g., badges use uppercase with tracking).
- Apply appropriate text case (uppercase for badges, sentence case for buttons, etc.).

---

## Border Radius & Corner Styles

### Radius Tokens
The design system supports two themes with different radius treatments:
- **Forge Theme** (default) - Uses rounded corners
- **Plaid Theme** - Uses sharp corners (no radius)

**Forge Theme Radius Values:**
- `radius-theme-xs` - Extra small radius
- `radius-theme-sm` - Small radius (commonly used for badges, inputs)
- `radius-theme-md` - Medium radius (commonly used for buttons, cards)
- `radius-theme-lg` - Large radius
- `radius-theme-xl` - Extra large radius
- `radius-theme-2xl` - 2X large radius
- `radius-theme-3xl` - 3X large radius
- `radius-theme-4xl` - 4X large radius

**Plaid Theme:**
- All `radius-theme-*` values are set to `none` (0px)

### Applying Radius
- Create **corner radius styles** for each theme.
- Use `radius-theme-sm` for small components (badges, tags, chips).
- Use `radius-theme-md` for buttons, inputs, and medium-sized components.
- Use larger radius values sparingly for cards, modals, and containers.
- Document which radius token is used for each component in the description.

---

## Interactive States & Variants

### Required States
All interactive components should include the following states:

1. **Default** - Normal, idle state
2. **Hover** - Mouse hover state
3. **Focus** - Keyboard focus state (include visible focus ring)
4. **Active/Pressed** - Mouse down or active state
5. **Disabled** - Non-interactive, disabled state

### Optional States
- **Loading/Pending** - Processing or async operation in progress
- **Selected** - Selected or checked state (for toggles, checkboxes, radio buttons)
- **Error/Invalid** - Validation error state
- **Success/Valid** - Validation success state

### State Implementation in Figma
- Use **boolean properties** for states when possible (e.g., `disabled=true`, `active=true`).
- Create clear visual distinctions between states:
  - **Hover**: Slight color change or increased brightness
  - **Focus**: Visible outline or ring (typically 2-3px with offset)
  - **Active**: Pressed appearance (darker or offset)
  - **Disabled**: Reduced opacity (50-60%) and cursor change
  - **Loading**: Show spinner or skeleton, reduce opacity of content

### Focus State Guidelines
- Include a **visible focus indicator** for all interactive components.
- Focus ring should be **2-3px** wide with a **2px offset** from the component.
- Use high-contrast colors for focus rings (blue-500 for light mode, blue-300 for dark mode).
- Ensure focus indicators meet WCAG 2.2 non-text contrast requirements (3:1 minimum).

---

## Icon Guidelines

### Icon Sizing
- Use consistent icon sizes that match the component size:
  - **Extra Small (xs)**: 12px or 16px icons
  - **Small (sm)**: 16px or 20px icons
  - **Medium (md)**: 20px or 24px icons
  - **Large (lg)**: 24px or 32px icons

### Icon Naming
- Use descriptive names in kebab-case (e.g., `arrow-right`, `chevron-down`, `close-circle`).
- Organize icons in a dedicated page or section in the Figma file.
- Tag icons with relevant keywords for easy searching.

### Icon Usage
- Icons should be **instances** of master components, not detached copies.
- Apply color using **color styles**, not raw fills.
- Ensure icons maintain their proportions and don't distort when resized.
- Use consistent stroke widths across icon sets (typically 1.5px or 2px).

---

## Design Tokens & Variables

### Token Organization
Organize design tokens in the following categories:

1. **Colors** - All color values and semantic color mappings
2. **Spacing** - Padding, margin, and gap values
3. **Typography** - Font families, sizes, weights, and line heights
4. **Border Radius** - Corner radius values
5. **Shadows** - Elevation and shadow styles
6. **Animations** - Timing and easing functions

### Variable Naming Convention
Use the format: `{category}/{subcategory}/{name}/{variant?}`

**Examples:**
- `color/text/primary`
- `color/background/surface`
- `color/border/default`
- `spacing/padding/button/md`
- `spacing/gap/form-group`
- `typography/font-size/body`
- `typography/line-height/heading`
- `radius/theme/sm`
- `shadow/elevation/card`

### Semantic vs. Literal Tokens
- **Literal tokens** map directly to values (e.g., `color/blue/500` → `#007cba`)
- **Semantic tokens** reference literal tokens (e.g., `color/text/link` → `color/blue/600`)
- Use semantic tokens in component designs to enable theme switching

### Token Documentation
- Add **descriptions** to all variables explaining their purpose and usage.
- Include code examples showing the equivalent Tailwind class or CSS custom property.
- Document any special considerations or constraints.

**Example:**
```
Name: color/text/primary
Value: color/gray/900 (light), color/gray/50 (dark)
Description: Primary text color for body content
CSS: text-gray-900 dark:text-gray-50
```

---

## Accessibility Requirements

### Color Contrast
- **Normal text** (< 18px or < 14px bold): Minimum 4.5:1 contrast ratio
- **Large text** (≥ 18px or ≥ 14px bold): Minimum 3:1 contrast ratio
- **UI components** (borders, icons, focus indicators): Minimum 3:1 contrast ratio
- **Disabled states**: No minimum contrast requirement (but should be visually distinguishable)

### Contrast Checking
- Use Figma plugins (e.g., Stark, A11y - Color Contrast Checker) to verify contrast ratios.
- Test both light and dark mode variants.
- Document contrast ratios in component descriptions if they're close to minimums.

### Touch Targets
- **Minimum touch target size**: 44px × 44px (WCAG 2.1 Level AAA)
- **Recommended touch target size**: 48px × 48px
- Ensure adequate spacing between interactive elements (minimum 8px).

### Focus Indicators
- All interactive components must have a **visible focus indicator**.
- Focus indicators should meet the **3:1 contrast ratio** requirement against adjacent colors.
- Do not rely solely on color to indicate focus (use shapes, borders, or outlines).

### ARIA & Semantic Roles
- Document the expected **ARIA attributes** in component descriptions.
- Include guidance for semantic HTML elements (e.g., button vs. div, label for inputs).
- Specify `role` attributes for custom interactive components.

**Example Documentation:**
```
Component: SdsButton
ARIA Attributes:
- aria-disabled: Set to "true" when disabled=true
- aria-busy: Set to "true" when pending=true
- type: Set to "button" or "submit" as appropriate
Semantic HTML: <button> element
```

### Keyboard Navigation
- Document expected keyboard interactions in component descriptions.
- Ensure tab order is logical and intuitive.
- Include escape hatches for modal and overlay components (Escape key).

---

## Component Documentation

### Description Format
Each component should include a description with the following information:

```
Component Name: Sds[ComponentName]
Purpose: [Brief description of the component's purpose]
Props/Variants:
- [propName]: [description and allowed values]
- [propName]: [description and allowed values]
States: [List of interactive states]
Accessibility: [ARIA attributes, keyboard interactions]
Implementation: Reference src/components/[ComponentName]/[ComponentName].vue
```

**Example:**
```
Component Name: SdsButton
Purpose: A clickable button component for user actions
Props/Variants:
- kind: Determines purpose/function (primary, secondary, tertiary, ghost)
- variant: Determines color (gray, blue, red, white)
- size: Determines size (lg, md, sm, xs)
- disabled: Boolean - disables user interaction
- pending: Boolean - shows loading state
States: default, hover, focus, active, disabled, pending
Accessibility:
- aria-disabled when disabled=true
- aria-busy when pending=true
- Minimum 44px height for touch targets
Implementation: src/components/Button/Button.vue
```

### Annotations
- Use Figma's **annotation features** to document component behavior.
- Add notes for complex interactions or state changes.
- Include redlines for spacing, sizing, and alignment when handing off to developers.

### Design Spec Templates
Create reusable **spec templates** that include:
- Component dimensions and spacing
- Color styles used
- Typography styles used
- Border radius values
- Interactive states
- Accessibility requirements
- Code implementation reference

---

## Dark Mode Support

### Approach
- Use **Figma variables** with light and dark mode collections.
- Create separate color styles for light and dark mode variants when variables aren't sufficient.
- Ensure all components have dark mode variants.

### Dark Mode Color Mapping
Follow the Tailwind dark mode convention:

**Light Mode → Dark Mode:**
- Background: `gray-50` → `gray-900`
- Surface: `white` → `gray-800`
- Text Primary: `gray-900` → `gray-50`
- Text Secondary: `gray-600` → `gray-400`
- Border: `gray-200` → `gray-700`

**Semantic Mappings:**
- Light backgrounds use darker shades in dark mode
- Dark backgrounds use lighter shades in dark mode
- Maintain or improve contrast in dark mode

### Testing Dark Mode
- Preview all components in both light and dark modes.
- Verify color contrast in both modes.
- Check for visual hierarchy and readability in both modes.

---

## Component Variants vs. Props Mapping

### Understanding the Mapping
Figma variants should directly map to Vue component props:

**Figma Variant Property → Vue Prop**

**Example: SdsButton**
```
Figma:                    Vue:
kind=primary       →      :kind="primary"
variant=blue       →      :variant="blue"
size=md            →      :size="md"
disabled=true      →      :disabled="true"
pending=true       →      :pending="true"
```

**Example: SdsBadge**
```
Figma:                    Vue:
type=medium        →      :type="medium"
variant=blue       →      :variant="blue"
```

### Boolean Props
- Boolean props should be **boolean properties** in Figma (true/false).
- Examples: `disabled`, `active`, `pending`, `required`, `readonly`

### String Props
- String props should be **string properties** with defined values in Figma.
- Use dropdowns to constrain values to allowed options.
- Examples: `kind`, `variant`, `size`, `type`

### Slot Content
- Use **instance swap properties** or **text properties** for customizable content.
- Label slot layers as "Slot: [name]" or "Content" in Figma.

---

## File Organization

### Page Structure
Organize your Figma file with the following page structure:

1. **📖 Cover & Documentation** - Overview, changelog, and usage guidelines
2. **🎨 Design Tokens** - Colors, typography, spacing, radius, shadows
3. **🧩 Components** - All component definitions organized by category
4. **📐 Templates** - Page layouts and composition templates
5. **🔍 Examples** - Component usage examples and patterns
6. **🧪 Testing** - Component states and variant testing
7. **🌓 Dark Mode** - Dark mode examples and testing

### Component Organization
Group components by category on the Components page:

- **Form Controls** - Input, Textarea, Select, Checkbox, Radio, Toggle, etc.
- **Buttons & Actions** - Button, ActionButton, FloatingActionButton, Link
- **Navigation** - Tabs, Dropdown, MegaMenu, Breadcrumbs, Paginator
- **Feedback** - Badge, Callout, Toast, Modal, Tooltip, Popover
- **Data Display** - Table, Datapoint, Calendar, Avatar, AvatarGroup
- **Layout** - Panel, Section, Modal, Application, StructuredPage
- **Branding** - SeiWordmark, BrochureSite components

### Naming Sections
- Use **frames** to organize groups of components.
- Name frames descriptively: "Form Controls", "Buttons & Actions", etc.
- Use emoji prefixes for visual organization (optional): 📝, 🔘, 🧭, 📢, 📊, 📐, 🎨

---

## Export & Developer Handoff

### Export Settings
- Configure **export settings** for icons and assets at 1x, 2x, and 3x resolutions.
- Use **SVG format** for icons and vector graphics.
- Use **PNG format** with transparency for raster images.

### Developer Handoff Checklist
Before handing off designs to developers, ensure:

- [ ] All components use design tokens/variables, not hardcoded values
- [ ] Component variant names match Vue prop names exactly
- [ ] All interactive states are documented and designed
- [ ] Dark mode variants are complete and tested
- [ ] Color contrast ratios meet accessibility standards
- [ ] Touch targets meet minimum size requirements
- [ ] Focus indicators are visible and meet contrast requirements
- [ ] Component descriptions include ARIA and keyboard navigation details
- [ ] Spacing and sizing use 4px increments
- [ ] Typography uses defined text styles from the design system
- [ ] Icons are instances, not detached copies
- [ ] Annotations and redlines are added for complex components

### Inspect Mode Best Practices
- Name layers semantically so developers can identify elements easily.
- Use Auto Layout to show responsive behavior.
- Add constraints to indicate how components should resize.
- Document any special behaviors or interactions in component descriptions.

### Design-to-Code Mapping Reference
Include a reference table in your documentation page:

| Figma Property | Vue Prop | CSS Class/Variable |
|----------------|----------|-------------------|
| `kind=primary` | `:kind="primary"` | `.btn-primary` |
| `variant=blue` | `:variant="blue"` | `.btn-blue` |
| `size=md` | `:size="md"` | default size |
| `size=sm` | `:size="sm"` | `.btn-sm` |
| `disabled=true` | `:disabled="true"` | `.disabled` |
| `color/blue/500` | N/A | `--color-blue-500` |
| `radius-theme-sm` | N/A | `rounded-theme-sm` |

---

## Versioning & Changelog

### Version Numbering
- Use **semantic versioning** (major.minor.patch) for the design system.
- Major: Breaking changes to component structure or naming
- Minor: New components or non-breaking enhancements
- Patch: Bug fixes, small tweaks, and documentation updates

### Changelog Maintenance
Maintain a changelog on the Cover & Documentation page:

```
## [Version] - YYYY-MM-DD

### Added
- New component: Sds[ComponentName]
- New variant for Sds[ComponentName]: [variantName]

### Changed
- Updated Sds[ComponentName] spacing from Xpx to Ypx
- Renamed variant property from [oldName] to [newName]

### Fixed
- Fixed contrast issue in Sds[ComponentName] dark mode
- Corrected focus ring size for Sds[ComponentName]

### Deprecated
- Deprecated [oldComponentName], use [newComponentName] instead
```

---

## Best Practices Summary

1. ✅ **Always use design tokens** - Never use raw values; use variables and styles
2. ✅ **Match Vue component prop names exactly** - Ensure seamless design-to-code translation
3. ✅ **Use Auto Layout** - Make components responsive and maintainable
4. ✅ **Include all interactive states** - Default, hover, focus, active, disabled
5. ✅ **Test accessibility** - Check color contrast, touch targets, and focus indicators
6. ✅ **Document everything** - Add descriptions, annotations, and usage guidelines
7. ✅ **Support dark mode** - Create and test dark mode variants for all components
8. ✅ **Organize systematically** - Use consistent file structure and naming conventions
9. ✅ **Version control** - Track changes and maintain a changelog
10. ✅ **Collaborate with developers** - Ensure alignment between design and implementation

---

## Reference & Resources

### Internal Documentation
- Vue Component Guidelines: `.github/instructions/vue3-components.instructions.md`
- TypeScript Guidelines: `.github/instructions/typescript.instructions.md`
- Unit Testing Guidelines: `.github/instructions/unit-testing-guidelines.instructions.md`

### Implementation Reference
- Component Library: `src/components/`
- Tailwind Theme: `tailwindcss/theme/`
- Color System: `tailwindcss/theme/colors.css`
- Typography: `tailwindcss/theme/fonts.css`
- Border Radius: `tailwindcss/theme/radius.css`

### External Resources
- Figma Best Practices: https://www.figma.com/best-practices/
- WCAG 2.2 Guidelines: https://www.w3.org/WAI/WCAG22/quickref/
- Tailwind CSS Documentation: https://tailwindcss.com/docs
- Vue.js Documentation: https://vuejs.org/
- Design Tokens Specification: https://design-tokens.github.io/community-group/format/

---

**Document Version:** 1.0.0  
**Last Updated:** 2025-11-14  
**Maintained By:** SEI Design System Team
