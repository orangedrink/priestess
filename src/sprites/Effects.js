import Phaser from 'phaser'

export default {
	toss: class Toss extends Phaser.Sprite {
		constructor({ game, x, y, asset }) {
			super(game, x, y, asset)
			this.anchor.setTo(0.5)
			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.body.bounce.y = 0.2;
			this.speed = 200;
			this.arc = -300
			this.accuracy = 75;
			this.rollSpeed = Math.random() * 5 + 2
			this.animations.add('toss');
			this.animations.play('toss', 30, true);
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
			this.alpha += .25;
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
	bubble: class Bubble extends Phaser.Sprite {
		constructor({ game, x, y, asset }) {
			super(game, x, y, asset)
			this.anchor.setTo(0.5)
			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.body.bounce.y = 0.2;
			this.body.gravity.y = -1000
			this.speed = 200;
			this.arc = -300
			this.accuracy = 75;
			this.animations.add('bubble');
			this.animations.play('bubble', 30, true);
			this.x += Math.random() * 50;
			this.powerUps = {};
			this.alpha = 1;
		}

		update() {
			this.alpha -= .1;
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
	storm: class Storme extends Phaser.Sprite {
		constructor({ game, x, y, asset }) {
			super(game, x, y, asset)
			this.anchor.setTo(0.5)
			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.body.bounce.y = 0.2;
			this.body.gravity.x = (2000 - (Math.random() * 4000)) * 4
			this.body.gravity.y = (2000 - (Math.random() * 4000)) * 4
			this.speed = 200;
			this.arc = -300
			this.accuracy = 75;
			this.animations.add('storm');
			this.animations.play('storm', 30, true);
			this.x += Math.random() * 50;
			this.powerUps = {};
			this.alpha = 1;
		}

		update() {
			this.alpha -= .1;
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
	spray: class Spray extends Phaser.Sprite {
		constructor({ game, x, y, asset }) {
			super(game, x, y, asset)
			this.anchor.setTo(0.5)
			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.body.bounce.y = 0.2;
			this.body.gravity.x = (500 - (Math.random() * 1000)) * 2
			this.body.gravity.y = (500 - (Math.random() * 1000)) * 3
			this.speed = 200;
			this.arc = -300
			this.accuracy = 75;
			this.animations.add('spray');
			this.animations.play('spray', 30, true);
			this.x += Math.random() * 50;
			this.powerUps = {};
		}

		update() {
			if (this.powerUps.magicBow) {
			}
			else {
				if (Math.abs(this.body.velocity.x) > 20) {
					this.x += this.body.velocity.x * .35;
					this.body.velocity.x -= Math.random() * (this.body.velocity.x);
				}
			}
		}
	},
	tornado: class Tornado extends Phaser.Sprite {
		constructor({ game, x, y, asset }) {
			super(game, x, y, asset)
			this.anchor.setTo(0.5)
			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.body.bounce.y = 0.2;
			this.speed = 200;
			this.arc = -300
			this.accuracy = 75;
			this.animations.add('tornado');
			this.animations.play('tornado', 30, true);
			this.x += Math.random() * 50;
			this.powerUps = {};
		}

		update() {
			if(this.body.velocity.x > 100){
				this.body.velocity.x = 100;
			}
			if(this.body.velocity.x < -100){
				this.body.velocity.x = -100;
			}
			
			this.body.gravity.x = (500 - (Math.random() * 1000)) * 10
			this.body.gravity.y = (500 - (Math.random() * 1000)) * 30

			if (this.powerUps.magicBow) {
			}
			else {
			}
		}
	},
	wall: class Wall extends Phaser.Sprite {
		constructor({ game, x, y, asset }) {
			super(game, x, y, asset)
			this.anchor.setTo(0.5)
			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.body.bounce.y = 0.2;
			this.speed = 200;
			this.arc = -300
			this.accuracy = 75;
			this.animations.add('wall');
			this.animations.play('wall', 30, true);
			this.y += Math.random() * 50;
			this.powerUps = {};
		}

		update() {
			if(this.body.velocity.x > 300){
				this.body.velocity.x = 300;
			}
			if(this.body.velocity.x < -300){
				this.body.velocity.x = -300;
			}
			
			this.body.gravity.y = (500 - (Math.random() * 1000)) * 30

			if (this.powerUps.magicBow) {
			}
			else {
			}
		}
	},
}