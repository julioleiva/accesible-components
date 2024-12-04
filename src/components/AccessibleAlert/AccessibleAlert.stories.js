import { defineAccessibleAlert } from '../AccessibleAlert';

defineAccessibleAlert();

export default {
  title: 'Components/AccessibleAlert',
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text', description: 'Main message of the alert.' },
    title: { control: 'text', description: 'Title of the alert.' },
    type: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Type of alert to define the style and icon.',
    },
    dismissible: { control: 'boolean', description: 'Whether the alert can be dismissed.' },
    'auto-dismiss': { control: 'number', description: 'Automatically dismiss the alert after a specific time (in milliseconds).' },
    live: { control: 'select', options: ['polite', 'assertive'], description: 'ARIA live region mode for the alert.' },
    icon: { control: 'text', description: 'Custom icon for the alert.' },
  },
  parameters: {
    docs: {
      description: {
        component: 'AccessibleAlert is a component for displaying accessible alert messages with ARIA roles and attributes.',
      },
    },
    a11y: {
      element: 'accessible-alert',
    },
  },
};

export const Default = {
  args: {
    message: 'This is an informational alert.',
    title: 'Information',
    type: 'info',
    dismissible: true,
  },
  render: (args) => `
    <accessible-alert 
      ${Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ')}
    ></accessible-alert>
  `,
  parameters: {
    docs: {
      description: {
        story: 'This story shows the default state of the AccessibleAlert component.',
      },
    },
  },
};

export const Success = {
  args: {
    message: 'Operation completed successfully!',
    title: 'Success',
    type: 'success',
    dismissible: true,
  },
  render: (args) => `
    <accessible-alert 
      ${Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ')}
    ></accessible-alert>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the "success" type of alert.',
      },
    },
  },
};

export const Error = {
  args: {
    message: 'There was an error processing your request.',
    title: 'Error',
    type: 'error',
    dismissible: true,
  },
  render: (args) => `
    <accessible-alert 
      ${Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ')}
    ></accessible-alert>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Shows an "error" type alert, useful for critical messages.',
      },
    },
  },
};

export const AutoDismiss = {
  args: {
    message: 'This alert will disappear automatically.',
    title: 'Auto Dismiss',
    type: 'warning',
    'auto-dismiss': 3000,
  },
  render: (args) => `
    <accessible-alert 
      ${Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ')}
    ></accessible-alert>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates an alert that automatically dismisses after 3 seconds.',
      },
    },
  },
};

export const WithCustomIcon = {
  args: {
    message: 'This is an alert with a custom icon.',
    title: 'Custom Icon',
    type: 'info',
    icon: '🔥',
    dismissible: true,
  },
  render: (args) => `
    <accessible-alert 
      ${Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ')}
    ></accessible-alert>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Shows an alert with a custom icon provided via the `icon` attribute.',
      },
    },
  },
};

export const AssertiveAlert = {
  args: {
    message: 'This alert requires immediate attention.',
    title: 'Assertive Alert',
    type: 'error',
    live: 'assertive',
  },
  render: (args) => `
    <accessible-alert 
      ${Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ')}
    ></accessible-alert>
  `,
  parameters: {
    docs: {
      description: {
        story: 'An assertive alert for high-priority messages. It uses the `aria-live="assertive"` attribute.',
      },
    },
  },
};
