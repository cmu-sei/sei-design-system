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