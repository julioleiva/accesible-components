import { defineAccessibleInput } from '../AccessibleInput';

defineAccessibleInput();

export default {
  title: 'Components/AccessibleInput',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    type: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    required: { control: 'boolean' },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
    minlength: { control: 'number' },
    maxlength: { control: 'number' },
    error: { control: 'text' },
  },
};

export const Default = {
  args: {
    label: 'Default Input',
    type: 'text',
    placeholder: 'Enter text here',
    value: '',
  },
  render: (args) => `
    <accessible-input ${Object.entries(args).map(([k, v]) => `${k}="${v}"`).join(' ')}></accessible-input>
  `,
};

export const RequiredField = {
  args: {
    label: 'Required Input',
    type: 'text',
    placeholder: 'This field is required',
    required: true,
  },
  render: (args) => `
    <accessible-input ${Object.entries(args).map(([k, v]) => `${k}="${v}"`).join(' ')}></accessible-input>
  `,
  parameters: {
    docs: {
      description: {
        story: 'An input field that is marked as required.',
      },
    },
  },
};

export const WithValidationError = {
  args: {
    label: 'Input with Error',
    type: 'text',
    placeholder: 'Enter valid text',
    error: 'This field is invalid',
  },
  render: (args) => `
    <accessible-input ${Object.entries(args).map(([k, v]) => `${k}="${v}"`).join(' ')}></accessible-input>
  `,
  parameters: {
    docs: {
      description: {
        story: 'An input field displaying a validation error message.',
      },
    },
  },
};

export const DisabledField = {
  args: {
    label: 'Disabled Input',
    type: 'text',
    placeholder: 'This field is disabled',
    disabled: true,
  },
  render: (args) => `
    <accessible-input ${Object.entries(args).map(([k, v]) => `${k}="${v}"`).join(' ')}></accessible-input>
  `,
  parameters: {
    docs: {
      description: {
        story: 'An input field that is disabled.',
      },
    },
  },
};

export const HighContrast = {
  args: {
    label: 'High Contrast Input',
    type: 'text',
    placeholder: 'High contrast theme',
    style: '--input-background: #000; --input-color: #FFF; --input-border-color: #FFF;',
  },
  render: (args) => `
    <accessible-input ${Object.entries(args).map(([k, v]) => `${k}="${v}"`).join(' ')}></accessible-input>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the input component with a high-contrast theme for accessibility.',
      },
    },
  },
};

export const AccessibleField = {
  args: {
    label: 'Accessible Input',
    type: 'text',
    placeholder: 'Compliant with ARIA guidelines',
  },
  render: (args) => `
    <accessible-input ${Object.entries(args).map(([k, v]) => `${k}="${v}"`).join(' ')}></accessible-input>
  `,
  parameters: {
    a11y: {
      element: 'accessible-input',
    },
    docs: {
      description: {
        story: 'An input field demonstrating accessibility compliance with ARIA guidelines.',
      },
    },
  },
};
