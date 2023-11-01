import 'phaser'

export default class PreloaderScene extends Phaser.Scene
{
	constructor() {
		super ({ key: 'Preloader' })
	}

	preload () {}

	create ()
	{
		const game = this.game;
		const scene = game.scene;


		const milliseconds = 200; // Time in milliseconds
		let logo = this.add.image(320, 320, 'logo');
		logo.setScale(4.0);

		setTimeout(function (){
			// scene.start('MainMenu');
		}, milliseconds);
	}

}