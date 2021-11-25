import Phaser from 'phaser'
export class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite)
    this.scene = scene
    this.scene.add.existing(this)
    this.scene.physics.world.enable(this)
  }
}
