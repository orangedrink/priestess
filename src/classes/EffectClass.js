import Phaser from 'phaser'
export default class extends Phaser.Sprite{
	constructor( game, x, y, asset ) {
		super(game, x, y, asset)
		this.game = game;
		this.checkWorldBounds = true;
		this.events.onOutOfBounds.add(this.die, this);
	}
	die(){
		this.kill()
		this.destroy()
	}
	update(){
	}
}
