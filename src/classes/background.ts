import 'phaser'

let sharedkey = 'bg2';

export default class BG
{
	scene: Phaser.Scene;
	key: string;
	constructor(scene: Phaser.Scene, key?: string)
	{
		this.scene = scene;
		this.key = key || BG.sharedKey();
		let bg = this.scene.add.image(0, 0, this.key);
		bg.setOrigin(0, 0);
		bg.setScale(Math.max(scene.cameras.main.width / bg.width, scene.cameras.main.height / bg.height));
	}
	static sharedKey = function(): string {
		return sharedkey;
	}
	static setSharedKey = function(key: string): void {
		sharedkey = key;
	}
}
