import 'phaser'

export default class MainMenu extends Phaser.Scene
{
	create ()
	{
		const title = 'Hello World';
		let text = this.add.text(16, 16, title, { color: '#FFFFFF' })
		text.setBlendMode(Phaser.BlendModes.ADD);
		text.scale = 3.0;
		text.setText([
			'Don\'t',
			'Poke',
			'the',
			'Bear',
		]);

		this.createAnimals();
		this.createHeart();
		console.log('MainMenu created');
	}

	createAnimals() {
		const offsetX = 64.0;
		const offsetY = 64.0;
		const animals = [
			this.add.image(offsetX, offsetY * 2.0, 'bear'),
			this.add.image(offsetX, offsetY, 'deer'),
			this.add.image(offsetX * 2.0, offsetY, 'duck'),
			this.add.image(offsetX * 3.0, offsetY, 'fish'),
			this.add.image(offsetX * 4.0, offsetY, 'moose'),
			this.add.image(offsetX * 5.0, offsetY, 'sloth'),
			this.add.image(offsetX * 6.0, offsetY, 'snek')
		];
		animals.forEach( function (animal) {
			animal.setScale(3.25);
			animal.setAlpha(0.25);
			animal.setBlendMode(Phaser.BlendModes.ADD);
		});
		return animals;
	}

	createHeart() {
		const heartOffsetX = 32;
		const heartOffsetY = 298;
		const hearts = [
			this.add.image(heartOffsetX * 0.50, heartOffsetY, 'heartFull'),
			this.add.image(heartOffsetX * 1.25, heartOffsetY, 'heartFull'),
			this.add.image(heartOffsetX * 2.00, heartOffsetY, 'heartFull'),
		];

		const heartsStroke = [
			this.add.image(heartOffsetX * 0.50, heartOffsetY, 'heartBlack'),
			this.add.image(heartOffsetX * 1.25, heartOffsetY, 'heartBlack'),
			this.add.image(heartOffsetX * 2.00, heartOffsetY, 'heartBlack'),
		];

		const heartsOutline = [
			this.add.image(heartOffsetX * 2.75, heartOffsetY, 'heartEmpty'),
			this.add.image(heartOffsetX * 3.50, heartOffsetY, 'heartEmpty'),
		];

		const scale = 3.0;

		hearts.forEach( function (heart) {
			heart.setScale(scale);
			heart.setBlendMode(Phaser.BlendModes.ADD);
		});

		heartsOutline.forEach( function (heart) {
			heart.setScale(scale);
		});

		heartsStroke.forEach( function (heart) {
			heart.setScale(scale);
			heart.setBlendMode(Phaser.BlendModes.MULTIPLY);
		});

		return hearts;
	}
};
