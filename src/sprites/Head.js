import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
  }
  roll(){
    this.angle += 4.5
  }

  update () {
    this.roll();
  }
}
