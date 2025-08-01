---
applyTo: "src/components/**/*.{.spec.js,.spec.ts}"
---

# Context & Purpose:
You are assisting with writing unit tests for Vue 3 applications using the Vitest testing framework and Vue Test Utils. The code will typically run in a Vite-powered Vue environment, targeting components, composables, and related utilities. Tests should aim to be clear, maintainable, and leverage best practices for Vue component testing and mocking.

---

## Writing Tests and Test Descriptions

This section outlines best practices and key points for writing unit tests and their descriptions, specially tailored for Vue, Vue Test Utils.

### Clarity and Precision in Test Descriptions
- Write test descriptions that are clear, concise, and understandable.
- Avoid technical jargon unless necessary.
- Each test description should communicate the test's purpose and expected outcome specifically.

### Focus on End-User Requirements and Behavior
- Document tests based on business logic or user scenarios.
- Cover both positive (expected) and negative (edge/error) cases.
- Ensure comprehensive coverage of real use cases.

### Descriptive and Specific Test Titles
- Use test titles that briefly but specifically describe what the test verifies.
- Titles should quickly convey the feature or condition under test with no ambiguity.

### Consistency
- Maintain consistent formatting, naming conventions, terminology, and structure.
- Consistency helps readability and maintainability for team members and tools like Copilot.

### Structure and Organization
- Organize test cases logically:
  - Start with a clear objective.
  - Define any preconditions.
  - Outline inputs and actions.
  - Specify expected outcomes.
- Keep test steps concise.

### Adapt to Testing Frameworks and Tools
- For Vue, use Vue Test Utils best practices including shallow mounting, stubbing, and interaction testing.
- Document the reactive model considerations for Vue component testing.

### Writing Tests with Maintainability in Mind
- Avoid overly complex or brittle tests.
- Strive for tests to be:
  - Self-contained
  - Idempotent (no side effects)
  - Easy to update with evolving requirements

### Test Description Styles
- Unit test descriptions often follow formats like:
  - `should [expected behavior] when [condition]`
  - `renders [component/element] correctly with [props/state]`
- Behavioral tests can use BDD style:
  - **Given** (setup),
  - **When** (action),
  - **Then** (assertion)
- This style improves readability and aligns with automation.

### Updating and Maintaining Documentation
- Keep test documentation synchronized with code changes.
- Note the status of tests.
- Maintain traceability to requirements or user stories when possible.

---

## Writing Tests with Vitest and Vue Test Utils

**Note:** All components use the Vue 3 Composition API, not the Options API. Code samples below reflect the usage of the Composition API.

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

### Mocking Best Practices

Mocking is a fundamental technique in unit testing to isolate the component or function under test by replacing dependencies with controlled substitutes. Proper mocking ensures tests are reliable, focused, and maintainable.

#### Key Practices

- **Mock only what is necessary:** Avoid over-mocking which can lead to brittle tests or missing integration issues. Mock external services, complex dependencies, or reactive injections that are not the direct focus of the test.

- **Use Vue Test Utils' `mocks` option** for mocking Vue instance properties (e.g., `$route`, `$store`, etc.) when mounting components.

- **Leverage Vitest's mocking utilities**:
  - `vi.fn()` to create mock functions.
  - `vi.spyOn()` to spy on and optionally override existing function implementations.
  - `vi.mock()` for mocking entire modules or dependencies.
  
- **Reset or restore mocks between tests** to prevent state leakage using `vi.restoreAllMocks()` or `vi.resetAllMocks()`.

- **Avoid mocking internal module calls that are tightly coupled;** prefer refactoring for better testability.

---

For more detailed information, refer to the official documentation:  
- Vue Test Utils: https://test-utils.vuejs.org/
- Vitest mocking guide: https://vitest.dev/guide/mocking

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

## Code Coverage and Test Organization
- Place test files alongside components using `.spec.js` or `.spec.ts` suffixes.
- Name the test file to match the component name, e.g., `MyComponent.{spec.js,spec.ts}` for `MyComponent.vue`.
- Keep composables and pure logic separated and tested independently.
- Run test scripts using the commands defined in your `package.json` file, such as `npm test`, `npm run test:clean`, or `npm run test:watch`.
- Run a coverage report using `npm run coverage` as defined in your `package.json`.

## Best Practices & Tips
- Encourage separation of logic into composables for easier unit testing.
- Use Vue Test Utils' `find` and `findComponent` for precise querying.
- Prefer testing emitted events over internal component state.
- Use Vitest's global APIs (`describe`, `it`, `expect`) without imports thanks to `globals:true` config.
- Mock external dependencies and asynchronous calls to isolate unit tests.
- Consider snapshot testing for components to ensure UI consistency.