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
    if (this.level.musicAsset && this.music && this.music.isPlaying) {
      console.log("stopping music")
      this.music.fadeOut(100)
    }
    if (this.level.musicAsset) {
      this.music = game.add.audio(this.level.musicAsset);
      this.music.loop = true;
      this.music.play();
    }

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

    //sprites
    this.priestess = new Priestess({
      game: this.game,
      x: this.screenWidth / 2,
      y: 0,
      asset: 'priestess'
    })
    this.priestess.powerUps = JSON.parse(localStorage.getItem("powerUps")) || this.priestess.powerUps;
    this.game.add.existing(this.priestess);
    this.game.camera.follow(this.priestess);

    //physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 650;

    //controls

    //menu
    let _this = this
    this.menu = document.getElementById('menu');
    this.bowMenu = document.getElementById('magicbow');
    this.bowMenu.onchange = function () {
      _this.priestess.powerUps.magicBow = this.checked
    }
    this.spellMenu = document.getElementById('spell');
    this.spellMenu.onchange = function () {
      _this.priestess.activeSpell = this.options[this.selectedIndex].value
    }
    this.priestess.activeSpell = this.spellMenu.options[this.spellMenu.selectedIndex].value

    this.effectMenu = document.getElementById('effect');
    this.effectMenu.onchange = function () {
      _this.priestess.activeEffect = this.options[this.selectedIndex].value
    }
    this.priestess.activeEffect = this.effectMenu.options[this.effectMenu.selectedIndex].value
    this.menu.style.display = "block"
  }

  async update() {
    this.game.physics.arcade.collide(this.priestess, this.groundLayer);

  }

  save() {
    localStorage.setItem("powerUps", JSON.stringify(this.priestess.powerUps));
    localStorage.setItem("levelData", this.levelData);
    localStorage.setItem("levelIndex", this.levelIndex);
  }
  nextLevel() {
    this.fadeOut = game.add.tween(game.world).to({ alpha: 0 }, 100, Phaser.Easing.Linear.None, true);
    this.fadeOut.onComplete.add(function () {
      this.levelIndex++;
      if (this.levelIndex < this.worldData.length) {
        this.save()
        this.state.start('Level');
      } else {
        this.state.start('Credits');
      }
    }, this);
  }
}
