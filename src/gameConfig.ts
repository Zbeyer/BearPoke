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
		mode: Phaser.Scale.RESIZE,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	callbacks: {
		postBoot: () => {
			// window.sizeChanged();
		},
	},
	canvasStyle: `display: block; width: 100%; height: 100%;`,
	autoFocus: true,
	audio: {
		disableWebAudio: false,
	}
};
