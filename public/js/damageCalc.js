function damageCalc(move, attacker, defender) {
    var damage = move.power attacker.attack / defender.defense;
    typeAdjust = 25;
    STABmodifier = 2*(100-typeAdjust);
    effectiveModifier = 100-typeAdjust;
    
    if (move.type == "water") {
        damage += damage * (attacker.water - 25)/STABmodifier;
        damage += damage * (defender.fire - 25)/effectiveModifier;
        damage -= damage * (defender.water - 25)/effectiveModifier;
    }
    else if (move.type == "fire") {
        damage += damage * (attacker.fire - 25)/STABmodifier;
        damage += damage * (defender.ice - 25)/effectiveModifier;
        damage -= damage * (defender.fire - 25)/effectiveModifier;
    }
    else if (move.type == "electric") {
        damage += damage * (attacker.electric - 25)/STABmodifier;
        damage += damage * (defender.flying - 25)/effectiveModifier;
        damage += damage * (defender.water - 25)/effectiveModifier;
    }
    else if (move.type == "flying") {
        damage += damage * (attacker.flying - 25)/STABmodifier;
        damage += damage * (defender.fighting - 25)/effectiveModifier;
        damage -= damage * (defender.electric - 25)/effectiveModifier;
    }
    else if (move.type == "fighting") {
        damage += damage * (attacker.fighting - 25)/STABmodifier;
        damage += damage * (defender.ice - 25)/effectiveModifier;
        damage -= damage * (defender.flying - 25)/effectiveModifier;
    }
    else if (move.type == "ice") {
        damage += damage * (attacker.ice - 25)/STABmodifier;
        damage += damage * (defender.flying - 25)/effectiveModifier;
        damage -= damage * (defender.ice - 25)/effectiveModifier;
        damage -= damage * (defender.water - 25)/effectiveModifier;
        damage -= damage * (defender.fire - 25)/effectiveModifier;
    }
    return damage;
}