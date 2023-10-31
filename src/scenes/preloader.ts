import 'phaser'

export default class PreloaderScene extends Phaser.Scene
{
	constructor() {
		super ({ key: 'Preloader' })
	}

	preload () {}

	create ()
	{
		let logo = this.add.sprite(
			this.cameras.main.width * 0.50,
			this.cameras.main.height * 0.50,
			'tok');

		const milliseconds = 200; // Time in milliseconds
		let scene = this.scene;

		setTimeout(function (){
			scene.start('SquareTestScene');
		}, milliseconds);
	}

}