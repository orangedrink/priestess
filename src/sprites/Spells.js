import Phaser from 'phaser'

export default {
	spark: class Spark extends Phaser.Sprite {
		constructor({ game, x, y, asset }) {
			super(game, x, y, asset)
			this.anchor.setTo(0.5)
			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.body.bounce.y = 0.2;
			this.speed = 200;
			this.arc = -300
			this.accuracy = 75;
			this.rollSpeed = Math.random() * 25 + 10
 		}

		update() {
			this.angle += this.rollSpeed;
		}
	}
}