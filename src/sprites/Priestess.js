import Phaser from 'phaser'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
	this.animations.add('right', [143, 144, 145, 146, 147, 148, 149, 150], 10, true);
  }
  init(){
	  console.log('init')
  }
  update() {
	  this.x +=1;
	  this.animations.play('right', 16, true);
	  
  }
}