import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init() { }

  preload() {
    game.load.spritesheet('bunny', 'assets/images/bunny.png', 40, 35);
  }

  create() {
    console.log('Splash screen state')
    this.banner = this.add.text(this.world.centerX, 80, 'Chubby Bunny');
    this.banner.font = 'Passion One'
    this.banner.padding.set(10, 16)
    this.banner.fontSize = 40
    this.banner.fill = '#ddd'
    this.banner.smoothed = true
    this.banner.anchor.setTo(0.5)

    this.bunny = game.add.sprite(0, (Math.random() * (this.world.height - 100) + 100), 'bunny');
    this.walk = this.bunny.animations.add('walk');
    this.bunny.animations.play('walk', 12, true);
  }

  update(){
    this.bunny.x +=1;
    if(this.bunny.x > this.world.width + 10){
      console.log('Bunny reset');
      this.bunny.x = -40;
      this.bunny.y = Math.random() * this.world.height;
    } 
  }

  startGame() {
    this.state.start('Game');
  }
}
