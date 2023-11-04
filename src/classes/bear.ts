import Animal from "./animal";

class BearPoke //implements BearPokeInterface
{
	scene?: Phaser.Scene;

	hearts: number;
	timer: number;
	drawLimit: number;

	animals: Animal[];
	score: number;
	scoreCard?: Phaser.GameObjects.Text;
	isGameOver: boolean;

	heartArt: Phaser.GameObjects.Image[];
	heartContainer: Phaser.GameObjects.Image[];

	constructor()
	{
		this.hearts = 3;
		this.timer = 0;
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
		switch (name)
		{
			case 'fish':
				this.hearts = Math.min(3, this.hearts + 1);
				this.score += 1;
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
				this.hearts = Math.max(0, this.hearts - 2);
				break;
			default: break;
		}
	}
}

let SharedBP: BearPoke;

export default BearPoke;
