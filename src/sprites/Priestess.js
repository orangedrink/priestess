import Phaser from 'phaser'

export default class extends Phaser.Sprite {


	constructor({ game, x, y, asset }) {
		super(game, x, y, asset)

		//Set up anumations
		this.animations.add('walk-right', [143, 144, 145, 146, 147, 148, 149, 150, 151], 10, true);
		this.animations.add('walk-left', [117, 118, 119, 120, 121, 122, 123, 124, 125], 10, true);
		this.animations.add('meditate', [26, 27, 28, 28, 28, 28, 28, 28, 29, 30, 31, 32], 10, true);
		this.animations.add('throw-right', [195, 196, 197, 198, 199, 200], 10, true);
		this.animations.add('throw-left', [169, 170, 171, 172, 173, 174], 10, true);

		//set up physics
		this.facing = 'left';
		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.body.bounce.y = 0.2;
		this.body.collideWorldBounds = true;
		//this.body.setSize(20, 32, 5, 16);
		this.body.collideWorldBounds = true;

		//set up controls
		this.cursors = game.input.keyboard.createCursorKeys();
		this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	}

	update() {
		this.body.velocity.x = 0;

		if (this.cursors.left.isDown) {
			this.body.velocity.x -= 150;

			if (this.facing != 'left') {
				this.animations.play('walk-left');
				this.facing = 'left';
			}
		}
		else if (this.cursors.right.isDown) {
			this.body.velocity.x += 150;

			if (this.facing != 'right') {
				this.animations.play('walk-right', 10, true);
				this.facing = 'right';
			}
		}
		else {
			if (this.facing != 'idle') {
				this.animations.stop();

				if (this.facing == 'left') {
					this.frame = 117;
				}
				else {
					this.frame = 143;
				}
				this.facing = 'idle';
			}
		}

		if (this.jumpButton.isDown) {
			this.animations.play('meditate') ;
		}

	}
}