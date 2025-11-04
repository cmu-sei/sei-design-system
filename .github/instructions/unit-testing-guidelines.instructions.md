---
applyTo: "src/components/**/*.{spec.js,spec.ts}"
---

# Context & Purpose:
You are assisting with writing unit tests for Vue 3 applications using the Vitest testing framework and the Vue Test Utils library. The code will typically run in a Vite-powered Vue environment, targeting components, composables, and related utilities. Tests should aim to be clear, maintainable, and leverage best practices for Vue component testing and mocking.

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
- Organize test files and suites logically by feature or component
- Group related tests using `describe` blocks
- Order tests from simple to complex scenarios
- Use `beforeEach` and `afterEach` or `beforeAll` and `afterAll` for common setup and teardown
- Keep individual tests focused on a single behavior (see AAA Pattern below)

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
  - `emits [event name] when [condition]`
  - `calls [method/function] with [parameters] when [condition]`
- Keep descriptions concise but specific enough to understand the test without reading the code

### Updating and Maintaining Documentation
- Keep test documentation synchronized with code changes.
- Note the status of tests.
- Maintain traceability to requirements or user stories when possible.

### The AAA Pattern (Arrange-Act-Assert)

The **AAA pattern** is a fundamental structure for organizing unit tests that makes them clear, consistent, and maintainable. Each test should be divided into three distinct phases:

#### 1. Arrange
Set up the test conditions, including:
- Creating component instances or test data
- Configuring props, mocks, or dependencies
- Establishing the initial state

#### 2. Act
Execute the behavior being tested:
- Trigger user interactions (clicks, inputs, etc.)
- Call methods or functions
- Simulate events or state changes

#### 3. Assert
Verify the expected outcome:
- Check component output or state
- Validate emitted events
- Confirm expected behavior occurred

#### Relationship to BDD (Given-When-Then)

The AAA pattern aligns closely with BDD's Given-When-Then style:
- **Arrange** = **Given** (setup/preconditions)
- **Act** = **When** (action/trigger)
- **Assert** = **Then** (expected outcome)

Both patterns achieve the same goal: clear, readable tests that follow a logical flow.

#### Vue-Specific AAA Examples

**Example 1: Testing Component Rendering**

```typescript
it('displays user name when provided as prop', () => {
  // Arrange: Set up the component with test data
  const userName = 'Jane Doe'
  const wrapper = mount(UserProfile, {
    props: { name: userName }
  })

  // Act: (No action needed for initial render test)

  // Assert: Verify the expected output
  expect(wrapper.text()).toContain(userName)
})
```

**Example 2: Testing User Interaction**

```typescript
it('increments counter when button is clicked', async () => {
  // Arrange: Mount component and locate the button
  const wrapper = mount(Counter)
  const button = wrapper.find('button[data-testid="increment"]')

  // Act: Trigger the user interaction
  await button.trigger('click')

  // Assert: Verify the state change
  expect(wrapper.find('[data-testid="count"]').text()).toBe('1')
})
```

**Example 3: Testing Event Emission**

```typescript
it('emits selected event with correct payload when item clicked', async () => {
  // Arrange: Mount component with props and locate element
  const testItem = { id: 1, name: 'Test Item' }
  const wrapper = mount(ItemList, {
    props: { items: [testItem] }
  })
  const item = wrapper.find('[data-testid="item-1"]')

  // Act: Trigger the interaction
  await item.trigger('click')

  // Assert: Verify event emission and payload
  expect(wrapper.emitted('selected')).toBeTruthy()
  expect(wrapper.emitted('selected')?.[0]).toEqual([testItem])
})
```

**Example 4: Testing with Mocks**

```typescript
it('calls API service when form is submitted', async () => {
  // Arrange: Set up mocks and mount component
  const mockApiCall = vi.fn().mockResolvedValue({ success: true })
  const wrapper = mount(SubmitForm, {
    global: {
      mocks: {
        $api: { submit: mockApiCall }
      }
    }
  })

  // Act: Fill form and submit
  await wrapper.find('input').setValue('test data')
  await wrapper.find('form').trigger('submit')

  // Assert: Verify the API was called correctly
  expect(mockApiCall).toHaveBeenCalledOnce()
  expect(mockApiCall).toHaveBeenCalledWith({ data: 'test data' })
})
```

#### Best Practices for AAA Pattern

- **Use comments or blank lines** to visually separate the three phases in complex tests
- **Keep each phase focused**: Arrange should only set up, Act should only execute, Assert should only verify
- **Single Act per test**: Each test should typically have one action being tested
- **Multiple Asserts are OK**: You can verify multiple aspects of the outcome in the Assert phase
- **Arrange can be extracted**: Use `beforeEach` for common setup, but ensure tests remain readable
- **Be explicit**: Even in simple tests, the AAA structure should be apparent

#### When to Deviate

While AAA is the recommended default, some tests may not need all three phases:
- **Render-only tests** may only need Arrange + Assert (no Act)
- **Very simple tests** may combine phases for brevity when clarity isn't compromised
- Always prioritize **readability and maintainability** over strict adherence to patterns

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

- Use `mount` from Vue Test Utils to fully render components with all child components
- Use `shallowMount` if you want to stub child components for unit isolation
- Pass props, slots, and global configuration through the mounting options object

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

### Using Fake Timers (`useFakeTimers` / `runFakeTimers`)

Fake timers are useful for testing code that relies on timeouts, intervals, or other timer-based APIs. They allow you to control and advance time programmatically, making tests faster and more predictable.

#### When to Use Fake Timers
- When your component or composable uses `setTimeout`, `setInterval`, or similar APIs.
- When you need to simulate the passage of time without waiting for real time to elapse.
- For testing debounce, throttle, animation, or delayed logic.

#### How to Use Fake Timers in Vitest
- Use `vi.useFakeTimers()` to enable fake timers before your test logic.
- Use `vi.runAllTimers()`, `vi.advanceTimersByTime(ms)`, or `vi.runOnlyPendingTimers()` to control timer execution.
- Always restore real timers after your test using `vi.useRealTimers()` or in a cleanup hook.

#### Example: Testing a Debounced Function

```typescript
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import ComponentToTest from './ComponentToTest.vue'

describe('ComponentToTest', () => {
  it('calls debounced method after timeout', async () => {
    vi.useFakeTimers()
    const wrapper = mount(ComponentToTest)
    wrapper.vm.triggerDebounce()
    vi.advanceTimersByTime(300)
    expect(wrapper.vm.debouncedCalled).toBe(true)
    vi.useRealTimers()
  })
})
```

#### Example: Using Fake Timers with `nextTick`

```typescript
import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import TimerComponent from './TimerComponent.vue'

describe('TimerComponent', () => {
  it('updates after interval', async () => {
    vi.useFakeTimers()
    const wrapper = mount(TimerComponent)
    vi.advanceTimersByTime(1000)
    await nextTick()
    expect(wrapper.text()).toContain('Timer fired!')
    vi.useRealTimers()
  })
})
```

**Tip:** Always clean up by restoring real timers after your test to avoid affecting other tests.

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

---

### Testing Components with `defineModel()` (Vue 3.4+)

Starting with Vue 3.4, `defineModel()` is the definitive way to implement two-way data binding in components, replacing the legacy `v-model` pattern with manual `modelValue` props and `update:modelValue` emits. When testing components that use `defineModel()`, you need to understand how Vue Test Utils interacts with this pattern.

#### Key Concepts

- **`defineModel()` creates a writable computed ref** that automatically syncs with the parent's `v-model` binding.
- **When testing, you must pass `modelValue` as a prop** to simulate the parent's binding.
- **Updates to the model automatically emit `update:modelValue`** events that you can assert on.
- **You can directly modify the model value** in tests by updating the wrapper's props.

#### Testing Pattern: Reading and Writing Model Values

When testing a component that uses `defineModel()`, follow these patterns:

**Example Component:**
```typescript
<script setup lang="ts">
const model = defineModel<string>({ default: '' })
</script>

<template>
  <input v-model="model" type="text" />
</template>
```

**Test: Initial Model Value**
```typescript
it('renders with initial modelValue prop', () => {
  // Arrange: Pass modelValue as a prop
  const wrapper = mount(InputComponent, {
    props: { modelValue: 'initial value' }
  })

  // Assert: Verify the input displays the value
  expect(wrapper.find('input').element.value).toBe('initial value')
})
```

**Test: Model Updates Emit Events**
```typescript
it('emits update:modelValue when input changes', async () => {
  // Arrange: Mount with initial value
  const wrapper = mount(InputComponent, {
    props: { modelValue: '' }
  })

  // Act: Simulate user input
  await wrapper.find('input').setValue('new value')

  // Assert: Verify the event was emitted with correct payload
  expect(wrapper.emitted('update:modelValue')).toBeTruthy()
  expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value'])
})
```

**Test: Updating Model Value from Parent**
```typescript
it('updates input when modelValue prop changes', async () => {
  // Arrange: Mount with initial value
  const wrapper = mount(InputComponent, {
    props: { modelValue: 'initial' }
  })

  // Act: Simulate parent updating the prop
  await wrapper.setProps({ modelValue: 'updated value' })

  // Assert: Verify the input reflects the new value
  expect(wrapper.find('input').element.value).toBe('updated value')
})
```

#### Testing Named Models

Components can define multiple models using named `defineModel()`:

**Example Component:**
```vue
<script setup lang="ts">
const title = defineModel<string>('title')
const content = defineModel<string>('content')
</script>
```

**Test: Named Models**
```typescript
it('handles multiple named models correctly', async () => {
  // Arrange: Pass named model values as props
  const wrapper = mount(MultiModelComponent, {
    props: {
      title: 'My Title',
      content: 'My Content'
    }
  })

  // Act: Trigger changes
  await wrapper.find('[data-testid="title-input"]').setValue('New Title')

  // Assert: Verify named event emission
  expect(wrapper.emitted('update:title')?.[0]).toEqual(['New Title'])
  expect(wrapper.emitted('update:content')).toBeFalsy() // Other model unchanged
})
```

#### Testing Model Options and Transformers

`defineModel()` supports options like `get` and `set` transformers:

**Example Component with Transformer:**
```vue
<script setup lang="ts">
const model = defineModel({
  get: (value: string) => value?.toUpperCase() || '',
  set: (value: string) => value?.toLowerCase() || ''
})
</script>
```

**Test: Model Transformations**
```typescript
it('applies transformers when reading and writing model', async () => {
  // Arrange: Mount with lowercase value
  const wrapper = mount(TransformerComponent, {
    props: { modelValue: 'hello' }
  })

  // Assert: Getter transforms to uppercase for display
  expect(wrapper.find('input').element.value).toBe('HELLO')

  // Act: User types uppercase
  await wrapper.find('input').setValue('WORLD')

  // Assert: Setter emits lowercase value
  expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['world'])
})
```

#### Common Pitfalls and Solutions

**Pitfall 1: Forgetting to Pass `modelValue` Prop**
```typescript
// ❌ Wrong - model will use default value, not your test value
const wrapper = mount(InputComponent)

// ✅ Correct - explicitly pass modelValue
const wrapper = mount(InputComponent, {
  props: { modelValue: 'test value' }
})
```

**Pitfall 2: Not Using `await` with setValue or setProps**
```typescript
// ❌ Wrong - assertion runs before DOM updates
wrapper.find('input').setValue('new value')
expect(wrapper.emitted('update:modelValue')).toBeTruthy() // May fail

// ✅ Correct - wait for updates
await wrapper.find('input').setValue('new value')
expect(wrapper.emitted('update:modelValue')).toBeTruthy()
```

**Pitfall 3: Assuming Direct Model Access in Tests**
```typescript
// ❌ Wrong - you cannot directly access the model ref from tests
wrapper.vm.model = 'new value'

// ✅ Correct - update via props to simulate parent binding
await wrapper.setProps({ modelValue: 'new value' })
```

#### Best Practices

- **Always pass `modelValue` (or named model props)** when mounting components that use `defineModel()`.
- **Test both directions**: verify the component receives prop updates AND emits update events.
- **Use `data-testid` attributes** to reliably select elements in complex components.
- **Test edge cases**: empty values, `null`/`undefined`, type coercion, and validation.
- **Verify emitted event payloads** using `wrapper.emitted()` to ensure correct values.
- **Consider testing the component in a parent wrapper** that actually uses `v-model` for integration testing.

#### Integration Testing with `v-model`

For more realistic integration tests, wrap your component in a parent that uses `v-model`:

```typescript
it('works with actual v-model binding', async () => {
  // Arrange: Create a parent component that uses v-model
  const ParentComponent = {
    components: { InputComponent },
    template: `
      <div>
        <InputComponent v-model="value" />
        <span data-testid="output">{{ value }}</span>
      </div>
    `,
    setup() {
      const value = ref('initial')
      return { value }
    }
  }

  const wrapper = mount(ParentComponent)

  // Act: Change the input
  await wrapper.find('input').setValue('changed')

  // Assert: Parent's reactive value updates
  expect(wrapper.find('[data-testid="output"]').text()).toBe('changed')
})
```

---

## Test Organization
- Place test files alongside components using `.spec.js` or `.spec.ts` suffixes.
- Name the test file to match the component name, e.g., `MyComponent.{spec.js,spec.ts}` for `MyComponent.vue`.
- Keep composables and pure logic separated and tested independently.

## Running Tests and Code Coverage
After writing error-free tests, follow these steps to validate and measure test coverage:

1. **Run the test suite:**
   - Use `npm run test` for a standard test run.
   - Use `npm run test:clean` if snapshots are present to ensure a clean test environment.
   - Use `npm run test:watch` for continuous testing during development.

2. **Generate a coverage report:**
   - After tests pass successfully, run `npm run coverage` to generate a comprehensive code coverage report.
   - Review the coverage report to identify untested code paths and ensure adequate test coverage.

All test and coverage scripts are defined in your `package.json` file.

## Best Practices & Tips
- Use single-quotes (`'`) for test case and scenario descriptions; avoid double quotes for consistency.
- Encourage separation of logic into composables for easier unit testing.
- Use Vue Test Utils' `find` and `findComponent` for precise querying.
- Prefer testing emitted events over internal component state.
- Use Vitest's global APIs (`describe`, `it`, `expect`) without imports thanks to `globals:true` config.
- Mock external dependencies and asynchronous calls to isolate unit tests.
- Consider snapshot testing for components to ensure UI consistency.

 ## JavaScript with TypeScript Best Practices
- Follow the TypeScript guidelines and rules defined in [`typescript.instructions.md`](./typescript.instructions.md) for type safety, code style, and best practices.
- Code style and quality are enforced using ESLint. Refer to [`eslint.config.js`](../../eslint.config.js) for linting rules and configuration.