import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import Head from '../sprites/Head'

export default class extends Phaser.State {
  init() { }

  preload() {
    this.load.image('mushroom', 'assets/images/mushroom2.png');
    this.load.image('head', 'assets/images/head.png');
    this.load.image('blood1', 'assets/images/blood-drop1.png');
  }

  create() {
    let banner = this.add.text(this.world.centerX, 80, 'HEAD');
    banner.font = 'Nosifer'
    banner.padding.set(10, 16)
    banner.fontSize = 90
    banner.fill = '#e00'
    banner.smoothed = true
    banner.anchor.setTo(0.5)

    let startText = this.add.text(this.world.centerX, this.game.height - 80, 'Click to start');
    startText.inputEnabled = true;
    startText.events.onInputDown.add(this.actionOnClick, this);
    startText.font = 'Griffy'
    startText.padding.set(10, 16)
    startText.fontSize = 50
    startText.fill = '#a00'
    startText.smoothed = true
    startText.anchor.setTo(0.5)

    this.head = new Head({
      game: this.game,
      x: -100,
      y: this.world.centerY,
      asset: 'head'
    })
    this.head.anchor.setTo(0.5, 0.5);
    this.head.update = function(){
      this.roll();
      if(this.x < 1050){
        this.x += 2
      }else{
        this.x = -50
      }
    }
    this.game.add.existing(this.head)
    this.emitter = game.add.emitter();
    this.emitter.setScale(0.1, .25, 0.1, .25, 2000, Phaser.Easing.Exponential.Out);
    this.emitter.makeParticles('blood1');
    this.emitter.lifespan = 500;
    emitter.emitX = 0;
    
  }

  update(){
    let angle = (this.head.angle + 50) * 0.017453292;
    this.emitter.emitParticle(this.head.x + 60 * Math.cos(angle), this.head.y + 60 * Math.sin(angle));
  }

  actionOnClick() {
    console.log('clicked');
    this.state.start('Game');
  }
}
