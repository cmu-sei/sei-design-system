# Context

This glossary defines the user-facing concepts, patterns, and surfaces used across the SEI Design System.

## Foundations

### SEI Design System
A reusable library of visual patterns, interaction patterns, layout shells, and data-display elements used to build consistent SEI interfaces.

### Theme
A named visual mode that changes presentation while preserving meaning and behavior.

### Forge
A theme variant used for product-style and application-style surfaces.

### Plaid
A theme variant used for editorial, brochure-style, and branded content surfaces.

### Typography Scale
A theme-aware set of text roles for headings, leads, body copy, and captions.

### Section
A reusable content block that groups related information under a shared presentation treatment.

### Structured Page
A page-level arrangement that gives sections a predictable reading order and page rhythm.

## Application Shells

### Application
A full-screen application shell with navigation, content regions, and responsive behavior for tool-like experiences.

### Simple Application
A lighter application shell for experiences that need application framing without the full application suite structure.

### Brochure Site
A page shell for public-facing or editorial content, usually paired with Plaid styling and brochure-style navigation.

### Brochure Site Header
The top navigation and identity area of a brochure site.

### Brochure Site Footer
The closing area of a brochure site that carries secondary navigation, attribution, or supporting links.

### Wordmark
A branded text-based identity mark used to represent SEI or a brochure-style property.

## Navigation

### Navigation Item
A labeled wayfinding element that leads the user to another page, section, or interaction state.

### Mega Menu
A top-level navigation surface that reveals structured panels of navigation choices and supporting content.

### Mega Menu Item
A navigation choice or content block inside a mega menu panel.

### Mobile Menu
A small-screen navigation surface that replaces larger navigation structures with a panel-based flow.

### Tabs
A set of peer views where one labeled view is active at a time.

### Active Tab
The tab whose panel or content is currently visible.

### Scrollspy
A navigation aid that tracks reading position and highlights the currently active section.

### Paginator
A control that moves the user between pages of a multi-page result set or content set.

### Paginator Range
The part of pagination that explains which items or pages are currently in view.

## Actions and Controls

### Button
A general-purpose action control that initiates a command.

### Action Button
A compact or utility-style button used in dense toolbars, menus, or supporting actions.

### Action Dropdown
An action launcher that reveals a short list of related commands.

### Floating Action Button
A persistent, high-emphasis action control that stays available above surrounding content.

### Link
A navigation-oriented text or inline element that leads somewhere else rather than performing an in-place command.

### Toggle Switch
A two-state control for enabling or disabling a setting.

## Form and Input

### Form Group
A labeled field container that supplies shared context such as help text, required state, or validation state.

### Input
A single-line freeform text field.

### Textarea
A multi-line freeform text field.

### Select
A field for choosing one value from a fixed set of options.

### Multiselect
A field for choosing more than one value from a set of options.

### Checkbox Group
A set of independent choices where any number of choices may be selected.

### Radio Group
A set of mutually exclusive choices where exactly one choice may be selected.

### Character Counter
A helper that communicates how much text has been entered relative to an expected limit.

### Datepicker
A date-entry surface that lets the user choose a date through calendar interaction rather than raw typing alone.

### Calendar
A calendar surface used to choose a date, a date range, or time-related values depending on mode.

### ComboBox
A text input that presents a suggestion list and lets the user either enter free text, choose from suggestions, or create new tagged values depending on its mode.

### Query
The current user-entered text shown in the ComboBox input before it is committed as a selection.

### Suggestion
A candidate value presented by a ComboBox for selection. A suggestion may be a simple text value or a structured object, but it is always treated as one selectable choice.

### Suggestion Group
A labeled collection of suggestions presented as one navigable category inside a ComboBox.

### Selection
A value the user has committed from a ComboBox. In single-select modes there is one selection at most. In multi-select modes there may be many selections.

### Select-All Scope
The visible suggestion set affected by a ComboBox select-all action. When the user is viewing a specific suggestion group, the scope is that group. Otherwise the scope is the full visible suggestion set.

### File Uploader
A field that accepts one or more user-provided files and communicates validity, size, and selection state.

## Overlays and Floating Surfaces

### Overlay
An interaction surface such as a modal, panel, or mobile menu that temporarily takes foreground control, contains focus, and suppresses background page interaction while it is open.

### Overlay Close Lifecycle
The period between the user initiating close and the overlay fully yielding control back to the page. During this lifecycle the overlay still owns focus restoration and background scroll suppression.

### Focus Restoration
Returning keyboard focus to the element that launched or previously owned interaction before the overlay opened.

### Scroll Suppression
Preventing background page scrolling while an overlay owns foreground interaction.

### Modal
An overlay that interrupts the surrounding page until the user dismisses it or completes a task.

### Panel
An overlay that slides in from an edge or rises from the bottom to show focused supporting content without replacing the whole page.

### Popover
A small contextual overlay anchored to a trigger and used for lightweight supporting content or actions.

### Tooltip
A brief contextual explanation that appears near a trigger without taking over the interaction flow.

### Floating UI
The anchored positioning pattern used by floating surfaces such as dropdowns, popovers, tooltips, and ComboBox suggestion lists.

### Dropdown
A floating list of actions, options, or content sections anchored to a trigger.

### Dropdown Item
A selectable or actionable row within a dropdown.

### Dropdown Checkbox Item
A dropdown row that participates in multi-selection.

### Dropdown Radio Item
A dropdown row that participates in single selection within a group.

### Dropdown Header
A non-selectable heading row used to label a dropdown region.

### Dropdown Footer
A closing region of a dropdown used for summary or supporting actions.

### Dropdown Section
A labeled grouping of rows inside a dropdown.

### Dropdown Divider
A visual separator between dropdown regions.

### Dropdown Input Item
A dropdown row that contains input behavior rather than acting as a simple selection row.

### Filter-By Dropdown
A dropdown specialized for narrowing a result set according to selected criteria.

### Sort-By Dropdown
A dropdown specialized for choosing the ordering of a result set.

## Feedback and Status

### Callout
A visually distinct message block used to emphasize important information, guidance, or status.

### Badge
A compact label that communicates status, category, or emphasis.

### Indicator
A small visual signal that communicates state, severity, or availability.

### Tag
A compact labeled token representing a selected value, category, or removable item.

### Toast
A transient feedback message that appears without fully interrupting the current task.

### Toaster
The region or controller that presents one or more toast messages.

### Loading Spinner
A compact motion-based signal that work is in progress.

### Loading Skeleton
A placeholder shape that previews layout while real content is loading.

### Expand Collapse
A pattern for progressively revealing or hiding content in place.

### Table
A structured grid of rows and columns used to compare or scan detailed records.

### Data Table
A higher-level tabular experience that combines a table with filtering, sorting, pagination, or supporting controls.

### Datapoint
A compact presentation of one labeled value or metric.

### Top Five Chart
A ranked data presentation focused on the top entries in a result set.

## Data Visualization

### Base Chart
A shared charting surface that provides common visual framing for chart types.

### Chart Axis
The reference line and labels that orient chart values.

### Chart Legend
The explanation of how visual marks map to categories or series.

### Chart Tooltip
The contextual detail shown for a hovered or focused chart value.

### Bar Chart
A chart that compares values using bar length.

### Pie Chart
A chart that shows part-to-whole relationships using slices of a circle.

### Heatmap Chart
A chart that shows variation across a matrix or grid using color intensity.

## Identity and Media

### Avatar
A visual token representing a person, identity, or participant.

### Avatar Group
A compact presentation of multiple avatars within one shared footprint.

### SVG Icon
A scalable symbol used to reinforce actions, categories, or status.

### SEI Wordmark
The primary SEI-branded wordmark surface used in the design system.

## Layout and Reading Aids

### Scroll Area
A constrained region with its own scrollable content.

### Resizer
A handle or affordance that changes the size of an adjacent region.

# Technical Context

This section defines the shared technical expectations for applications that consume the SEI Design System. Copy it into a consuming repository, then document any application-specific exceptions next to the relevant guidance rather than changing the meaning of the SDS terms above.

## Technology Stack

### Runtime

- **Vue 3** is the component runtime and a peer dependency of `@cmu-sei/sei-design-system`.
- **TypeScript** defines component props, events, slots, composables, and public declaration files. Consuming applications should retain strict type checking at their SDS integration boundaries.
- **Tailwind CSS 4** provides design tokens, themes, variants, utilities, and component-level CSS. Consumers compile the shipped `tailwindcss/tailwind.css` source as part of their application CSS pipeline.
- **CSS custom properties** carry theme and component tokens at runtime. Forge, Plaid, and dark-mode selectors change presentation without changing component behavior or application data.
- **Floating UI** supports anchored surfaces such as dropdowns, popovers, tooltips, and ComboBox suggestion lists.
- **D3** supports chart calculations and rendering where a data-visualization component requires it.

### Build and Packaging

- **Node.js 20.17 or newer** and npm are required to build the design-system package.
- **Vite and Rollup** produce the library artifacts. The package publishes an ES module entry, a UMD entry, CSS, TypeScript declarations, Volar global-component declarations, source files, fonts, and Storybook documentation.
- **Vue remains external** to the library bundle. The consuming application owns the Vue runtime and must provide a compatible Vue 3 version.
- The package supports global registration through its default Vue plugin and named component imports through the package entry point. Consumers should prefer named imports when their bundler can remove unused exports.
- The package declares `sideEffects: false` to support dead-code elimination. Consumers must import the SDS Tailwind source or generated CSS explicitly; JavaScript imports do not implicitly install global styles.

### Development and Verification

- **Vitest, jsdom, and Vue Test Utils** cover component and composable behavior.
- **Storybook** documents component contracts and provides isolated visual and interaction examples.
- **ESLint and vue-tsc** enforce code quality and type safety.
- The release verification pipeline runs linting, tests, the Vite library build, TypeScript declaration generation, Volar declaration generation, and the Storybook build before publication.

## System Architecture Flows

### Dependency and Styling Flow

1. The consuming application pins a released `@cmu-sei/sei-design-system` version in its package manifest and lockfile.
2. The application provides compatible Vue 3 and Tailwind CSS 4 peer dependencies.
3. The application imports named SDS components or installs the SDS plugin for global component registration.
4. The application CSS entry imports `@cmu-sei/sei-design-system/tailwindcss/tailwind.css`, either directly or through a shared base package.
5. Tailwind scans the consuming application and the SDS source declared by the SDS stylesheet, resolves tokens and variants, and emits the application CSS bundle.
6. A theme selector supplies Forge, Plaid, and dark-mode token values to descendants. Components consume those values without owning application-level theme state.

### Rendering and Interaction Flow

1. The application or route owns domain data, authorization, navigation, and asynchronous operations.
2. The application passes serializable data and configuration into SDS components through typed props and models.
3. An SDS component renders semantic HTML and manages presentation-level state such as focus, selection, disclosure, keyboard navigation, and validation display.
4. The component emits typed events or model updates in response to user interaction.
5. The application validates the event against domain rules, changes application state, and passes the resulting state back to the component.

SDS components must not become the source of truth for application records or business workflows. Components may own temporary interaction state, but domain state and side effects remain in the consuming application.

### Overlay and Floating-Surface Flow

1. An application-controlled trigger opens an overlay or anchored floating surface.
2. SDS positions the surface and manages its interaction boundary, including keyboard handling, focus containment where applicable, and background scroll suppression for overlays.
3. User actions emit intent back to the application; they do not bypass application authorization or validation.
4. During the close lifecycle, the overlay continues to own focus restoration and scroll suppression.
5. After close completes, focus returns to the initiating element when it is still available and the page regains normal scrolling.

### Asynchronous Data Flow

1. The application receives an SDS query, pagination, filtering, sorting, upload, or selection event.
2. The application debounces or cancels superseded requests where appropriate and calls its API or service layer.
3. SDS displays application-provided pending, empty, success, or error state without owning transport credentials or API clients.
4. The application normalizes and validates the response before passing data into SDS.
5. Large option and row collections use pagination or virtualization rather than rendering an unbounded DOM collection.

### Release and Adoption Flow

1. Changes are reviewed and pass lint, unit tests, type checking, the library build, declaration generation, and Storybook build.
2. A beta package is published from `develop` for integration testing.
3. A production release is created from `main` under semantic versioning and published to the package registry.
4. A consuming repository updates its manifest and lockfile to an explicit released version.
5. The consumer runs its own build, tests, accessibility checks, and performance checks before deployment. A successful SDS package release does not replace consumer-level verification.

## Performance Targets

Performance is a shared responsibility. SDS supplies reusable rendering and interaction primitives; the consuming application controls route composition, data volume, network behavior, asset loading, and deployment infrastructure. Measure production builds under representative data and device conditions.

### User-Experience Targets

At the 75th percentile of real-user measurements, on both mobile and desktop:

| Metric | Target |
| --- | --- |
| Largest Contentful Paint (LCP) | 2.5 seconds or less |
| Interaction to Next Paint (INP) | 200 milliseconds or less |
| Cumulative Layout Shift (CLS) | 0.1 or less |

For local component interactions that do not require a network response:

- Visual acknowledgement should appear in the next animation frame when practical and within 100 milliseconds.
- Keyboard navigation, selection, disclosure, and overlay open/close interactions should not create tasks longer than 50 milliseconds.
- Focus restoration and background scroll release must complete with the overlay close lifecycle, without an additional perceptible delay.

Network-backed controls must show a pending or optimistic state within 100 milliseconds. The API response time is an application service-level objective and must be measured separately from SDS rendering time.

### Rendering and Collection Targets

- Do not render unbounded tables, menus, or suggestion lists. Paginate or virtualize collections when representative data causes long tasks, missed interaction targets, or excessive DOM growth.
- Keep rendered DOM proportional to the visible interface. Virtualized collections should render the visible range plus only the overscan required for smooth keyboard and pointer scrolling.
- Reserve stable dimensions for images, charts, loading placeholders, and async content to protect the CLS target.
- Avoid layout reads and writes inside unthrottled scroll, resize, pointer-move, and input loops. Use the SDS debounce, throttle, resize-observer, and virtual-scroller patterns where applicable.
- Motion must not block input and must honor reduced-motion preferences.

### Asset and Bundle Targets

- Use named component imports unless global registration is an explicit application requirement.
- Import only the icon sets, fonts, charting capabilities, and SDS surfaces required by the application.
- Lazy-load route-specific heavy surfaces, especially charts, data-intensive views, and infrequently opened workflows.
- Establish compressed JavaScript and CSS baselines from the production build. Pull requests must report and justify any SDS-related increase greater than 10 KB compressed or 5 percent for an affected entry chunk, whichever threshold is reached first.
- Treat duplicate Vue runtimes or duplicate major versions of SDS dependencies as build failures.

Absolute bundle-size limits are application-specific and must be recorded in the consuming repository after a representative production baseline is measured. They are not inferred from the size of the complete SDS package, because consumers use different component and data-visualization subsets.

### Verification Gates

- Run unit tests, type checking, linting, and the production build for every SDS dependency update.
- Exercise changed components in Storybook or an equivalent isolated harness at supported viewport and container widths.
- Run automated accessibility checks and keyboard verification for changed interaction flows.
- Run a mobile and desktop Lighthouse or equivalent lab test on affected critical routes; investigate regressions before merge.
- Collect real-user Core Web Vitals where the deployment platform permits it. Lab results guide development, while field measurements determine whether the user-experience targets are met.
