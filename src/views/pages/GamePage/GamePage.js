import React from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'
import { NavBar, Footer } from '~/views/pages/shared'

export const GamePage = () => {
  const game = {
    width: '100%',
    height: '100%',
    type: Phaser.AUTO,
    scene: {
      init: function () {
        this.cameras.main.setBackgroundColor('#24252A')
      },
      create: function () {
        this.helloWorld = this.add.text(
          this.cameras.main.centerX,
          this.cameras.main.centerY,
          'Hello World',
          {
            font: '40px Arial',
            fill: '#ffffff'
          }
        )
        this.helloWorld.setOrigin(0.5)
      },
      update: function () {
        this.helloWorld.angle += 1
      }
    }
  }

  return (
    <div>
      <NavBar />
      <IonPhaser game={game} />
      <Footer />
    </div>
  )
}
