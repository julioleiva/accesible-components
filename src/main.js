import './components/AccessibleButton/AccessibleButton';
import './components/AccessibleAlert/AccessibleAlert';
import './components/AccesibleCard/AccessibleCard';
import './components/AccessibleInput/AccessibleInput';
import './components/AccessibleTabs/AccessibleTabs';
import axe from 'axe-core';

document.addEventListener('DOMContentLoaded', () => {
  axe.run(document.body).then(results => {
    console.log('Resultados de accesibilidad:', results);
    if (results.violations.length > 0) {
      results.violations.forEach(violation => {
        console.warn(`[Accesibilidad]: ${violation.description}`);
        console.table(violation.nodes.map(node => node.target));
      });
    } else {
      console.log('¡Sin problemas de accesibilidad detectados!');
    }
  });
});