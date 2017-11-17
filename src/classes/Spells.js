import Phaser from 'phaser'

export default {
	air: {
		asset: 'spirit',
		count: 38,
		bowCount: 25,
		damage: 1,
		scale: .5
	},
	flame: {
		asset: 'fire',
		count: 30,
		bowCount: 50,
		damage: 1,
		scale: .75,
	},
	pebble: {
		asset: 'rock',
		count: 35,
		bowCount: 65,
		damage: 1,
		scale: .25  
	},
	fire: {
		name:'fire',
		asset: 'fire',
		count: 60,
		bowCount: 80,
		damage: 1,
	},
	bubble: {
		asset: 'bubble',
		count: 30,
		bowCount: 40,
		damage: 1,
		scale: .5,
	},
	inferno: {
		asset: 'fire',
		count: 100,
		bowCount: 120,
		damage: 2,
		scale: 1,
	},
	orb: {
		asset: 'bubble',
		count: 20,
		bowCount: 30,
		damage: 1,
		scale: 1,
		tint: 0xf02020,
	},
	blood: {
		asset: 'blood',
		count: 100,
		bowCount: 150,
		damage: 1,
		scale: .30
	},
	bile: {
		asset: 'blood',
		count: 20,
		bowCount: 30,
		damage: 1,
		scale: 1,
		tint: 0x50faaa
	},
	rock: {
		asset: 'rock',
		count: 14,
		bowCount: 16,
		scale: .75,
	},
	stone: {
		asset: 'rock',
		count: 14,
		bowCount: 16,
		damage: 2,
		scale: 1 
	},
	boulder: {
		asset: 'rock',
		count: 14,
		bowCount: 16,
		damage: 2,
		scale: 1.25 
	},
	goo: {
		asset: 'slime',
		count: 13,
		bowCount: 15,
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
		count: 50,
		bowCount: 80,
		damage: 1,
		scale: 1,
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
		name: 'lightning',
		asset: 'spark',
		count: 90,
		bowCount: 110,
		damage: 3,
	},
	wind: {
		asset: 'spirit',
		count: 13,
		bowCount: 15,
		damage: 1,
	},
	cloud: {
		asset: 'spirit',
		count: 15,
		bowCount: 20,
		damage: 1,
		scale: 1.5
	},
}