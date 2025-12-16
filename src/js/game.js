import Archer from './characters/Archer.js';
import Warrior from './characters/Warrior.js';
import Mage from './characters/Mage.js';
import Dwart from './characters/Dwart.js';
import Crossbowman from './characters/Crossbowman.js';
import Demourge from './characters/Demourge.js';

export function play() {
  const app = document.getElementById('app') ?? document.body;

  const list = document.createElement('ul');
  [Archer, Warrior, Mage, Dwart, Crossbowman, Demourge].forEach((Cls) => {
    const li = document.createElement('li');
    li.textContent = `${Cls.name}`;
    list.append(li);
  });

  app.append(list);
}
