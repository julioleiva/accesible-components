import React from 'react';
import { AccessibleButton } from './AccessibleButton';

export default {
  title: 'Components/AccessibleButton',
  component: AccessibleButton,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'The text label of the button.' },
    disabled: { control: 'boolean', description: 'Disables the button when true.' },
    ariaLabel: { control: 'text', description: 'Accessible label for the button.' },
    type: { control: 'select', options: ['button', 'submit', 'reset'], description: 'The type of the button.' },
    ariaExpanded: { control: 'boolean', description: 'Indicates if an element is expanded.' },
    ariaPressed: { control: 'boolean', description: 'Indicates if the button is pressed.' },
    ariaControls: { control: 'text', description: 'ID of the element controlled by the button.' },
    onClick: { action: 'clicked' },
  },
  parameters: {
    docs: {
      description: {
        component: 'AccessibleButton is an accessible button component that supports ARIA attributes and keyboard interaction.',
      },
    },
  },
};

export const Default = {
  args: {
    label: 'Click Me',
    type: 'button',
    ariaLabel: 'Default Button',
  },
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
    ariaLabel: 'Disabled Button',
  },
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
    ariaExpanded: true,
    ariaLabel: 'Expand Menu',
  },
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
    ariaLabel: 'High Contrast Button',
  },
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
    ariaLabel: 'Keyboard Accessible Button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Validates that the AccessibleButton is fully accessible using keyboard navigation (Enter and Space keys).',
      },
    },
  },
};
