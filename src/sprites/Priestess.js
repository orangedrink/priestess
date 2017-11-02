import Phaser from 'phaser'

export default class extends Phaser.Sprite {


	constructor({ game, x, y, asset }) {
		super(game, x, y, asset)

		//Set up anumations
		this.animations.add('walk-right', [144, 145, 146, 147, 148, 149, 150, 151], 16, true);
		this.animations.add('walk-left', [118, 119, 120, 121, 122, 123, 124, 125], 16, true);
		this.animations.add('meditate', [26, 27, 28, 28, 28, 28, 28, 28, 28, 28, 29, 31, 31, 31, 31, 31, 31, 32], 16, true);
		this.animations.add('throw-right', [195, 196, 197, 198, 199, 200, 200], 16, true);
		this.animations.add('throw-left', [169, 170, 171, 172, 173, 174, 174], 16, true);

		//set up physics
		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.bounce.y = 0.2;
		this.body.collideWorldBounds = true;
		this.body.collideWorldBounds = true;

		//set up control keys
		this.cursors = game.input.keyboard.createCursorKeys();
		this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.CONTROL);
		this.magicButton = game.input.keyboard.addKey(Phaser.Keyboard.ALT);
		this.shootButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

		//set up control flags and player data
		this.facing = 'left';
		this.shooting = false;
		this.stoppedShooting = true;
		this.meditating = false;
		this.stoppedMeditating = false;
		this.powerUps = {
			superJump: true,
			magicBow: true
		}
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
			if(this.powerUps.superJump){
				this.body.velocity.y = -590;
			}else{
				this.body.velocity.y = -290;
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
			if (this.stoppedShooting) {
				if (this.facing == 'right') {
					this.animations.play('throw-right', null, false);
				} else if (this.facing == 'left') {
					this.animations.play('throw-left', null, false);
				}
				this.shooting = true;
				this.stoppedShooting = false;
				this.animations.currentAnim.onComplete.add(function () { this.shooting = false; }, this);
			}
		} else {
			this.stoppedShooting = true;
		}

		//handle magic
		if (this.magicButton.isDown) {
			if (!this.isBusy()) {
				this.animations.play('meditate', null, false);
				this.meditating = true;
				this.animations.currentAnim.onComplete.add(function () { this.meditating = false; }, this);
				this.stoppedMeditating = false;
			}
		} else {
			this.stoppedMeditating = true;
		}
	}

	isJumping() {
		return !this.body.onFloor();
	}

	isBusy(){
		return !(this.stoppedShooting && this.stoppedMeditating && !this.isJumping());
	}
}