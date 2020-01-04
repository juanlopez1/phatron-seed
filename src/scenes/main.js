import { Scene } from 'phaser';

class MainScene extends Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  // This method is called by the Scene Manager when the scene starts, before preload() and create().
  // init() {}

  // This method is called by the Scene Manager, after init() and before create(),
  // only if the Scene has a LoaderPlugin.
  preload() {
    this.load.setBaseURL('http://labs.phaser.io');

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
  }

  // This method is called by the Scene Manager when the scene starts, after init() and preload().
  // If the LoaderPlugin started after preload(), then this method is called only after loading is complete.
  create() {
    this.add.image(400, 300, 'sky');

    const particles = this.add.particles('red');

    const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
    });

    const logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
  }

  // This method is called once per game step while the scene is running.
  // update(time, delta) {}
}

export default MainScene;
