/* globals __DEV__ */
import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import Priestess from '../sprites/Priestess'
import Effects from '../classes/Effects.js'
import Spells from '../classes/Spells.js'

export default class extends Phaser.State {
  async init() {
    this.worldData = await fetch(this.levelData, {
      method: 'get'
    }).then(r => r.json())
      .then(function (response) {
        return response.levels
      }).catch(function (err) {
        console.log(`error on loading: ${_this.levelData}`)
        console.log(err)
      });
  }

  async preload() {
    await this.init()
    this.level = this.worldData[this.levelIndex]
  }

  async create() {
    game.add.tween(game.world).to({ alpha: 1 }, 100, Phaser.Easing.Linear.None, true);
    await this.preload()
    console.log(`Starting Level ${this.levelIndex} from ${this.levelData}`)
    //world
    this.background = this.game.add.image(0, 0, this.level.bgAsset);
    this.background.fixedToCamera = true;
    this.screenWidth = this.game.width;
    this.screenHeight = this.game.height;
    this.map = this.game.add.tilemap(this.level.mapAsset);
    this.groundLayer = this.map.createLayer(0);
    this.map.setCollisionBetween(8, 800);
    this.groundLayer.resizeWorld();
    this.map.addTilesetImage('tiles');
    this.map.setTileIndexCallback(3, this.nextLevel, this);
    let spellKeys = Object.keys(Spells)
    let effectKeys = Object.keys(Effects)


    let combinations = (spellKeys.length * effectKeys.length) * 2;

    let activeEffect = effectKeys[Math.floor(Math.random() * effectKeys.length)]
    let activeSpell = spellKeys[Math.floor(Math.random() * spellKeys.length)]
    let bow = (Math.round(Math.random()) == 1)
    console.log(`Randomly generated power: ${activeSpell} ${activeEffect}`)
    console.log(`Magic bow: ${bow}`)
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

  }

  async update() {
    this.game.physics.arcade.collide(this.priestess, this.groundLayer);
  }

  nextLevel() {
    this.fadeOut = game.add.tween(game.world).to({ alpha: 0 }, 100, Phaser.Easing.Linear.None, true);
    this.fadeOut.onComplete.add(function () {
      this.game.state.states['Level'].levelData = '../assets/levels/index.json';
      this.levelIndex++;
      if (this.levelIndex < this.worldData.length) {
        this.state.start('Level');
      } else {
        this.state.start('Credits');
      }
    }, this);
  }
}
