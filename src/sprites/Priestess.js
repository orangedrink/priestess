import Phaser from 'phaser'
import Effects from '../classes/Effects.js'
import Spells from '../classes/Spells.js'
export default class extends Phaser.Sprite {


	constructor({ game, x, y, asset }) {
		super(game, x, y, asset)

		//Set up animations
		this.animations.add('walk-right', [144, 145, 146, 147, 148, 149, 150, 151], 30, true);
		this.animations.add('walk-left', [118, 119, 120, 121, 122, 123, 124, 125], 30, true);
		this.animations.add('meditate', [26, 27, 28, 28, 28, 28, 28, 28, 28, 28, 29, 31, 31, 31, 31, 31, 31, 32], 30, true);
		this.animations.add('throw-right', [195, 196, 197, 198, 199, 199, 200, 200], 30, true);
		this.animations.add('throw-left', [169, 170, 171, 172, 173, 173, 174, 174], 30, true);
		this.animations.add('shoot-right', [247, 249, 252, 253, 255], 40, true);
		this.animations.add('shoot-left', [221, 223, 226, 227, 229], 40, true);

		//set up physics
		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.bounce.y = 0.2;
		this.body.collideWorldBounds = true;
		this.anchor.setTo(0.25, 0);
		
		//set up control keys
		this.cursors = game.input.keyboard.createCursorKeys();
		this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
		this.magicButton = game.input.keyboard.addKey(Phaser.Keyboard.ALT);
		this.shootButton = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);

		//set up control flags and player data
		this.facing = 'left';
		this.shooting = false;
		this.stoppedShooting = true;
		this.meditating = false;
		this.stoppedMeditating = false;
		this.powerUps = {}
		this.health = 25;
		this.activeSpell = 'air';
		this.activeEffect = 'wave';
		this.bowActive = false;
		this.availableSpells = ['air'];
		this.availableEffects = ['wave'];
	}

	update() {
		this.body.velocity.x = 0;

		//handle movement
		if (!this.meditating) {
			if (this.cursors.left.isDown) {
				this.body.velocity.x -= 150;
			}
			else if (this.cursors.right.isDown) {
				this.body.velocity.x += 150;
			}
		}

		//walking animations
		if (!this.shooting && !this.meditating) {
			if (this.cursors.left.isDown) {
				if (this.facing != 'left' || !this.animations.play('walk-left').isPlaying) {
					this.animations.play('walk-left');
					this.facing = 'left';
				}
			}
			else if (this.cursors.right.isDown) {
				if (this.facing != 'right' || !this.animations.play('walk-right').isPlaying) {
					this.animations.play('walk-right', null, true);
					this.facing = 'right';
				}
			}
			if (this.body.velocity.x == 0 && !this.shooting) {
				this.animations.stop();

				if (this.facing == 'left') {
					this.frame = 117;
				}
				else {
					this.frame = 143;
				}
			}
		}

		//handle jumping
		if (this.jumpButton.isDown && !this.isBusy()) {
			if (this.powerUps.superJump) {
				this.body.velocity.y = -550;
			} else {
				this.body.velocity.y = -390;
			}
		} else if (this.isJumping() && !this.shooting) {
			if (this.facing == 'right') {
				if (this.body.velocity.y < 0) {
					this.frame = 43;
				} else {
					this.frame = 44;
				}
			} else if (this.facing == 'left') {
				if (this.body.velocity.y < 0) {
					this.frame = 17;
				} else {
					this.frame = 18;
				}
			}
		}

		//handle shooting
		if (this.shootButton.isDown) {
			let animPrefix = this.bowActive ? 'shoot' : 'throw';
			let anim
			if (this.stoppedShooting && !this.shooting) {
				if (this.facing == 'right') {
					anim = this.animations.play(`${animPrefix}-right`, null, false);
				} else if (this.facing == 'left') {
					anim = this.animations.play(`${animPrefix}-left`, null, false);
				}
				this.shooting = true;
				this.stoppedShooting = false;
				if (anim.onComplete._bindings == null) {
					this.animations.currentAnim.onComplete.add(function () {
						this.shooting = false;
						//this.shoot(); 
					}, this);
				}
				setTimeout(this.shoot, 60, this, this.facing);
			}
		} else {
			this.stoppedShooting = true;
		}

		//handle magic
		if (this.magicButton.isDown) {
			if (!this.isBusy()) {
				let anim = this.animations.play('meditate', null, false);
				this.meditating = true;
				this.animations.killOnComplete = true;
				if (anim.onComplete._bindings == null) {
					anim.onComplete.add(function () {
						this.meditating = false;
						//this.magic();
					}, this);
				}
				this.stoppedMeditating = false;
				this.magic()
			}
		} else {
			this.stoppedMeditating = true;
		}
	}

	shoot(_this, facing) {
		let shots = (_this.bowActive ? Spells[_this.activeSpell].bowCount :  Math.random() * Spells[_this.activeSpell].count )
		for (let i = 0; i < shots + 4; i++) {
			let EffectsSprite = Effects[_this.activeEffect];
			let effectSprite = new EffectsSprite({
				game: _this.game,
				x: _this.x +  Math.random() * 32,
				y: _this.y + 32,
				asset: Spells[_this.activeSpell].asset,
				facing: facing,
				powerUps: _this.powerUps,
				spell: Spells[_this.activeSpell]
			})
			effectSprite.frame = Math.random() * 3;
			effectSprite.powerUps = _this.powerUps;
			effectSprite.tint = Spells[_this.activeSpell].tint || 0xffffff
			effectSprite.spell = Spells[_this.activeSpell].asset
 			effectSprite.scale.setTo(Spells[_this.activeSpell].scale || 1)
			if (facing == 'right') {
				effectSprite.body.velocity.x = _this.bowActive ? effectSprite.speed * 8 : effectSprite.speed;
			} else {
				effectSprite.body.velocity.x = _this.bowActive ? 0 - effectSprite.speed * 8 : 0 - effectSprite.speed;
			}
			effectSprite.body.velocity.y = _this.bowActive ? (effectSprite.arc) / 2 + Math.random() * (effectSprite.accuracy * .75): effectSprite.arc + Math.random() * (effectSprite.accuracy * 2);
			_this.game.add.existing(effectSprite);
		}
	}

	magic() {
		let shots = Math.random() * 5 + 3
		for (let i = 0; i < shots; i++) {
			let direction = (Math.random() >= .5 ? 'left' : 'right')
			let delay = (Math.random() * 200) + 300;
			setTimeout(this.shoot, delay, this, direction);
		}
	}

	isJumping() {
		return !this.body.onFloor();
	}

	isBusy() {
		return !((this.stoppedShooting && !this.shooting) && (this.stoppedMeditating && !this.meditating) && !this.isJumping());
	}
}