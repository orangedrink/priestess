import Phaser from 'phaser'
import { centerGameObjects } from '../utils'
import Priestess from '../sprites/Priestess'
import Effects from '../classes/Effects.js'
import Spells from '../classes/Spells.js'
export default class extends Phaser.State {
  init() { }

  preload() {
  }

  create() {
    console.log('Splash screen state')

    //world
    this.background = this.game.add.image(0, 0, 'temple-background');
    this.background.fixedToCamera = true;
    this.background.alpha = 0
    game.add.tween(this.background).to({ alpha: 1 }, 9000, Phaser.Easing.Linear.None, true);
    this.music = game.add.audio('stranger');
    this.music.loop = true;
    this.music.play();
    this.screenWidth = this.game.width;
    this.screenHeight = this.game.height;
    this.map = this.game.add.tilemap('splashmap');
    this.groundLayer = this.map.createLayer(0);
    this.map.setCollisionBetween(64, 239);
    this.groundLayer.resizeWorld();
    this.map.addTilesetImage('tiles');
    this.map.setTileIndexCallback(3, this.newGame, this);

    this.book = this.game.add.sprite(225, 260, 'book');
    this.turnPages = this.book.animations.add('turn');
    this.turnPages.play(20, true);


    this.banner = this.add.text(this.screenWidth / 2, 80, 'Priestess');
    this.banner.font = 'acme'
    this.banner.padding.set(10, 16)
    this.banner.fontSize = 60
    this.banner.fill = '#ddd'
    this.banner.smoothed = true
    this.banner.anchor.setTo(0.5)

    let spellKeys = Object.keys(Spells)
    let effectKeys = Object.keys(Effects)


    let combinations = (spellKeys.length * effectKeys.length) * 2;

    let activeEffect = effectKeys[Math.floor(Math.random() * effectKeys.length)]
    let activeSpell = spellKeys[Math.floor(Math.random() * spellKeys.length)]
    let bow = (Math.round(Math.random()) == 1)
    //    activeSpell = 'lightning'
    //    activeEffect = 'tornado'
    //bow = true

    //sprites
    this.priestess = new Priestess({
      game: this.game,
      x: this.screenWidth / 2,
      y: 0,
      asset: 'priestess'
    })
    this.priestess.activeEffect = activeEffect;
    this.priestess.activeSpell = activeSpell;
    this.priestess.powerUps.magicBow = bow;
    this.game.add.existing(this.priestess);
    this.game.camera.follow(this.priestess);

    //physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 650;

    this.story1 = this.add.text(this.screenWidth / 2 +20, this.screenHeight - 225, `As the dawn approaches the priestess awakens from a dream sent by the Goddess. `);
    this.story1.font = 'acme'
    this.story1.padding.set(10, 16)
    this.story1.fontSize = 18
    this.story1.fill = '#ddd'
    this.story1.smoothed = true
    this.story1.anchor.setTo(0.5)

    this.story2 = this.add.text(this.screenWidth / 2 +20, this.screenHeight - 200, `A dark force rises in the east. You must gather power and stop this evil entity.`);
    this.story2.font = 'acme'
    this.story2.padding.set(10, 16)
    this.story2.fontSize = 18
    this.story2.fill = '#ddd'
    this.story2.smoothed = true
    this.story2.anchor.setTo(0.5)

    //this.instructions = this.add.text(this.screenWidth / 2, this.screenHeight - 100, `Generating a random power  from ${combinations} possible combinations: ${activeSpell} ${activeEffect} `);
    this.instructions = this.add.text(this.screenWidth / 2 +20, this.screenHeight - 135, `Walk left to load a saved game. Walk right to start a new game.`);
    this.instructions.font = 'acme'
    this.instructions.padding.set(10, 16)
    this.instructions.fontSize = 20
    this.instructions.fill = '#ddd'
    this.instructions.smoothed = true
    this.instructions.anchor.setTo(0.5)
  }

  update() {
    this.game.physics.arcade.collide(this.priestess, this.groundLayer);
    if (this.priestess.y > 1660) {
      this.state.start('Splash');
    }
    if (this.priestess.x < 260) {
      this.loadGame();
    }
  }

  loadGame(){
    this.fadeOut = game.add.tween(game.world).to({ alpha: 0 }, 100, Phaser.Easing.Linear.None, true);
    this.music.fadeOut(100);
    this.fadeOut.onComplete.add(function () {
      this.game.state.states['Level'].levelData = localStorage.getItem("levelData") ||  'assets/levels/index.json';
      this.game.state.states['Level'].levelIndex = localStorage.getItem("levelIndex") || 0;
      this.state.start('Level');
    }, this);
  }

  newGame() {
    localStorage.clear();
    this.fadeOut = game.add.tween(game.world).to({ alpha: 0 }, 100, Phaser.Easing.Linear.None, true);
    this.music.fadeOut(100);
    this.fadeOut.onComplete.add(function () {
      this.game.state.states['Level'].levelData = 'assets/levels/index.json';
      this.game.state.states['Level'].levelIndex = 0;
      this.state.start('Level');
    }, this);
  }
}
