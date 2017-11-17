import Effects from '../classes/Effects.js'
import Spells from '../classes/Spells.js'

export default {
	init: function (state) {
		this.menu = document.getElementById('menu');
		if (this.menu.style.display === 'none') {
			this.menu.style.display = "block"
			let health = document.getElementById('health');
			health.value = state.priestess.health
			let bowMenu = document.getElementById('magicbow');
			if (state.priestess.powerUps.magicBow) {
				bowMenu.style.display = "inline"
				bowMenu.checked = state.priestess.bowActive
				console.log(state.priestess.bowActive)
				console.log(bowMenu.checked)
			}
			bowMenu.onchange = function () {
				state.priestess.bowActive = this.checked
			}
			let spellMenu = document.getElementById('spell');
			spellMenu.onchange = function () {
				state.priestess.activeSpell = this.options[this.selectedIndex].value
			}
			state.priestess.availableSpells.forEach(function (spell) {
				let option = document.createElement("option");
				option.text = spell;
				option.value = spell;
				if (spell === state.priestess.activeSpell) {
					option.selected = true;
				}
				spellMenu.add(option);
			});

			let effectMenu = document.getElementById('effect');
			effectMenu.onchange = function () {
				state.priestess.activeEffect = this.options[this.selectedIndex].value
			}
			state.priestess.availableEffects.forEach(function (effect) {
				let option = document.createElement("option");
				option.text = effect;
				option.value = effect;
				if (effect === state.priestess.activeEffect) {
					option.selected = true;
				}
				effectMenu.add(option);
			});
		}
	},
	addSpell: function (spell) {
		let spellMenu = document.getElementById('spell');
		let option = document.createElement("option");
		option.text = spell;
		option.value = spell;
		spellMenu.add(option);
		this.flashMessage(`${spell} spell added.`)
	},
	addEffect: function (effect) {
		let effectMenu = document.getElementById('effect');
		let option = document.createElement("option");
		option.text = effect;
		option.value = effect;
		effectMenu.add(option);
		this.flashMessage(`${effect} effect added.`)
	},
	showBow: function(){
		let bowMenu = document.getElementById('magicbow');
		bowMenu.style.display = "inline"
		this.flashMessage('Magic amulet obtained')
	},
	flashMessage: function (message) {
		console.log(message)
		let flashMessage = document.getElementById('flashMessage');
		flashMessage.innerHTML = message
		setTimeout(function(flashMessage){
			flashMessage.innerHTML = ''
		}, 3000, flashMessage)
	},
	setHealth: function (hp) {
		let health = document.getElementById('health');
		health.value = hp
	}
}