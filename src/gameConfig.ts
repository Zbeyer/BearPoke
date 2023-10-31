import 'phaser'

export default {
	type: Phaser.AUTO,
	// backgroundColor: '#FFCC00',
	backgroundColor: '#000000',
	pixelArt: true,
	scale: {
		mode: Phaser.Scale.CENTER_BOTH,
		parent: 'phaser-example',
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 512,
		height: 512,
		zoom: 1.0,
	},
};
