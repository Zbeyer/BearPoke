import 'phaser'

export default class MainMenu extends Phaser.Scene
{
	preload ()
	{ }

	create ()
	{
		console.log('BearPoke New Game Main Menu');
		this.add.image(100, 100, 'bear');

	}
}