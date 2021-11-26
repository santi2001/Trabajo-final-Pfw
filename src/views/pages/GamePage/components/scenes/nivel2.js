import { bullet } from './class/bullet.js'
import { jugador } from './class/jugador.js'
import Phaser from 'phaser'
import store from '~/state/store'
import { loadLevel } from '~/state/modules/level'
import { updatePlayer } from '~/state/modules/player'
import { enemyList } from './obstacles'

// import { loadPlayer } from '../../../../../state/modules/player/actions.js'
export class nivel2 extends Phaser.Scene {
  constructor() {
    super({ key: 'nivel2' })
  }

  init() {
    this.block = null
    this.rockets = null
    this.groundInf = null
    // this.counterLife = 100
    this.counterLifeText = ''
    this.enemyLife = 100
    this.enemyText = ''
    this.damegeEnemy = 30
    this.damageRocket = 20
    this.damagePlayer = 40
    this.explode = null
    this.mov = true

    store.dispatch(loadLevel(2))
  }

  preload() {
    //SE CARGA EL SPRITE E IMAGENES
    this.load.spritesheet('sprite-shadow', '../assets/sprite-shadow.png', {
      frameWidth: 50,
      frameHeight: 50
    })
    this.load.spritesheet('portal', '../assets/portal-sprite.png', {
      frameWidth: 230,
      frameHeight: 545
    })
    this.load.image('enemy', '../assets/sprite_3.png')
    this.load.image('background2', '../assets/background-lvl2-reducido.png')
    this.load.image('block', '../assets/block.png')
    this.load.image('rocket', '../assets/rocket.png')
    this.load.image('groundbottom2', '../assets/groundInf2.png')

    this.load.audio('explosion', '../assets/sounds/explosion.mp3')
    this.load.audio('disparo', '../assets/sounds/sound-disparo-laser.mp3')
    this.load.audio('salto', '../assets/sounds/sound-jump.mp3')
    this.load.audio('toque', '../assets/sounds/sound-touch-enemy.mp3')
    // this.load.audio('ambiental2', '../assets/sounds/musicaFondo.mp3')
  }

  create() {
    const { player } = store.getState().player

    this.counterLife = player.energia

    this.disparo = this.sound.add('disparo')
    this.salto = this.sound.add('salto')
    this.toque = this.sound.add('toque')
    this.explode = this.sound.add('explosion')
    // this.backgroundMusic = this.sound.add('ambiental2')
    // this.backgroundMusic.loop = true
    // this.backgroundMusic.play()

    this.fondito = this.physics.add.image(600, 300, 'background2')
    //SE CREAN LAS VARIABLES Q CONTIENEN LAS IMG Y SPRITES, JUNTO A SU POSICION (X, Y)
    this.groundInf = this.physics.add
      .image(0, 600, 'groundbottom2')
      .setOrigin(0, 1)
      .setImmovable(true)
    //OBJETOS
    this.player = new jugador(this, 400, 440, 'sprite-shadow')
    this.portal = this.physics.add.sprite(10000, 450, 'portal').setScale(0.5)
    this.anims.create({
      key: 'turn',
      frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    })
    this.bulletsGroup = new bullet(this.physics.world, this)
    //INGRESANDO LOS TEXTOS
    this.counterLifeText = this.add.text(
      this.sys.game.canvas.width / 2 - 80,
      0,
      `Energía: ${player.energia}`,
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

    this.enemys = this.physics.add.group()
    for (let enemy of enemyList) {
      let positionX = 0
      for (let i = 0; i < enemy.quantity; i++) {
        let enemyAux = this.enemys
          .create(enemy.seconds * 700 + positionX, enemy.y, 'enemy')
          .setOrigin(0, 1)
          .setImmovable(true)
        enemyAux = { ...enemyAux, life: 100 }
        positionX += enemyAux.width
      }
    }
    this.enemys.setVelocityX(-200)
    //COLISIONES
    this.physics.add.collider(this.player, this.groundInf)

    this.player.body.setCollideWorldBounds()
    this.physics.add.collider(this.enemys, this.groundInf)
    this.physics.add.collider(this.player, this.enemys, this.hacerDaño, null, this)
    this.physics.add.collider(this.bulletsGroup, [this.enemys], this.disparando, null, this)
    this.portal.setVelocityX(-300)
    this.portal.anims.play('turn', true)
    this.input.keyboard.on('keydown-P', this.menu, this)
  }

  menu() {
    if (this.scene.isPaused('nivel2')) {
      this.scene.resume('nivel2')
    } else {
      this.scene.pause('nivel2')
    }
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
    for (let enemi of this.enemys.children.entries) {
      if (enemi.body.touching.up) {
        this.player.setVelocityY(-300)
        this.salto.play()
        this.salto.resume()
        enemi.life = 0
        enemi.y = 1000
        this.counterLife += 20
        this.counterLifeText.setText(`Energia: ${this.counterLife}`)
        // this.enemyLife -= 40
        // this.enemyText.setText(`Energia: ${this.enemyLife}`)
      }

      if (enemi.body.touching.left || enemi.body.touching.right) {
        if (this.player.x > enemi.x) {
          this.player.x += 60
          this.counterLife -= this.damegeEnemy
          this.counterLifeText.setText('Energia: ' + this.counterLife)
        } else if (this.player.x < enemi.x) {
          this.player.x -= 60
          this.counterLife -= this.damegeEnemy
          this.counterLifeText.setText('Energia: ' + this.counterLife)
        }
        this.toque.play()
        this.toque.resume()
        this.endGame()
      }
    }
  }

  disparando() {
    for (let enemi of this.enemys.children.entries) {
      if (enemi.body.touching.left || enemi.body.touching.right) {
        enemi = { ...enemi, life: 0 }
        enemi.y = 1000
        this.enemyText.setText('Enemigo eliminado')
        this.counterLife += 20
        this.counterLifeText.setText('Energia: ' + this.counterLife)
        this.explode.play()
        this.explode.resume()
        this.updatePlayer()
        this.bulletsGroup.setVisible(false)
      }
    }
  }
  updatePlayer() {
    const {
      player: { player }
    } = store.getState()
    const updatePlayerData = {
      ...player,
      energia: this.counterLife
    }
    store.dispatch(updatePlayer({ ...updatePlayerData }))
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

  levelUp() {
    this.updatePlayer()
    this.scene.start('nivel3')
  }
  congrats() {
    this.scene.start('congratulations')
  }
}
