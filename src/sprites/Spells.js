import Phaser from 'phaser'

export default {
	throw: class Throw extends Phaser.Sprite {
		constructor({ game, x, y, asset }) {
			super(game, x, y, asset)
			this.anchor.setTo(0.5)
			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.body.bounce.y = 0.2;
			this.speed = 200;
			this.arc = -300
			this.accuracy = 75;
			this.rollSpeed = Math.random() * 5 + 2
			this.animations.add('throw');
			this.animations.play('throw', 30, true);
			this.powerUps = {};
		}

		update() {
			this.angle += this.rollSpeed;
		}
	},
	rain: class Rain extends Phaser.Sprite {
		constructor({ game, x, y, asset }) {
			super(game, x, y, asset)
			this.anchor.setTo(0.5)
			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.body.bounce.y = 0.2;
			this.speed = 200;
			this.arc = -300
			this.accuracy = 75;
			this.animations.add('rain');
			this.animations.play('rain', 30, true);
			this.y -= Math.random() * 200;
			this.powerUps = {};
			this.alpha = 0;
		}

		update() {
			this.alpha += .15;
			this.body.velocity.y -= 1;
			if (this.powerUps.magicBow) {
				this.x += this.body.velocity.x * .05;
				this.body.velocity.x -= Math.random() * (this.body.velocity.x * 2);
			 }
			else {
				this.x += this.body.velocity.x * .35;
				this.body.velocity.x -= Math.random() * (this.body.velocity.x * 2);
			}
		}
	},
	wave: class Wave extends Phaser.Sprite {
		constructor({ game, x, y, asset }) {
			super(game, x, y, asset)
			this.anchor.setTo(0.5)
			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.body.bounce.y = 0.2;
			//this.body.gravity = -100;
			this.speed = 200;
			this.arc = -300
			this.accuracy = 75;
			this.animations.add('wave');
			this.animations.play('wave', 30, true);
			this.y += Math.random() * 20;
			this.powerUps = {};
			this.alpha = 0;
		}

		update() {
			this.alpha += .15;
			if (this.powerUps.magicBow) {
				this.body.velocity.y -= 1;
				this.x += this.body.velocity.x * .05;
				this.body.velocity.x -= Math.random() * (this.body.velocity.x * 2);
			 }
			else {
				this.body.velocity.y += 3;
				this.x += this.body.velocity.x * .35;
				this.body.velocity.x -= Math.random() * (this.body.velocity.x * 2);
			}
		}
	},
}