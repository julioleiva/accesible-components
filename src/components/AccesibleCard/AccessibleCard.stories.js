import { defineAccessibleCard } from './AccessibleCard';

// register the ‘accessible-card’ component as a custom element.
defineAccessibleCard();

export default {
  title: 'Components/AccessibleCard',

  tags: ['autodocs'],

  // We define the controls for the component's properties. These will be used in the Storybook controls panel.
  argTypes: {
    title: { control: 'text', description: 'Title of the card.' },
    content: { control: 'text', description: 'Content of the card.' },
    interactive: { control: 'boolean', description: 'Whether the card is interactive (button role).' },
    expanded: { control: 'boolean', description: 'Whether the card is expanded.' },
    selected: { control: 'boolean', description: 'Whether the card is selected.' },
    disabled: { control: 'boolean', description: 'Whether the card is disabled.' },
    orientation: {
      control: 'select', // Ofrecemos un selector de opciones.
      options: ['vertical', 'horizontal'], // Opciones disponibles para la orientación.
      description: 'Orientation of the card (vertical or horizontal).',
    },
  },

  parameters: {
    docs: {
      description: {
        component: 'AccessibleCard is an interactive and accessible card component supporting various states and ARIA roles.',
      },
    },
    a11y: {
      element: 'accessible-card', // Defines the element to be evaluated for accessibility.
    },
  },
};

// Defines the variants (stories) of the component.

export const Default = {
  args: {
    title: 'Default Card Title',
    content: 'This is the content of the card.',
  },
  // render the HTML component dynamically from the arguments.
  render: (args) => `
    <accessible-card 
      ${Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ')}
    ></accessible-card>
  `,
  parameters: {
    docs: {
      description: {
        story: 'This is the default state of the AccessibleCard component.', // Descripción de esta historia específica.
      },
    },
  },
};


export const Interactive = {
  args: {
    title: 'Interactive Card',
    content: 'Click or use keyboard navigation to interact with this card.',
    interactive: true,
  },
  render: (args) => `
    <accessible-card 
      ${Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ')}
    ></accessible-card>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates an interactive card with role="button" and keyboard support.',
      },
    },
  },
};


export const Expanded = {
  args: {
    title: 'Expandable Card',
    content: 'This card is expanded by default.',
    expanded: true,
    interactive: true,
  },
  render: (args) => `
    <accessible-card 
      ${Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ')}
    ></accessible-card>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates a card that supports the `expanded` state with ARIA attributes.', // Explicación de la expansión.
      },
    },
  },
};


export const Selected = {
  args: {
    title: 'Selected Card',
    content: 'This card is selected by default.', 
    selected: true,
    interactive: true,
  },
  render: (args) => `
    <accessible-card 
      ${Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ')}
    ></accessible-card>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Shows a card in the `selected` state.',
      },
    },
  },
};

export const Disabled = {
  args: {
    title: 'Disabled Card',
    content: 'This card is disabled and cannot be interacted with.',
    disabled: true,
  },
  render: (args) => `
    <accessible-card 
      ${Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ')}
    ></accessible-card>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates a disabled card with ARIA attributes for accessibility.',
      },
    },
  },
};

export const HorizontalOrientation = {
  args: {
    title: 'Horizontal Card',
    content: 'This card is displayed in horizontal orientation.',
    orientation: 'horizontal',
  },
  render: (args) => `
    <accessible-card 
      ${Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ')}
    ></accessible-card>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Displays the card in horizontal orientation.',
      }
    },
  },
};

export const CombinedStates = {
  args: {
    title: 'Combined States Card',
    content: 'This card is interactive, expanded, and selected.', 
    interactive: true,
    expanded: true, 
    selected: true,
  },
  render: (args) => `
    <accessible-card 
      ${Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ')}
    ></accessible-card>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates a card with combined states (interactive, expanded, and selected).', // Explicación de la combinación de estados.
      },
    },
  },
};
