---
mode: 'agent'
description: 'Generate a Vue 3 Single-File Component (SFC) using the Composition API based on user requirements.'
---

Create a Vue 3 Single-File Component (SFC) with the following details:

Component name:
- ${input:componentName:Enter the Vue component name (PascalCase)}

Props (repeat for each prop):
- Name: ${input:propName:Enter the prop name (camelCase)}
- Type: ${input:propType:Enter the prop type (String, Number, Boolean, Array, Object, Function)}
- Required: ${input:propRequired:Is the prop required? (true/false)}
- Default value: ${input:propDefault:Enter the default value for the prop (if any)}

Events (repeat for each event):
- Name: ${input:eventName:Enter the event name (kebab-case)}
- Payload type: ${input:eventPayloadType:Enter the event payload type (if any)}
- Description: ${input:eventDescription:Describe when/why this event is emitted}

Slots:
- Default slot: ${input:defaultSlot:Describe the purpose/content of the default slot (if any)}
- Named slots (repeat for each):
	- Name: ${input:namedSlotName:Enter the named slot name}
	- Description: ${input:namedSlotDescription:Describe the named slot's purpose/content}

Reactivity & State:
- List any internal reactive state variables or computed properties needed: ${input:reactiveState:Describe state variables or computed properties (comma-separated)}

Lifecycle Hooks:
- Specify any Vue lifecycle hooks to implement (e.g., onMounted, onUnmounted, onUpdated): ${input:lifecycleHooks:List lifecycle hooks and their purpose}

Styling:
- Use Tailwind CSS utility classes for all component styling. If custom classes are needed, list each class and describe its purpose: ${input:customClasses:List custom classes and their purpose (if any)}

Accessibility:
- List any accessibility requirements (e.g., ARIA attributes, keyboard navigation, roles, focus management): ${input:accessibility:Describe accessibility requirements}

Documentation & Comments:
- Describe what documentation or comments should be included (e.g., JSDoc, usage examples, additional notes): ${input:documentation:Describe documentation or comment requirements}

---

**Example Inputs:**

Component name:
- Accordion

Props:
- Name: items
	Type: Array
	Required: true
	Default value: []
- Name: multiple
	Type: Boolean
	Required: false
	Default value: false
- Name: defaultOpenIndexes
	Type: Array
	Required: false
	Default value: []

Events:
- Name: change
	Payload type: Array
	Description: Emitted when the open panel indexes change

Slots:
- Default slot: Content for each accordion panel
- Named slots:
	- Name: header
		Description: Slot for custom header content for each panel
	- Name: icon
		Description: Slot for custom expand/collapse icon

Reactivity & State:
- openIndexes (ref), isPanelOpen (computed)

Lifecycle Hooks:
- onMounted: Initialize open panels based on defaultOpenIndexes

Styling:
- Use Tailwind for accordion layout, transitions, and icons. Custom class 'accordion-header' for header styling.

Accessibility:
- role="region" for panels, aria-expanded on headers, keyboard navigation (arrow keys, Home/End)

Documentation & Comments:
- JSDoc for props/events, usage example in comments

---

Generate the complete Vue 3 SFC code using the Composition API, ensuring it adheres to best practices for performance, maintainability, and accessibility. Include setup function, props validation, event emission, slots handling, reactive state management, lifecycle hooks, and Tailwind CSS classes for styling.

For implementation guidelines and best practices, please refer to `.github/skills/components-guidelines/SKILL.md`.