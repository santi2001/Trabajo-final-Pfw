export class PauseButton {
    constructor(scene) {
      this.relatedScene = scene
    }
  
    preload() {
      // this.relatedScene.load.spritesheet('button', 'assets/restart.png', { frameWidth: 190, frameHeigth: 49 });
      this.relatedScene.load.spritesheet('pause', '../assets/pausebutton.png', {
        frameWidth: 190,
        frameHeight: 70
      })
    }
  
    create() {
      this.startButton = this.relatedScene.add
        .sprite(600, 230, 'pause')
        .setInteractive()
  
      this.startButton.on('pointerover', () => {
        this.startButton.setFrame(1)
      })
  
      this.startButton.on('pointerout', () => {
        this.startButton.setFrame(0)
      })
  
      this.startButton.on('pointerdown', () => {
        this.relatedScene.scene.start('game')
      })
    }
  }
  