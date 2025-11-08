import { useState, useRef, useId } from 'react';
import './AccessibleTabs.css';

export const AccessibleTabs = ({
  tabs = [],
  defaultActiveTab = 0,
  ariaLabel = 'Tabs',
  onChange,
  className = '',
  ...props
}) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  const tabRefs = useRef([]);
  const uniqueId = useId();

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onChange) {
      onChange({ tabId: `panel-${uniqueId}-${index}`, index });
    }
  };

  const handleKeyDown = (event, currentIndex) => {
    let newIndex;
    const tabsLength = tabs.length;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        newIndex = (currentIndex + 1) % tabsLength;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        newIndex = (currentIndex - 1 + tabsLength) % tabsLength;
        break;
      case 'Home':
        event.preventDefault();
        newIndex = 0;
        break;
      case 'End':
        event.preventDefault();
        newIndex = tabsLength - 1;
        break;
      default:
        return;
    }

    tabRefs.current[newIndex]?.focus();
    setActiveTab(newIndex);
    if (onChange) {
      onChange({ tabId: `panel-${uniqueId}-${newIndex}`, index: newIndex });
    }
  };

  return (
    <div className={`tabs ${className}`} role="application" aria-label={ariaLabel} {...props}>
      <div role="tablist" aria-label={ariaLabel}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            ref={(el) => (tabRefs.current[index] = el)}
            role="tab"
            id={`tab-${uniqueId}-${index}`}
            aria-controls={`panel-${uniqueId}-${index}`}
            aria-selected={activeTab === index}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => handleTabClick(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="tab"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map((tab, index) => (
        <div
          key={index}
          role="tabpanel"
          id={`panel-${uniqueId}-${index}`}
          aria-labelledby={`tab-${uniqueId}-${index}`}
          hidden={activeTab !== index}
          className="tab-panel"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
};

export default AccessibleTabs;
