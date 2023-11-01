import 'phaser'

// GameConstants: Object = {
// 	scaleRatio: number = window.devicePixelRatio;
// }

export default {
	title: 'Don\'t Poke the Bear',
	type: Phaser.WEBGL,
	backgroundColor: '#000000',
	render: {
		antialiasGL: false,
		pixelArt: true,
	},
	scale: {
		mode: Phaser.Scale.ScaleModes.NONE,
		width: window.innerWidth,
		height: window.innerHeight,
	},
	callbacks: {
		postBoot: () => {
			console.log('postBoot callback');
			// window.sizeChanged();
		},
	},
	canvasStyle: `display: block; width: 100%; height: 100%;`,
	autoFocus: true,
	audio: {
		disableWebAudio: false,
	},
	// scene: ['Boot'],
};
