import 'phaser'
import BearPoke from "../classes/bear";
import Animal from "../classes/animal";
import game from "../game";
import BG from "../classes/background";

export default class MainGame extends Phaser.Scene
{
	preload ()
	{ }

	create ()
	{
		BearPoke.newGame();
		const frameRate = 2.4;

		// let shared = BearPoke.shared();
		let scene = this;
		let shared = BearPoke.shared();
		setInterval(function () {
			scene.draw(scene);
		}, 1000 / frameRate);

		let bg: BG = new BG(this);
		let scorecardBG: Phaser.GameObjects.Rectangle = this.add.rectangle(8, 8, 300, 200, 0x000000);
		scorecardBG.alpha = 0.667;

		let scoreCard = this.add.text(16, 16, 'Score: 0', { color: '#FFFFFF' });
		shared.scoreCard = scoreCard;
	}

	update ()
	{
		let shared = BearPoke.shared();
		let scoreCard: Phaser.GameObjects.Text = shared.scoreCard || this.add.text(16, 16, 'Score: 0', { color: '#FFFFFF' });;
		scoreCard.setText([
			'score: ' + shared.score,
			'pokes: ' + shared.pokes,
			'hearts: ' + shared.hearts,
			'bearPokes: ' + shared.bearPokes,
		]);
	}

	animals(): string[] {
		const animals: string[] = ['duck', 'snek', 'deer'];
		return animals;
	}

	healingAnimals(): string[] {
		const animals: string[] = ['fish'];
		return animals;
	}

	draw(scene: MainGame)
	{
		let shared = BearPoke.shared();
		shared.lastDraw = (new Date).getTime();
		if (shared.isGameOver) return;
		if (shared.drawLimit < 1) return;
		if (shared.animals.length >= BearPoke.shared().drawLimit) return;

		let seed: number = Math.random()
		let animalLifeTime: number = 8_000 * seed + 1_000;
		seed = seed * 2_000;

		const scaleFactor = 8.00;
		const sizeOfSprite = 8 * scaleFactor;

		const widthMin = sizeOfSprite;
		const widthMax = scene.cameras.main.width - sizeOfSprite;
		const heightMin = sizeOfSprite;
		const heightMax = scene.cameras.main.height - sizeOfSprite;

		const animalNames: string[] = scene.animals().concat(scene.healingAnimals()).concat(['bear']);
		const appearanceTime = 250;
		let x = widthMin + seed % widthMax;
		let y = heightMin + seed % heightMax;
		let newAnimalIndex: number = Math.floor(seed % animalNames.length);
		let newAnimalName: string = animalNames[newAnimalIndex];
		let newArt: Phaser.GameObjects.Image = scene.add.image(x, y, newAnimalName);
		newArt.alpha = 0.0; newArt.setScale(0.0);
		newArt.setInteractive();
		let appear:Phaser.Tweens.Tween = scene.tweens.add({targets: newArt, scale: scaleFactor, alpha: 1.0, ease: 'Power1', duration: appearanceTime });
		appear.on('complete', function () {
			newArt.setScale(scaleFactor);
			newArt.alpha = 1.0;
			newArt.setInteractive();
			appear.remove();

			let newAnimal: Animal = new Animal(newArt, scene.healingAnimals().includes(newAnimalName), newAnimalName == 'bear');
			shared.animals.push(newAnimal);
			let disappear:Phaser.Tweens.Tween = scene.tweens.add({targets: newArt, scale: 0.0, alpha: 0.0, ease: 'Power1', duration: appearanceTime, delay: animalLifeTime});
			disappear.on('complete', function () {
				disappear.remove();
				scene.cleanup(newAnimal);
			});

			newAnimal.createdAt = (new Date()).getTime();
		});

		scene.input.on('gameobjectdown', function (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image)
		{
			shared.animals.forEach( function (animal: Animal, index: number, array: Animal[]) {
				if (animal.art == gameObject) {
					let disappearNow:Phaser.Tweens.Tween = scene.tweens.add({ targets: gameObject, scale: 0.0, alpha: 0.0, ease: 'Power1', duration: appearanceTime});
					disappearNow.on('complete', function () {
						disappearNow.remove();
						scene.cleanup(animal);
					});
					shared.poked(animal);
				}
			});
		});

		/**
		 * TODO: Remove the animal from the array when the tween is complete
		 * TODO: Add hearts
		 * TODO: Not poking anything removes 1 heart
		 * TODO: Needs a timer
		 * TODO: Game over when hearts == 0
		 */
	}

	cleanup(animal: Animal)
	{
		let shared = BearPoke.shared();
		animal.art.destroy();
		shared.animals.forEach(function (a: Animal, index: number, array: Animal[]) {
			shared.animals = shared.animals.splice(index, 1);
		});
	}
}

