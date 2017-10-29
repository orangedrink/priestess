/* globals __DEV__ */
import Phaser from 'phaser'
import Head from '../sprites/Head'
import Litter from '../sprites/Litter'
import Pumpkin from '../sprites/Pumpkin'
import Cat from '../sprites/Cat'

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    this.drawGround();

    this.score = 0;
    this.scoreText = this.add.text(10, 50, 'Score: 0');
    this.scoreText.font = 'Nosifer'
    this.scoreText.fontSize = 50
    this.scoreText.fill = '#a00'
    this.scoreText.smoothed = true
    this.scoreText.anchor.setTo(0)

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 1050;

    this.head = new Head({
      game: this.game,
      x: this.world.centerX,
      y: this.world.height * .7,
      asset: 'head'
    })
    this.game.physics.enable(this.head, Phaser.Physics.ARCADE);
    this.head.body.bounce.y = .75;
    this.head.body.collideWorldBounds = true;
    this.head.anchor.setTo(0.5, 0.5);
    this.game.add.existing(this.head)

    this.obstacle = this.createLitter();
    this.game.add.existing(this.obstacle);

    this.emitter = game.add.emitter();
    this.emitter.setScale(0.1, .3, 0.1, .3, 2000, Phaser.Easing.Exponential.Out);
    this.emitter.makeParticles('blood1');
    this.emitter.lifespan = 500;
  }

  update() {
    let angle = (this.head.angle + 50) * 0.017453292;
    this.emitter.emitParticle(this.head.x + 60 * Math.cos(angle), this.head.y + 60 * Math.sin(angle));
    if (this.head.x > this.game.width) {
      game.add.tween(this.startText).to({ alpha: 1 }, 3000, "Linear", true);
    }
    if (this.obstacle.x < 100) {
      this.obstacle = this.createObstacle();
      this.game.add.existing(this.obstacle);
    }
    if (Phaser.Rectangle.intersects(this.head.getBounds(), this.obstacle.getBounds())) this.gameOver();
    if (game.input.activePointer.isDown) {
      this.bounce();
    }
    this.score++;
    this.scoreText.setText(`Score: ${this.score}`);
  }

  bounce() {
    if (this.head.y > this.world.height - (this.head.height * .75)) {
      if (this.head.body.velocity.y > 0) this.head.body.velocity.y = -10;
      this.head.body.velocity.y -= 220;
    }
  }

  drawGround() {
    var graphics = game.add.graphics(0, 0);
    graphics.beginFill(0x00AA00);
    graphics.lineStyle(2, 0x006600, 1);
    graphics.drawRect(0, this.world.height * .9, this.world.width, this.world.height);
  }

  gameOver() {
    console.log("game over")
    //this.state.start('Over');
  }

  createObstacle() {
    if (Math.random() * this.score > 1500) {
      return this.createCat()
    } else if (Math.random() * this.score > 500) {
      return this.createPumpkin()
    } else {
      return this.createLitter()
    }
  }

  createLitter() {
    return new Litter({
      game: this.game,
      x: this.world.width + (100 + (Math.random() * 1800)),
      y: this.world.height - 70,
      asset: 'litter'
    })
  }
  createPumpkin() {
    return new Pumpkin({
      game: this.game,
      x: this.world.width + (1200 + (Math.random() * 800)),
      y: this.world.height - 80,
      asset: 'pumpkin'
    })
  } 
  createCat() {
    return new Cat({
      game: this.game,
      x: this.world.width + (200 + (Math.random() * 300)),
      y: this.world.height - 160,
      asset: 'cat'
    })
  }
}
