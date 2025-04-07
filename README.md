# @cmu-sei/sei-design-system

Vue Components and Tailwind CSS for the SEI Design System.

## Contributing

To contribute, please visit [Contributing to the SEI Design System](https://wiki-int.sei.cmu.edu/confluence/x/FpkmGQ)

## Recommended IDE Setup

We recommend the use of [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar) with VS Code.

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can use the following:
