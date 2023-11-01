import 'phaser'

export default class MainMenu extends Phaser.Scene
{
	preload ()
	{ }

	create ()
	{
		const offsetX = 32;
		const offsetY = 32;
		const heartOffsetX = 16;
		const heartOffsetY = 312;

		// let posX = 1.0;

		const animals = [
			this.add.image(offsetX * 1.0, offsetY, 'bear'),
			this.add.image(offsetX * 3.0, offsetY, 'deer'),
			this.add.image(offsetX * 5.0, offsetY, 'duck'),
			this.add.image(offsetX * 7.0, offsetY, 'fish'),
			this.add.image(offsetX * 9.0, offsetY, 'moose'),
			this.add.image(offsetX * 11.0, offsetY, 'sloth'),
			this.add.image(offsetX * 13.0, offsetY, 'snek')
		];

		const hearts = [
			this.add.image(heartOffsetX * 0.50, heartOffsetY, 'heartFull'),
			this.add.image(heartOffsetX * 1.25, heartOffsetY, 'heartFull'),
			this.add.image(heartOffsetX * 2.00, heartOffsetY, 'heartFull'),
			// this.add.image(heartOffsetX * 2.75, heartOffsetY, 'heartFull'),

			this.add.image(heartOffsetX * 2.75, heartOffsetY, 'heartEmpty'),
			this.add.image(heartOffsetX * 3.50, heartOffsetY, 'heartEmpty'),
		];

		animals.forEach( function (animal) {
			animal.setScale(2.0);
		});

		animals.forEach( function (animal) {
			animal.setScale(3.0);
		});
	}
}