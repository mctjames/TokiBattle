

				     //  	name      1,  2   3   4   5   6   7   8	 HP9 SPD10 
	var kilimonjaro = ["Kilimonjaro", 27, 71, 11, 66, 44, 33, 40, 50, 35, 75, "https://giphy.com/stickers/bowz-ffrh-cLl4Db3byHH4AOKe3F", "https://giphy.com/stickers/bowz-ffrh-fqhyp7k335xD6cpHz3"];
	var fungust = ["Fungust", 21, 45,	9,	80,	80,	21,	41,	44,	50,	65,	"https://giphy.com/stickers/bowz-ffrh-IgXJiugnfMwPkEpFX2", "https://giphy.com/stickers/bowz-ffrh-XEZjiAqcZWXrPUsZ1x"];
	var bobby = ["Bobby", 31, 26, 95, 11, 67, 53, 80, 10,	10, 100, "https://giphy.com/stickers/bowz-ffrh-WUIda5VPUNPLJdfKIL", "https://giphy.com/stickers/bowz-ffrh-JR0VORq8UozRwh7Thb"];
	var conyvore = ["Conyvore", 7, 38,	25, 12,	76, 91,	78, 16, 30, 76, "https://giphy.com/stickers/bowz-ffrh-dVuo3Rq4nO5JPKBwve" , 	"https://giphy.com/stickers/bowz-ffrh-LrRFdf1P7OGclKNO8r" ];
	var drygon = ["Drygon", 69, 8, 77,	65, 34,	4, 80, 66,	44,	10,	"https://giphy.com/stickers/bowz-ffrh-mBSD4fY9FC5oMeJmm6",	"https://giphy.com/stickers/bowz-ffrh-RGXNe5I5LGAWlXygJS"];
	var stumpy = ["Stumpy", 33,	33,	33,	33,	90,	33,	75,	70,	50,	5, "https://giphy.com/stickers/bowz-ffrh-Z9WJJxRKVY5CsC4DR3",	"https://giphy.com/stickers/bowz-ffrh-RNWadB4LfyiY0xTvK4"];

	var teamToki = [kilimonjaro, fungust, bobby, conyvore, drygon, stumpy];

	var charmander = ["Charmander", 75,	65,	33,	38,	20,	28,	66,	66,	33,	35, "https://giphy.com/stickers/bowz-ffrh-Yrlf6mmRWxfM9mAYZr",	"https://media.giphy.com/media/j3hXxRQ4vDlojLt0tX/giphy.webp"];
	var pikachu = ["Pikachu", 31, 54, 60, 39, 3, 75, 75, 46, 10, 69, "https://giphy.com/stickers/bowz-ffrh-Me1HHiv2BRKADvnWVP",	"https://giphy.com/stickers/bowz-ffrh-YooRpjzgf0KXpFDhqA"];
	var gastergar = ["Gastergar", 50, 17, 39, 11, 77, 54, 75, 26, 62, 37, "https://giphy.com/stickers/bowz-ffrh-UrnPDS2ggS4yCwIzkr", "https://giphy.com/stickers/bowz-ffrh-j6BQa0h3zlGycU1Wxm"];
	var bellsprout = ["Bellsprout", 15, 57, 44, 46, 55, 31, 47, 56, 49, 48, "https://giphy.com/stickers/bowz-ffrh-JrY6DOnQetktT9JH6h", "https://giphy.com/stickers/bowz-ffrh-dvlDuIO66AIAPX6xQl"];
	var bulbasaur = ["Bulbasaur", 45, 45, 26, 24, 93, 26, 23, 75, 34, 68, "https://giphy.com/stickers/bowz-ffrh-jUzq0gWDDMB3CiGnOr", "https://giphy.com/stickers/bowz-ffrh-UTY2bNeQJSUkofYlrp"];
	var squirtle = ["Squirtle", 4, 92, 28, 47, 31, 53, 40, 90, 50, 20, "https://giphy.com/stickers/bowz-ffrh-XEVPdxchKc9i5dRkKF", "https://giphy.com/stickers/bowz-ffrh-ftpl2KPZURk39KqawY"];
	
	var teamPoke = [charmander, pikachu, gastergar, bellsprout, bulbasaur, squirtle];
		



class TokiBattle{



	constructor(p0, p1, toki, poke, aliveToki, alivePoke){
		this.players = [p0, p1];
		this.turns = [null, null];

		this.sendToPlayers('The Battle Begins!');
		console.log("Two players are ready to battle!");

		var toki = teamToki[0];
		var poke = teamPoke[0]; 

		var aliveToki = [true, true, true, true, true, true];
		var alivePoke = [true, true, true, true, true, true];






		this.players.forEach((player, playerIndex) => {
			player.on('turn', (turn) => {
				//console.log("index: " , playerIndex);


				this.onTurn(playerIndex, turn, toki, poke, aliveToki, alivePoke);

			});
		});
	}

	sendToPlayer(playerIndex, msg){
		this.players[playerIndex].emit('message', msg);
	}

	sendToPlayers(msg){
		this.players.forEach((player) => {
			player.emit('message', msg);
		})
	}


	damageCalc(move, attacker, defender) {
	    
	    var power = 25;
	    var typeAdjust = 25;
	    var STABmodifier = 2*(100-typeAdjust);
	    var effectiveModifier = 100-typeAdjust;
	    var damage = power * attacker[7] / defender[8];
	    console.log("move is " + move);
	    if (move == "attack1") {
	        damage += damage * (attacker[2] - typeAdjust)/STABmodifier;
	        damage += damage * (defender[1] - typeAdjust)/effectiveModifier;
	        damage -= damage * (defender[2] - typeAdjust)/effectiveModifier;
	    }

	    else if (move == "attack2") {
	        damage += damage * (attacker[4] - typeAdjust)/STABmodifier;
	        damage += damage * (defender[5] - typeAdjust)/effectiveModifier;
	        damage -= damage * (defender[3] - typeAdjust)/effectiveModifier;
	    }

	    else if (move == "attack3") {
	        damage += damage * (attacker[5] - typeAdjust)/STABmodifier;
	        damage += damage * (defender[6] - typeAdjust)/effectiveModifier;
	        damage -= damage * (defender[4] - typeAdjust)/effectiveModifier;
	    }
	    else if (move == "attack4") {
	        damage += damage * (attacker[1] - typeAdjust)/STABmodifier;
	        damage += damage * (defender[6] - typeAdjust)/effectiveModifier;
	        damage -= damage * (defender[1] - typeAdjust)/effectiveModifier;
	        damage -= damage * (defender[2] - typeAdjust)/effectiveModifier;
	    }
	    else {
	    	damage = 0;
	    }
	    console.log("damage is " + damage);
	    return damage;
	}

	///////////////pass in toki and poke values for onTurn and call onTurn in resolveAttacks so that the current tokimon isnt always 0/////////////////////////////////////////////////////////////////////////

	onTurn(playerIndex, turn, toki, poke, aliveToki, alivePoke){
		this.turns[playerIndex] = turn; 
		this.sendToPlayer(playerIndex, `You selected ${turn}`);
		

		console.log("toki wthin onTurn " + toki[0]);

		console.log("toki wthin onTurn " + poke[0]);		

		this.resolveAttacks(toki, poke , aliveToki, alivePoke); 

		//this.checkGameOver();
	}





	resolveAttacks(toki, poke, aliveToki, alivePoke){
		const turns = this.turns;

		var tokiDead = false;
		var pokeDead = false;


		console.log("tokimon is " + toki[0]);
		console.log("pokemon is " + poke[0]);

		// we want this to ensure that both moves have been entered from each player
		if ( turns[0] && turns[1] ){
			// swap functions 
			if(turns[0] == 'swap0' && turns[1])
			{
				toki = teamToki[0];
				this.sendToPlayers('player 0 swapped to ' + toki[0]);
				turns[0] = "Nothing";
			}
			if(turns[1] == 'swap0' && turns[0])
			{
				poke = teamPoke[0];
				console.log(poke);
				this.sendToPlayers('player 1 swapped to ' + poke[0]);
				turns[1] = "Nothing";
			}
			//swap 1
			if(turns[0] == 'swap1' && turns[1])
			{
				toki = teamToki[1];
				console.log(toki);
				this.sendToPlayers('player 0 swapped to ' + toki[0]);
				turns[0] = "Nothing";
			}
			if(turns[1] == 'swap1' && turns[0])
			{
				poke = teamPoke[1];
				console.log(poke);
				this.sendToPlayers('player 1 swapped to ' + poke[0]);
				turns[1] = "Nothing";		
			}
			//swap 2
			if(turns[0] == 'swap2' && turns[1])
			{
				toki = teamToki[2];
				console.log(toki);
				this.sendToPlayers('player 0 swapped to ' + toki[0]);
				turns[0] = "Nothing";			
			}
			if(turns[1] == 'swap2' && turns[0])
			{
				poke = teamPoke[2];
				console.log(poke);
				this.sendToPlayers('player 1 swapped to ' + poke[0]);
				turns[1] = "Nothing";
			}
			//swap3
			if(turns[0] == 'swap3' && turns[1])
			{
				toki = teamToki[3];
				console.log(toki);
				this.sendToPlayers('player 0 swapped to ' + toki[0]);
				turns[0] = "Nothing";
			}
			if(turns[1] == 'swap3' && turns[0])
			{
				poke = teamPoke[3];
				console.log(poke);
				this.sendToPlayers('player 1 swapped to ' + poke[0]);
				turns[1] = "Nothing";
			}
			//swap 4
			if(turns[0] == 'swap4' && turns[1])
			{
			    toki = teamToki[4];
			    console.log(toki);
			    this.sendToPlayers('player 0 swapped to ' + toki[0]);
			    turns[0] = "Nothing";
			}
			if(turns[1] == 'swap4' && turns[0])
			{
			    poke = teamPoke[4];
			    console.log(poke);
			    this.sendToPlayers('player 1 swapped to ' + poke[0]);
			    turns[1] = "Nothing";
			}
			//swap5
			if(turns[0] == 'swap5' && turns[1])
			{
			    toki = teamToki[5];
			    console.log(toki);
			    this.sendToPlayers('player 0 swapped to ' + toki[0]);
			    turns[0] = "Nothing";
			}
			if(turns[1] == 'swap5' && turns[0])
			{
			    poke = teamPoke[5];
			    console.log(poke);
			    this.sendToPlayers('player 1 swapped to ' + poke[0]);
			    turns[1] = "Nothing";
			}
					
			//////// speed calculation /////////
			if(toki[10] > poke[10])
			{
				var fast = toki;
				var slow = poke;

				var fastmove = turns[0];
				var slowmove = turns[1];
			}
			else
			{
				var fast = toki;
				var slow = poke; 
				var fastmove = turns[1];
				var slowmove = turns[0];
			}
		

			slow[9] -= this.damageCalc(fastmove, fast, slow);
			console.log(slow[9]);
			if(slow[9] <= 0)
			{
				console.log("we should be here");
				if(slow == toki)
				{
					// death checks
					if(toki == teamToki[0])
					{
						aliveToki[0] = false;
					}

					else if(toki == teamToki[1])
					{
						aliveToki[1] = false;
					}					
					else if(toki == teamToki[2])
					{
						aliveToki[2] = false;
					}	
					else if(toki == teamToki[3])
					{
						aliveToki[3] = false;
					}	
					else if(toki == teamToki[4])
					{
						aliveToki[4] = false;
					}	
					else if(toki == teamToki[5])
					{
						aliveToki[5] = false;
					}
					this.sendToPlayers(toki[0] + ' is dead!');
					
					// swapping functions start here
					if (aliveToki[0] == true)
					{
						toki = teamToki[0];
					}
					else if (aliveToki[1] == true)
					{
						toki = teamToki[1];
					}
					else if (aliveToki[2] == true)
					{
						toki = teamToki[2];
					}
					else if (aliveToki[3] == true)
					{
						toki = teamToki[3];
					}
					else if (aliveToki[4] == true)
					{
						toki = teamToki[4];
					}					
					else if (aliveToki[5] == true)
					{
						toki = teamToki[5];
					}		
					this.sendToPlayers(toki[0] + ' got swapped in');
					// var tokiDead = true;
					// else
					// {
					// 	//send to winscreen //////////////////////////////////////////////////
					// }					
				}
				else
				{
					alivePoke -= 1;
					var pokeDead = true; 
					if(alivePoke <= 0)
					{
						//send to winscreen /////////////////////////////////////////////////////
					}
				}


			}
			else
			{
				console.log("puppy");
				fast[9] -= this.damageCalc(slowmove, slow, fast);
				console.log(fast[9]);
				if(fast[9] <= 0)
				{
					console.log("hereeeee");
					if(fast == toki)
					{
						//death checks
						if(toki == teamToki[0])
						{
							aliveToki[0] = false;
						}
						else if(toki == teamToki[1])
						{
							aliveToki[1] = false;
						}					
						else if(toki == teamToki[2])
						{
							aliveToki[2] = false;
						}	
						else if(toki == teamToki[3])
						{
							aliveToki[3] = false;
						}	
						else if(toki == teamToki[4])
						{
							aliveToki[4] = false;
						}	
						else if(toki == teamToki[5])
						{
							aliveToki[5] = false;
						}
						this.sendToPlayers(toki[0] + ' is dead!');

						// swap in new tokimon
						if (aliveToki[0] == true)
						{
							toki = teamToki[0];
						}
						else if (aliveToki[1] == true)
						{
							toki = teamToki[1];
						}
						else if (aliveToki[2] == true)
						{
							toki = teamToki[2];
						}
						else if (aliveToki[3] == true)
						{
							toki = teamToki[3];
						}
						else if (aliveToki[4] == true)
						{
							toki = teamToki[4];
						}					
						else if (aliveToki[5] == true)
						{
							toki = teamToki[5];
						}		
						this.sendToPlayers(toki[0] + ' was swapped in!');
						// var tokiDead = true;
						// else
						// {
						// 	//send to winscreen //////////////////////////////////////////////////
						// }					
					}
					
				}
			}


			

	} // if(turns[0] && turn[1])
} // function bracket. 



	checkGameOver(){
		const turns = this.turns;

		if (turns[0] && turns[1]){
			

			this.sendToPlayers('Game over ' + turns.join(' : '));



			this.getGameResult();
			this.turns = [null, null];
			this.sendToPlayers('Next Round!');
		};
	}






	getGameResult(){
		const p0 = this.decodeTurn(this.turns[0]);
		const p1 = this.decodeTurn(this.turns[1]);

		const distance = (p1 - p0 + 3) % 3;

		switch(distance){
			case 0:
				// draw
				this.sendToPlayers('Draw!');
				break;
			case 1:
				// p0 won
				this.sendWinMessage(this.players[0], this.players[1]);
				break;
			case 2:
				// p1 won
				this.sendWinMessage(this.players[1], this.players[0]);
				break;
		}
	}

	decodeTurn(turn){
		switch (turn){
			case 'rock':
				return 0;
			case 'scissors':
				return 1;
			case 'paper':
				return 2;	
			default:
				throw new Error(`could not decode turn ${turn}`)							
		}
	}

	sendWinMessage(winner, loser){
		winner.emit('message', 'You Won!');
		loser.emit('message', 'You lost!');
	}


}


module.exports = TokiBattle; 