import 'phaser';
import GameConfig from './gameConfig'
import PreloaderScene from "./scenes/preloader";
import BootScene from "./scenes/boot";
import MainMenu from "./scenes/mainMenu";
class BearPoke extends Phaser.Game
{
	static 	newGame = function ()
	{
		console.log('BearPoke New Game');

		const gameConfig = GameConfig;
		let game = new Phaser.Game(gameConfig);
		game.scene.add('Boot', BootScene);
		game.scene.add('Preloader', PreloaderScene);
		game.scene.add('MainMenu', MainMenu);
		game.scene.start('Boot');
		return game;
	}

}

export default BearPoke;