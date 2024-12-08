import './components/AccesibleSwitch/AccesiblesSwitch';
import axe from 'axe-core';

document.addEventListener('DOMContentLoaded', () => {
  axe.run(document.body).then(results => {
    console.log('Accessibility results:', results);
    if (results.violations.length > 0) {
      results.violations.forEach(violation => {
        console.warn(`[Accesibilidad]: ${violation.description}`);
        console.table(violation.nodes.map(node => node.target));
      });
    } else {
      console.log('No accessibility problems detected!');
    }
  });
});