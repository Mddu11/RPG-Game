import { Player } from './Player.js';
import { Staff } from '../weapons/Staff.js';

export class Mage extends Player {
    constructor(position, name) {
        super(position, name);
        this.life = 70;
        this.magic = 100;
        this.attack = 5;
        this.agility = 8;
        this.description = 'Маг';
        this.weapon = new Staff();
    }

    takeDamage(damage) {
        if (this.magic > 50) {
            this.magic -= 12;
            this.life = Math.max(0, this.life - damage / 2);
        } else {
            this.life = Math.max(0, this.life - damage);
        }
    }
}
