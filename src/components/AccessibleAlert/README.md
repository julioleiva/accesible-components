# Alert Component Accessibility Documentation

## Overview

The `AccessibleAlert` component is a web component for displaying accessible alert messages, adhering to ARIA roles and WCAG 2.1 AA requirements. It supports various alert types, auto-dismiss behavior, and is fully customizable.

---

## Accessibility Compliance

### WCAG 2.1 AA Requirements

#### **Perceivable (1.4.3, 1.4.8, 1.3.1)**
- **Contrast:** Minimum 4.5:1 for text and borders.
- **Icons:** Optional and decorative (`aria-hidden="true"`).
- **Responsive Text:** Adaptable to font scaling.

#### **Operable (2.1.1, 2.2.1, 2.3.3)**
- **Keyboard Navigation:** Fully keyboard accessible with focus indicators.
- **Timing Control:** Auto-dismiss alerts allow sufficient reading time.
- **Motion Respect:** Animations respect reduced-motion settings.

#### **Understandable (3.1.5, 3.2.4)**
- **Concise Messaging:** Clear, actionable text.
- **Consistent Behavior:** Dismissible alerts and icons follow a predictable pattern.

#### **Robust (4.1.2)**
- **ARIA Roles:**
  - `role="alert"` for standard alerts.
  - `role="alertdialog"` for high-priority interruptions.
- **Live Regions:**
  - `aria-live="polite"` for non-critical updates.
  - `aria-live="assertive"` for critical updates.

---

## Component API

### Attributes

| Attribute      | Description                        | ARIA Impact             |
|----------------|------------------------------------|-------------------------|
| `type`         | Alert type (`info`, `success`, etc.) | Defines role and style  |
| `message`      | Main content of the alert         | Readable content         |
| `title`        | Optional title for the alert      | Improves structure       |
| `dismissible`  | Adds a close button               | Requires keyboard support|
| `auto-dismiss` | Auto-dismiss after a timeout (ms) | Timing-related behavior  |
| `live`         | ARIA live region mode             | Polite or assertive      |
| `icon`         | Custom icon for the alert         | Decorative or contextual |

---

### States

| State            | Visual Indicator             | Accessibility Feature          |
|-------------------|------------------------------|---------------------------------|
| Default           | Base styling                | `role="alert"`                 |
| Dismissible       | Close button visible        | Keyboard focusable             |
| Auto-dismissing   | Time-limited visibility     | Timing adjustable              |
| Error             | High contrast styling       | `role="alertdialog"`           |

---

## Component Features

### Dismissible Alerts
Alerts marked with the `dismissible` attribute include a close button that supports:
- **Keyboard Interaction:** Close with `Enter` or `Space`.
- **ARIA Labels:** Button has a meaningful label for screen readers.

### Auto-Dismiss
Alerts with the `auto-dismiss` attribute:
- Automatically close after the specified duration.
- Can update or clear dismissal timers dynamically.

### Alert Types
Supported alert types include `info`, `success`, `warning`, and `error`, each with distinct styling.

---

## Usage Examples

### Basic Alert
```html
<accessible-alert
  type="info"
  message="This is an informational alert."
></accessible-alert>
```

### Dismissible Alert
```html
<accessible-alert
  type="warning"
  title="Warning"
  message="This is a dismissible warning alert."
  dismissible
></accessible-alert>
```

### Auto-Dismiss Alert
```html
<accessible-alert
  type="success"
  message="This alert will auto-dismiss in 3 seconds."
  auto-dismiss="3000"
></accessible-alert>
```

### Assertive Alert
```html
<accessible-alert
  type="error"
  message="This requires immediate attention!"
  live="assertive"
></accessible-alert>
```

### Alert with Custom Icon
```html
<accessible-alert
  type="info"
  message="This is an alert with a custom icon."
  icon="🚀"
></accessible-alert>
```

---

## Testing Requirements

### Automated Testing
- **WCAG Compliance:** Use axe-core to verify ARIA roles and contrast ratios.
- **Keyboard Navigation:** Ensure dismissible alerts respond to `Tab`, `Enter`, and `Space`.
- **Focus Management:** Verify focus behavior when alerts appear/disappear.

### Manual Testing
- **Screen Reader:** Ensure announcements match `aria-live` behavior.
- **High Contrast Mode:** Verify correct rendering in high-contrast settings.
- **Reduced Motion:** Test animations with motion preferences enabled/disabled.

### Test Scenarios

1. **Basic Functionality**
   - Render alert with default attributes.
   - Verify ARIA roles and live region behavior.

2. **Dismissible Alerts**
   - Close using mouse and keyboard.
   - Confirm `alert-dismiss` event is emitted.

3. **Auto-Dismiss Behavior**
   - Verify correct timing for auto-dismiss.
   - Ensure no conflicts when `auto-dismiss` changes dynamically.

4. **Customizations**
   - Validate icon rendering.
   - Test color and contrast for all alert types.

---

## Browser Support

- **Modern Browsers:** Chrome, Firefox, Safari, Edge.
- **Accessibility Modes:** High contrast, reduced motion, and dark mode.

---

## Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Alerts Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)
- [Inclusive Components: Alerts](https://inclusive-components.design/notifications/)
