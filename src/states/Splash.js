import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import Priestess from '../sprites/Priestess'
import Effects from '../classes/Effects.js'
import Spells from '../classes/Spells.js'
export default class extends Phaser.State {
  init() { }

  preload() {
  }

  create() {
    console.log('Splash screen state')

    //world
    this.music = game.add.audio('dream');
    this.music.play();
    this.screenWidth = this.game.width;
    this.screenHeight = this.game.height;
    this.map = this.game.add.tilemap('splashmap');
    this.groundLayer = this.map.createLayer(0);
    this.map.setCollisionBetween(8, 80);
    this.groundLayer.resizeWorld();
    this.map.addTilesetImage('tiles');

    this.banner = this.add.text(this.screenWidth / 2, 80, 'Priestess');
    this.banner.font = 'acme'
    this.banner.padding.set(10, 16)
    this.banner.fontSize = 60
    this.banner.fill = '#ddd'
    this.banner.smoothed = true
    this.banner.anchor.setTo(0.5)

    let spellKeys = Object.keys(Spells)
    let effectKeys = Object.keys(Effects)


    let combinations = (spellKeys.length * effectKeys.length) * 2;

    let activeEffect = effectKeys[Math.floor(Math.random() * effectKeys.length)]
    let activeSpell = spellKeys[Math.floor(Math.random() * spellKeys.length)]
    let bow = (Math.round(Math.random()) == 1)
    console.log(bow)
    //activeSpell = 'boulder'
    //activeEffect = 'wave'
    //bow = true

    //sprites
    this.priestess = new Priestess({
      game: this.game,
      x: this.screenWidth / 2,
      y: 0,
      asset: 'priestess'
    })
    this.priestess.activeEffect = activeEffect;
    this.priestess.activeSpell = activeSpell;
    this.priestess.powerUps.magicBow = bow;
    this.game.add.existing(this.priestess);
    this.game.camera.follow(this.priestess);

    //physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 650;

    this.instructions = this.add.text(this.screenWidth / 2, this.screenHeight - 100, `Generating a random power  from ${combinations} possible combinations: ${activeSpell} ${activeEffect} `);
    this.instructions.font = 'acme'
    this.instructions.padding.set(10, 16)
    this.instructions.fontSize = 20
    this.instructions.fill = '#ddd'
    this.instructions.smoothed = true
    this.instructions.anchor.setTo(0.5)

  }

  update() {
    this.game.physics.arcade.collide(this.priestess, this.groundLayer);
    if (this.priestess.y > 1660) {
      this.state.start('Splash');
    }
    if (this.priestess.x > 1590) {
      this.startGame();

    }
  }

  startGame() {
    this.fadeOut = game.add.tween(game.world).to({ alpha: 0 }, 100, Phaser.Easing.Linear.None, true);
    this.fadeOut.onComplete.add(function () {
      this.game.state.states['Level'].levelData = '../assets/levels/index.json';
      this.game.state.states['Level'].levelIndex = 0;
      this.state.start('Level');
    }, this);
  }
}
