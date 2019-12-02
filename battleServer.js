class TokiBattle{

	constructor(p1, p2){
		this.players = [p1, p2];
		this.turns = [null, null];

		this.sendToPlayers('The Battle Begins!');
		console.log("Two players are ready to battle!");

		this.players.forEach((player, idx) => {
			player.on('turn', (turn) => {
				this.onTurn(idx, turn);
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

	onTurn(playerIndex, turn){
		this.turns[playerIndex] = turn; 
		this.sendToPlayer(playerIndex, `You selected ${turn}`);
		
		this.checkGameOver();
	}

	checkGameOver(){
		const turns = this.turns;

		if (turns[0] && turns[1]){
			this.sendToPlayers('Game over ' + turns.join(' : '));
			this.getGameResult();
			this.turns = [null, null];
			this.sendToPlayers('Next Round!');
		};
	}

	// // brute force version for rps logic
	// getGameResult(){
	// 	switch (this.turns[0]){
	// 		case 'rock';
	// 			switch (this.turns[1]){
	// 				case 'rock': return -1;
	// 				case 'paper': return 0;
	// 				case 'scissors': return 1; 
	// 			}
	// 		case 'paper';
	// 		case 'scissors';
	// 	}
	// }

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
				this.sendWinMessage(this.player[1], this.player[0]);
				break;
		}
	}

	sendWinMessage(winner, loser){
		winner.emit('message', 'You Won!');
		loser.emit('message', 'You lost!');
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

}


module.exports = TokiBattle; 