---
name: storybook-guidelines
description: |
  **PRIMARY SKILL FOR CREATING AND UPDATING STORYBOOK STORIES** — Guidelines and best practices for writing Storybook story files for Vue 3 components.

  USE FOR:
  - Creating new .stories.js files for components
  - Modifying existing story files
  - Understanding story structure, argTypes, and templates
  - Adding variants, actions, and controls to stories

  DO NOT USE FOR:
  - Writing or modifying component .vue files (use components-guidelines)
  - Writing or improving unit tests (use unit-testing-guidelines)

  WHEN TO COMBINE: Load components-guidelines if you need to understand a component's props, emits, and slots to write its stories.
---

# Storybook Guidelines for Vue 3 Components

**IMPORTANT**: This skill contains the conventions and patterns used in this codebase for writing Storybook stories. Read this file completely before creating or modifying any `.stories.js` files.

## Context & Purpose

This project uses **Storybook** to document and visually test Vue 3 components. Stories are written using the **Component Story Format (CSF)** with JavaScript (not TypeScript). Each component should have a corresponding `.stories.js` file located alongside it in its component directory.

## File Location & Naming

- Place story files in the same directory as the component: `src/components/MyComponent/MyComponent.stories.js`
- Use PascalCase matching the component name: `Badge.stories.js`, `ActionButton.stories.js`
- File extension is always `.stories.js`

## Story File Structure

Every story file follows this structure:

```js
import SdsComponentName from './ComponentName.vue';

// Optional: import child components if needed for the template
// import SdsChildComponent from '../ChildComponent';

// Optional: import action helper for event logging
// import { action } from 'storybook/actions';

export default {
  title: 'Components/Category/Component Name',
  parameters: {
    docs: {
      description: {
        component: 'A concise description of what the component does and when to use it.',
      },
    },
  },
  component: SdsComponentName,
  argTypes: {
    // Define controls for props with constrained values
  }
};

const Template = (args) => ({
  components: { SdsComponentName },
  setup() {
    return { args }
  },
  template: `
    <sds-component-name v-bind="args" />
  `
});

export const Default = Template.bind({});
Default.args = {
  // Set default prop values for the story
};
```

## Import Conventions

- Import the component using its `Sds`-prefixed PascalCase name: `import SdsBadge from './Badge.vue'`
- Import related child components from relative paths: `import SdsDropdownItem from '../DropdownItem'`
- Import the action helper only when the component emits events: `import { action } from 'storybook/actions'`

## Title Hierarchy

Use a hierarchical `title` to organize stories in the Storybook sidebar:

```
'Components/Category/Component Name'
```

Common categories:
- `Components/Buttons` — Button, ActionButton, FloatingActionButton
- `Components/Buttons/Dropdowns` — Dropdown and sub-components
- `Components/Data Visualization` — Badge, Datapoint, TopFiveChart
- `Components/Navigation` — Tabs, NavigationItem, Paginator
- `Components/Forms` — Input, Select, Textarea, CheckboxGroup, RadioGroup
- `Components/Feedback` — Toast, Toaster, Modal, Callout
- `Components/Layout` — Section, Panel, StructuredPage, Application
- `Components/Overlays` — Tooltip, Popover, Dropdown

Choose the most appropriate category. For nested component families, add sub-categories (e.g., `Components/Buttons/Dropdowns/Dropdown/Dropdown`).

## ArgTypes

Define `argTypes` for props that have constrained values (enums, limited options). This enables Storybook controls for interactive testing.

```js
argTypes: {
  variant: {
    options: ['gray', 'red', 'blue', 'green'],
    control: { type: 'select' }
  },
  size: {
    options: ['sm', 'md', 'lg'],
    control: { type: 'select' }
  }
}
```

- Use `control: { type: 'select' }` for enum-like props
- List all valid options from the component's prop definition
- Only define argTypes for props that benefit from a dropdown selector; leave boolean/string/number props to use Storybook's auto-detected controls

## Template Pattern

Use the standard Template factory pattern:

```js
const Template = (args) => ({
  components: { SdsComponentName },
  setup() {
    return { args }
  },
  template: `
    <sds-component-name v-bind="args">Default slot content</sds-component-name>
  `
});
```

### Template Guidelines

- Use the kebab-case tag name with `sds-` prefix in templates: `<sds-badge>`, `<sds-action-button>`
- Bind all args with `v-bind="args"`
- Include representative slot content where applicable
- For components that need height/spacing context, wrap in a container: `<div style="height: 28rem">...</div>`

## Handling Events

For components that emit events, use the `action` helper and the `methods` option:

```js
import { action } from 'storybook/actions';

const Template = (args) => ({
  components: { SdsComponentName },
  setup() {
    return { args }
  },
  template: `
    <sds-component-name v-bind="args" @click="onClick" />
  `,
  methods: {
    onClick: action('onClick')
  }
});
```

- Name action methods with the `on` prefix matching the event: `@click` → `onClick`, `@change` → `onChange`
- Log all significant events the component emits

## Handling v-model

For components using `v-model`, use `data()` and `watch` to manage local state:

```js
const Template = (args) => ({
  components: { SdsComponentName },
  setup() {
    return { args }
  },
  template: `
    <sds-component-name
      v-model="localValue"
      v-bind="args"
      @update:model-value="onUpdateModelValue"
    />
  `,
  data() {
    return { localValue: this.$props.modelValue }
  },
  watch: {
    modelValue(value) {
      this.localValue = value
    }
  },
  methods: {
    onUpdateModelValue: action('update:model-value')
  }
});

export const Default = Template.bind({});
Default.args = {
  modelValue: initialValue
};
```

## Composing Multiple Components

When a story demonstrates a component with children (e.g., Dropdown with DropdownItems):

```js
import SdsDropdown from './Dropdown.vue';
import SdsDropdownItem from '../DropdownItem';
import SdsDropdownHeader from '../DropdownHeader';

const Template = (args) => ({
  components: { SdsDropdown, SdsDropdownItem, SdsDropdownHeader },
  setup() {
    return { args }
  },
  template: `
    <sds-dropdown v-bind="args">
      <template #title>Dropdown</template>
      <sds-dropdown-header>Section</sds-dropdown-header>
      <sds-dropdown-item tag="button" @click="onClick">Item 1</sds-dropdown-item>
      <sds-dropdown-item tag="button" @click="onClick">Item 2</sds-dropdown-item>
    </sds-dropdown>
  `,
  methods: {
    onClick() { console.log('item clicked') }
  }
});
```

## Multiple Story Variants

Export additional named stories to showcase different states or configurations:

```js
export const Default = Template.bind({});
Default.args = {};

export const Primary = Template.bind({});
Primary.args = {
  variant: 'blue',
  kind: 'primary'
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm'
};
```

- Use descriptive PascalCase export names
- Each variant should demonstrate a meaningful configuration difference

## Component Description

Always include a `parameters.docs.description.component` string that:
- Describes what the component is and does
- Mentions when/why a user would use it
- Is concise (1-2 sentences)

## Story-Level Parameter Overrides

Individual stories can override parameters to add per-variant documentation or configure rendering:

```js
export const BottomPanel = Template.bind({});
BottomPanel.args = { position: 'bottom' };
BottomPanel.parameters = {
  docs: {
    description: {
      story: 'Bottom panels slide up from the bottom of the screen.'
    }
  }
};
```

## Overlay & Full-Screen Components

Components that render overlays (modals, panels, toasters) or need full-screen context require special parameters:

```js
export default {
  // ...
  parameters: {
    docs: {
      description: { component: '...' },
      story: {
        inline: false,
        iframeHeight: 300
      }
    }
  }
};
```

- Use `inline: false` + `iframeHeight` for: Modal, Panel, Toaster, FloatingActionButton, MegaMenu, MobileMenu
- Typical heights: `250`–`300` for compact overlays, `675` for full-page menus
- Use `layout: 'fullscreen'` at the component level for application shells (BrochureSite, SimpleApplication)

## ArgTypes — Advanced Controls

Beyond `select`, use additional control types as appropriate:

```js
argTypes: {
  // Date picker control
  min: { control: { type: 'date' } },
  max: { control: { type: 'date' } },

  // Numeric control
  initial: { control: { type: 'number' } },

  // Radio for boolean or binary toggle
  modelValue: {
    options: [true, false],
    control: { type: 'radio' }
  },

  // With description for documentation
  size: {
    options: ['sm', 'md', 'lg', 'auto'],
    control: { type: 'select' },
    description: 'Set the size of the spinner.'
  }
}
```

- Use `description` on argTypes to provide educational context in the docs panel (useful for LoadingSpinner, LoadingSkeleton, NavigationItem)

## Scoped Slots

When a component exposes methods or data through scoped slots, demonstrate them in the template:

```js
// Popover/Tooltip — expose close()
template: `
  <sds-popover v-bind="args">
    <template #trigger>
      <button>Open</button>
    </template>
    <template #default="{ close }">
      <p>Content</p>
      <button @click="close">Close</button>
    </template>
  </sds-popover>
`

// FormGroup — expose generated id for a11y
template: `
  <sds-form-group v-slot="{ id }" v-bind="args">
    <sds-input :id="id" v-model="text" />
  </sds-form-group>
`
```

## Multiple Templates Per Story

When a component has distinct modes or configurations that need different markup, create separate template functions:

```js
const Template = (args) => ({
  components: { SdsCalendar },
  setup() { return { args } },
  template: `<sds-calendar v-bind="args" />`
});

const RangeTemplate = (args) => ({
  components: { SdsCalendar },
  setup() { return { args } },
  template: `<sds-calendar v-bind="args" mode="range" />`
});

export const Default = Template.bind({});
Default.args = { modelValue: new Date() };

export const Range = RangeTemplate.bind({});
Range.args = { modelValue: { start: new Date(), end: new Date() } };
```

Use separate templates when:
- The component has a significantly different template structure per mode
- The component is used inside another wrapper (e.g., LoadingSpinner inside a Button)

## Template Wrapper Containers

Some components need specific container context to render properly in Storybook:

```js
// Overlays/dropdowns need height clearance
template: `
  <div style="height: 28rem">
    <sds-multiselect v-bind="args" />
  </div>
`

// Tooltips/popovers need padding to show positioned elements
template: `
  <div class="p-48">
    <sds-tooltip v-bind="args">Hover me</sds-tooltip>
  </div>
`

// Scroll containers for scrollspy
template: `
  <div id="scrollspy-parent" class="scroll-area h-96">...</div>
`
```

## Icon Usage in Templates

Icons are auto-imported via `unplugin-icons`. Use the `icon-` prefix with Font Awesome collections:

```html
<icon-fa7-solid-chevron-down class="w-4 h-4" />
<icon-fa7-regular-bell class="w-5 h-5" />
```

Available collections: `fa7-solid`, `fa7-regular`. Icons automatically get `aria-hidden="true"` and `role="img"`.

For inline SVG in slot templates (e.g., NavigationItem), embed the SVG directly:
```html
<template #left>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill="currentColor" d="..." />
  </svg>
</template>
```

## Storybook Configuration Reference

The project's Storybook is configured in `.storybook/`:

### `.storybook/main.ts`
- Framework: `@storybook/vue3-vite`
- Addons: `@storybook/addon-links`, `@storybook/addon-docs`
- Stories glob: `../src/**/*.mdx`, `../src/**/*.stories.@(js|jsx|ts|tsx)`
- Plugins: `unplugin-icons` (compiler: vue3) + `unplugin-vue-components` for auto icon resolution
- Telemetry disabled

### `.storybook/preview.ts`
- Imports `../tailwindcss/tailwind.css` globally
- Global toolbar controls for **color scheme** (`light`/`dark`) and **theme** (`sds-theme-forge`/`sds-theme-plaid`)
- Global decorator wraps every story in `<div class="${colorScheme} ${theme}"><story /></div>`
- Background options: transparent, white, gray-25, gray-50, gray-900, gray-950, black, blue-500
- Controls sorted alphabetically with expanded mode
- `tags: ['autodocs']` enables auto-generated documentation for all stories

### `src/stories/Introduction.mdx`
- Single MDX entry point with links to the SEI Design System Reference Guide
- No per-component MDX files — all documentation lives in story `parameters.docs.description`

## Patterns NOT Used in This Project

- No `play()` functions (interaction testing is handled by unit tests)
- No `render()` function — always use `Template.bind({})`
- No `loaders` or `beforeEach` hooks
- No per-component decorators (only the global theme decorator)
- No component-level MDX documentation files

## Checklist for New Stories

1. Import the component (and any children needed for the demo)
2. Set an appropriate `title` with category hierarchy
3. Write a clear component description in `parameters.docs.description.component`
4. Define `argTypes` for enum/constrained props with appropriate control types
5. Add `description` to argTypes when extra context helps the reader
6. Create a Template with representative usage (wrap in container if overlay/positioned)
7. Export a `Default` story with sensible default args
8. Add additional variants if the component has distinct visual states (use separate templates if markup differs)
9. Wire up `action()` for all emitted events
10. Handle `v-model` with local `data()` + `watch` pattern (preferred)
11. Demonstrate scoped slots when the component exposes methods/data
12. Add `docs.story.inline: false` + `iframeHeight` for overlay components
13. Use `layout: 'fullscreen'` for full-page application shells
