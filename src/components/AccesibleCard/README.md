# Card Component Documentation

## Overview
`AccessibleCard` is a web component designed to create accessible, interactive, and customizable content cards. It supports ARIA roles, state management, and multiple layout options.

## Accessibility Compliance

### WCAG 2.1 AA Requirements

#### Perceivable (1.4.3, 1.4.8, 1.3.1)
- **Contrast Ratios**: Ensures a minimum of 4.5:1 for borders and text.
- **Visual Hierarchy**: Titles and content maintain a clear hierarchy.
- **Adaptable Layout**: Cards support both vertical and horizontal orientations.
- **State Indications**: Visual cues for `selected`, `expanded`, and `disabled` states.

#### Operable (2.1.1, 2.5.5, 2.3.3)
- Full keyboard navigation (`Tab`, `Enter`, `Space`).
- Large touch targets (≥ 44px).
- Motion-reduced animations.

#### Understandable (3.1.5, 3.2.4)
- Predictable interactions with consistent feedback.
- Clear role and state visibility using ARIA attributes.

#### Robust (4.1.2)
- Semantic structure for better assistive technology compatibility.
- State attributes like `aria-expanded`, `aria-selected`, and `aria-disabled`.

---

## Component API

### Attributes

| Attribute      | Description                     | ARIA                   |
|----------------|---------------------------------|-------------------------|
| `title`        | Title of the card              | `aria-labelledby`      |
| `content`      | Description or main content    | -                       |
| `interactive`  | Enables interaction            | `role="button"`         |
| `expanded`     | Indicates expansion            | `aria-expanded`         |
| `selected`     | Indicates selection            | `aria-selected`         |
| `disabled`     | Disables the card              | `aria-disabled`         |
| `orientation`  | Layout direction (`vertical` or `horizontal`) | `aria-orientation` |

### Events

| Event             | Details                                        |
|--------------------|------------------------------------------------|
| `card-interaction` | Fired when the card is clicked or activated.   |

**Event Payload:**
```javascript
{
  type: string, // Event type ('click', 'keydown', etc.)
  expanded: boolean,
  selected: boolean,
  timestamp: Date
}
```

---

## CSS Custom Properties

| Property                      | Default Value                  | Description                            |
|-------------------------------|---------------------------------|----------------------------------------|
| `--card-border-color`         | `#ccc`                         | Border color of the card.              |
| `--card-background`           | `#ffffff`                      | Background color of the card.          |
| `--card-color`                | `#1f2937`                      | Text color.                            |
| `--card-shadow`               | `0 1px 3px rgba(0, 0, 0, 0.1)` | Shadow applied to the card.            |
| `--card-hover-border-color`   | `#2563eb`                      | Border color when hovered.             |
| `--card-selected-background`  | `#eff6ff`                      | Background color when selected.        |
| `--card-focus-color`          | `#2563eb`                      | Focus outline color.                   |

---

## Development

### Component Structure
The component uses semantic HTML and ARIA roles to ensure accessibility. The primary layout is controlled via CSS, supporting both horizontal and vertical orientations.

### Lifecycle Hooks
- **connectedCallback**: Initializes the component and event listeners.
- **disconnectedCallback**: Cleans up event listeners.
- **attributeChangedCallback**: Updates the card dynamically when attributes change.

### Key Methods
- **`setupEventListeners()`**: Adds interactivity with keyboard and mouse support.
- **`handleInteraction()`**: Toggles states (`expanded`, `selected`) and emits custom events.

### State Management
Attributes like `expanded`, `selected`, and `disabled` control the card’s appearance and behavior. ARIA attributes reflect these states for assistive technologies.

---

## Testing

### Automated Testing Checklist

1. **Accessibility (axe-core):**
   - [x] Validate ARIA roles and attributes.
   - [x] Ensure keyboard interaction support.
   - [x] Check contrast ratios.

2. **State Management:**
   - [x] Verify `expanded`, `selected`, and `disabled` states.
   - [x] Test role changes when `interactive` is set.

3. **Responsive Behavior:**
   - [x] Validate layout for vertical and horizontal orientations.

### Manual Testing Checklist

- [ ] Test with screen readers.
- [ ] Validate keyboard navigation.
- [ ] Check touch interaction.
- [ ] Confirm visual states for all scenarios.

---

## Stories

### Default Card
```javascript
export const Default = {
  args: {
    title: 'Default Card Title',
    content: 'This is the content of the card.',
  },
};
```

### Interactive Card
```javascript
export const Interactive = {
  args: {
    title: 'Interactive Card',
    content: 'Click or use keyboard navigation.',
    interactive: true,
  },
};
```

### Expanded Card
```javascript
export const Expanded = {
  args: {
    title: 'Expandable Card',
    content: 'This card is expanded.',
    expanded: true,
  },
};
```

### Selected Card
```javascript
export const Selected = {
  args: {
    title: 'Selected Card',
    content: 'This card is selected by default.',
    selected: true,
  },
};
```

### Disabled Card
```javascript
export const Disabled = {
  args: {
    title: 'Disabled Card',
    content: 'This card is disabled and cannot be interacted with.',
    disabled: true,
  },
};
```

### Horizontal Orientation
```javascript
export const HorizontalOrientation = {
  args: {
    title: 'Horizontal Card',
    content: 'This card is displayed horizontally.',
    orientation: 'horizontal',
  },
};
```

---

## Usage Examples

### Basic Card
```html
<accessible-card
  title="Card Title"
  content="Card content goes here."
></accessible-card>
```

### Interactive Card
```html
<accessible-card
  title="Interactive Card"
  content="Click to select."
  interactive
></accessible-card>
```

---

## Browser Support

- Modern Browsers: Chrome, Firefox, Edge, Safari.
- High Contrast Mode.
- Reduced Motion Preferences.

---

## Resources
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Inclusive Components](https://inclusive-components.design/)
