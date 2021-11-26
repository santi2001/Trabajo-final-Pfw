import { bullet } from './class/bullet.js'
import { jugador } from './class/jugador.js'
import Phaser from 'phaser'
import store from '~/state/store'
import { loadLevel } from '~/state/modules/level'
import { updatePlayer } from '~/state/modules/player'

export class nivel3 extends Phaser.Scene {
  constructor() {
    super({ key: 'nivel3' })
  }

  init() {
    // SE INICIALIZAN VARIABLES GLOBALES
    this.block = null
    this.rockets = null
    this.groundInf = null

    this.counterLifeText = ''
    this.enemyLife = 100
    this.enemyText = ''
    this.damegeEnemy = 30
    this.damageRocket = 20
    this.damagePlayer = 40
    this.explode = null
    this.mov = true
    store.dispatch(loadLevel(3))
  }

  preload() {
    //SE CARGA EL SPRITE E IMAGENES
    this.load.spritesheet('sprite-shadow', '../assets/sprite-shadow.png', {
      frameWidth: 50,
      frameHeight: 50
    })

    this.load.image('background3', '../assets/background-lvl3-reducido.jpg')
    this.load.image('block', '../assets/block.png')
    this.load.image('rocket', '../assets/rocket.png')
    this.load.image('groundbottom3', '../assets/groundInf3.jpg')

    this.load.audio('explosion', '../assets/sounds/explosion.mp3')
    this.load.audio('disparo', '../assets/sounds/sound-disparo-laser.mp3')
    this.load.spritesheet('portal', '../assets/portal-sprite.png', {
      frameWidth: 230,
      frameHeight: 545
    })
    this.load.audio('salto', '../assets/sounds/sound-jump.mp3')
    this.load.audio('toque', '../assets/sounds/sound-touch-enemy.mp3')
    // this.load.audio('ambiental3', '../assets/sounds/Crypt_of_Insomnia-music.mp3')
  }

  create() {
    this.disparo = this.sound.add('disparo')
    this.salto = this.sound.add('salto')
    this.toque = this.sound.add('toque')
    this.explode = this.sound.add('explosion')
    // this.backgroundMusic = this.sound.add('ambiental3')
    // this.backgroundMusic.loop = true
    // this.backgroundMusic.play()
    const { player } = store.getState().player
    this.counterLife = player.energia
    console.log(this.counterLife)
    this.portal = this.physics.add.sprite(10000, 450, 'portal').setScale(0.5)
    this.fondito = this.physics.add.image(600, 300, 'background3')
    //SE CREAN LAS VARIABLES Q CONTIENEN LAS IMG Y SPRITES, JUNTO A SU POSICION (X, Y)
    this.block = this.physics.add.image(800, 450, 'block').setImmovable(true)
    this.groundInf = this.physics.add
      .image(0, 600, 'groundbottom3')
      .setOrigin(0, 1)
      .setImmovable(true)
    //OBJETOS
    this.player = new jugador(this, 400, 400, 'sprite-shadow')

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
    this.anims.create({
      key: 'turn',
      frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    })
    this.portal.setVelocityX(-300)
    this.portal.anims.play('turn', true)
    //GRAVEDAD DEL JUEGO
    this.groundInf.body.allowGravity = false // <- posicion estatica, no le afecta la gravedad
    this.player.body.gravity.y = 1000
    //se crea los input del juego, siendo: las flechas, espacio y el shift
    this.cursors = this.input.keyboard.createCursorKeys()

    //COLISIONES
    this.physics.add.collider(this.player, this.portal, this.congrats, null, this)
    this.physics.add.collider(this.player, this.groundInf)
    this.physics.add.collider(this.block, this.groundInf)
    this.physics.add.collider(this.player, this.block, this.hacerDaño, null, this)
    this.physics.add.collider(this.bulletsGroup, this.block, this.disparando, null, this)
    this.player.body.setCollideWorldBounds()
    this.block.setVelocityX(-100)

    this.input.keyboard.on('keydown-P', this.menu, this)
    // this.input.keyboard.on('keydown-M', this.mute, this)
  }

  menu() {
    if (this.scene.isPaused('nivel3')) {
      this.scene.resume('nivel3')
    } else {
      this.scene.pause('nivel3')
    }
  }

  // mute(){
  //   if(this.backgroundMusic.isPlaying){
  //     this.backgroundMusic.pause('ambiental3')
  //   }else{
  //     this.backgroundMusic.resume('ambiental3')
  //     this.backgroundMusic.loop = true
  //   }
  // }

  update() {
    // this.fondito.anims.play('back')
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
      this.updatePlayer()
    }
  }

  congrats() {
    this.updatePlayer()
    this.scene.start('congratulations')
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
}
