import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import Priestess from '../sprites/Priestess'
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

    this.priestess = new Priestess({
      game: this.game,
      x: 0,
      y: 100,
      asset: 'priestess'
    })
    this.game.add.existing(this.priestess);
  }

  update(){
  }

  startGame() {
    this.state.start('Game');
  }
}
