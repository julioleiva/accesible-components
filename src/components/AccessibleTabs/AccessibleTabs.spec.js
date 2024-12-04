import { describe, it, expect, beforeEach, beforeAll, afterEach, vi } from 'vitest';
import { axe, toHaveNoViolations } from 'jest-axe';
import { defineAccessibleTabs } from './AccessibleTabs';

expect.extend(toHaveNoViolations);

function queryShadowRoot(root, selector) {
  if (!root.shadowRoot) throw new Error('Shadow root no encontrado.');
  return root.shadowRoot.querySelector(selector);
}

function queryShadowRootAll(root, selector) {
  if (!root.shadowRoot) throw new Error('Shadow root no encontrado.');
  return root.shadowRoot.querySelectorAll(selector);
}

async function waitForFrame() {
  await new Promise(resolve => requestAnimationFrame(resolve));
}

describe('AccessibleTabs Component', () => {
  let tabsElement;
  let mainElement;

  beforeAll(() => {
    defineAccessibleTabs();
  });

  beforeEach(async () => {
    document.body.innerHTML = '';
    mainElement = document.createElement('main');
    mainElement.setAttribute('role', 'main');
    document.body.appendChild(mainElement);

    tabsElement = document.createElement('accessible-tabs');

    const tab1 = document.createElement('div');
    tab1.setAttribute('tab-label', 'Tab 1');
    tab1.textContent = 'Content 1';

    const tab2 = document.createElement('div');
    tab2.setAttribute('tab-label', 'Tab 2');
    tab2.textContent = 'Content 2';

    tabsElement.appendChild(tab1);
    tabsElement.appendChild(tab2);

    mainElement.appendChild(tabsElement);
    await waitForFrame();
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  describe('Rendering', () => {
    it('renders the tablist structure correctly', () => {
      const tablist = queryShadowRoot(tabsElement, '[role="tablist"]');
      const tabs = queryShadowRootAll(tabsElement, '[role="tab"]');
      const panels = queryShadowRootAll(tabsElement, '[role="tabpanel"]');

      expect(tablist).toBeTruthy();
      expect(tabs.length).toBe(2);
      expect(panels.length).toBe(2);
    });

    it('renders tab labels correctly', () => {
      const tabs = queryShadowRootAll(tabsElement, '[role="tab"]');
      expect(tabs[0].textContent.trim()).toBe('Tab 1');
      expect(tabs[1].textContent.trim()).toBe('Tab 2');
    });
  });

  describe('Accessibility', () => {
    it('passes accessibility checks with axe', async () => {
      const results = await axe(document.body);
      expect(results).toHaveNoViolations();
    });

    it('has correct ARIA relationships', () => {
      const tabs = queryShadowRootAll(tabsElement, '[role="tab"]');
      const panels = queryShadowRootAll(tabsElement, '[role="tabpanel"]');

      tabs.forEach((tab, index) => {
        expect(tab.getAttribute('aria-controls')).toBe(panels[index].id);
        expect(panels[index].getAttribute('aria-labelledby')).toBe(tab.id);
      });
    });

    it('manages focus correctly', async () => {
      const tab = queryShadowRoot(tabsElement, '[role="tab"]');
      tab.focus();
      await waitForFrame();
      expect(tabsElement.shadowRoot.activeElement).toBe(tab);
    });

    it('updates aria-label dynamically', async () => {
      const tablist = queryShadowRoot(tabsElement, '[role="tablist"]');
      expect(tablist.getAttribute('aria-label')).toBe('Tabs');

      tabsElement.setAttribute('aria-label', 'Updated Tabs');
      await waitForFrame();

      expect(tablist.getAttribute('aria-label')).toBe('Updated Tabs');
    });
  });

  describe('Interaction', () => {
    it('switches tabs on click', async () => {
      const tabs = queryShadowRootAll(tabsElement, '[role="tab"]');
      const panels = queryShadowRootAll(tabsElement, '[role="tabpanel"]');

      tabs[1].click();
      await waitForFrame();

      expect(tabs[0].getAttribute('aria-selected')).toBe('false');
      expect(tabs[1].getAttribute('aria-selected')).toBe('true');
      expect(panels[0].hidden).toBe(true);
      expect(panels[1].hidden).toBe(false);
    });

    it('handles keyboard navigation', async () => {
      const tabs = queryShadowRootAll(tabsElement, '[role="tab"]');
      tabs[0].focus();
      await waitForFrame();

      // Simulate ArrowRight
      tabs[0].dispatchEvent(new KeyboardEvent('keydown', {
        key: 'ArrowRight',
        bubbles: true,
        cancelable: true,
      }));
      await waitForFrame();
      expect(tabsElement.shadowRoot.activeElement).toBe(tabs[1]);

      // Simulate ArrowLeft
      tabs[1].dispatchEvent(new KeyboardEvent('keydown', {
        key: 'ArrowLeft',
        bubbles: true,
        cancelable: true,
      }));
      await waitForFrame();
      expect(tabsElement.shadowRoot.activeElement).toBe(tabs[0]);
    });

    it('emits tab-change event on tab switch', async () => {
      const mockHandler = vi.fn();

      tabsElement.addEventListener('tab-change', mockHandler);

      const tabs = queryShadowRootAll(tabsElement, '[role="tab"]');
      tabs[1].click();
      await waitForFrame();

      expect(mockHandler).toHaveBeenCalled();
      const eventDetail = mockHandler.mock.calls[0][0].detail;
      expect(eventDetail.tabId).toBe(tabs[1].getAttribute('aria-controls'));
    });
  });

  describe('Dynamic Behavior', () => {

    it('handles empty or invalid children gracefully', async () => {
      document.body.innerHTML = '';
      const invalidTabsElement = document.createElement('accessible-tabs');
      document.body.appendChild(invalidTabsElement);
      await waitForFrame();

      const tablist = queryShadowRoot(invalidTabsElement, '[role="tablist"]');
      expect(tablist).toBeTruthy();

      const tabs = queryShadowRootAll(invalidTabsElement, '[role="tab"]');
      const panels = queryShadowRootAll(invalidTabsElement, '[role="tabpanel"]');
      expect(tabs.length).toBe(0);
      expect(panels.length).toBe(0);
    });
  });

  describe('Attributes', () => {
    it('initializes with the first tab active', () => {
      const tabs = queryShadowRootAll(tabsElement, '[role="tab"]');
      const panels = queryShadowRootAll(tabsElement, '[role="tabpanel"]');

      expect(tabs[0].getAttribute('aria-selected')).toBe('true');
      expect(tabs[1].getAttribute('aria-selected')).toBe('false');
      expect(panels[0].hidden).toBe(false);
      expect(panels[1].hidden).toBe(true);
    });

    it('updates view when active-tab attribute changes', async () => {
      const panels = queryShadowRootAll(tabsElement, '[role="tabpanel"]');
      tabsElement.setAttribute('active-tab', panels[1].id);
      await waitForFrame();

      const tabs = queryShadowRootAll(tabsElement, '[role="tab"]');
      expect(tabs[0].getAttribute('aria-selected')).toBe('false');
      expect(tabs[1].getAttribute('aria-selected')).toBe('true');
      expect(panels[0].hidden).toBe(true);
      expect(panels[1].hidden).toBe(false);
    });
  });

  describe('Cleanup', () => {
    it('removes all event listeners on disconnect', () => {
      const tablist = queryShadowRoot(tabsElement, '[role="tablist"]');
      const spyKeydown = vi.spyOn(tablist, 'removeEventListener');

      tabsElement.remove();

      expect(spyKeydown).toHaveBeenCalledWith('keydown', expect.any(Function));
      expect(spyKeydown).toHaveBeenCalledTimes(1);
    });
  });
});
