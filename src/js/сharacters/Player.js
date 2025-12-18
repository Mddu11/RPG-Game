import { Arm } from '../weapons/Arm.js';
import { Knife } from '../weapons/Knife.js';

export class Player {
    constructor(position, name) {
        this.life = 100;
        this.magic = 20;
        this.speed = 1;
        this.attack = 10;
        this.agility = 5;
        this.luck = 10;
        this.description = 'Игрок';
        this.weapon = new Arm();
        this.position = position;
        this.name = name;
    }

    getLuck() {
        const randomValue = Math.random() * 100;
        return (randomValue + this.luck) / 100;
    }

    getDamage(distance) {
        if (distance > this.weapon.range) {
            return 0;
        }

        const baseDamage = this.attack + this.weapon.getDamage();
        const luckFactor = this.getLuck();

        return baseDamage * luckFactor / Math.max(1, distance);
    }

    takeDamage(damage) {
        this.life -= damage;
        if (this.life < 0) {
            this.life = 0;
        }
    }

    isDead() {
        return this.life <= 0;
    }

    moveLeft(distance) {
        const step = Math.min(distance, this.speed);
        this.position -= step;
    }

    moveRight(distance) {
        const step = Math.min(distance, this.speed);
        this.position += step;
    }

    move(distance) {
        if (distance === 0) return;

        distance < 0
            ? this.moveLeft(Math.abs(distance))
            : this.moveRight(distance);
    }

    isAttackBlocked() {
        const chance = (100 - this.luck) / 100;
        return this.getLuck() > chance;
    }

    dodged() {
        const evadeChance = (100 - this.agility - this.speed * 3) / 100;
        return this.getLuck() > evadeChance;
    }

    takeAttack(damage) {
        if (this.isAttackBlocked()) {
            this.weapon.takeDamage(damage);
            return;
        }

        if (!this.dodged()) {
            this.takeDamage(damage);
        }
    }

    checkWeapon() {
        if (!this.weapon.isBroken()) return;

        this.weapon =
            this.weapon instanceof Knife ? new Arm() : new Knife();
    }

    tryAttack(enemy) {
        const distance = Math.abs(this.position - enemy.position) || 1;

        if (distance > this.weapon.range) return;

        this.weapon.takeDamage(10 * this.getLuck());
        let damage = this.getDamage(distance);

        if (this.position === enemy.position) {
            enemy.position += 1;
            damage *= 2;
        }

        enemy.takeAttack(damage);
    }

    chooseEnemy(players) {
        const enemies = players.filter(
            player => player !== this && !player.isDead()
        );

        if (enemies.length === 0) return null;

        return enemies.reduce((target, current) =>
            current.life < target.life ? current : target
        );
    }

    moveToEnemy(enemy) {
        const direction = enemy.position > this.position ? 1 : -1;
        this.move(direction * this.speed);
    }

    turn(players) {
        const enemy = this.chooseEnemy(players);
        if (!enemy) return;

        this.moveToEnemy(enemy);
        this.tryAttack(enemy);
        this.checkWeapon();
    }
}
