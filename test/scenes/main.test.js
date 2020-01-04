const {Scene} = require('phaser');
const {MainScene} = require('../../src/scenes');

test('Should instantiate MainScene and be instance of Scene', () => {
    const mainScene = new MainScene();
    expect(mainScene).toBeInstanceOf(Scene);
});

test('Should instantiate MainScene and has \'MainScene\' as key', () => {
    const mainScene = new MainScene();
    expect(mainScene.sys.config.key).toBe('MainScene');
});
