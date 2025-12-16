import Weapon from '../Weapon.js';
import Arm from '../Arm.js';
import Bow from '../Bow.js';
import Sword from '../Sword.js';
import Knife from '../Knife.js';
import Staff from '../Staff.js';
import LongBow from '../LongBow.js';
import Axe from '../Axe.js';
import StormStaff from '../StormStaff.js';

describe('Weapon base class', () => {
  test('constructor sets properties including initDurability', () => {
    const w = new Weapon('Старый меч', 20, 10, 1);

    expect(w).toEqual({
      name: 'Старый меч',
      attack: 20,
      durability: 10,
      initDurability: 10,
      range: 1
    });
  });

  test('takeDamage reduces durability and not below 0', () => {
    const w = new Weapon('X', 1, 10, 1);

    w.takeDamage(5);
    expect(w.durability).toBe(5);

    w.takeDamage(50);
    expect(w.durability).toBe(0);
  });

  test('getDamage returns full damage if durability >= 30%', () => {
    const w = new Weapon('X', 10, 100, 1);

    w.takeDamage(70); // durability = 30
    expect(w.durability).toBe(30);
    expect(w.getDamage()).toBe(10);
  });

  test('getDamage returns half damage if durability < 30% but > 0', () => {
    const w = new Weapon('X', 10, 100, 1);

    w.takeDamage(71); // durability = 29
    expect(w.getDamage()).toBe(5);
  });

  test('getDamage returns 0 when durability is 0', () => {
    const w = new Weapon('X', 10, 100, 1);

    w.takeDamage(200);
    expect(w.durability).toBe(0);
    expect(w.getDamage()).toBe(0);
  });

  test('isBroken is true only when durability is 0', () => {
    const w = new Weapon('X', 10, 1, 1);

    expect(w.isBroken()).toBe(false);
    w.takeDamage(1);
    expect(w.isBroken()).toBe(true);
  });
});

describe('Weapons subclasses', () => {
  test('Arm: Infinity durability and takeDamage does not change it', () => {
    const arm = new Arm();

    expect(arm.name).toBe('Рука');
    expect(arm.attack).toBe(1);
    expect(arm.durability).toBe(Infinity);
    expect(arm.initDurability).toBe(Infinity);
    expect(arm.range).toBe(1);

    arm.takeDamage(999);
    expect(arm.durability).toBe(Infinity);
  });

  test('Bow stats', () => {
    const bow = new Bow();
    expect(bow.name).toBe('Лук');
    expect(bow.attack).toBe(10);
    expect(bow.durability).toBe(200);
    expect(bow.initDurability).toBe(200);
    expect(bow.range).toBe(3);
  });

  test('Sword stats', () => {
    const sword = new Sword();
    expect(sword.name).toBe('Меч');
    expect(sword.attack).toBe(25);
    expect(sword.durability).toBe(500);
    expect(sword.range).toBe(1);
  });

  test('Knife stats', () => {
    const knife = new Knife();
    expect(knife.name).toBe('Нож');
    expect(knife.attack).toBe(5);
    expect(knife.durability).toBe(300);
    expect(knife.range).toBe(1);
  });

  test('Staff stats', () => {
    const staff = new Staff();
    expect(staff.name).toBe('Посох');
    expect(staff.attack).toBe(8);
    expect(staff.durability).toBe(300);
    expect(staff.range).toBe(2);
  });

  test('LongBow overrides Bow (attack, range, name) but keeps durability', () => {
    const lb = new LongBow();
    expect(lb.name).toBe('Длинный лук');
    expect(lb.attack).toBe(15);
    expect(lb.range).toBe(4);
    expect(lb.durability).toBe(200);
    expect(lb.initDurability).toBe(200);
  });

  test('Axe overrides Sword (name, attack, durability=800)', () => {
    const axe = new Axe();
    expect(axe.name).toBe('Секира');
    expect(axe.attack).toBe(27);
    expect(axe.range).toBe(1);
    expect(axe.durability).toBe(800);
    expect(axe.initDurability).toBe(800);
  });

  test('StormStaff overrides Staff (name, attack, range) and keeps durability', () => {
    const ss = new StormStaff();
    expect(ss.name).toBe('Посох Бури');
    expect(ss.attack).toBe(10);
    expect(ss.range).toBe(3);
    expect(ss.durability).toBe(300);
    expect(ss.initDurability).toBe(300);
  });
});
