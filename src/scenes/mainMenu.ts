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

		let bg: Phaser.GameObjects.Image = new BG(this).backgroundImage;

		this.createAnimals();
		this.createHeart();

		const rectangle = this.add.rectangle(menuX, menuY, menuWidth, menuHeight, menuColor);
		rectangle.setOrigin(0, 0);
		rectangle.setBlendMode(Phaser.BlendModes.MULTIPLY);
		rectangle.setAlpha(0.50);

		this.createButtons(menuX, menuY, menuWidth);
	}

	createButtons(menuX: number, menuY: number, menuWidth: number)
	{
		const game: Phaser.Game = this.game;
		const scene = game.scene;
		let x: number;
		let y: number;

		const buttonOffsetX: number = 	8;
		const buttonOffsetY: number = 	8;
		const buttonWidth: number = menuWidth - buttonOffsetX * 2.0;
		const buttonScale: number = buttonWidth / 40; // the button image is 40px wide
		const buttonHeight: number = 76.0;
		let buttons: Phaser.GameObjects.Image[] = [];

		const texts: string[] = [
			'New Game',
			'Credits',
			'Quit',
		];
		const numButtons: number = 		3;
		const indexNewGame = 0;
		const indexCredits = 1;
		const indexQuit = 2;

		for (let i = 0; i < numButtons; i++)
		{
			let button = this.add.image(menuX + buttonOffsetX, menuY + buttonHeight * i + buttonOffsetY * (i + 1), 'button');
			button.setOrigin(0, 0);
			button.setScale(buttonScale);
			button.setInteractive();
			buttons.push(button);
		}
		let index = 0;

		while (index < texts.length)
		{
			x = buttons[index].x + buttonOffsetX;
			y = buttons[index].y + buttonOffsetY;
			let text = this.add.text(x, y, texts[index], { color: '#000000' })
			text.scale = 2.25;

			switch (index)
			{
				case indexNewGame:
					buttons[index].on('pointerup', function (){
					scene.start('MainGame');
					scene.stop('MainMenu');
				}, this);
				break;
				case indexCredits:
					buttons[index].on('pointerup', function (){
						scene.start('Credits');
						scene.stop('MainMenu');
					});
				break;
				case indexQuit:
					buttons[index].on('pointerup', function (){
						scene.start('Quit');
						scene.stop('MainMenu');
					});
				break;
				default:
				break;
			}

			index++;
		}
	}

	createAnimals() {
		const offsetX = 64.0;
		const offsetY = 64.0;
		const animals = [
			this.add.image(offsetX, offsetY * 2.0, 'bear'),
			this.add.image(offsetX, offsetY, 'deer'),
			this.add.image(offsetX * 2.0, offsetY, 'duck'),
			this.add.image(offsetX * 3.0, offsetY, 'fish'),
			this.add.image(offsetX * 4.0, offsetY, 'snek')
			// this.add.image(offsetX * 5.0, offsetY, 'moose'),
			// this.add.image(offsetX * 6.0, offsetY, 'sloth'),
		];
		animals.forEach( function (animal) {
			animal.setScale(6.50);
			animal.setAlpha(0.25);
			animal.setBlendMode(Phaser.BlendModes.ADD);
		});
		return animals;
	}

	createHeart() {
		const heartOffsetX = 32;
		const heartOffsetY = 16;
		const yPosition = this.game.canvas.height - heartOffsetY;
		const hearts = [
			this.add.image(heartOffsetX * 0.50, yPosition, 'heartFull'),
			this.add.image(heartOffsetX * 1.25, yPosition, 'heartFull'),
			this.add.image(heartOffsetX * 2.00, yPosition, 'heartFull'),
		];

		const heartsStroke = [
			this.add.image(heartOffsetX * 0.50, yPosition, 'heartBlack'),
			this.add.image(heartOffsetX * 1.25, yPosition, 'heartBlack'),
			this.add.image(heartOffsetX * 2.00, yPosition, 'heartBlack'),
		];

		const heartsOutline = [
			this.add.image(heartOffsetX * 2.75, yPosition, 'heartEmpty'),
			this.add.image(heartOffsetX * 3.50, yPosition, 'heartEmpty'),
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
