import React from 'react'
import Phaser from 'phaser'
import { IonPhaser } from '@ion-phaser/react'
import { NavBar, Footer } from '~/views/pages/shared'
import { GameOver, MainScene, Congratulation } from './components/scenes'
export const GamePage = () => {
  const game = {
    type: Phaser.AUTO,
    // parent: 'game',
    width: '100%',
    height: '100%',
    backgroundColor: '#20add8',
    scene: [MainScene, GameOver, Congratulation],
    render: {
      pixelArt: true
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 300 },
        debug: false
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
