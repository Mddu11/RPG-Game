import { Player } from './Player.js';
import { Sword } from '../weapons/Sword.js';

export class Warrior extends Player {
    constructor(position, name) {
        super(position, name);
        this.life = 120;
        this.speed = 2;
        this.description = 'Воин';
        this.weapon = new Sword();
    }

    takeDamage(damage) {
        const lowHealth = this.life < 60;
        const hasMagic = this.magic > 0;
        const lucky = this.getLuck() > 0.8;

        if (lowHealth && hasMagic && lucky) {
            const absorbed = Math.min(this.magic, damage);
            this.magic -= absorbed;

            damage -= absorbed;
        }

        if (damage > 0) {
            this.life -= damage;
            if (this.life < 0) {
                this.life = 0;
            }
        }
    }
}
