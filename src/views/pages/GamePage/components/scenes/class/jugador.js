import Phaser from 'phaser'
export class jugador extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, sprite) {
    super(scene, x, y, sprite)
    this.scene = scene
    this.scene.add.existing(this)
    this.scene.physics.world.enable(this)
    this.scene.physics.add.existing(this)

    this.Init()
    this.animatePlayer()
  }

  Init() {
    this.setCollideWorldBounds(true).setGravityY(5000)
  }

  animatePlayer() {
    this.anims.create({
      key: 'attak-left',
      frames: [{ key: 'sprite-shadow', frame: 1 }],
      frameRate: 20
    })

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('sprite-shadow', {
        start: 2,
        end: 5
      }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'turn-right',
      frames: [{ key: 'sprite-shadow', frame: 6 }],
      frameRate: 20
      // delay: 1.1
    })

    this.anims.create({
      key: 'turn-left',
      frames: [{ key: 'sprite-shadow', frame: 5 }],
      frameRate: 20
      // delay: 1.1
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('sprite-shadow', {
        start: 6,
        end: 9
      }),
      frameRate: 10,
      repeat: -1
    })

    this.anims.create({
      key: 'attak-right',
      frames: [{ key: 'sprite-shadow', frame: 11 }],
      frameRate: 20
    })
  }
}
