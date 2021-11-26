import Phaser from 'phaser'
import { jugador, bullet } from './class'
import store from '~/state/store'
import { loadLevel } from '~/state/modules/level'
import { updatePlayer, createPlayer } from '~/state/modules/player'
import { enemyList } from './obstacles'
export class nivel1 extends Phaser.Scene {
  constructor() {
    super({ key: 'game' })
  }

  init() {
    this.block = null
    this.rockets = null
    this.groundInf = null
    this.counterLife = 100
    this.counterLifeText = ''
    // this.enemyLife = 100
    this.enemyText = ''
    this.damegeEnemy = 30
    this.damageRocket = 20
    this.damagePlayer = 40
    this.explode = null
    store.dispatch(loadLevel(1))
    store.dispatch(createPlayer({ nombre: 'player', id_niveles: 1, energia: 100 }))
    this.mov = true
  }

  preload() {
    this.load.spritesheet('sprite-shadow', '../assets/sprite-shadow.png', {
      frameWidth: 50,
      frameHeight: 50
    })

    this.load.image('background', '../assets/background-lvl1-reducido.png')
    this.load.image('groundbottom', '../assets/groundInf1.png')
    // this.load.image('block', '../assets/block.png')
    this.load.image('rocket', '../assets/rocket.png')
    this.load.image('pause', '../assets/pause-msg.png')
    this.load.spritesheet('portal', '../assets/portal-sprite.png', {
      frameWidth: 230,
      frameHeight: 545
    })
    this.load.image('enemy', '../assets/sprite_3.png')
    // this.load.image('groundbottom', '../assets/groundBottom.png')
    this.load.audio('explosion', '../assets/sounds/explosion.mp3')
    // this.load.audio('ambiental1', '../assets/sounds/MASTER_-_Epic._War_game.mp3')
    // this.load.audio('ambiental2', '../assets/sounds/musicaFondo.mp3')
    // this.load.audio('ambiental1', '../assets/sounds/music-ambiental1.mp3')
    // this.load.audio('music-inicio', '../assets/sounds/Metal Gear Solid 2  Main Theme Live Orchestra 2014.mp3')
    this.load.audio('disparo', '../assets/sounds/sound-disparo-laser.mp3')
    this.load.audio('salto', '../assets/sounds/sound-jump.mp3')
    this.load.audio('toque', '../assets/sounds/sound-touch-enemy.mp3')
    // this.load.audio('noc', '../assets/sounds/Crypt_of_Insomnia-music.mp3')
  }

  create() {
    //ASIGNACION DE SONIDOS
    this.disparo = this.sound.add('disparo')
    this.salto = this.sound.add('salto')
    this.toque = this.sound.add('toque')
    this.explode = this.sound.add('explosion')
    // this.backgroundMusic = this.sound.add('ambiental1')
    // this.backgroundMusic.loop = true
    // this.backgroundMusic.play()

    //ASIGNACION DE IMG
    this.fondito = this.physics.add.image(600, 300, 'background')
    // this.block = this.physics.add.image(800, 510, 'block')
    this.groundInf = this.physics.add
      .image(0, 600, 'groundbottom')
      .setOrigin(0, 1)
      .setImmovable(true)
    this.pause = this.physics.add.image(600, 300, 'pause').setVisible(false)
    this.portal = this.physics.add.sprite(10000, 450, 'portal').setScale(0.5)
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
    this.enemyText = this.add.text(this.sys.game.canvas.width / 2 + 80, 0, '', {
      fontStyle: 'strong',
      font: '25px Arial',
      fill: '#6368BC'
    })

    //GRAVEDAD DEL JUEGO
    this.groundInf.body.allowGravity = false // <- posicion estatica, no le afecta la gravedad
    this.player.body.gravity.y = 1000

    //se crea los input del juego, siendo: las flechas, espacio y el shift
    this.cursors = this.input.keyboard.createCursorKeys()

    this.anims.create({
      key: 'turn',
      frames: this.anims.generateFrameNumbers('portal', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    })

    //COLISIONES
    this.physics.add.collider(this.player, this.groundInf)
    // this.physics.add.collider(this.block, this.groundInf)
    // this.physics.add.collider(this.bulletsGroup, this.block, this.disparando, null, this)
    this.player.body.setCollideWorldBounds() // <- no permite que el personaje traspase los limites de la escena
    // this.block.setVelocityX(-100)
    this.portal.setVelocityX(-300)
    this.portal.anims.play('turn', true)
    this.input.keyboard.on('keydown-P', this.menu, this)
    // this.input.keyboard.on('keydown-M', this.mute, this)

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

    this.physics.add.collider(this.player, this.portal, this.levelUp, null, this)
    // this.physics.add.collider(this.player, this.block)
    this.physics.add.collider(this.enemys, this.groundInf)
    this.physics.add.collider(this.player, this.enemys, this.hacerDaño, null, this)
    this.physics.add.collider(this.bulletsGroup, [this.enemys], this.disparando, null, this)
  }

  menu() {
    if (this.scene.isActive('game')) {
      this.scene.pause()
      this.pause.setVisible(true)
    } else {
      this.scene.resume('game')
      this.pause.setVisible(false)
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

  jump(e = -500) {
    if (this.player.body.touching.down && this.cursors.up.isDown) {
      this.player.setVelocityY(e)
      this.salto.play()
    } else {
      this.salto.resume()
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

  disparar() {
    if (this.mov === true) {
      this.bulletsGroup.newBullet(true)
      this.counterLife -= 15
      this.counterLifeText.setText('Energía: ' + this.counterLife)
      this.disparo.play()
      this.disparo.resume()
      this.endGame()
    } else {
      this.bulletsGroup.newBullet(false)
      this.counterLife -= 15
      this.counterLifeText.setText('Energía: ' + this.counterLife)
      this.endGame()
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

  endGame() {
    if (this.counterLife <= 0) {
      this.scene.start('gameover')
    }
  }

  congrats() {
    this.scene.start('congratulations')
  }
  levelUp() {
    this.updatePlayer()
    this.scene.start('nivel2')
  }
}
