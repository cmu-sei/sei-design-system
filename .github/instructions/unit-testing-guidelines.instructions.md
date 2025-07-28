---
applyTo: "src/components/**/*.spec.ts"
---

# Context & Purpose:
You are assisting with writing unit tests for Vue 3 applications using the Vitest testing framework and Vue Test Utils. The code will typically run in a Vite-powered Vue environment, targeting components, composables, and related utilities. Tests should aim to be clear, maintainable, and leverage best practices for Vue component testing and mocking.

**Note:** All components in this design system use the Vue 3 Composition API, not the Options API. Code samples below reflect the usage of the Composition API.

## Writing Tests with Vitest and Vue Test Utils

### Import Common Utilities

```typescript
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import ComponentToTest from './ComponentToTest.vue'
```

### Mount Components

- Use `mount` from Vue Test Utils to fully render components.
- Use `shallowMount` if you want to stub child components for unit isolation.

### Assertions and Testing Behavior

Test component rendering and initial state:

```typescript
it('renders initial message', () => {
  const wrapper = mount(ComponentToTest)
  expect(wrapper.text()).toContain('expected text')
})
```

Test user interaction with events and DOM updates:

```typescript
it('updates message when button clicked', async () => {
  const wrapper = mount(ComponentToTest)
  await wrapper.find('button').trigger('click')
  expect(wrapper.text()).toContain('updated text')
})
```

Test props and emitted events:

```typescript
it('emits custom event with proper payload', () => {
  const wrapper = mount(ComponentToTest, { props: { someProp: true } })
  wrapper.vm.$emit('custom-event', 'payload')
  expect(wrapper.emitted('custom-event')).toBeTruthy()
})
```

### Mocking and Spying

Use `vi.fn()` to create mocks or spies on functions:

```typescript
const mockFn = vi.fn()
```

Mock external services or APIs by spying and returning mock values:

```typescript
vi.spyOn(apiModule, 'fetchData').mockResolvedValue(mockData)
```

```typescript
const mockFn = vi.fn()
```

Mock external services or APIs by spying and returning mock values:

```typescript
vi.spyOn(apiModule, 'fetchData').mockResolvedValue(mockData)
```

### Asynchronous Testing

Use async/await with DOM updates and promise-flushing to ensure tests do not falsely pass:

```typescript
await flushPromises()
```

### Using nextTick for DOM Updates

Vue's `nextTick` is useful when you need to wait for the DOM to update after a reactive change, such as setting a prop, changing data, or triggering an event. Use it in tests to ensure assertions run after the DOM has updated:

```typescript
import { nextTick } from 'vue'
```

```typescript
it('updates DOM after reactive value change', async () => {
  const wrapper = mount(ComponentToTest)
  // Assuming the component exposes a ref via expose()
  wrapper.vm.someReactiveValue = 'new value'
  await nextTick()
  expect(wrapper.text()).toContain('new value')
})
```

Use `nextTick` when you directly mutate reactive state or expect DOM changes that are not immediately reflected after an action. For Composition API components, you may need to access refs or reactive state exposed via `expose()`.

## Code Coverage and Test Organization
- Place test files alongside components using `.spec.ts` suffix.
- Name the test file to match the component name, e.g., `MyComponent.spec.ts` for `MyComponent.vue`.
- Keep composables and pure logic separated and tested independently.
- Run test scripts using the commands defined in your `package.json` file, such as `npm test`, `npm run test:clean`, or `npm run test:watch`.
- Run a coverage report using `npm run coverage` as defined in your `package.json`.

## Example Simple Test for a Vue Component

```typescript
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HelloWorld from './HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders initial message', () => {
    const wrapper = mount(HelloWorld)
    expect(wrapper.text()).toContain('Hello, Vue!')
  })

  it('updates message when button clicked', async () => {
    const wrapper = mount(HelloWorld)
    await wrapper.find('button').trigger('click')
    expect(wrapper.text()).toContain('You clicked the button!')
  })
})
```

## Best Practices & Tips
- Encourage separation of logic into composables for easier unit testing.
- Use Vue Test Utils' `find` and `findComponent` for precise querying.
- Prefer testing emitted events over internal component state.
- Use Vitest's global APIs (`describe`, `it`, `expect`) without imports thanks to `globals: true` config.
- Mock external dependencies and asynchronous calls to isolate unit tests.
- Consider snapshot testing for components to ensure UI consistency.