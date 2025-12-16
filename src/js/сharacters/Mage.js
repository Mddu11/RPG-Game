import Player from './Player.js';
import Staff from '../weapons/Staff.js';

export default class Mage extends Player {
  static startWeapon = Staff;
}
