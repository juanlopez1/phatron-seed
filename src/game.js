const {Game, WEBGL} = require('phaser');

const {MainScene} = require('./scenes');

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

// eslint-disable-next-line no-unused-vars
const game = new Game(config);
