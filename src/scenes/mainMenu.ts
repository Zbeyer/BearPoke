import 'phaser'
import BG from '../classes/background';
import BearPoke from '../classes/bear';

export default class MainMenu extends Phaser.Scene
{
	create ()
	{
		const bearPoke = BearPoke.shared();

		const title = 'Hello World';
		const menuWidth = 320;
		const menuHeight = this.cameras.main.height;
		const menuX: number = this.cameras.main.width - menuWidth;
		const menuY: number = 0;

		// const menuColor = 0xff33cc;
		const menuColor = 0x883300;

		let text = this.add.text(16, 16, title, { color: '#FFFFFF' })
		text.setBlendMode(Phaser.BlendModes.ADD);
		text.scale = 3.0;
		text.setText([
			'Don\'t',
			'Poke',
			'the',
			'Bear',
		]);

		let bg: BG = new BG(this);

		this.createAnimals();
		this.createHeart();

		const rectangle = this.add.rectangle(menuX, menuY, menuWidth, menuHeight, menuColor);
		rectangle.setOrigin(0, 0);
		rectangle.setBlendMode(Phaser.BlendModes.MULTIPLY);
		rectangle.setAlpha(0.50);

		this.createButtons(menuX, menuY, menuWidth);
		console.log('MainMenu created');
	}

	createButtons(menuX: number, menuY: number, menuWidth: number)
	{
		const game: Phaser.Game = this.game;
		const scene = game.scene;
		let x: number;
		let y: number;

		const buttonOffsetX = 8;
		const buttonOffsetY = 8;
		const buttonWidth: number = menuWidth - buttonOffsetX * 2.0;
		const buttonScale: number = buttonWidth / 40; // the button image is 40px wide
		const buttonHeight: number = 76.0;
		const buttons: Phaser.GameObjects.Image[] = [
			this.add.image(menuX + buttonOffsetX, menuY + buttonOffsetY, 'button'),
			this.add.image(menuX + buttonOffsetX, menuY + buttonHeight + buttonOffsetY * 2.0, 'button'),
			this.add.image(menuX + buttonOffsetX, menuY + buttonHeight * 2.0 + buttonOffsetY * 3.0, 'button'),
		];

		buttons.forEach( function (button) {
			button.setOrigin(0, 0);
			button.setScale(buttonScale);
			button.setInteractive();
		});

		x = buttons[0].x + buttonOffsetX;
		y = buttons[0].y + buttonOffsetY;
		const newGameText = this.add.text(x, y, 'New Game', { color: '#000000' })
		newGameText.scale = 2.25;
		buttons[0].on('pointerup', function (){
			console.log('New Game clicked\n\t%o', 'foo');
			scene.start('MainGame');
			scene.stop('MainMenu');
		}, this);

		x = buttons[1].x + buttonOffsetX;
		y = buttons[1].y + buttonOffsetY;
		const attributionText = this.add.text(x, y, 'Credits', { color: '#000000' })
		attributionText.scale = 2.25;
		buttons[1].on('pointerup', function (){
			console.log('Credits clicked\n\t%o', 'foo');
			scene.start('Credits');
			/**
			 * Give attribution to the following:
			 * 		Phaser.io
			 * 		Pixabay.com
			 * 		Draw.io
			 */
			scene.stop('MainMenu');
		}, this);

		x = buttons[2].x + buttonOffsetX;
		y = buttons[2].y + buttonOffsetY;
		const quitText = this.add.text(x, y, 'Quit', { color: '#000000' })
		quitText.scale = 2.25;
		buttons[2].on('pointerup', function (){
			console.log('Quit clicked\n\t%o', 'foo');
			scene.start('Quit');
			scene.stop('MainMenu');
		}, this);
	}

	createAnimals() {
		const offsetX = 64.0;
		const offsetY = 64.0;
		const animals = [
			this.add.image(offsetX, offsetY * 2.0, 'bear'),
			this.add.image(offsetX, offsetY, 'deer'),
			this.add.image(offsetX * 2.0, offsetY, 'duck'),
			this.add.image(offsetX * 3.0, offsetY, 'fish'),
			this.add.image(offsetX * 4.0, offsetY, 'moose'),
			this.add.image(offsetX * 5.0, offsetY, 'sloth'),
			this.add.image(offsetX * 6.0, offsetY, 'snek')
		];
		animals.forEach( function (animal) {
			animal.setScale(3.25);
			animal.setAlpha(0.25);
			animal.setBlendMode(Phaser.BlendModes.ADD);
		});
		return animals;
	}

	createHeart() {
		const heartOffsetX = 32;
		const heartOffsetY = 298;
		const hearts = [
			this.add.image(heartOffsetX * 0.50, heartOffsetY, 'heartFull'),
			this.add.image(heartOffsetX * 1.25, heartOffsetY, 'heartFull'),
			this.add.image(heartOffsetX * 2.00, heartOffsetY, 'heartFull'),
		];

		const heartsStroke = [
			this.add.image(heartOffsetX * 0.50, heartOffsetY, 'heartBlack'),
			this.add.image(heartOffsetX * 1.25, heartOffsetY, 'heartBlack'),
			this.add.image(heartOffsetX * 2.00, heartOffsetY, 'heartBlack'),
		];

		const heartsOutline = [
			this.add.image(heartOffsetX * 2.75, heartOffsetY, 'heartEmpty'),
			this.add.image(heartOffsetX * 3.50, heartOffsetY, 'heartEmpty'),
		];

		const scale = 3.0;

		hearts.forEach( function (heart) {
			heart.setScale(scale);
			heart.setBlendMode(Phaser.BlendModes.ADD);
		});

		heartsOutline.forEach( function (heart) {
			heart.setScale(scale);
		});

		heartsStroke.forEach( function (heart) {
			heart.setScale(scale);
			heart.setBlendMode(Phaser.BlendModes.MULTIPLY);
		});

		return hearts;
	}
};
