import Phaser from 'phaser'
export default class extends Phaser.Sprite{
	constructor( game, x, y, asset, timeAlive ) {
		super(game, x, y, asset)
		this.game = game;
		this.checkWorldBounds = true;
		this.events.onOutOfBounds.add(this.die, this);
		this.started = this.game.time.now
		this.timeAlive =  Math.random() *  timeAlive || 200 + timeAlive || 300
	}
	die(_this = this){
		_this.kill()
		_this.destroy()
	}
	update(){
		if(this.game.time.now > this.timeAlive + this.started){
			this.alpha -= .01;
			if(!this.killflag){
				setTimeout(this.die, this.timeAlive, this);
				this.killflag = true 
			}
		}
	}
}
