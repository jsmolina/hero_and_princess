import {Math as pMath} from 'phaser';
import PointerBase from "./PointerBase";


class GameScene extends PointerBase {

  constructor() {
    super("scene-game");
  }

  addHeroTo(x, y, frame, {left, right, up, down, jump, noAction, death}) {
    const sprite = this.physics.add.sprite(x, y, 'hero');
    sprite.body.setAllowGravity(false);
    sprite.body.reset(x, y);
    sprite.setFrame(frame);
    sprite.setVisible(true);
    sprite.setScale(0.25);
    return {sprite, actions: {left, right, up, down, jump, noAction, death}};
  }

  create() {
    this.text = null;
    this.cameras.main.setBackgroundColor(0xFFFFFF);
    this.add.image(300, 600, 'bottom');
    this.add.image(300, 260, 'top');

    this.hero = {};
    this.hero = {
      pos1: this.addHeroTo(60, 720, 0,
        { right: "pos2" }
      ),
      pos2: this.addHeroTo(120, 720, 1,
        { jump: "pos3", left: "pos1", right: "takekey" }
      ),
      pos3: this.addHeroTo(80, 590, 2,
        { right: "pos4" }
      ),
      pos4: this.addHeroTo(130, 590, 3,
        { jump: "pos5" }
      ),
      pos5: this.addHeroTo(110, 510, 4,
        { right: "pos6" }
      ),
      pos6: this.addHeroTo(210, 550, 5,
        { right: "pos7", jump: "pos8"}
      ),
      pos7: this.addHeroTo(275, 710, 6,
        { death: true }
      ),
      pos8: this.addHeroTo(275, 450, 7,
        { right: "pos9" }
      ),
      pos9: this.addHeroTo(300, 540, 8,
        { right: "pos10" }
      ),
      pos10: this.addHeroTo(360, 535, 9,
        { right: "pos11", jump: "pos12" }
      ),
      pos11: this.addHeroTo(390, 660, 10,
        { death: true }
      ),
      pos12:  this.addHeroTo(430, 470, 11,
        {  }
      ),
      pos13:  this.addHeroTo(420, 560, 12,
        { }
      ),
      pos14:  this.addHeroTo(490, 620, 13,
        { noAction: "pos15" }
      ),
      pos15:  this.addHeroTo(490, 530, 14,
        { noAction: "pos16" }
      ),
      pos16:  this.addHeroTo(510, 460, 15,
        { noAction: "pos16" }
      ),
    }

    this.base_create();
  }
  _checkTarget() {

  }

}

export default GameScene;
