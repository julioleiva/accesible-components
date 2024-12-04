import { defineAccessibleTabs } from '../AccessibleTabs';

defineAccessibleTabs();

export default {
  title: 'Components/AccessibleTabs',
  tags: ['autodocs'],
  argTypes: {
    'aria-label': { control: 'text', description: 'Defines an accessible label for the tablist.' },
    activeTab: { control: 'text', description: 'Defines the active tab by its label or ID.' },
  },
  parameters: {
    docs: {
      description: {
        component: 'AccessibleTabs is a fully ARIA-compliant tabs component for creating accessible tab interfaces.',
      },
    },
  },
};

export const Default = {
  args: {
    'aria-label': 'Default Tabs Example',
    activeTab: 'First',
  },
  render: (args) => `
    <accessible-tabs ${Object.entries(args).map(([k, v]) => `${k}="${v}"`).join(' ')}>
      <div tab-label="First">Content one</div>
      <div tab-label="Second">Content two</div>
    </accessible-tabs>
  `,
  parameters: {
    docs: {
      description: {
        story: 'This story shows a default configuration of the AccessibleTabs component.',
      },
    },
  },
};

export const WithErrors = {
  render: () => `
    <accessible-tabs>
      <div>Missing label</div>
    </accessible-tabs>
  `,
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates a scenario where tabs are missing `tab-label` attributes, highlighting potential errors.',
      },
    },
    a11y: {
      disable: true, // Disable a11y checks as it's an intentional error example.
    },
  },
};

export const Accessible = {
  args: {
    'aria-label': 'Accessible Tabs Example',
    activeTab: 'Tab One',
  },
  render: (args) => `
    <accessible-tabs ${Object.entries(args).map(([k, v]) => `${k}="${v}"`).join(' ')}>
      <div tab-label="Tab One">Accessible content for tab one</div>
      <div tab-label="Tab Two">Accessible content for tab two</div>
    </accessible-tabs>
  `,
  parameters: {
    a11y: {
      element: 'accessible-tabs',
    },
    docs: {
      description: {
        story: 'This story demonstrates how the component complies with ARIA guidelines for accessibility, including focus management and ARIA relationships.',
      },
    },
  },
};

export const HighContrast = {
  args: {
    'aria-label': 'High Contrast Tabs',
  },
  render: (args) => `
    <accessible-tabs ${Object.entries(args).map(([k, v]) => `${k}="${v}"`).join(' ')}>
      <div tab-label="High Contrast One" style="background-color: #000; color: #FFF;">High contrast content one</div>
      <div tab-label="High Contrast Two" style="background-color: #000; color: #FFF;">High contrast content two</div>
    </accessible-tabs>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates the AccessibleTabs component with a high-contrast theme for better visibility and compliance with WCAG guidelines.',
      },
    },
  },
};

export const DynamicTabs = {
  args: {
    'aria-label': 'Dynamic Tabs Example',
  },
  render: (args) => {
    const container = document.createElement('div');
    const tabsElement = document.createElement('accessible-tabs');
    tabsElement.setAttribute('aria-label', args['aria-label']);

    const addButton = document.createElement('button');
    addButton.textContent = 'Add Tab';
    addButton.style.marginBottom = '1rem';
    let count = 1;

    const addTab = () => {
      const newTab = document.createElement('div');
      newTab.setAttribute('tab-label', `Tab ${count}`);
      newTab.textContent = `Content for Tab ${count}`;
      tabsElement.appendChild(newTab);
      count += 1;
    };

    addButton.addEventListener('click', addTab);
    addTab(); // Add an initial tab.

    container.appendChild(addButton);
    container.appendChild(tabsElement);
    return container.outerHTML;
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates dynamic tab creation using AccessibleTabs.',
      },
    },
  },
};
