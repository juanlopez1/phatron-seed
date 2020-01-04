import { Game, WEBGL } from 'phaser';
import { MainScene } from './scenes';

const config = {
  type: WEBGL,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 200
      }
    }
  },
  scene: [
    MainScene
  ]
};

const game = new Game(config);
