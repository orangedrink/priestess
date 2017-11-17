/* globals __DEV__ */
import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import Priestess from '../sprites/Priestess'
import Effects from '../classes/Effects.js'
import Spells from '../classes/Spells.js'
import Menu from '../classes/Menu.js'

let spellKeys = Object.keys(Spells)
let effectKeys = Object.keys(Effects)

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
    this.map.setCollisionBetween(64, 239);
    this.groundLayer.resizeWorld();
    this.map.addTilesetImage('tiles');
    this.map.setTileIndexCallback(1, this.addEffect, this);
    this.map.setTileIndexCallback(2, this.addSpell, this);
    this.map.setTileIndexCallback(3, this.nextLevel, this);
    this.map.setTileIndexCallback([4,5], this.addHealth, this);
    this.map.setTileIndexCallback([6,7,8,9], this.addPowerUps, this);
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
    this.priestess.activeSpell = localStorage.getItem("activeSpell") || this.priestess.activeSpell;
    this.priestess.activeEffect = localStorage.getItem("activeEffect") || this.priestess.activeEffect;
    this.priestess.bowActive = localStorage.getItem("bowActive") === "true" || this.priestess.bowActive;
    this.priestess.availableSpells = JSON.parse(localStorage.getItem("availableSpells")) || this.priestess.availableSpells;
    this.priestess.availableEffects = JSON.parse(localStorage.getItem("availableEffects")) || this.priestess.availableEffects;
    this.priestess.health = parseInt(localStorage.getItem("health")) || this.priestess.health;
    this.game.add.existing(this.priestess);
    this.game.camera.follow(this.priestess);

    //physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 650;

    //controls

    //menu
    Menu.init(this);
  }

  async update() {
    this.game.physics.arcade.collide(this.priestess, this.groundLayer);

  }

  save() {
    localStorage.setItem("powerUps", JSON.stringify(this.priestess.powerUps));
    localStorage.setItem("activeSpell", this.priestess.activeSpell);
    localStorage.setItem("activeEffect", this.priestess.activeEffect);
    localStorage.setItem("bowActive", this.priestess.bowActive);
    localStorage.setItem("health", this.priestess.health);
    localStorage.setItem("availableSpells", JSON.stringify(this.priestess.availableSpells));
    localStorage.setItem("availableEffects", JSON.stringify(this.priestess.availableEffects));
    localStorage.setItem("levelData", this.levelData);
    localStorage.setItem("levelIndex", this.levelIndex);
  }
  addSpell(p, t) {
    this.map.putTile(0, t.x, t.y, this.groundLayer)
    let spell = spellKeys[p.availableSpells.length]
    this.priestess.availableSpells.push(spell);
    Menu.addSpell(spell)
  }
  addEffect(p, t) {
    this.map.putTile(0, t.x, t.y, this.groundLayer)
    let effect = effectKeys[p.availableEffects.length]
    this.priestess.availableEffects.push(effect);
    Menu.addEffect(effect)
  }
  addHealth(p, t) {
    this.priestess.health += 10;
    if(t.index == 4) this.priestess.health += 10;
    this.map.putTile(0, t.x, t.y, this.groundLayer)
    Menu.setHealth(this.priestess.health);
  }
  addPowerUps(p, t) {
    if(t.index == 6){
      this.priestess.powerUps.magicBow = true;
      Menu.showBow()
    }
    else if(t.index == 7){
      this.priestess.powerUps.superJump = true;
      Menu.flashMessage('Super jumping power acheived')
    }
    this.map.putTile(0, t.x, t.y, this.groundLayer)
    return true;
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
