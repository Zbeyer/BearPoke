import 'phaser'

export default {
	title: 'Don\'t Poke the Bear',
	type: Phaser.WEBGL,
	// backgroundColor: '#000000',
	backgroundColor: '#303030',
	render: {
		antialiasGL: false,
		pixelArt: true,
	},
	scale: {
		mode: Phaser.Scale.ScaleModes.NONE,
		// width: window.innerWidth,
		// height: window.innerHeight,
		// mode: Phaser.Scale.ScaleModes.RESIZE,
		height: 320, // 480,
		width: 480,
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
	}
};
