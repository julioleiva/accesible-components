import React from 'react';
import { AccessibleInput } from './AccessibleInput';

export default {
  title: 'Components/AccessibleInput',
  component: AccessibleInput,
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
    onChange: { action: 'changed' },
    onBlur: { action: 'blurred' },
  },
};

export const Default = {
  args: {
    label: 'Default Input',
    type: 'text',
    placeholder: 'Enter text here',
    value: '',
  },
};

export const RequiredField = {
  args: {
    label: 'Required Input',
    type: 'text',
    placeholder: 'This field is required',
    required: true,
  },
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
  parameters: {
    docs: {
      description: {
        story: 'An input field that is disabled.',
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
  parameters: {
    docs: {
      description: {
        story: 'An input field demonstrating accessibility compliance with ARIA guidelines.',
      },
    },
  },
};
