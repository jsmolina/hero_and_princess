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
  }

  _checkTarget() {

  }

}

export default GameScene;
