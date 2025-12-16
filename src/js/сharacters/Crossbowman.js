import Archer from './Archer.js';
import LongBow from '../weapons/LongBow.js';

export default class Crossbowman extends Archer {
  static startWeapon = LongBow;
}
