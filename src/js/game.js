import { Player } from '../characters/Player.js';
import { Archer } from '../characters/Archer.js';
import { Warrior } from '../characters/Warrior.js';
import { Mage } from '../characters/Mage.js';
import { Dwart } from '../characters/Dwart.js';
import { Crossbowman } from '../characters/Crossbowman.js';
import { Demourge } from '../characters/Demourge.js';

export function play(players) {
    let turn = 0;
    while (players.filter(p => !p.isDead()).length > 1) {
        turn++;
        console.log(`\n--- Ход ${turn} ---`);
        
        for (const player of players) {
            if (!player.isDead()) {
                player.turn(players);
                player.checkWeapon();
                console.log(`${player.name} (${player.description}): Жизнь=${player.life}, Позиция=${player.position}`);
            }
        }
    }
    
    const winner = players.find(p => !p.isDead());
    console.log(`\nПобедитель: ${winner.name} (${winner.description})!`);
    return winner;
}
