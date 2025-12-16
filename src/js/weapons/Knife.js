import Weapon from './Weapon.js';

export default class Knife extends Weapon {
  constructor() {
    super('Нож', 5, 300, 1);
  }
}
