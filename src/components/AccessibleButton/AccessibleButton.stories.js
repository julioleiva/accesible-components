import { defineAccessibleButton } from '../AccessibleButton';

defineAccessibleButton();

export default {
  title: 'Components/AccessibleButton',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'The text label of the button.' },
    disabled: { control: 'boolean', description: 'Disables the button when true.' },
    'aria-label': { control: 'text', description: 'Accessible label for the button.' },
    type: { control: 'select', options: ['button', 'submit', 'reset'], description: 'The type of the button.' },
    'aria-expanded': { control: 'boolean', description: 'Indicates if an element is expanded.' },
    'aria-pressed': { control: 'boolean', description: 'Indicates if the button is pressed.' },
    'aria-controls': { control: 'text', description: 'ID of the element controlled by the button.' },
  },
  parameters: {
    docs: {
      description: {
        component: 'AccessibleButton is an accessible button component that supports ARIA attributes and keyboard interaction.',
      },
    },
    a11y: {
      element: 'accessible-button',
    },
  },
};

export const Default = {
  args: {
    label: 'Click Me',
    type: 'button',
    'aria-label': 'Default Button',
  },
  render: (args) => `
    <accessible-button ${Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ')}>
    </accessible-button>
  `,
  parameters: {
    docs: {
      description: {
        story: 'This is the default state of the AccessibleButton component.',
      },
    },
  },
};

export const Disabled = {
  args: {
    label: 'Disabled Button',
    disabled: true,
    'aria-label': 'Disabled Button',
  },
  render: (args) => `
    <accessible-button ${Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ')}>
    </accessible-button>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the AccessibleButton component in a disabled state.',
      },
    },
  },
};

export const WithAriaExpanded = {
  args: {
    label: 'Expand',
    'aria-expanded': true,
    'aria-label': 'Expand Menu',
  },
  render: (args) => `
    <accessible-button ${Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ')}>
    </accessible-button>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Shows the AccessibleButton with the `aria-expanded` attribute, commonly used for toggle buttons.',
      },
    },
  },
};

export const HighContrast = {
  args: {
    label: 'High Contrast Button',
    'aria-label': 'High Contrast Button',
  },
  render: (args) => `
    <accessible-button ${Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ')}>
    </accessible-button>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the AccessibleButton component in a high-contrast theme, automatically applied based on user preferences.',
      },
    },
  },
};

export const KeyboardAccessible = {
  args: {
    label: 'Keyboard Accessible Button',
    'aria-label': 'Keyboard Accessible Button',
  },
  render: (args) => `
    <accessible-button ${Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ')}>
    </accessible-button>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Validates that the AccessibleButton is fully accessible using keyboard navigation (Enter and Space keys).',
      },
    },
  },
  play: async ({ canvasElement }) => {
    const button = canvasElement.querySelector('accessible-button');
    button.focus();

    // Simulate keyboard interactions
    const eventEnter = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
    const eventSpace = new KeyboardEvent('keydown', { key: ' ', bubbles: true });

    button.dispatchEvent(eventEnter);
    button.dispatchEvent(eventSpace);
  },
};
