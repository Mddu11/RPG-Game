import Arm from '../weapons/Arm.js';
import Knife from '../weapons/Knife.js';

export default class Player {
  static startWeapon = Arm;

  static swapWeapon = Knife;
}
