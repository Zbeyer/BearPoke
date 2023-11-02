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
		const width = game.config.width as number;
		const height = game.config.height as number;
		const milliseconds = 200; // Time in milliseconds

		let logo = this.add.image(width * 0.5, height * 0.5, 'logo');
		logo.setScale(6.0);
		logo.setAlpha(0.75);
		logo.setBlendMode(Phaser.BlendModes.ADD);
		// logo.setTint(0x00FFFF);
		// logo.setMask()

		setTimeout(function (){
			scene.stop('Preloader');
			scene.start('MainMenu');
		}, milliseconds);
	}

}