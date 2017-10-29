import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import Head from '../sprites/Head'

export default class extends Phaser.State {
  init() { }

  preload() {
    this.load.image('mushroom', 'assets/images/mushroom2.png');
    this.load.image('litter', 'assets/images/litter.png');
    this.load.image('pumpkin', 'assets/images/pumpkin.png');
    this.load.image('cat', 'assets/images/cat.png');
    this.load.image('background', 'assets/images/background.jpg');
  }

  create() {
    console.log('Splash screen state')
    this.banner = this.add.text(this.world.centerX, 80, 'HEAD');
    this.banner.font = 'Nosifer'
    this.banner.padding.set(10, 16)
    this.banner.fontSize = 90
    this.banner.fill = '#900'
    this.banner.smoothed = true
    this.banner.anchor.setTo(0.5)

    this.startText = this.add.text(this.world.centerX, this.game.height - 80, 'Click to start');
    this.startText.inputEnabled = true;
    this.startText.font = 'Arvo'
    this.startText.fontSize = 50
    this.startText.fill = '#999'
    this.startText.smoothed = true
    this.startText.alpha = 0;
    this.startText.anchor.setTo(0.5)

    this.instructionsText = this.add.text(this.world.centerX, this.game.height - 150, 'You still have one last roll. Bounce to avoid the obstacles.');5
    this.instructionsText.inputEnabled = true;
    this.instructionsText.font = 'Arvo'
    this.instructionsText.fontSize = 30
    this.instructionsText.fill = '#999'
    this.instructionsText.smoothed = true
    this.instructionsText.anchor.setTo(0.5)

    this.head = new Head({
      game: this.game,
      x: -100,
      y: this.world.centerY,
      asset: 'head'
    })
    this.head.anchor.setTo(0.5, 0.5);
    this.head.update = function(){
      this.roll();
      if(this.x < (this.game.world.width + 200)){
        this.x += 3
      }else{
        this.x = -50
      }
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
    if(this.head.x > this.game.width){
      game.add.tween(this.startText).to( { alpha: 1 }, 3000, "Linear", true);
    }
  }

  startGame() {
    this.state.start('Game');
  }
}
