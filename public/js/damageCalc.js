damageCalc(move, attacker, defender) {
	    
    var power = 25;
    var typeAdjust = 25;
    var STABmodifier = 2*(100-typeAdjust);
    var effectiveModifier = 100-typeAdjust;
    var damage = power * attacker[7] / defender[8];
    
    if (move == "attack1") {        //Waterfall
        damage += damage * (attacker[2] - typeAdjust)/STABmodifier;
        damage += damage * (defender[1] - typeAdjust)/effectiveModifier;
        damage -= damage * (defender[2] - typeAdjust)/effectiveModifier;
    }

    else if (move == "attack2") {   //Aerial Black
        damage += damage * (attacker[4] - typeAdjust)/STABmodifier;
        damage += damage * (defender[5] - typeAdjust)/effectiveModifier;
        damage -= damage * (defender[3] - typeAdjust)/effectiveModifier;
    }

    else if (move == "attack3") {   //Agile Strike
        damage += damage * (attacker[5] - typeAdjust)/STABmodifier;
        damage += damage * (defender[6] - typeAdjust)/effectiveModifier;
        damage -= damage * (defender[4] - typeAdjust)/effectiveModifier;
    }
    else if (move == "attack4") {   //Burnout
        damage += damage * (attacker[1] - typeAdjust)/STABmodifier;
        damage += damage * (defender[6] - typeAdjust)/effectiveModifier;
        damage -= damage * (defender[1] - typeAdjust)/effectiveModifier;
        damage -= damage * (defender[2] - typeAdjust)/effectiveModifier;
    }
    else {
        damage = 0;
    }
    return damage;
}