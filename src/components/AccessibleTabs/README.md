# Tabs Component Accessibility Documentation

## Overview

The AccessibleTabs component creates an accessible tabbed interface following the WAI-ARIA Tabs Pattern.

## WCAG 2.1 AA Compliance Requirements

### Perceivable

* **Color and Contrast (1.4.3)**
  * Tab borders/indicators: 4.5:1 contrast ratio
  * Active tab state clearly visible
  * Focus indicators highly visible
  * Text content readable in all states

* **Visual Presentation (1.4.8)**
  * Clear visual hierarchy of tabs and panels
  * Active tab visually connected to panel
  * Focus states clearly visible
  * Consistent spacing and alignment

* **Adaptable Content (1.3.1)**
  * Proper HTML structure preserved
  * Visual order matches DOM order
  * Semantic relationship between tabs/panels
  * Layout adapts to viewport size

### Operable

* **Keyboard Navigation (2.1.1)**
  * Arrow keys navigate between tabs
  * Home/End keys for first/last tab
  * Tab key follows document flow
  * Enter/Space activate tabs

* **Target Size (2.5.5)**
  * Tabs minimum 44x44px
  * Adequate spacing between tabs
  * Clear click targets

* **Motion and Animation (2.3.3)**
  * Tab transitions respect reduced-motion
  * No content flashing
  * Smooth state changes

### Understandable (continued)

* **Navigation (3.2.3)**
  * Clear tab labels
  * Consistent tab behavior
  * Logical content organization

* **Predictable (3.2.4)**
  * Consistent tab positioning
  * Expected keyboard controls
  * Clear state changes

### Robust

* **Compatibility (4.1.2)**
  * ARIA roles and states:
    * role="tablist" for container
    * role="tab" for tabs
    * role="tabpanel" for content
    * aria-selected states
    * aria-controls/labelledby relationships

## Component API

### Attributes

| Attribute | Description | ARIA Impact |
|-----------|-------------|-------------|
| tab-label | Tab button text | Tab accessible name |
| active-tab | Current active tab ID | Controls aria-selected |

### Events

| Event | Detail | Description |
|-------|--------|-------------|
| tab-change | { tabId } | Fired when active tab changes |

### States

| State | Visual Indicator | Accessibility Feature |
|-------|-----------------|----------------------|
| Default | Base styling | Proper tab/panel roles |
| Selected | Border indicator | aria-selected="true" |
| Focus | Focus ring | Visible focus state |
| Disabled | Muted appearance | aria-disabled="true" |

## Usage Examples

```html
<accessible-tabs>
  <div tab-label="First Tab">
    First tab content
  </div>
  <div tab-label="Second Tab">
    Second tab content
  </div>
</accessible-tabs>

<!-- With initial active tab -->
<accessible-tabs active-tab="panel-xyz-1">
  <div tab-label="Details">Details content</div>
  <div tab-label="Settings">Settings panel</div>
</accessible-tabs>
```

### Anti-patterns

```html
<!-- Avoid: Empty tabs -->
<accessible-tabs></accessible-tabs>

<!-- Avoid: Missing labels -->
<accessible-tabs>
  <div>Content without label</div>
</accessible-tabs>

<!-- Avoid: Inconsistent structure -->
<accessible-tabs>
  <span tab-label="Tab">Not a div</span>
</accessible-tabs>
```

## Test Requirements

* Full keyboard navigation

* ARIA attribute correctness
* State management
* Event handling
* Focus management

## Resources

* [ARIA Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/)

* [MDN Tabs Examples](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tabpanel_role)
* [Inclusive Components: Tabs](https://inclusive-components.design)
