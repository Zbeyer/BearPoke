import 'phaser'
import BearPoke from "../classes/bear";
import Animal from "../classes/animal";
import game from "../game";
import BG from "../classes/background";
import Bear from "../classes/bear";

export default class MainGame extends Phaser.Scene
{
	preload ()
	{ }

	create ()
	{
		BearPoke.newGame();
		const frameRate = 60.0;

		// let shared = BearPoke.shared();
		let scene = this;
		let shared = BearPoke.shared();
		setInterval(function () {
			scene.draw(scene);
		}, 1000 / frameRate);

		let bg: BG = new BG(this);
		let scorecardBG: Phaser.GameObjects.Rectangle = this.add.rectangle(0, 0, 180, 24, 0x000000);
		scorecardBG.setOrigin(0, 0);
		scorecardBG.alpha = 0.667;

		let scoreCard = this.add.text(4, 4, 'Score: 0', { color: '#FFFFFF' });
		scoreCard.setOrigin(0, 0);
		shared.scoreCard = scoreCard;

		let heartsBg: Phaser.GameObjects.Rectangle = this.add.rectangle(0, this.cameras.main.height - 16, 192, 32, 0x000000);
		heartsBg.alpha = 0.667;
		let hearts = [
			this.add.image(16, this.cameras.main.height - 16, 'heartFull'),
			this.add.image(48, this.cameras.main.height - 16, 'heartFull'),
			this.add.image(80, this.cameras.main.height - 16, 'heartFull'),
		];
		hearts.forEach(function (heart: Phaser.GameObjects.Image) {
			heart.setScale(3.0);
			let container = scene.add.image(heart.x, heart.y, 'heartEmpty').setScale(3.0);
			shared.heartArt.push(heart);
			shared.heartContainer.push(container);
		});
	}

	update ()
	{
		let shared = BearPoke.shared();
		let scoreCard: Phaser.GameObjects.Text = shared.scoreCard || this.add.text(16, 16, 'Score: 0', { color: '#FFFFFF' });;
		scoreCard.setText([
			'score: ' + shared.score,
		]);

		if (shared.hearts < 1)
		{
			shared.isGameOver = true;
			// this.scene.start('GameOver');
		}
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
		let children = scene.children.list;
		let images = children.filter(function (child: any) {
			return child.texture && child.texture.key;
		});
		const animalNames: string[] = scene.animals().concat(scene.healingAnimals()).concat(['bear']);
		let animals = images.filter(function (image: any) {
			return animalNames.includes(image.texture.key);
		});

		let shared = BearPoke.shared();
		if (animals.length >= shared.drawLimit) return;
		if (shared.isGameOver) return;
		if (shared.drawLimit < 1) return;
		// console.log('scene.textures.getTextureKeys(): %o', scene.textures.getTextureKeys());

		let seed: number = Math.random()
		let animalLifeTime: number = 24_000 * seed + 1_000;
		seed = seed * 2_000;

		const scaleFactor = 8.00;
		const sizeOfSprite = 8 * scaleFactor;

		const widthMin = sizeOfSprite;
		const widthMax = scene.cameras.main.width - sizeOfSprite * 2.0;
		const heightMin = sizeOfSprite;
		const heightMax = scene.cameras.main.height - sizeOfSprite * 2.0;
		const appearanceTime = 250;
		let x = widthMin + seed % widthMax;
		let y = heightMin + seed % heightMax;
		let newAnimalIndex: number = Math.floor(seed % animalNames.length);
		let newAnimalName: string = animalNames[newAnimalIndex];
		let newArt: Phaser.GameObjects.Image = scene.add.image(x, y, newAnimalName);
		newArt.alpha = 0.0; newArt.setScale(0.0);
		newArt.setInteractive();

		// Make sure we are always tracking the animals...
		let appear:Phaser.Tweens.Tween = scene.tweens.add({targets: newArt, scale: scaleFactor, alpha: 1.0, ease: 'Power1', duration: appearanceTime });
		appear.on('complete', function () {
			newArt.setScale(scaleFactor);
			newArt.alpha = 1.0;
			appear.remove();

			let disappear:Phaser.Tweens.Tween = scene.tweens.add({targets: newArt, scale: 0.0, alpha: 0.0, ease: 'Power1', duration: appearanceTime, delay: animalLifeTime});
			disappear.on('complete', function () {
				disappear.remove();
				newArt.destroy();
			});
		});

		scene.input.on('gameobjectdown', function (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Image)
		{
			let disappearNow:Phaser.Tweens.Tween = scene.tweens.add({ targets: gameObject, scale: 0.0, alpha: 0.0, ease: 'Power1', duration: appearanceTime});
			disappearNow.on('complete', function () {
				disappearNow.remove();
				let heartsBeforePoke = BearPoke.shared().hearts;
				BearPoke.shared().poked(gameObject);
				let heartsAfterPoke = BearPoke.shared().hearts;
				let delta = heartsAfterPoke - heartsBeforePoke;
				if (delta)
				{
					// a negative delta means we lost hearts
					// a positive delta means we gained hearts
					console.log('delta: %o', delta);
					let x = gameObject.x;
					let y = gameObject.y;
					if (delta < 0)
					{
						let heartArt: Phaser.GameObjects.Image[] = 	BearPoke.shared().heartArt;
						heartArt = heartArt.reverse();
						let count = Math.abs(delta);
						// Bear eats the hearts
						heartArt.forEach(function (heart: Phaser.GameObjects.Image) {
								if (count >= 1) {
									heart.destroy();
									count--;
								}
							});
					}
					else
					{
						// Animal gives a heart
						let heartArt: Phaser.GameObjects.Image[] = 	BearPoke.shared().heartArt;
						heartArt = heartArt.reverse();
						let count = Math.abs(delta);
						for (let i = count; i > 0; i--)
						{
							shared.heartArt.push(scene.add.image(heartArt[0].x + heartArt[0].width + 24, heartArt[0].y, 'heartFull').setScale(3.0));
						}
						shared.heartContainer.forEach(function (container: Phaser.GameObjects.Image) {
							scene.children.bringToTop(container);
						});
					}
				}
				gameObject.destroy();
			});
		});

		/**
		 * TODO: Needs a timer
	 	 *		Not poking anything removes 1 heart
		 * TODO: Game over when hearts == 0
		 * 		I think I'll just make a game over scene
		 * 		New Game just makes a new Main Game Scene
		 */
	}

}

