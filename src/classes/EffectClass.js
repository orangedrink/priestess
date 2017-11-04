import Phaser from 'phaser'
export default class extends Phaser.Sprite {
	constructor(game, x, y, asset, timeAlive) {
		super(game, x, y, asset)
		this.game = game;
		this.checkWorldBounds = true;
		this.events.onOutOfBounds.add(this.die, this);
		this.started = this.game.time.now
		timeAlive = timeAlive * .5
		this.timeAlive = Math.random() * timeAlive || 200 + timeAlive || 300
	}
	die(_this = this) {
		_this.kill()
		_this.destroy()
	}
	update() {
		if (this.game.time.now > this.timeAlive + this.started && !this.killflag) {

			this.game.add.tween(this).to({ alpha: 0 }, 200, "Linear", true);
			setTimeout(this.die, 500, this);
			this.killflag = true
		}
	}
}
