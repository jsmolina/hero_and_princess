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
    this.camerxas.main.setBackgroundColor(0xFFFFFF);
    this.add.image(300, 500, 'bottom');
    this.add.image(300, 160, 'top');

    const utils = SceneUtils(this.physics);
    this.hero = Hero(utils);
    this.statics = Statics(utils);
    this.enemy = Enemies(utils);
    this.princess = Princess(utils);

    this.base_create();
  }

  _checkTarget() {

  }

}

export default GameScene;
