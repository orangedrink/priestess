import Phaser from 'phaser'
export default class extends Phaser.Sprite{
	constructor( game, x, y, asset ) {
		super(game, x, y, asset)
		this.game = game;
		this.checkWorldBounds = true;
		this.events.onOutOfBounds.add(this.die, this);
		this.timeAlive = Math.random() * 200 + 300
	}
	die(_this = this){
		_this.kill()
		_this.destroy()
	}
	update(){
		if(this.game.time.now > this.timeAlive + this.started){
			this.alpha -= .01;
			if(!this.killflag){
				setTimeout(this.die, 500, this);
				this.killflag = true 
			}
		}
	}
}
