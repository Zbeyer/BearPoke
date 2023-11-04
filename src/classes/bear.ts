import Animal from "./animal";

class BearPoke //implements BearPokeInterface
{
	scene?: Phaser.Scene;

	hearts: number;
	timer: number;
	lastDraw: number
	bearPokes: number;
	drawLimit: number;

	animals: Animal[];
	pokes: number;
	score: number;
	scoreCard?: Phaser.GameObjects.Text;
	isGameOver: boolean;

	constructor()
	{
		this.hearts = 3;
		this.timer = 0;
		this.lastDraw = 0;
		this.drawLimit = 2;
		this.animals = [];

		this.isGameOver = false;
		this.pokes = 0;
		this.bearPokes = 0;
		this.score = 0;
	}
	shared(): BearPoke
	{
		return BearPoke.shared();
	}

	static shared(): BearPoke
	{
		let shared: BearPoke = SharedBP;
		if (!shared)
		{
			shared = BearPoke.newGame();
			SharedBP = shared;
		}
		return shared;
	}

	static newGame(): BearPoke
	{
		SharedBP = new BearPoke();
		return BearPoke.shared();
	}

	poked(animal: Animal) {
		if (animal.clicked) return;
		animal.clicked = true;

		let name: string = animal.name;
		let shared: BearPoke = BearPoke.shared();

		//update score
		if (animal.isHealing) { shared.hearts = Math.min(shared.hearts, shared.hearts + 1); }
		if (animal.isBear) {
			shared.bearPokes = shared.bearPokes + 1;
			shared.hearts = Math.max(0, shared.hearts - 2);
		}
		else { shared.pokes = shared.pokes + 1; }
		switch (name)
		{
			case 'snek': shared.score = shared.score + 1; break;
			case 'deer': shared.score = shared.score + 1; break;
			case 'fish': shared.score = shared.score + 1; break;
			case 'duck': shared.score = shared.score + 2; break;
			case 'sloth': shared.score = shared.score + 3; break;
			case 'moose': shared.score = shared.score + 5; break;
			case 'bear': break;
			default: break;
		}

		console.log('Poked %o', name);
	}
}

let SharedBP: BearPoke;

export default BearPoke;
