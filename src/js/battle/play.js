export function play(players) {
  const maxRounds = 1000;

  for (let round = 1; round <= maxRounds; round += 1) {
    const alive = players.filter((p) => !p.isDead());

    if (alive.length <= 1) {
      return alive[0] ?? null;
    }

    alive.forEach((player) => {
      const currentAlive = players.filter((p) => !p.isDead());

      if (currentAlive.length <= 1) {
        return;
      }

      player.turn(currentAlive);
    });
  }

  const winners = players.filter((p) => !p.isDead());
  return winners.length === 1 ? winners[0] : null;
}
