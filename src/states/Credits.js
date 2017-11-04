import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#000'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Acme']
      },
      active: this.fontsLoaded
    })

    let text = this.add.text(this.world.centerX, this.world.centerY, 'Orangedrink made this.', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
    game.load.spritesheet('spark', 'assets/images/spells/spark.png', 64, 64);
    game.load.spritesheet('spirit', 'assets/images/spells/spirit.png', 64, 64);
    game.load.spritesheet('slime', 'assets/images/spells/slime.png', 64, 64);
    game.load.spritesheet('fire', 'assets/images/spells/fire.png', 64, 64);
    game.load.spritesheet('blood', 'assets/images/spells/blood.png', 64, 64);
    game.load.spritesheet('rock', 'assets/images/spells/rock.png', 64, 64);
    game.load.spritesheet('bubble', 'assets/images/spells/bubble.png', 64, 64);
    game.load.spritesheet('priestess', 'assets/images/priestess.png', 64, 64);
    this.game.load.tilemap('tilemap', 'assets/levels/splash.csv', null, Phaser.Tilemap.CSV);
    this.game.load.tilemap('l1', 'assets/levels/l1.csv', null, Phaser.Tilemap.CSV);
    this.game.load.image('tiles', 'assets/images/tiles.png');
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Splash')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }
}
