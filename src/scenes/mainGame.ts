import 'phaser'
import BearPoke from "../classes/bear";
import Animal from "../classes/animal";
import game from "../game";

export default class MainGame extends Phaser.Scene
{
	preload ()
	{ }

	create ()
	{
		this.newGame();
	}

	newGame()
	{
		BearPoke.newGame();
		console.log('New Game\n\t%o', BearPoke.shared());
	}

	update ()
	{
		if (BearPoke.shared().lastDraw == undefined)
		{
			this.draw();
			return;
		}

		const frameRate = 60;
		let now = (new Date).getTime();
		let delta = now - BearPoke.shared().lastDraw || 0;
		let shared = BearPoke.shared();
		let drawLimit = shared.drawLimit;
		let animals = shared.animals;

		if (delta >= 1000 / frameRate)
		{
			this.draw();
		}

		if (animals.length > 0)
		{
			this.unDraw();
		}
	}

	animals(): string[]
	{
		const animals: string[] = [
			'duck',
			'moose',
			'sloth',
			'snek'
		];
		return animals;
	}

	healingAnimals(): string[]
	{
		const animals: string[] = [
			'deer',
			'fish'
		];
		return animals;
	}

	draw()
	{
		let shared = BearPoke.shared();
		if (shared.drawLimit < 1)
		{
			return;
		}
		if (shared.animals.length >= BearPoke.shared().drawLimit)
		{
			return;
		}
		const scaleFactor = 3.00;
		const sizeOfSprite = 16 * scaleFactor;

		let seed: number = Math.random()
		seed = seed * 1_000;
		seed = seed + sizeOfSprite;

		const widthMin = sizeOfSprite;
		const widthMax = this.cameras.main.width - sizeOfSprite * 2.0;
		const heightMin = sizeOfSprite;
		const heightMax = this.cameras.main.height - sizeOfSprite * 2.0;

		let x = widthMin + seed % widthMax;
		let y = heightMin + seed % heightMax;


		const animals = this.animals();
		const healingAnimals = this.healingAnimals();
		const animalNames: string[] = animals.concat(healingAnimals).concat(['bear']);

		let newAnimalIndex: number = Math.floor(seed % animalNames.length);
		let newAnimalName: string = animalNames[newAnimalIndex];
		let newArt: Phaser.GameObjects.Image = this.add.image(x, y, newAnimalName);
		newArt.setScale(scaleFactor);
		newArt.setInteractive();
		newArt.on('pointerup', this.animalClicked, newArt);
		let newAnimal: Animal = new Animal(newArt,
			healingAnimals.includes(newAnimalName),
			newAnimalName == 'bear');

		shared.animals.push(newAnimal);
		shared.lastDraw = (new Date).getTime();
		console.log('Draw\n\t%o', BearPoke.shared());

	}

	animalClicked(context: Phaser.GameObjects.Image, pointer: Phaser.Input.Pointer)
	{
		console.log('Animal clicked\n\t%o', context);
		// let animal: Animal = new Animal(context);
		// console.log('Animal clicked\n\t%o', this);
	}

	unDraw()
	{
		// console.log('unDraw\n\t%o', BearPoke.shared());
	}
}

