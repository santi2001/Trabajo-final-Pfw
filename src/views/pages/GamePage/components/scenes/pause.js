import Phaser from 'phaser'
import { PauseButton } from './sharedComponents'
export class Pause extends Phaser.Scene {
  constructor() {
    super({ key: 'gameover' })
    this.restartButton = new PauseButton(this)
  }

  preload() {
    this.load.image('gameover', '../assets/gameover.png')
    this.load.image('backgroundG', '../assets/background-GameOver.jpg')
    this.restartButton.preload()
  }

  create() {
    this.add.image(600, 300, 'backgroundG')
    this.restartButton.create()
    this.gameoverImage = this.add.image(400, 90, 'gameover')
  }
}