import PointerBase from "./PointerBase";
import Hero from "./objects/Hero";
import SceneUtils from "./SceneUtils";
import Statics from "./objects/Statics";
import Enemies from "./objects/Enemies";
import Princess from "./objects/Princess";

class GameScene extends PointerBase {

  constructor() {
    super("scene-game");
  }

  create() {
    this.reseted = false;
    this.text = null;
    this.cameras.main.setBackgroundColor(0xFFFFFF);
    this.add.image(300, 500, 'bottom');
    this.add.image(300, 160, 'top');

    const utils = SceneUtils(this.physics);
    this.hero = new Hero();
    this.hero.create(utils);

    this.enemy = new Enemies();
    this.enemy.create(utils);

    this.statics = new Statics();
    this.statics.create(utils);

    this.princess = new Princess();
    this.princess.create(utils);

    this.hero.start();

    this.base_create();

    // Create a helper object for our arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();
    this.enterKey = this.input.keyboard.addKeys('ENTER')
  }

  update(time, delta) {
    super.update(time, delta);

    if (this.cursors.shift.isDown) {
      console.log("Reset pressed");
      if (!this.reseted) {
        this.hero.reset();
        this.enemy.reset();
        this.statics.reset();
        this.princess.reset();
        this.reseted = true;
        setTimeout(() => {
          this.hero.start();
          this.princess.start();
          this.enemy.start();
          this.statics.start();
          this.reseted = false;
        }, 2000);
      }
    }
  }

  _checkTarget() {

  }

}

export default GameScene;
