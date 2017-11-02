import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init() { }

  preload() {
  }

  create() {
    console.log('Game over state')
  }

  update(){}

  startGame() {
    this.state.start('Game');
  }
}
