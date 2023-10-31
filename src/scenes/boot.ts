import 'phaser'

export default class BootScene extends Phaser.Scene
{
	constructor() {
		super ({ key: 'Boot' })
	}

	preload ()
	{

	}

	create ()
	{	this.scene.start('Preloader');
	}
}