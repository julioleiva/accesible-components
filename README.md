# Accessible Components

Accessible Components is a project that provides a small design system built with Web Components, focusing on accessibility and compliance with WCAG 2.1 AA guidelines. The project emphasizes color contrast, keyboard navigation, responsive design, and other key accessibility principles.

## Features

- Web Components built using [Lit](https://lit.dev/).
- Accessibility-first approach, compliant with WCAG 2.1 AA.
- Integration with Storybook for documentation and interactive previews.
- Unit testing with [Vitest](https://vitest.dev/) and accessibility validation using [axe-core](https://github.com/dequelabs/axe-core).
- Live development and build tools powered by [Vite](https://vitejs.dev/).

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

4. Open the application in your browser. By default, it will be available at `http://localhost:3000`.

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

Test cases are located in the `src/tests` directory and focus on ensuring components are accessible by default.

## Accessibility Highlights

- **Color Contrast**: Ensures a minimum contrast ratio of 4.5:1 for text and background.
- **Keyboard Navigation**: All interactive elements are keyboard operable.
- **Responsive Design**: Components are fully responsive and scale appropriately.
- **Customizable Components**: Each component supports accessible attributes and properties for customization.

## Development Tools

- **Vite**: A fast development server with modern build tools.
- **Storybook**: A powerful tool for building and documenting UI components.
- **Vitest**: A blazing-fast unit testing framework with first-class TypeScript support.

## Dependencies

### Runtime Dependencies

- **`lit`**: Lightweight library for building fast, responsive Web Components.

### Development Dependencies

- **`axe-core`**: Used for accessibility testing. It should be moved to `devDependencies` as it is not required at runtime.
- **`storybook`**: Storybook and its addons for UI development and documentation.
- **`vitest`**: Unit testing framework.
- **`@storybook/addon-a11y`**: Accessibility testing addon for Storybook.
- **`@testing-library/dom`**: DOM testing utilities.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/my-feature`.
3. Make your changes and commit them: `git commit -m 'Add my feature'`.
4. Push to the branch: `git push origin feature/my-feature`.
5. Open a pull request.
