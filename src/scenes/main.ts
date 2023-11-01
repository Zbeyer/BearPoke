import 'phaser'

export default class MainGameScene extends Phaser.Scene
{
	constructor() {
		super ({ key: 'MainGameScene' })
	}

	preload ()
	{

	}

	create ()
	{
		this.add.image(100, 100, 'bear');
	}
}