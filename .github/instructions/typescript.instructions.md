---
applyTo: "src/**/*.ts"
---

# Writing JavaScript with TypeScript
TypeScript enhances JavaScript development by adding static typing, improved tooling, and safer code practices. This guide outlines recommended conventions and best practices for writing maintainable, robust TypeScript code in this project.

---

## General Style and Best Practices
- Write clean, readable, and well-structured code using modern ES6+ syntax combined with TypeScript's static typing features.
- Use `const` and `let` for variable declarations; avoid `var` to enhance block scoping and prevent accidental variable redeclarations.
- Prefer strict equality operators (`===` and `!==`) over loose equality (`==` and `!=`) for type-safe comparisons.
- Favor template literals over string concatenation for readability, especially when embedding expressions or multiline strings.
- Code style and quality are enforced using ESLint. Refer to [`eslint.config.js`](../../../eslint.config.js) for linting rules and configuration.

## TypeScript-Specific Guidelines
- Emphasize strong typing by avoiding the `any` or `unknown` type; always provide explicit types to variables, parameters, and function return values where relevant to leverage TypeScript's static analysis. Look for type definitions in the codebase first to avoid unnecessary type definitions and redundancy.
- Use union types or literal types to restrict values when possible, e.g., `type Status = 'success' | 'failure'`.
- Prefer interfaces or type aliases to describe object shapes clearly and consistently.
- Use TypeScript's utility types (e.g., `Partial<T>`, `Readonly<T>`, `Pick<T, K>`) for concise and expressive code reuse.
- Enable and adhere to strict compiler options (`strict: true`) in `tsconfig.json` to maximize type safety.
- Avoid type assertions with `as` or `!`.

## Code Structure and Readability
- Name variables and functions clearly and descriptively; avoid ambiguous names or overly long names.
- Keep functions short and focused; avoid excessive parameters or flags in function signatures.
- Use destructuring and spread operators to write concise and readable object and array manipulations.
- Prefer pure functions and immutable data patterns; use `readonly` modifiers for properties that should not change after initialization.
- Comment only when necessary to explain "why" something is done, not "what" is done if the code is self-explanatory.

## Nomenclature
- Use camelCase for variable and function names, PascalCase for class and interface names, and UPPER_SNAKE_CASE for constants.
- Use camelCase for both directory and file names.
- Use uppercase for environment variables (e.g., `NODE_ENV`).
- Use meaningful prefixes for boolean variables (e.g., `is`, `has`, `can`) to indicate their purpose.
- Avoid using abbreviations or acronyms unless they are widely understood.
- Use consistent naming conventions for similar concepts (e.g., `createUser` vs. `deleteUser`).

## Error Handling and Safety
- Handle potential JavaScript and TypeScript errors using `try/catch`, and prefer Promises or async/await over callbacks for asynchronous code.
- Validate external inputs and avoid trusting any data from external sources without type guards or validation checks.

## Patterns and Conventions
- Avoid enums; use objects or maps instead.
- Use functional and declarative programming styles, or patterns, where appropriate to improve code readability and maintainability.
- Avoid using classes. Prefer composition over inheritance to create reusable and flexible code structures.

## Documentation Guidelines

All JSDoc comments in TypeScript code should follow these guidelines:

- Use JSDoc comment blocks (`/** ... */`) above functions, types, interfaces, and important variables to describe their purpose, parameters, and return values.
- Document all public APIs, exported functions, and complex logic. Private/internal code should be documented only if non-obvious.
- Include `@param` for each parameter, specifying its type and purpose.
- Include `@returns` (or `@return`) for function return values, describing the type and meaning.
- Use `@typedef`, `@type`, and `@property` for custom types and object shapes when needed.
- Prefer concise, clear descriptions. Avoid redundant comments that repeat what the code already expresses.

**Example:**

```typescript
/**
 * Calculates the sum of two numbers.
 * @param a - The first number.
 * @param b - The second number.
 * @returns The sum of a and b.
 */
export function add(a: number, b: number): number {
	return a + b;
}
```

## Reference Documentation

For further details, best practices, and language features, consult the following official documentation resources:

- **TypeScript Official Documentation**: Comprehensive guide to TypeScript language features, configuration, and tooling.
	- https://www.typescriptlang.org/docs/
- **MDN Web Docs (JavaScript Reference)**: Authoritative resource for JavaScript syntax, APIs, and browser compatibility.
	- https://developer.mozilla.org/en-US/docs/Web/JavaScript
- **JSDoc Documentation**: Official guide for JSDoc syntax, tags, and usage examples.
	- https://jsdoc.app/