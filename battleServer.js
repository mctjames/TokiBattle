

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
	
	var teamPoke = [charmander, gastergar, pikachu, squirtle, bellsprout, bulbasaur, ];
		



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
	    if (move == "Waterfall") {
	        damage += damage * (attacker[2] - typeAdjust)/STABmodifier;
	        damage += damage * (defender[1] - typeAdjust)/effectiveModifier;
	        damage -= damage * (defender[2] - typeAdjust)/effectiveModifier;
	    }

	    else if (move == "Aerial Black") {
	        damage += damage * (attacker[4] - typeAdjust)/STABmodifier;
	        damage += damage * (defender[5] - typeAdjust)/effectiveModifier;
	        damage -= damage * (defender[3] - typeAdjust)/effectiveModifier;
	    }

	    else if (move == "Agile Strike") {
	        damage += damage * (attacker[5] - typeAdjust)/STABmodifier;
	        damage += damage * (defender[6] - typeAdjust)/effectiveModifier;
	        damage -= damage * (defender[4] - typeAdjust)/effectiveModifier;
	    }
	    else if (move == "Burnout") {
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
		
		toki = teamToki[0];
		poke = teamPoke[0];

		this.resolveAttacks(toki, poke , aliveToki, alivePoke); 

	}





	resolveAttacks(toki, poke, aliveToki, alivePoke){
		const turns = this.turns;

		var tokiDead = false;
		var pokeDead = false;


		console.log("tokimon is " + toki[0]);
		console.log("pokemon is " + poke[0]);

		// we want this to ensure that both moves have been entered from each player
		if ( turns[0] && turns[1] ){
			/////// swap functions//////////
			if(turns[0] == 'swap0' && turns[1])
			{
				var temp = teamToki[0];
				teamToki[0] = teamToki[0];
				teamToki[0] = temp;
				toki = teamToki[0];
				temp = aliveToki[0];
				aliveToki[0] = aliveToki[0];
				aliveToki[0] = temp;
				console.log(toki);
				this.sendToPlayers('player 0 swapped to ' + toki[0]);

				//send current tokimon to ejs page. 
				this.players.forEach((player) => {
					player.emit('swapBroadcast', {description: toki[0]});
				})

				turns[0] = "Nothing";
			}
			if(turns[1] == 'swap0' && turns[0])
			{
				var temp = teamPoke[0];
				teamPoke[0] = teamPoke[0];
				teamPoke[0] = temp;
				poke = teamPoke[0];
				temp = alivePoke[0];
				alivePoke[0] = alivePoke[0];
				alivePoke[0] = temp;
				console.log(poke);
				this.sendToPlayers('player 1 swapped to ' + poke[0]);

				//send current pokemon to ejs page. 
				this.players.forEach((player) => {
					player.emit('swapBroadcast', {description: poke[0]});
				})

				turns[1] = "Nothing";
			}
			//swap 1
			if(turns[0] == 'swap1' && turns[1])
			{
				var temp = teamToki[0];
				teamToki[0] = teamToki[1];
				teamToki[1] = temp;
				toki = teamToki[0];
				temp = aliveToki[0];
				aliveToki[0] = aliveToki[1];
				aliveToki[1] = temp;
				console.log(toki);
				this.sendToPlayers('player 0 swapped to ' + toki[0]);

				//send current tokimon to ejs page. 
				this.players.forEach((player) => {
					player.emit('swapBroadcast', {description: toki[0]});
				})
				turns[0] = "Nothing";
			}
			if(turns[1] == 'swap1' && turns[0])
			{
				var temp = teamPoke[0];
				teamPoke[0] = teamPoke[1];
				teamPoke[1] = temp;
				poke = teamPoke[0];
				temp = alivePoke[0];
				alivePoke[0] = alivePoke[1];
				alivePoke[1] = temp;
				console.log(poke);
				this.sendToPlayers('player 1 swapped to ' + poke[0]);
				this.players.forEach((player) => {
					player.emit('swapBroadcast', {description: poke[0]});
				})
				turns[1] = "Nothing";		
			}
			//swap 2
			if(turns[0] == 'swap2' && turns[1])
			{
				var temp = teamToki[0];
				teamToki[0] = teamToki[2];
				teamToki[2] = temp;
				toki = teamToki[0];
				temp = aliveToki[0];
				aliveToki[0] = aliveToki[2];
				aliveToki[2] = temp;
				console.log(toki);
				this.sendToPlayers('player 0 swapped to ' + toki[0]);

				//send current tokimon to ejs page. 
				this.players.forEach((player) => {
					player.emit('swapBroadcast', {description: toki[0]});
				})
				turns[0] = "Nothing";			
			}
			if(turns[1] == 'swap2' && turns[0])
			{
				var temp = teamPoke[0];
				teamPoke[0] = teamPoke[2];
				teamPoke[2] = temp;
				poke = teamPoke[0];
				temp = alivePoke[0];
				alivePoke[0] = alivePoke[2];
				alivePoke[2] = temp;
				console.log(poke);
				this.sendToPlayers('player 1 swapped to ' + poke[0]);
				this.players.forEach((player) => {
					player.emit('swapBroadcast', {description: poke[0]});
				})
				turns[1] = "Nothing";
			}
			//swap3
			if(turns[0] == 'swap3' && turns[1])
			{
				var temp = teamToki[0];
				teamToki[0] = teamToki[3];
				teamToki[3] = temp;
				toki = teamToki[0];
				temp = aliveToki[0];
				aliveToki[0] = aliveToki[3];
				aliveToki[3] = temp;
				console.log(toki);
				this.sendToPlayers('player 0 swapped to ' + toki[0]);
				//send current tokimon to ejs page. 
				this.players.forEach((player) => {
					player.emit('swapBroadcast', {description: toki[0]});
				})
				turns[0] = "Nothing";
			}
			if(turns[1] == 'swap3' && turns[0])
			{
				var temp = teamPoke[0];
				teamPoke[0] = teamPoke[3];
				teamPoke[3] = temp;
				poke = teamPoke[0];
				temp = alivePoke[0];
				alivePoke[0] = alivePoke[3];
				alivePoke[3] = temp;
				console.log(poke);
				this.sendToPlayers('player 1 swapped to ' + poke[0]);
				this.players.forEach((player) => {
					player.emit('swapBroadcast', {description: poke[0]});
				})
				turns[1] = "Nothing";
			}
			//swap 4
			if(turns[0] == 'swap4' && turns[1])
			{
				var temp = teamToki[0];
				teamToki[0] = teamToki[4];
				teamToki[4] = temp;
				toki = teamToki[0];
				temp = aliveToki[0];
				aliveToki[0] = aliveToki[4];
				aliveToki[4] = temp;
			    console.log(toki);
			    this.sendToPlayers('player 0 swapped to ' + toki[0]);
			    //send current tokimon to ejs page. 
				this.players.forEach((player) => {
					player.emit('swapBroadcast', {description: toki[0]});
				})
			    turns[0] = "Nothing";
			}
			if(turns[1] == 'swap4' && turns[0])
			{
				var temp = teamPoke[0];
				teamPoke[0] = teamPoke[4];
				teamPoke[4] = temp;
				poke = teamPoke[0];
				temp = alivePoke[0];
				alivePoke[0] = alivePoke[4];
				alivePoke[4] = temp;
			    console.log(poke);
			    this.sendToPlayers('player 1 swapped to ' + poke[0]);
			    this.players.forEach((player) => {
					player.emit('swapBroadcast', {description: poke[0]});
				})
			    turns[1] = "Nothing";
			}
			//swap5
			if(turns[0] == 'swap5' && turns[1])
			{
				var temp = teamToki[0];
				teamToki[0] = teamToki[5];
				teamToki[5] = temp;
				toki = teamToki[0];
				temp = aliveToki[0];
				aliveToki[0] = aliveToki[5];
				aliveToki[5] = temp;
			    console.log(toki);
			    this.sendToPlayers('player 0 swapped to ' + toki[0]);
			    //send current tokimon to ejs page. 
				this.players.forEach((player) => {
					player.emit('swapBroadcast', {description: toki[0]});
				})
			    turns[0] = "Nothing";
			}
			if(turns[1] == 'swap5' && turns[0])
			{
				var temp = teamPoke[0];
				teamPoke[0] = teamPoke[5];
				teamPoke[5] = temp;
				poke = teamPoke[0];
				temp = alivePoke[0];
				alivePoke[0] = alivePoke[5];
				alivePoke[5] = temp;
			    console.log(poke);
			    this.sendToPlayers('player 1 swapped to ' + poke[0]);
			    this.players.forEach((player) => {
					player.emit('swapBroadcast', {description: poke[0]});
				})
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
		
			/////////damage/////////////
			var damage = this.damageCalc(fastmove, fast, slow);
			slow[9] -= damage;
			console.log(slow[9]);
			this.sendToPlayers(fast[0] + " used " + fastmove);
			this.sendToPlayers(slow[0] + " took " + damage + " damage");
			this.sendToPlayers(slow[0] + " has " + slow[9] + " HP remaining");

			//////if a tokimon/pokemon dies///////
			if(slow[9] <= 0)
			{
				console.log("we should be here");
				if(slow == toki)
				{
					aliveToki[0] = false;
					this.sendToPlayers(toki[0] + ' is dead!');
					
					// death swaps start here
					if (aliveToki[1] == true)
					{
						var temp = teamToki[0];
						teamToki[0] = teamToki[1];
						teamToki[1] = temp;
						toki = teamToki[0];
						temp = aliveToki[0];
						aliveToki[0] = aliveToki[1];
						aliveToki[1] = temp;
					}
					else if (aliveToki[2] == true)
					{
						var temp = teamToki[0];
						teamToki[0] = teamToki[2];
						teamToki[2] = temp;
						toki = teamToki[0];
						temp = aliveToki[0];
						aliveToki[0] = aliveToki[2];
						aliveToki[2] = temp;
					}
					else if (aliveToki[3] == true)
					{
						var temp = teamToki[0];
						teamToki[0] = teamToki[3];
						teamToki[3] = temp;
						toki = teamToki[0];
						temp = aliveToki[0];
						aliveToki[0] = aliveToki[3];
						aliveToki[3] = temp;
					}
					else if (aliveToki[4] == true)
					{
						var temp = teamToki[0];
						teamToki[0] = teamToki[4];
						teamToki[4] = temp;
						toki = teamToki[0];
						temp = aliveToki[0];
						aliveToki[0] = aliveToki[4];
						aliveToki[4] = temp;
					}					
					else if (aliveToki[5] == true)
					{
						var temp = teamToki[0];
						teamToki[0] = teamToki[5];
						teamToki[5] = temp;
						toki = teamToki[0];
						temp = aliveToki[0];
						aliveToki[0] = aliveToki[5];
						aliveToki[5] = temp;
					}
					else {
						this.sendToPlayers('battle over');
						//loser redirection for toki
						// this.players[p0].emit('redirect', destination);
						// // winner redirection for poke
						// this.players[p1].emit('redirect', destination);

						this.players.forEach((player) => {
							var destination = '/victory';
							player.emit('redirect', destination);
						})
					}
					
					this.players.forEach((player) => {
						player.emit('swapBroadcast', {description: toki[0]});
					})
					this.sendToPlayers(toki[0] + ' got swapped in');


					
				}
				else
				{
					alivePoke[0] = false;
					this.sendToPlayers(poke[0] + ' is dead!');
					
					// death swaps start here
					if (alivePoke[1] == true)
					{
						var temp = teamPoke[0];
						teamPoke[0] = teamPoke[1];
						teamPoke[1] = temp;
						poke = teamPoke[0];
						temp = alivePoke[0];
						alivePoke[0] = alivePoke[1];
						alivePoke[1] = temp;
					}
					else if (alivePoke[2] == true)
					{
						var temp = teamPoke[0];
						teamPoke[0] = teamPoke[2];
						teamPoke[2] = temp;
						poke = teamPoke[0];
						temp = alivePoke[0];
						alivePoke[0] = alivePoke[2];
						alivePoke[2] = temp;
					}
					else if (alivePoke[3] == true)
					{
						var temp = teamPoke[0];
						teamPoke[0] = teamPoke[3];
						teamPoke[3] = temp;
						poke = teamPoke[0];
						temp = alivePoke[0];
						alivePoke[0] = alivePoke[3];
						alivePoke[3] = temp;
					}
					else if (alivePoke[4] == true)
					{
						var temp = teamPoke[0];
						teamPoke[0] = teamPoke[4];
						teamPoke[4] = temp;
						poke = teamPoke[0];
						temp = alivePoke[0];
						alivePoke[0] = alivePoke[4];
						alivePoke[4] = temp;
					}			
					else if (alivePoke[5] == true)
					{
						var temp = teamPoke[0];
						teamPoke[0] = teamPoke[5];
						teamPoke[5] = temp;
						poke = teamPoke[0];
						temp = alivePoke[0];
						alivePoke[0] = alivePoke[5];
						alivePoke[5] = temp;
					}
					else {
						this.sendToPlayers('battle over');
						//loser redirection for toki
						// this.players[p0].emit('redirect', destination);
						// // winner redirection for poke
						// this.players[p1].emit('redirect', destination);
						this.players.forEach((player) => {
							var destination = '/victory';
							player.emit('redirect', destination);
						})
					}

					this.players.forEach((player) => {
						player.emit('swapBroadcast', {description: poke[0]});
					})
					this.sendToPlayers(poke[0] + ' got swapped in');
				
				}


			}
			else
			//////if the slow tokimon/pokemon didn't die, it gets to attack now///////
			{
				var damage = this.damageCalc(slowmove, slow, fast);
				fast[9] -= damage;
				console.log(fast[9]);
				this.sendToPlayers(slow[0] + " used " + slowmove);
				this.sendToPlayers(fast[0] + " took " + damage + " damage");
				this.sendToPlayers(fast[0] + " has " + fast[9] + " HP remaining");

				//////if a tokimon/pokemon dies///////
				if(fast[9] <= 0)
				{
					console.log("we should be here");
					if(fast == toki)
					{
						aliveToki[0] = false;
						this.sendToPlayers(toki[0] + ' is dead!');
						
						// death swaps start here
						console.log(aliveToki);
						if (aliveToki[1] == true)
						{
							var temp = teamToki[0];
							teamToki[0] = teamToki[1];
							teamToki[1] = temp;
							toki = teamToki[0];
							temp = aliveToki[0];
							aliveToki[0] = aliveToki[1];
							aliveToki[1] = temp;
						}
						else if (aliveToki[2] == true)
						{
							var temp = teamToki[0];
							teamToki[0] = teamToki[2];
							teamToki[2] = temp;
							toki = teamToki[0];
							temp = aliveToki[0];
							aliveToki[0] = aliveToki[2];
							aliveToki[2] = temp;
						}
						else if (aliveToki[3] == true)
						{
							var temp = teamToki[0];
							teamToki[0] = teamToki[3];
							teamToki[3] = temp;
							toki = teamToki[0];
							temp = aliveToki[0];
							aliveToki[0] = aliveToki[3];
							aliveToki[3] = temp;
						}
						else if (aliveToki[4] == true)
						{
							var temp = teamToki[0];
							teamToki[0] = teamToki[4];
							teamToki[4] = temp;
							toki = teamToki[0];
							temp = aliveToki[0];
							aliveToki[0] = aliveToki[4];
							aliveToki[4] = temp;
						}					
						else if (aliveToki[5] == true)
						{
							var temp = teamToki[0];
							teamToki[0] = teamToki[5];
							teamToki[5] = temp;
							toki = teamToki[0];
							temp = aliveToki[0];
							aliveToki[0] = aliveToki[5];
							aliveToki[5] = temp;
						}
						else {
							this.sendToPlayers('battle over');

							//loser redirection for toki
							// this.players[p0].emit('redirect', destination);
							// // winner redirection for poke
							// this.players[p1].emit('redirect', destination);
							this.players.forEach((player) => {
								        var  destination = '/victory';
							player.emit('redirect', destination);
						})

						}

						this.players.forEach((player) => {
							player.emit('swapBroadcast', {description: toki[0]});
						})
						this.sendToPlayers(toki[0] + ' got swapped in');
			
					}
					else
					{
						alivePoke[0] = false;
						this.sendToPlayers(poke[0] + ' is dead!');
						
						// death swaps start here
						if (alivePoke[1] == true)
						{
							var temp = teamPoke[0];
							teamPoke[0] = teamPoke[1];
							teamPoke[1] = temp;
							poke = teamPoke[0];
							temp = alivePoke[0];
							alivePoke[0] = alivePoke[1];
							alivePoke[1] = temp;
						}
						else if (alivePoke[2] == true)
						{
							var temp = teamPoke[0];
							teamPoke[0] = teamPoke[2];
							teamPoke[2] = temp;
							poke = teamPoke[0];
							temp = alivePoke[0];
							alivePoke[0] = alivePoke[2];
							alivePoke[2] = temp;
						}
						else if (alivePoke[3] == true)
						{
							var temp = teamPoke[0];
							teamPoke[0] = teamPoke[3];
							teamPoke[3] = temp;
							poke = teamPoke[0];
							temp = alivePoke[0];
							alivePoke[0] = alivePoke[3];
							alivePoke[3] = temp;
						}
						else if (alivePoke[4] == true)
						{
							var temp = teamPoke[0];
							teamPoke[0] = teamPoke[4];
							teamPoke[4] = temp;
							poke = teamPoke[0];
							temp = alivePoke[0];
							alivePoke[0] = alivePoke[4];
							alivePoke[4] = temp;
						}			
						else if (alivePoke[5] == true)
						{
							var temp = teamPoke[0];
							teamPoke[0] = teamPoke[5];
							teamPoke[5] = temp;
							poke = teamPoke[0];
							temp = alivePoke[0];
							alivePoke[0] = alivePoke[5];
							alivePoke[5] = temp;
						}
						else {
							this.sendToPlayers('battle over');

							//loser redirection for toki
							// this.players[p1].emit('redirect', destination);
							// // winner redirection for poke
							// this.players[p0].emit('redirect', destination);
							this.players.forEach((player) => {
								       var destination = '/victory';
							player.emit('redirect', destination);
						})
						}

						this.players.forEach((player) => {
							player.emit('swapBroadcast', {description: poke[0]});
						})
						this.sendToPlayers(poke[0] + ' got swapped in');
					
					}

				}

			}
		turns[0] = null;
		turns[1] = null;	

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



}


module.exports = TokiBattle; 