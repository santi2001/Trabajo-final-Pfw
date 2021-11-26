import React, { useEffect } from 'react'
import Phaser from 'phaser'
import { NavBar, Footer } from '~/views/pages/shared'
import { GameOver, Congratulation, Menu, nivel1, nivel2, nivel3 } from './components/scenes'
import { useStyles } from './GamePage.style'
export const GamePage = () => {
  const classes = useStyles()
  useEffect(() => {
    const game = {
      type: Phaser.AUTO,
      parent: 'game',
      width: '100%',
      height: 600,
      backgroundColor: '#20add8',
      scene: [Menu, nivel1, nivel2, nivel3, GameOver, Congratulation],
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
    new Phaser.Game(game)
  }, [])
  return (
    <>
      <NavBar />
      <div className={classes.container}>
        <div className={classes.phaser} id='game' />
      </div>
      <Footer />
    </>
  )
}
