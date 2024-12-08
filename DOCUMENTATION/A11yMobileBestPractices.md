# Mobile Development Best Practices

## Semantic HTML (Mobile Web)

1. Use standard HTML tags to provide accessible semantics:
   - `<header>`, `<footer>`, `<main>`, `<article>`, and `<section>` for structure.
   - `<button>` and `<input>` for interactive elements instead of `<div>` or `<span>`.
2. Add ARIA attributes only when necessary:
   - Use `role="alert"` for dynamic notifications or `aria-live` for content updates without page reloads.

## Native Accessibility (Mobile Apps)

### Android

1. Use **AccessibilityNodeInfo** to describe custom widgets.
2. Add descriptive labels with `contentDescription`.
3. Enable keyboard and switch navigation using `focusable` and `importantForAccessibility`.

### iOS

1. Apply **UIAccessibility** to describe visual and interactive elements.
2. Use `accessibilityLabel`, `accessibilityHint`, and `accessibilityTraits` to enhance screen reader experiences.

## Behavior and Logic

1. **Focus Management**:
   - In modals and dialogs, trap the focus and ensure it returns to the originating element when closed.
2. **Dynamic Event Management**:
   - Use `aria-live` or `accessibilityLiveRegion` to notify users of content changes without reloading the page.
3. **Form Validation**:
   - Ensure error messages are clear and linked to the appropriate fields using `aria-describedby`.

## Manual Testing for Mobile

### Testing with Assistive Technologies**

1. **Screen Readers**:
   - Android: **TalkBack**
   - iOS: **VoiceOver**
   - Ensure labels and descriptions are clear and concise.

2. **Touch Gestures**:
   - Validate that touch gestures like "swipe" have accessible alternatives.
   - Test multi-finger interactions and devices with small screens.

3. **Physical Device Testing**:
   - Test on various real devices, including low-end models, to assess performance and compatibility.

4. **Keyboard Navigation**:
   - Ensure all interactive elements are navigable using physical keyboards (including Bluetooth devices).

### Mobile UX-Specific Tips

1. **Reduce Friction**:
   - Minimize the number of taps required to complete a task.
   - Provide shortcuts for frequent tasks.

2. **Optimize Content Loading**:
   - Use accessible placeholders (visual and auditory indicators) while content loads.

3. **Personalization**:
   - Offer options for dark mode, larger font sizes, and text-to-speech features.

4. **Offline Design**:
   - Provide limited functionality without an internet connection and ensure error messages are clear.

5. **Continuous Testing**:
   - Regularly conduct usability studies focused on accessibility.

### Accessibility Automation**

Automation is essential to maintain accessibility standards throughout development.

#### Tools for Mobile Web**

1. **axe-core**:
   - Automatically validates issues like missing `alt` attributes, contrast ratios, and incorrectly configured roles.
   - Integrates with browsers like Chrome or Firefox, or testing frameworks like Jest.

2. **Pa11y**:
   - Runs programmatic audits and generates detailed accessibility reports.

3. **Lighthouse (Google)**:
   - Provides performance, SEO, and accessibility audits.

## **Tools for Native Apps**

1. **Accessibility Scanner (Android)**:
   - Identifies touch interface issues and suggests fixes.
2. **Xcode Accessibility Inspector (iOS)**:
   - Helps debug accessibility features in iOS apps.
