import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import Head from '../sprites/Head'

export default class extends Phaser.State {
  init() { }

  preload() {
    this.load.image('mushroom', 'assets/images/mushroom2.png');
    this.load.image('head', 'assets/images/head.png');
    this.load.image('blood1', 'assets/images/blood-drop1.png');
    this.load.image('litter', 'assets/images/litter.png');
  }

  create() {
    this.banner = this.add.text(this.world.centerX, 80, 'GAME OVER');
    this.banner.font = 'Nosifer'
    this.banner.padding.set(10, 16)
    this.banner.fontSize = 90
    this.banner.fill = '#e00'
    this.banner.smoothed = true
    this.banner.anchor.setTo(0.5)

    this.startText = this.add.text(this.world.centerX, this.game.height - 80, 'Click to try again');
    this.startText.inputEnabled = true;
    this.startText.font = 'Arvo'
    this.startText.fontSize = 50
    this.startText.fill = '#999'
    this.startText.smoothed = true
    this.startText.anchor.setTo(0.5)

    this.head = new Head({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'head'
    })
    this.head.anchor.setTo(0.5, 0.5);
    this.head.update = function(){
      //this.roll();
    }
    this.game.add.existing(this.head)
    this.game.input.onDown.add(this.startGame, this);
    this.emitter = game.add.emitter();
    this.emitter.setScale(0.1, .4, 0.1, .4, 2000, Phaser.Easing.Exponential.Out);
    this.emitter.makeParticles('blood1');
    this.emitter.lifespan = 500;
  }

  update(){
    let angle = (this.head.angle + 50) * 0.017453292;
    this.emitter.emitParticle(this.head.x + 60 * Math.cos(angle), this.head.y + 60 * Math.sin(angle));
  }

  startGame() {
    console.log('Starting game state');
    this.state.start('Game');
  }
}
