import React from 'react';
import {
  AccessibleButton,
  AccessibleInput,
  AccessibleCard,
  AccessibleAlert,
  AccessibleTabs
} from './components';

function App() {
  const tabs = [
    {
      label: 'Components',
      content: (
        <div>
          <h2>Accessible Components</h2>
          <p>A collection of accessible React components following WCAG 2.1 AA guidelines.</p>
        </div>
      ),
    },
    {
      label: 'Examples',
      content: (
        <div>
          <h3>Button Example</h3>
          <AccessibleButton label="Click Me" onClick={() => alert('Button clicked!')} />

          <h3>Input Example</h3>
          <AccessibleInput label="Name" placeholder="Enter your name" />

          <h3>Alert Example</h3>
          <AccessibleAlert type="success" message="Component migrated successfully!" dismissible />
        </div>
      ),
    },
    {
      label: 'Documentation',
      content: (
        <div>
          <h3>Documentation</h3>
          <p>View the Storybook documentation for detailed component usage and examples.</p>
          <AccessibleButton
            label="Open Storybook"
            onClick={() => window.open('http://localhost:6006', '_blank')}
          />
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Accessible Components - React</h1>

      <AccessibleCard
        title="Welcome"
        content="This library has been successfully migrated from Web Components to React in this branch!"
        interactive
      />

      <AccessibleTabs tabs={tabs} ariaLabel="Main Navigation" />
    </div>
  );
}

export default App;
