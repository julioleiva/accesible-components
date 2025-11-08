import React from 'react';
import { AccessibleAlert } from './AccessibleAlert';

export default {
  title: 'Components/AccessibleAlert',
  component: AccessibleAlert,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    description: { control: 'text' },
    type: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
    icon: { control: 'text' },
    dismissible: { control: 'boolean' },
    autoDismiss: { control: 'number' },
    title: { control: 'text' },
    live: { control: 'select', options: ['polite', 'assertive'] },
    onDismiss: { action: 'dismissed' },
  },
};

export const Info = {
  args: {
    type: 'info',
    message: 'This is an informational alert.',
  },
};

export const Success = {
  args: {
    type: 'success',
    message: 'Operation completed successfully!',
  },
};

export const Warning = {
  args: {
    type: 'warning',
    message: 'Warning: Please review your input.',
  },
};

export const Error = {
  args: {
    type: 'error',
    message: 'An error occurred. Please try again.',
  },
};

export const WithTitle = {
  args: {
    type: 'info',
    title: 'Important Notice',
    message: 'This alert includes a title for better context.',
  },
};

export const Dismissible = {
  args: {
    type: 'success',
    message: 'This alert can be dismissed.',
    dismissible: true,
  },
};

export const AutoDismiss = {
  args: {
    type: 'warning',
    message: 'This alert will auto-dismiss in 5 seconds.',
    autoDismiss: 5000,
  },
};

export const CustomIcon = {
  args: {
    type: 'info',
    message: 'This alert uses a custom icon.',
    icon: '🎉',
  },
};
