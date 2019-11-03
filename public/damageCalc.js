function damageCalc(move, attacker, defender) {
    var damage = move.power attacker.attack / defender.defense;

    if (move.type == "water") {
        damage += damage * (attacker.water - 25)
        damage += damage * (defender.fire - 25) / 150
        damage -= damage * (defender.water - 25) / 150
    }
    else if (move.type == "fire") {
        damage += damage * (attacker.fire - 25);
        damage += damage * (defender.ice - 25) / 150;
        damage -= damage * (defender.fire - 25) / 150;
    }
    else if (move.type == "electric") {
        damage += damage * (attacker.electric - 25)
        damage += damage * (defender.flying - 25) / 150
        damage += damage * (defender.water - 25) / 150
    }
    else if (move.type == "flying") {
        damage += damage * (attacker.flying - 25)
        damage += damage * (defender.fighting - 25) / 150
        damage -= damage * (defender.electric - 25) / 150
    }
    else if (move.type == "fighting") {
        damage += damage * (attacker.fighting - 25)
        damage += damage * (defender.ice - 25) / 150
        damage -= damage * (defender.flying - 25) / 150
    }
    else if (move.type == "ice") {
        damage += damage * (attacker.ice - 25)
        damage += damage * (defender.flying - 25) / 150
        damage -= damage * (defender.ice - 25) / 150
        damage -= damage * (defender.water - 25) / 150
        damage -= damage * (defender.fire - 25) / 150
    }
    return damage;
}