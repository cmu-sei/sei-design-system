---
applyTo: "src/components/**/*.vue"
---

# Context & Purpose
Automate the creation of modular, maintainable, and well-structured Vue 3 components using the Composition API and `<script setup>`. Emphasize flexibility and adherence to Vue 3 best practices.

---

## General Component Structure
- Always use the `<script setup>` syntax inside the .vue file for concise code and better developer experience.
- Use `<template>`, `<script setup lang="ts">`, and `<style scoped>` sections.
- Include a name attribute for component identification (use PascalCase).
- Use Composition API with reactive ref, reactive, and computed as appropriate.
- Define props with proper validation and types using `defineProps`.
- Define emits using `defineEmits` and document the emitted events.
- Use slots with clear naming and default slots where applicable.
- Style with `<style scoped>` or module for isolated component styling.
- Add suitable accessibility attributes (e.g., aria-*) when relevant.

## Component and File Naming Conventions
- Name Vue components using PascalCase (e.g., `MyComponent`).
- Name `.vue` files using PascalCase to match the component name (e.g., `MyComponent.vue`).
- Use descriptive names that reflect the component's purpose.

## Directory Structure Guidelines
- Place components in the `src/components/` directory, organized by feature or type as needed.
- Group related components in subfolders for clarity (e.g., `src/components/MyForm/`).
- Store helpers, or utilities, in `src/helpers/` and Vue composables in a dedicated `src/composables/` directory.
- Place styles for components within the same `.vue` file using `<style scoped>`, or in a dedicated style file if shared.

## Props and Emits
- Use `defineProps<{ propName: type }>()` syntax with TypeScript typings for props.
- Include default values inside props definition or via local fallback where appropriate.
- Use `defineEmits(['eventName'])` or with type annotations for emitted events.
- Document each prop and event with comments to guide code generation.

## Using `defineModel`

`defineModel` is used to create two-way bindings between a parent and child component, replacing the legacy `v-model` and `modelValue` prop pattern. Use it when your component needs to expose a value that can be updated both internally and externally, such as form inputs or toggles.

**When to use:**
- The component should allow its value to be controlled by the parent and also emit updates when changed internally.
- Prefer `defineModel` over manual `modelValue`/`update:modelValue` prop/emits for new components.

**When not to use:**
- If the value is only set by the parent and never updated by the child, use a regular prop.
- For static or read-only data, use props only.

**Code Sample:**
```html
<template>
  <input type="text" :value="textInput" @input="textInput = $event.target.value" />
</template>
```

```typescript
<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])

// Use defineModel for two-way binding
const model = defineModel({ type: String, default: '' })

const textInput = computed({
  get() {
    return model.value
  },
  set(value) {
    model.value = value
    emit('update:modelValue', value)
  }
})
</script>
```

## Reactivity and Lifecycle Hooks
- Use `ref` or `reactive` for state variables to maintain reactive data.
- Use `computed` for derived reactive state that depends on other reactive variables.
- Use `watch` to respond to reactive data changes and trigger side effects.
- Use `watchEffect` for automatically tracking and reacting to all reactive dependencies within its scope, especially when you need to respond to multiple reactive sources without explicitly listing them.
- Use lifecycle hooks like `onMounted`, `onBeforeUnmount`, etc., for component setup and cleanup.
- Prefer template-driven rendering and minimize JS logic outside reactive contexts.

## Template Guidelines
- Use semantic HTML tags where possible.
- Bind props and events clearly, using shorthand (`:` and `@`) where obvious.
- Use `v-if`/`v-show` and `v-for` thoughtfully, always with key attributes in lists.
- Add accessibility (a11y) considerations inside templates, such as `role`, `aria-label`.
- Use slots for extra flexibility and user customization.
- Add a `data-id` attribute with the component name to the template for easier testing and identification.

## Documentation Comments
- Use JSDoc-style comments for props, emits, and composables to improve code readability and maintainability.
- Document each prop and event with a comment describing its purpose, type, and default value (if any).
- For composables, include a summary of what the function does, its parameters, and return value.

## Component Registration

To make a component available for use in a Vue application, you need to register it. This is typically done by adding an `install` method to the component and exporting it from an `index.ts` file in the component's directory.

**How it works:**
- The component is imported from its `.vue` file.
- An `install` method is attached to the component, which registers it globally using `Vue.component` and the component's name.
- The component is then exported as the default export.
- After adding the `install` method, export the component from its own directory's `index.ts` file.
- In `src/components/index.ts`, import and re-export all components to enable global registration and simplified imports throughout your project.
- This centralizes component exports, making it easier to manage and use components across your application.

**Example:**
```typescript
import { App } from 'vue'
import Component from './MyComponent.vue'

Component.install = (Vue: App) => {
  Vue.component(Component.name!, Component)
}

export default Component
```

**Why:**
- This pattern allows the component to be installed as a plugin, making it available globally in any Vue app via `app.use(Component)`.
- It supports both local and global registration, improving flexibility and reusability across projects.

---

For more detailed information, refer to the official documentation:

- [Vue.js Official Documentation](https://vuejs.org/)