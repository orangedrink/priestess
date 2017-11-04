import Phaser from 'phaser'

export default {
	flame: {
		asset: 'fire',
		count: 30,
		bowCount: 50,
		damage: 1,
		scale: .5,
	},
	fire: {
		asset: 'fire',
		count: 15,
		bowCount: 17,
		damage: 1,
	},
	inferno: {
		asset: 'fire',
		count: 20,
		bowCount: 35,
		damage: 2,
		scale: 1.5,
	},
	bubble: {
		asset: 'bubble',
		count: 17,
		bowCount: 20,
		damage: 1,
	},
	blood: {
		asset: 'blood',
		count: 100,
		bowCount: 150,
		damage: 1,
		scale: .30
	},
	pebble: {
		asset: 'rock',
		count: 35,
		bowCount: 65,
		damage: 1,
		scale: .25  
	},
	rock: {
		asset: 'rock',
		count: 14,
		bowCount: 16,
		scale: .5,
	},
	boulder: {
		asset: 'rock',
		count: 14,
		bowCount: 16,
		damage: 2,
		scale: 1 
	},
	goo: {
		asset: 'slime',
		count: 9,
		bowCount: 13,
		damage: 1,
		scale: .5  
	},
	slime: {
		asset: 'slime',
		count: 13,
		bowCount: 15,
		damage: 1,
	},
	ectoplasm: {
		asset: 'slime',
		count: 14,
		bowCount: 16,
		damage: 1,
		scale: 2,
	},
	spark: {
		asset: 'spark',
		count: 12,
		bowCount: 14,
		damage: 1,
	},
	shock: {
		asset: 'spark',
		count: 13,
		bowCount: 15,
		damage: 1,
	},
	lightning: {
		asset: 'spark',
		count: 70,
		bowCount: 90,
		damage: 3,
	},
	spirit: {
		asset: 'spirit',
		count: 13,
		bowCount: 15,
		damage: 1,
	},
	ghost: {
		asset: 'spirit',
		count: 10,
		bowCount: 15,
		damage: 1,
	},
}