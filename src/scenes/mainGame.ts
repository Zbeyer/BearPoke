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
	}

	update ()
	{
		if (BearPoke.shared().lastDraw == undefined)
		{
			this.draw();
			return;
		}

		const frameRate = 60;
		let shared = BearPoke.shared();
		if (shared.isGameOver)
		{
			return;
		}

		let now = (new Date).getTime();
		let delta = now - shared.lastDraw || 0;
		if (delta >= 1000 / frameRate)
		{
			this.draw();
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
		// newArt.on('pointerup', this.animalClicked);
		this.input.on('gameobjectdown',this.onObjectClicked);
		let newAnimal: Animal = new Animal(newArt,
			healingAnimals.includes(newAnimalName),
			newAnimalName == 'bear');

		shared.animals.push(newAnimal);
		shared.lastDraw = (new Date).getTime();
	}

	onObjectClicked(pointer:Phaser.Input.Pointer , gameObject: Phaser.GameObjects.Image)
	{
		let clickedAnimal: Animal;
		let shared = BearPoke.shared();

		shared.animals.forEach( function (animal)
		{
			if (animal.art == gameObject)
			{
				clickedAnimal = animal;
				if (animal.clicked)
				{
					return;
				}
				animal.clicked = true;
				console.log('Clicked on %o', animal);

				if (animal.isBear)
				{
					shared.bearPokes = shared.bearPokes + 1;
				}
				else
				{
					shared.pokes = shared.pokes + 1;
				}
				console.log('Clicked shared %o', BearPoke.shared());
			}
		});


		//         this.add.image(400, 300, 'bg');
		//         this.tweens.add({
		//             targets: gameObject,
		//             scale:0.0,
		//             alpha:0.0,
		//             duration: 750,
		//             repeat: -1,
		//         });
	}

}

