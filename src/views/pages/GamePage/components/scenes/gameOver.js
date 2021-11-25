import { RestartButton } from './sharedComponents'
import Phaser from 'phaser'
export class GameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'gameover' })
    this.restartButton = new RestartButton(this)
  }

  preload() {
    this.load.image('gameover', '../assets/gameover.png')
    this.load.image('backgroundG', '../assets/background-GameOver.jpg')
    this.restartButton.preload()
  }

  create() {
    this.add.image(400, 300, 'backgroundG')
    this.restartButton.create()
    this.gameoverImage = this.add.image(400, 90, 'gameover')
  }
}
