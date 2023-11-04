# BearPoke

Don't Poke the Bear

---

Don't Poke the Bear is a free game that is open source. Feel free to clone, copy, or fork any file in this project. 

This project is built on Phaser which is also open source.

* https://phaser.io/
* https://github.com/photonstorm/phaser/blob/master/LICENSE.md

If memory serves me right Phaser was built on Pixi.js which is also open source.
* https://github.com/pixijs/pixijs
* https://github.com/pixijs/pixijs/blob/dev/LICENSE

---
Run project
```bash
yarn dev
```
---

Build project

```bash
yarn build
```
Outputs to `dist` folder. Not sure why assets aren't loading (yet).

---

## Main Menu

![Don't Poke the Bear Main Menu](./readme-assets/Don%27t%20Poke%20the%20Bear%20Main%20Menu.jpg)

The main menu allows you to start a new game, view the credits, or destroy the game process (quit).

## Gameplay

![Don't Poke the Bear Game Mechanics](./readme-assets/Don%27t%20Poke%20the%20Bear%20Game%20Mechanics.jpg)

During gameplay: animals will appear. 
In this version bears removes 2 hearts, fish heal 1 heart. 
If your heart count reaches zero the game is over.

## Game Over

![Don't Poke the Bear Game Over Screen](./readme-assets/Don%27t%20Poke%20the%20Bear%20Game%20Over%20Screen.jpg)

During Game Over: you can start a new game, return to the main menu, or quit (quit destroys the game process).
The game over screen also displays your score, pokes, and other interesting stats.
## Credits

![Don't Poke the Bear Credits Screen](./readme-assets/Don%27t%20Poke%20the%20Bear%20Credits%20Screen.jpg)

Several Credits have been written. 
Most notably: 
* Phaser game engine
* Pixabay for proving the backgrounds
* Draw for providing the animals

From the credit screen you can return to the main menu.