import './scss/style.scss'

import groupBy from 'lodash-es/groupBy'
import people from './people'

const managerGroups = groupBy(people, 'manager');

const root = document.createElement('div');
root.innerHTML = `<pre>${JSON.stringify(managerGroups, null, 2)}</pre>`;
document.body.appendChild(root);
console.log(`asdf`);
