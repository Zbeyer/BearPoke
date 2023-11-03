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
		const logoWidth = this.cameras.main.width * 0.5;
		const logoHeight = this.cameras.main.height * 0.5;

		const logo = this.add.image(logoWidth, logoHeight, 'logo');
		const scaleFactor = Math.min(logoWidth / logo.width, logoHeight / logo.height);
		const scene = game.scene;
		const milliseconds = 0.0; // Time in milliseconds
		
		logo.setScale(scaleFactor);
		logo.setAlpha(0.75);
		logo.setBlendMode(Phaser.BlendModes.ADD);
		setTimeout(function (){
			scene.stop('Preloader');
			scene.start('MainMenu');
		}, Math.max(0.0, milliseconds));
	}

}