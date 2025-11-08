import React from 'react';
import { AccessibleTabs } from './AccessibleTabs';

export default {
  title: 'Components/AccessibleTabs',
  component: AccessibleTabs,
  tags: ['autodocs'],
  argTypes: {
    defaultActiveTab: { control: 'number' },
    ariaLabel: { control: 'text' },
    onChange: { action: 'tab-changed' },
  },
};

const sampleTabs = [
  {
    label: 'Tab 1',
    content: <div>Content for Tab 1</div>,
  },
  {
    label: 'Tab 2',
    content: <div>Content for Tab 2</div>,
  },
  {
    label: 'Tab 3',
    content: <div>Content for Tab 3</div>,
  },
];

export const Default = {
  args: {
    tabs: sampleTabs,
    ariaLabel: 'Sample Tabs',
  },
};

export const SecondTabActive = {
  args: {
    tabs: sampleTabs,
    defaultActiveTab: 1,
    ariaLabel: 'Tabs with second tab active',
  },
};

export const ManyTabs = {
  args: {
    tabs: [
      { label: 'Overview', content: <div>Overview content</div> },
      { label: 'Details', content: <div>Details content</div> },
      { label: 'Settings', content: <div>Settings content</div> },
      { label: 'Analytics', content: <div>Analytics content</div> },
      { label: 'Reports', content: <div>Reports content</div> },
    ],
    ariaLabel: 'Navigation Tabs',
  },
};

export const RichContent = {
  args: {
    tabs: [
      {
        label: 'Profile',
        content: (
          <div>
            <h3>User Profile</h3>
            <p>Name: John Doe</p>
            <p>Email: john@example.com</p>
          </div>
        ),
      },
      {
        label: 'Settings',
        content: (
          <div>
            <h3>Settings</h3>
            <p>Notification preferences</p>
            <p>Privacy settings</p>
          </div>
        ),
      },
      {
        label: 'History',
        content: (
          <div>
            <h3>Activity History</h3>
            <ul>
              <li>Login: 2025-01-15</li>
              <li>Updated profile: 2025-01-10</li>
            </ul>
          </div>
        ),
      },
    ],
    ariaLabel: 'User Dashboard',
  },
};
