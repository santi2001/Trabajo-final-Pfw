import Phaser from 'phaser'
import { jugador, bullet } from './class'
import store from '~/state/store'
import { loadLevel } from '~/state/modules/level'
import { updatePlayer } from '~/state/modules/player'
export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'game' })
  }

  init() {
    this.state = null
    this.level = null
    this.block = null
    this.rockets = null
    this.groundInf = null
    this.counterLife = 100
    this.counterLifeText = ''
    this.enemyLife = 100
    this.enemyText = ''
    this.damegeEnemy = 30
    this.damageRocket = 20
    this.damagePlayer = 40
    this.explode = null
    this.mov = true
  }

  preload() {
    // realizar el dispatch de la accion

    const state = store.getState()
    store.dispatch(updatePlayer(state.player.player))
    // store.dispatch(createPlayer({ nombre: 'Jugador', id_niveles: 1, energia: 100 }))
    // store.dispatch(loadPlayer())
    store.dispatch(loadLevel(1))
    store.dispatch(updatePlayer({ idJugadores: 2, nombre: 'Barri', id_niveles: 3, energia: 30 }))
    this.load.spritesheet('sprite-shadow', '../assets/sprite-shadow.png', {
      frameWidth: 50,
      frameHeight: 50
    })

    this.load.image('block', './assets/block.png')
    this.load.image('rocket', '../assets/rocket.png')
    this.load.image('groundbottom', '../assets/groundBottom.png')
    this.load.image('groundtop', '../assets/groundTop.png')
    this.load.audio('explosion', './sounds/explosion.mp3')
  }

  create() {
    this.block = this.physics.add.image(800, 450, 'block').setImmovable(true)
    this.groundTop = this.physics.add.image(0, 0, 'groundtop').setOrigin(0, 0).setImmovable(true)
    this.groundInf = this.physics.add
      .image(0, 600, 'groundbottom')
      .setOrigin(0, 1)
      .setImmovable(true)
    //OBJETOS
    this.player = new jugador(this, 400, 440, 'sprite-shadow')

    this.bulletsGroup = new bullet(this.physics.world, this)
    //INGRESANDO LOS TEXTOS
    this.counterLifeText = this.add.text(
      this.sys.game.canvas.width / 2 - 80,
      0,
      `Energía: ${this.counterLife}`,
      { fontStyle: 'strong', font: '25px Arial', fill: '#6368BC' }
    )
    this.counterLifeText.setDepth(1) //profundidad (?)
    this.enemyText = this.add.text(
      this.sys.game.canvas.width / 2 + 80,
      0,
      'Energía: ' + this.enemyLife,
      { fontStyle: 'strong', font: '25px Arial', fill: '#6368BC' }
    )
    //GRAVEDAD DEL JUEGO
    this.groundInf.body.allowGravity = false // <- posicion estatica, no le afecta la gravedad
    //<- gravedad a la q el cuerpo es afectada
    this.player.body.gravity.y = 1000
    //se crea los input del juego, siendo: las flechas, espacio y el shift
    this.cursors = this.input.keyboard.createCursorKeys()

    //COLISIONES
    this.physics.add.collider(this.player, this.groundInf)
    this.physics.add.collider(this.block, this.groundInf)
    this.physics.add.collider(this.player, this.block, this.hacerDaño, null, this)
    this.physics.add.collider(this.bulletsGroup, this.block, this.disparando, null, this)
    this.player.body.setCollideWorldBounds()
    this.block.setVelocityX(-100)

    // de esta forma traes las variables de redux

    //pones el nombre la constante. nombre del reducer. nombre del objeto al que quieres acceder
    // console.log(state.player.player)
  }

  update() {
    if (this.cursors.left.isDown) {
      this.mov = false
      this.player.setVelocityX(-160).anims.play('left', true)
      //DISPARAR
      if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
        this.player.anims.play('attak-right', true)
        this.disparar(false)
      }
      if (this.cursors.up.isDown && this.cursors.left.isDown) {
        this.jump()
        if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
          this.player.anims.play('attak-right', true)
          this.disparar(false)
        }
      }
    } else if (this.cursors.right.isDown) {
      this.mov = true
      this.player.setVelocityX(160).anims.play('right', true)
      //DISPARAR
      if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
        this.player.anims.play('attak-right', true)
        this.disparar()
      }
      if (this.cursors.up.isDown && this.cursors.right.isDown) {
        this.jump()
        if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
          this.player.anims.play('attak-right', true)
          this.disparar()
        }
      }
    } else if (this.cursors.up.isDown) {
      this.jump()
    } else if (this.mov) {
      this.player.setVelocityX(0).anims.play('turn-right', true)
      if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
        this.player.anims.play('attak-right')
        this.disparar(false)
      }
    } else {
      this.player.setVelocityX(0).anims.play('turn-left', true)
      if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
        this.player.anims.play('attak-left')
        this.disparar()
      }
    }

    if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
      this.disparar()
    }
  }

  jump(e = -400) {
    if (this.player.body.touching.down && this.cursors.up.isDown) {
      this.player.setVelocityY(e)
    } else {
      return
    }
  }

  hacerDaño() {
    //MATAR ENEMIGO SALTANDO POR ENCIMA
    if (this.block.body.touching.up) {
      this.player.setVelocityY(-300)
      this.counterLife += 20
      this.counterLifeText.setText(`Energia: ${this.counterLife}`)
      this.enemyLife -= 40
      this.enemyText.setText(`Energia: ${this.enemyLife}`)
    }

    if (this.block.body.touching.left || this.block.body.touching.right) {
      if (this.player.x > this.block.x) {
        this.player.x += 60
        this.counterLife -= this.damegeEnemy
        this.counterLifeText.setText('Energia: ' + this.counterLife)
      } else if (this.player.x < this.block.x) {
        this.player.x -= 60
        this.counterLife -= this.damegeEnemy
        this.counterLifeText.setText('Energia: ' + this.counterLife)
      }
      this.endGame()
    }
    if (this.enemyLife <= 0) {
      this.block.y = 800
      this.enemyText.setVisible(false)
    }
  }

  disparando() {
    if (this.block.visible) {
      this.counterLife += 20
      this.counterLifeText.setText('Energia: ' + this.counterLife)
      this.enemyLife -= 30
      this.enemyText.setText('Energia: ' + this.enemyLife)
    }
    this.bulletsGroup.setVisible(false)
    if (this.enemyLife <= 0) {
      this.block.y = 800
      console.log(this.block.active)
      this.enemyText.setVisible(false)
    }
  }

  disparar() {
    if (this.mov === true) {
      this.bulletsGroup.newBullet(true)
      this.counterLife -= 15
      this.counterLifeText.setText('Energía: ' + this.counterLife)
      this.endGame()
    } else {
      this.bulletsGroup.newBullet(false)
      this.counterLife -= 15
      this.counterLifeText.setText('Energía: ' + this.counterLife)
      this.endGame()
    }
  }

  endGame() {
    if (this.counterLife <= 0) {
      this.scene.start('gameover')
    }
  }

  congrats() {
    this.scene.start('congratulations')
  }
}
