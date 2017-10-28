import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import Head from '../sprites/Head'

export default class extends Phaser.State {
  init() { }

  preload() {
    this.load.image('mushroom', 'assets/images/mushroom2.png');
    this.load.image('head', 'assets/images/head.png');
  }

  create() {
    let banner = this.add.text(this.world.centerX, 80, 'HEAD');
    banner.font = 'Nosifer'
    banner.padding.set(10, 16)
    banner.fontSize = 90
    banner.fill = '#d00'
    banner.smoothed = true
    banner.anchor.setTo(0.5)

    let startText = this.add.text(this.world.centerX, this.game.height - 80, 'Click to start');
    startText.inputEnabled = true;
    startText.events.onInputDown.add(this.actionOnClick, this);
    startText.font = 'Nosifer'
    startText.padding.set(10, 16)
    startText.fontSize = 50
    startText.fill = '#d00'
    startText.smoothed = true
    startText.anchor.setTo(0.5)

    this.head = new Head({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'head'
    })
    this.head.update = function(){
      this.roll();
      if(this.x < 1050){
        this.x += 2
      }else{
        this.x = -50
      }
    }
    this.game.add.existing(this.head)
  }
  actionOnClick() {
    console.log('clicked');
    this.state.start('Game');
  }
}
