import 'phaser'

export default class BootScene extends Phaser.Scene
{
	preload ()
	{
		this.load.baseURL = './assets/';
		this.load.image('logo', 'logo.jpg');
		this.load.image('bear', 'bear.png');
	}

	create ()
	{
		this.scene.start('Preloader');
	}
}