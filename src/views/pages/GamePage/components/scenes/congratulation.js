import { RestartButton } from './sharedComponents'
import Phaser from 'phaser'

export class Congratulation extends Phaser.Scene {
  constructor() {
    super({ key: 'congratulations' })
    this.restartButton = new RestartButton(this)
  }

  preload() {
    this.load.image('congratulations', '~/assets/congratulations.png')
    this.load.image('backgroundC', '~/assets/background-Congrats.png')
    this.restartButton.preload()
  }

  create() {
    this.add.image(400, 300, 'backgroundC')
    this.restartButton.create()
    this.congratsImage = this.add.image(400, 90, 'congratulations')
  }
}
