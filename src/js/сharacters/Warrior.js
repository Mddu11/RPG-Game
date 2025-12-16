import Player from './Player.js';
import Sword from '../weapons/Sword.js';

export default class Warrior extends Player {
  static startWeapon = Sword;
}
