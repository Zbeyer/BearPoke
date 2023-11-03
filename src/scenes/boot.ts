import 'phaser'

export default class BootScene extends Phaser.Scene
{
	preload ()
	{
		this.load.baseURL = './assets/';

		// backgrounds
		this.load.image('bg', 'flowers.jpg');
		this.load.image('bg2', 'background2.jpg');

		//logo
		this.load.image('logo', 'logo.jpg');

		//animals
		this.load.image('bear', 'bear.png');
		this.load.image('deer', 'deer.png');
		this.load.image('duck', 'duck.png');
		this.load.image('fish', 'fish.png');
		this.load.image('moose', 'moose.png');
		this.load.image('sloth', 'sloth.png');
		this.load.image('snek', 'snek.png');

		//hearts
		this.load.image('heartEmpty', 'heart-empty.png');
		this.load.image('heartBlack', 'heart-black.png');
		this.load.image('heartFull', 'heart-full.png');

		//buttons
		this.load.image('button', 'button-up.jpg');
		this.load.image('buttonDown', 'button-down.jpg');
	}

	create ()
	{
		this.scene.start('Preloader');
	}
}