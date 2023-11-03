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
		const scaleFactor = 4.00;
		const sizeOfSprite = 16 * scaleFactor;

		let scene = this;
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
		const appearanceTime = 300;

		let newAnimalIndex: number = Math.floor(seed % animalNames.length);
		let newAnimalName: string = animalNames[newAnimalIndex];
		let newArt: Phaser.GameObjects.Image = this.add.image(x, y, newAnimalName);
		newArt.setScale(0.0);
		newArt.setInteractive();
		newArt.alpha = 0.0;
		let appear:Phaser.Tweens.Tween = scene.tweens.add({
			targets: newArt,
			scale: scaleFactor,
			alpha: 1.0,
			ease: 'Power1',
			duration: appearanceTime,
		});
		appear.on('complete', function () {
			appear.remove();
			console.log('Animal appeared!');
		});

		// newArt.on('pointerup', this.animalClicked);
		this.input.on('gameobjectdown', function (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image)
		{
			shared.animals.forEach( function (animal: Animal, index: number, array: Animal[])
			{
				if (animal.art == gameObject)
				{
					let disappear:Phaser.Tweens.Tween = scene.tweens.add({
						targets: gameObject,
						scale: 0.0,
						alpha: 0.0,
						ease: 'Power1',
						duration: appearanceTime,
					});
					disappear.on('complete', function () {
						disappear.remove();
						animal.art.destroy();
						shared.animals = shared.animals.splice(index, 1);

						console.log('Animal destroyed');
						console.log('Animals: %o', shared.animals);
						console.log('Animal: %o', animal);
					});

					shared.poked(animal);
				}
			});
		});
		let newAnimal: Animal = new Animal(newArt,
			healingAnimals.includes(newAnimalName),
			newAnimalName == 'bear');

		/**
		 * TODO: Remove the animal from the array when the tween is complete
		 * TODO: Add hearts
		 * TODO: Poking the bear removes 2 hearts
		 * TODO: Poking a healing animal heals 1 heart
		 * TODO: Not poking anything removes 1 heart
		 * TODO: Needs a timer
		 * TODO: Game over when hearts == 0
		 */

		shared.animals.push(newAnimal);
		shared.lastDraw = (new Date).getTime();
	}
}

