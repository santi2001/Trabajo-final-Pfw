import Phaser from 'phaser'
export class bullet extends Phaser.Physics.Arcade.Group {
  constructor(physicsWorld, scene) {
    super(physicsWorld, scene)

    this.scened = scene
  }

  newBullet(mov = true) {
    if (mov) {
      let item = this.create(
        this.scened.player.x + 50,
        this.scened.player.y + 10,
        'rocket'
      )
        .setActive(true)
        .setVisible(true)
        .setDepth(2)
      item.setVelocityX(300)
    } else {
      let item = this.create(
        this.scened.player.x - 50,
        this.scened.player.y + 10,
        'rocket'
      )
        .setActive(true)
        .setVisible(true)
        .setDepth(2)
      item.setVelocityX(-300)
    }
    // item.outOfBoundsKill = true
  }
}
