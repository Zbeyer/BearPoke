import Animal from "./animal";

class BearPoke //implements BearPokeInterface
{
	scene?: Phaser.Scene;
	maxHearts: number;
	hearts: number;
	timer: number;
	drawLimit: number;

	animals: Animal[];
	score: number;
	pokes: number;
	bearPokes: number;
	healingAnimals: number;
	scoreCard?: Phaser.GameObjects.Text;
	isGameOver: boolean;

	heartArt: Phaser.GameObjects.Image[];
	heartContainer: Phaser.GameObjects.Image[];

	constructor()
	{
		this.maxHearts = 3;
		this.hearts = this.maxHearts;
		this.timer = 0;
		this.pokes = 0;
		this.bearPokes = 0;
		this.healingAnimals = 0;
		this.drawLimit = 2;
		this.animals = [];

		this.isGameOver = false;
		this.score = 0;

		this.heartArt = [];
		this.heartContainer = [];
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

	didntPokeAnything()
	{
		let shared = BearPoke.shared();
		shared.hearts = Math.max(0, shared.hearts - 1);
	}

	poked(animal: any)
	{
		if (animal.poked) return;
		animal.poked = true;
		let name = animal.texture.key;
		if (name === 'bear')
		{
			this.bearPokes += 1;
		} else {
			this.pokes += 1;
		}
		switch (name)
		{
			case 'fish':
				this.hearts += 1;
				if (this.hearts > this.maxHearts) this.hearts = this.maxHearts;
				this.score += 1;
				this.healingAnimals += 1;
				break;
			case 'duck':
			case 'snek':
				this.score += 2;
				break;
			case 'sloth':
				this.score += 3;
				break;
			case 'deer':
				this.score += 5;
				break;
			case 'bear':
				console.log('bear poked');
				this.hearts -= 2;
				if (this.hearts < 1) this.hearts = 0;
				break;
			default: break;
		}
	}
}

let SharedBP: BearPoke;

export default BearPoke;
