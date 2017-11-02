import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import Priestess from '../sprites/Priestess'
export default class extends Phaser.State {
  init() { }

  preload() {
    game.load.spritesheet('blue-spark', 'assets/images/spells/blue-spark.png', 64, 64);
    
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

    //sprites
    this.priestess = new Priestess({
      game: this.game,
      x: this.world.centerX / 2,
      y: 0,
      asset: 'priestess'
    })
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
