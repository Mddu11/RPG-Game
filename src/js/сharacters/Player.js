console.log("[DEBUG] Loading Player.js module...");

import Arm from '../weapons/Arm.js';
import Knife from '../weapons/Knife.js';

console.log("[DEBUG] Imported Arm and Knife in Player.js");

export default class Player {
  constructor(position, name) {
    console.log(`[DEBUG] Creating Player instance: ${name} at position ${position}`);
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
    console.log(`[DEBUG] Player ${name} created with initial life: ${this.life}, weapon: ${this.weapon.name}`);
  }

  getLuck() {
    const randomValue = Math.random() * 100;
    const luckValue = (randomValue + this.luck) / 100;
    console.log(`[DEBUG] ${this.name}.getLuck() returned: ${luckValue}`);
    return luckValue;
  }

  getDamage(distance) {
    console.log(`[DEBUG] ${this.name}.getDamage() called with distance: ${distance}`);
    if (distance > this.weapon.range) {
        console.log(`[DEBUG] ${this.name} cannot attack at distance ${distance} (weapon range: ${this.weapon.range})`);
        return 0;
    }
    const baseDamage = this.attack + this.weapon.getDamage();
    const damage = (baseDamage * this.getLuck()) / distance;
    console.log(`[DEBUG] ${this.name} calculated damage: ${damage}`);
    return damage;
  }

  takeDamage(damage) {
    console.log(`[DEBUG] ${this.name}.takeDamage() called with damage: ${damage}`);
    this.life = Math.max(this.life - damage, 0);
    console.log(`[DEBUG] ${this.name} life after taking damage: ${this.life}`);
  }

  isDead() {
    const dead = this.life === 0;
    console.log(`[DEBUG] ${this.name}.isDead() returned: ${dead}`);
    return dead;
  }

  moveLeft(distance) {
    console.log(`[DEBUG] ${this.name}.moveLeft() called with distance: ${distance}`);
    this.position = Math.max(this.position - Math.min(distance, this.speed), 0);
    console.log(`[DEBUG] ${this.name} new position after moveLeft: ${this.position}`);
  }

  moveRight(distance) {
    console.log(`[DEBUG] ${this.name}.moveRight() called with distance: ${distance}`);
    this.position += Math.min(distance, this.speed);
    console.log(`[DEBUG] ${this.name} new position after moveRight: ${this.position}`);
  }

  move(distance) {
    console.log(`[DEBUG] ${this.name}.move() called with distance: ${distance}`);
    if (distance < 0) {
      this.moveLeft(Math.abs(distance));
    } else {
      this.moveRight(distance);
    }
  }

  isAttackBlocked() {
    const blocked = this.getLuck() > ((100 - this.luck) / 100);
    console.log(`[DEBUG] ${this.name}.isAttackBlocked() returned: ${blocked}`);
    return blocked;
  }

  dodged() {
    const dodgeChance = ((100 - this.agility) - (this.speed * 3)) / 100;
    const dodged = this.getLuck() > dodgeChance;
    console.log(`[DEBUG] ${this.name}.dodged() calculated dodgeChance: ${dodgeChance}, getLuck: ${this.getLuck()}, returned: ${dodged}`);
    return dodged;
  }

  takeAttack(damage, newPosition = null) {
    console.log(`[DEBUG] ${this.name}.takeAttack() called with damage: ${damage}, newPosition: ${newPosition}`);
    if (newPosition !== null) {
      this.position = newPosition;
      console.log(`[DEBUG] ${this.name} position updated to: ${this.position}`);
    }
    if (this.isAttackBlocked()) {
      this.weapon.takeDamage(damage);
      console.log(`${this.name} блокировал атаку! Оружие получило урон ${damage}`);
    } else if (this.dodged()) {
      console.log(`${this.name} уклонился от атаки!`);
    } else {
      this.takeDamage(damage);
      console.log(`${this.name} получил урон ${damage}. Здоровье: ${this.life}`);
    }
    this.checkWeapon();
  }

  checkWeapon() {
    console.log(`[DEBUG] ${this.name}.checkWeapon() called. Weapon: ${this.weapon.name}, Broken: ${this.weapon.isBroken()}`);
    if (this.weapon.isBroken()) {
      console.log(`${this.name} меняет сломанное оружие.`);
      if (this.weapon.constructor.name === 'Knife') {
        this.weapon = new Arm();
      } else {
        this.weapon = new Knife();
      }
      console.log(`[DEBUG] ${this.name} switched weapon to: ${this.weapon.name}`);
    }
  }

  tryAttack(enemy) {
    console.log(`[DEBUG] ${this.name}.tryAttack() called against ${enemy.name}`);
    const distance = Math.abs(this.position - enemy.position);
    console.log(`[DEBUG] Distance to enemy ${enemy.name}: ${distance}`);

    if (distance > this.weapon.range) {
      console.log(`${this.name} атакует ${enemy.name} вплотную!`);
      console.log(`${enemy.name} отлетает на 1 клетку.`);
      return;
    }

    const weaponDamage = 10 * this.getLuck();
    this.weapon.takeDamage(weaponDamage);
    console.log(`[DEBUG] ${this.name}'s weapon took durability damage: ${weaponDamage}`);

    let damage = this.getDamage(distance);
    console.log(`[DEBUG] Calculated damage from ${this.name} to ${enemy.name}: ${damage}`);

    if (this.position === enemy.position) {
      const newEnemyPosition = enemy.position + 1;
      console.log(`${this.name} атакует ${enemy.name} вплотную!`);
      console.log(`${enemy.name} отлетает на 1 клетку.`);
      damage *= 2;
      console.log(`[DEBUG] Damage doubled to: ${damage} due to close combat.`);
      enemy.takeAttack(damage, newEnemyPosition);
    } else {
      enemy.takeAttack(damage);
    }
  }

  chooseEnemy(players) {
    console.log(`[DEBUG] ${this.name}.chooseEnemy() called. Available players: ${players.map(p => p.name).join(', ')}`);
    let minHealth = Infinity;
    let chosenEnemy = null;

    players.forEach((player) => {
      if (player !== this && !player.isDead() && player.life < minHealth) {
        minHealth = player.life;
        chosenEnemy = player;
      }
    });

    console.log(`[DEBUG] ${this.name} chose enemy: ${chosenEnemy ? chosenEnemy.name : 'None'}`);
    return chosenEnemy;
  }

  moveToEnemy(enemy) {
    console.log(`[DEBUG] ${this.name}.moveToEnemy() called for enemy: ${enemy ? enemy.name : 'None'}`);
    if (!enemy) return;

    const distanceToEnemy = enemy.position - this.position;
    console.log(`[DEBUG] Distance to enemy ${enemy.name} before move: ${distanceToEnemy}`);

    if (distanceToEnemy < 0) {
      this.moveLeft(this.speed);
    } else if (distanceToEnemy > 0) {
      this.moveRight(this.speed);
    }
    console.log(`[DEBUG] ${this.name} moved. New position: ${this.position}`);
  }

  turn(players) {
    console.log(`\n[DEBUG] === ${this.name}'s TURN START ===`);
    const enemy = this.chooseEnemy(players);
    if (!enemy) {
        console.log(`[DEBUG] ${this.name} has no enemies to attack.`);
        console.log(`[DEBUG] === ${this.name}'s TURN END ===\n`);
        return;
    }
    this.moveToEnemy(enemy);
    this.tryAttack(enemy);
    this.checkWeapon();
    console.log(`[DEBUG] === ${this.name}'s TURN END ===\n`);
  }
}

console.log("[DEBUG] Player.js module loaded and Player class defined.");
