# Accessible Components

Accessible Components is a React component library focusing on accessibility and compliance with WCAG 2.1 AA guidelines. The project emphasizes color contrast, keyboard navigation, responsive design, and other key accessibility principles.

## Features

- **React Components**: Built with React 19 and modern hooks
- **Accessibility-first approach**: Compliant with WCAG 2.1 AA
- **Storybook Integration**: Interactive documentation and component previews
- **Comprehensive Testing**: Unit testing with [Vitest](https://vitest.dev/), [React Testing Library](https://testing-library.com/react), and accessibility validation using [axe-core](https://github.com/dequelabs/axe-core)
- **Modern Build Tools**: Powered by [Vite](https://vitejs.dev/) with React Fast Refresh

## Requirements

- Node.js >= 18.0.0
- npm >= 8.0.0

## Getting Started

1. Clone the repository and navigate to the project directory:

   ```bash
   git clone https://github.com/your-repo/accessible-components.git
   cd accessible-components
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the application in your browser. By default, it will be available at `http://localhost:5173`.

## Scripts

Here are the available npm scripts:

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the project for production.
- **`npm run preview`**: Preview the built project.
- **`npm run storybook`**: Start the Storybook development server on port 6006.
- **`npm run build-storybook`**: Build the Storybook for deployment.
- **`npm run test`**: Run unit tests using Vitest.

## Testing Accessibility

The project uses [jest-axe](https://github.com/nickcolley/jest-axe) and [axe-core](https://github.com/dequelabs/axe-core) for accessibility testing. To run tests:

```bash
npm run test
```

Test cases are located alongside each component (`*.spec.jsx` files) and focus on ensuring components are accessible by default.

## Accessibility Highlights

- **Color Contrast**: Ensures a minimum contrast ratio of 4.5:1 for text and background.
- **Keyboard Navigation**: All interactive elements are keyboard operable.
- **Responsive Design**: Components are fully responsive and scale appropriately.
- **Customizable Components**: Each component supports accessible attributes and properties for customization.

## Development Tools

- **Vite**: A fast development server with modern build tools.
- **Storybook**: A powerful tool for building and documenting UI components.
- **Vitest**: A blazing-fast unit testing framework with first-class TypeScript support.

## Available Components

All components maintain full keyboard navigation, ARIA attributes, and screen reader support:

- **AccessibleButton**: Button component with full ARIA support and states
- **AccessibleInput**: Form input with validation and error handling
- **AccessibleCard**: Interactive card component with expandable/selectable states
- **AccessibleAlert**: Alert/notification component with auto-dismiss
- **AccessibleTabs**: Tab navigation with keyboard support

## Dependencies

### Runtime Dependencies

- **`react`**: React library (v19)
- **`react-dom`**: React DOM rendering

### Development Dependencies

- **`@vitejs/plugin-react`**: Vite plugin for React with Fast Refresh
- **`@storybook/react-vite`**: Storybook for React with Vite builder
- **`@testing-library/react`**: React testing utilities
- **`@testing-library/jest-dom`**: Custom matchers for DOM testing
- **`vitest`**: Unit testing framework
- **`jest-axe`**: Accessibility testing with axe-core
- **`@storybook/addon-a11y`**: Accessibility testing addon for Storybook

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/my-feature`.
3. Make your changes and commit them: `git commit -m 'Add my feature'`.
4. Push to the branch: `git push origin feature/my-feature`.
5. Open a pull request.
