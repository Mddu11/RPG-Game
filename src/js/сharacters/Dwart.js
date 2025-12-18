import { Warrior } from './Warrior.js';
import { Axe } from '../weapons/Axe.js';

export class Dwart extends Warrior {
    constructor(position, name) {
        super(position, name);
        this.life = 130;
        this.attack = 15;
        this.luck = 20;
        this.description = 'Гном';
        this.weapon = new Axe();
        this.hitCount = 0;
    }

    takeDamage(damage) {
        this.hitCount++;
        if (this.hitCount % 6 === 0 && this.getLuck() > 0.5) {
            super.takeDamage(damage / 2);
        } else {
            super.takeDamage(damage);
        }
    }
}
