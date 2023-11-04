import 'phaser'

export default class Quit extends Phaser.Scene
{
	preload ()
	{ }

	create ()
	{
		console.log('BearPoke Quit Scene Created...');
		this.game.destroy(true);
	}
}