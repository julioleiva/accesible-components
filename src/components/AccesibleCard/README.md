# Card Component Documentation

## Overview
A web component that creates accessible content cards with support for both static and interactive variants.

## WCAG 2.1 AA Requirements

### Perceivable (1.4.3, 1.4.8, 1.3.1)
- Contrast ratios ≥ 4.5:1 for borders and text
- Clear visual hierarchy and structure
- Adaptable layout (vertical/horizontal)
- States visually distinguishable

### Operable (2.1.1, 2.5.5, 2.3.3)
- Full keyboard support
- Touch targets ≥ 44px
- Smooth transitions
- Reduced motion support

### Understandable (3.1.5, 3.2.4)
- Clear content structure
- Consistent layout
- Predictable behavior

### Robust (4.1.2)
- Semantic HTML structure
- Appropriate ARIA roles
- State management

## Component API

### Attributes
| Attribute | Description | ARIA |
|-----------|-------------|------|
| title | Card heading | aria-labelledby |
| content | Card content | - |
| interactive | Enables interaction | role="button" |
| expanded | Shows expansion | aria-expanded |
| selected | Shows selection | aria-selected |
| disabled | Disables interaction | aria-disabled |
| orientation | Layout direction | aria-orientation |

### Events
```javascript
'card-interaction': {
  type: string,
  expanded: boolean,
  selected: boolean,
  timestamp: Date
}
```

### CSS Properties
```css
--card-border-color: #ccc
--card-background: #ffffff
--card-color: #1f2937
--card-shadow: 0 1px 3px rgba(0, 0, 0, 0.1)
--card-hover-border-color: #2563eb
--card-selected-background: #eff6ff
```

## Usage Examples

### Basic Card
```html
<accessible-card
  title="Product Info"
  content="Description here"
></accessible-card>
```

### Interactive Card
```html
<accessible-card
  title="Select Plan"
  content="Click to select"
  interactive
  selected
></accessible-card>
```

### Disabled Card
```html
<accessible-card
  title="Unavailable"
  content="Option disabled"
  interactive
  disabled
></accessible-card>
```

## Test Checklist

### Automated
- [ ] WCAG compliance (axe-core)
- [ ] Color contrast
- [ ] ARIA attributes
- [ ] Keyboard interaction
- [ ] Event handling

### Manual
- [ ] Screen reader testing
- [ ] Keyboard navigation
- [ ] Touch interaction
- [ ] Visual states
- [ ] Responsive behavior

## Best Practices
1. Always provide a meaningful title
2. Keep content concise
3. Use interactive mode only when needed
4. Ensure consistent styling
5. Test with keyboard and screen readers

## Browser Support
- Modern browsers
- High contrast mode
- Forced colors mode
- Reduced motion


## Resources
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Groups Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/group/)
- [Inclusive Components: Cards](https://inclusive-components.design/cards/)