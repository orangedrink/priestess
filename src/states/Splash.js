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
    this.banner = this.add.text(this.world.centerX, 80, 'Priestess');
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
    //activeEffect = effectKeys[effectKeys.length-1]
    //activeSpell = spellKeys[spellKeys.length-1]

    this.instructions = this.add.text(this.world.centerX, this.world.height-100, `Generating a random spell from ${combinations} possible combinations: ${activeSpell} ${activeEffect} `);
    this.instructions.font = 'acme'
    this.instructions.padding.set(10, 16)
    this.instructions.fontSize = 20
    this.instructions.fill = '#ddd'
    this.instructions.smoothed = true
    this.instructions.anchor.setTo(0.5)

    //sprites
    this.priestess = new Priestess({
      game: this.game,
      x: this.world.centerX,
      y: 0,
      asset: 'priestess'
    })
    this.priestess.activeEffect = activeEffect;
    this.priestess.activeSpell = activeSpell;
    this.priestess.powerUps.magicBow = bow;
    this.game.add.existing(this.priestess);

    //physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 650;
  }

  update(){
  }

  startGame() {
    this.state.start('Game');
  }
}
