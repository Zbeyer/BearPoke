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

	constructor()
	{
		this.hearts = 3;
		this.timer = 0;
		this.bearPokes = 0;
		this.lastDraw = 0;
		this.drawLimit = 2;
		this.animals = [];
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
}

let SharedBP: BearPoke;

export default BearPoke;
