import Phaser from 'phaser'
import Effect from './EffectClass.js'
export default {
	wave: class Wave extends Effect {
		constructor({ game, x, y, asset }) {
			super(game, x, y, asset)
			this.anchor.setTo(0.5)
			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.body.bounce.y = 0.2;
			//this.body.gravity.y = -1000
			this.speed = 600;
			this.arc = -300
			this.accuracy = 75;
			this.animations.add('bubble');
			this.animations.play('bubble', 30, true);
			this.powerUps = {};
			this.alpha = 1;
		}

		update() {
			super.update()
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
	toss: class Toss extends Effect {
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
			super.update()
			this.angle += this.rollSpeed;
		}
	},
	rain: class Rain extends Effect {
		constructor({ game, x, y, asset }) {
			super(game, x, y, asset, 2000)
			this.anchor.setTo(0.5)
			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.body.bounce.y = 0.2;
			this.body.gravity.y += 900
			this.speed = 200;
			this.arc = -300
			this.accuracy = 75;
			this.animations.add('rain');
			this.animations.play('rain', 30, true);
			this.y -= Math.random() * 200;
			this.powerUps = {};
			this.alpha = 0;
			this.game.add.tween(this).to({ alpha: 1 }, 50, "Linear", true);
		}

		update() {
			super.update()
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
	bubble: class Bubble extends Effect {
		constructor({ game, x, y, asset }) {
			super(game, x, y, asset, 500)
			this.anchor.setTo(0.5)
			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.body.bounce.y = 0.2;
			this.body.gravity.y = -1000
			this.speed = 200;
			this.arc = -300
			this.accuracy = 75;
			this.animations.add('bubble');
			this.animations.play('bubble', 30, true);
			this.powerUps = {};
		}

		update() {
			super.update()
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
	storm: class Storme extends Effect {
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
			this.powerUps = {};
		}

		update() {
			super.update()
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
	spray: class Spray extends Effect {
		constructor({ game, x, y, asset, facing }) {
			super(game, x, y, asset)
			this.anchor.setTo(0.5)
			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.body.bounce.y = 0.2;
			this.body.gravity.y = (500 - (Math.random() * 500)) * 4
			if (facing == 'right') {
				this.body.gravity.x = (Math.random() * 1000) * 3
			} else {
				this.body.gravity.x = 0 - (Math.random() * 1000) * 3
			}
			this.speed = 200;
			this.arc = -400
			this.accuracy = 75;
			this.animations.add('spray');
			this.animations.play('spray', 30, true);
			this.powerUps = {};
		}

		update() {
			super.update()
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
	tornado: class Tornado extends Effect {
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
			this.powerUps = {};
		}

		update() {
			super.update()
			if (this.body.velocity.x > 100) {
				this.body.velocity.x = 100;
			}
			if (this.body.velocity.x < -100) {
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
	wall: class Wall extends Effect {
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
			super.update()
			if (this.body.velocity.x > 300) {
				this.body.velocity.x = 300;
			}
			if (this.body.velocity.x < -300) {
				this.body.velocity.x = -300;
			}

			this.body.gravity.y = (500 - (Math.random() * 1000)) * 30

			if (this.powerUps.magicBow) {
			}
			else {
			}
		}
	},
	stream: class Stream extends Effect {
		constructor({ game, x, y, asset }) {
			super(game, x, y, asset, 300)
			this.anchor.setTo(0.5)
			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.body.bounce.y = 0.2;
			this.body.gravity.x = (2000 - (Math.random() * 4000)) * 4
			this.speed = 200;
			this.arc = -300
			this.accuracy = 75;
			this.animations.add('stream');
			this.animations.play('stream', 30, true);
			this.x += Math.random() * 50;
			this.powerUps = {};
		}

		update() {
			super.update()
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
	surge: class Surge extends Effect {
		constructor({ game, x, y, asset, facing }) {
			super(game, x, y, asset)
			this.anchor.setTo(0.5)
			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.body.bounce.y = 0.2;
			//this.body.gravity.x = (2000 - (Math.random() * 4000)) * 2
			this.body.gravity.y = (0 - (Math.random() * 100))
			this.speed = 20;
			this.arc = -300
			this.accuracy = 75;
			this.animations.add('surge');
			this.animations.play('surge', 30, true);
			this.x += Math.random() * 50;
			this.powerUps = {};
			this.facing = facing
		}

		update() {
			super.update()
			this.body.gravity.y -= Math.random() * 60
			if (this.facing == "right") {
				this.body.gravity.x += Math.random() * 600
			} else {
				this.body.gravity.x -= Math.random() * 600
			}
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
	field: class Surge extends Effect {
		constructor({ game, x, y, asset, facing, powerUps }) {
			super(game, x, y, asset)
			this.anchor.setTo(0.5)
			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.body.gravity.y = -600
			this.speed = 200;
			this.arc = -300
			this.accuracy = 75;
			this.animations.add('rain');
			this.animations.play('rain', 30, true);
			this.y -= Math.random() * 100;
			let bowMultiplier = powerUps.magicBow ? 5 : 3
			if (facing == 'right') {
				this.x += (Math.random() * 100) * bowMultiplier
			} else {
				this.x -= (Math.random() * 100) * bowMultiplier
			}
		}

		update() {
			super.update()
			this.body.velocity.x -= Math.random() * (this.body.velocity.x * 2);
			this.body.velocity.y -= Math.random() * (this.body.velocity.y * 2);
			if (this.powerUps.magicBow) {
			}
			else {
			}
		}
	},
	swarm: class Surge extends Effect {
		constructor({ game, x, y, asset, facing }) {
			super(game, x, y, asset, 800)
			this.anchor.setTo(0.5)
			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.body.bounce.y = 0.2;
			this.body.gravity.y = -650
			this.speed = 10;
			this.arc = 0
			this.accuracy = 75;
			this.animations.add('surge');
			this.animations.play('surge', 30, true);
			this.x += Math.random() * 50;
			this.powerUps = {};
			this.facing = facing;
		}

		update() {
			super.update()
			if (this.facing == "right") {
				this.body.gravity.x += Math.random() * 6 + 50
			} else {
				this.body.gravity.x -= Math.random() * 6 + 50
			}
			if (this.powerUps.magicBow) {
			}
			else {
			}
		}
	},
	bolt: class Surge extends Effect {
		constructor({ game, x, y, asset, facing, spell }) {
			super(game, x, y, asset)
			this.anchor.setTo(0.5)
			game.physics.enable(this, Phaser.Physics.ARCADE);
			this.body.bounce.y = 0.2;
			this.body.gravity.y = (Math.random() * 100) * 100
			this.speed = 10;
			this.arc = 0
			this.accuracy = 75;
			this.animations.add('surge');
			this.animations.play('surge', 30, true);
			this.y -= (Math.random() * 50) + 200;
			if (facing == "right") {
				this.x += 100;
			} else {
				this.x -= 100;
			}
			this.facing = facing;
			this.powerUps = {};
			if (spell.name == 'lightning' || spell.name == 'fire') {
				this.body.gravity.y += 2000
				if (spell.name == 'lightning' && Math.random() *  65 < 1) {
					this.lightning = game.add.sprite(this.x, this.y + 150, 'lightning');
					this.lightning.anchor.setTo(0.5, 0.5);
					this.lightning.alpha = .5
					this.anim = this.lightning.animations.add('strike');
					this.anim.play(20, true);
					this.game.add.tween(this.lightning).to( { alpha: 0 }, 500, Phaser.Easing.Linear.None, true );
				}
				if (facing == "right") {
					this.body.gravity.x += 2000;
				} else {
					this.body.gravity.x -= 2000;
				}
			}
		}

		update() {
			super.update()
			if (this.facing == "right") {
			} else {
			}
			if (this.powerUps.magicBow) {
			}
			else {
			}
		}
	},
}