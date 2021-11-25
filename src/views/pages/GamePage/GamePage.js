import React from 'react'
import Phaser from 'phaser'

import { IonPhaser } from '@ion-phaser/react'
import { NavBar, Footer } from '~/views/pages/shared'
import { GameOver, MainScene, Congratulation } from './components/scenes'
import { useStyles } from './GamePage.style'
export const GamePage = () => {
  const classes = useStyles()
  const game = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    backgroundColor: '#20add8',
    scene: [MainScene, GameOver, Congratulation],
    render: {
      pixelArt: true
    },
    physics: {
      default: 'arcade',
      arcade: {
        debug: false
      }
    }
  }

  return (
    <>
      <NavBar />
      <div className={classes.container}>
        <IonPhaser style={{ marginTop: 100 }} game={game} />
      </div>
      <Footer />
    </>
  )
}
