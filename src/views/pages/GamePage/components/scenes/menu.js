import Phaser from 'phaser'
import { ContinueButton, QuitButton, RestartButton, StartButton } from './sharedComponents'
export class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' })
    this.startButton = new StartButton(this)
    this.restartButton = new RestartButton(this)
    this.quitButton = new QuitButton(this)
    this.continueButton = new ContinueButton(this)
  }

  preload() {
    // this.load.image('gameover', '../assets/gameover.png')
    this.load.image('backgroundG', '../assets/background-GameOver.jpg')
    this.continueButton.preload()
    // this.restartButton.preload()
    this.startButton.preload()
    this.quitButton.preload()
  }

  create() {
    this.add.image(600, 300, 'backgroundG')
    this.continueButton.create()
    // this.restartButton.create()
    this.startButton.create()
    this.quitButton.create()
    // this.gameoverImage = this.add.image(400, 90, 'gameover')
  }
}