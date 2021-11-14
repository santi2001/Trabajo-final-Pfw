import { Congratulation } from "./scenes/congratulation.js";
import { GameOver } from "./scenes/gameOver.js";
import { MainScene } from "./scenes/main.js";

const config = {
    type: Phaser.AUTO,
    parent: 'theGame',
    width: 800,
    height: 600,
    backgroundColor: "#20add8",
    scene: [MainScene, GameOver, Congratulation],
    // scene: [MainScene],
    render: {
        pixelArt: true,
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: false,
        },
    },
}

const game = new Phaser.Game(config);