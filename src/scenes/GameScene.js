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

  addOthers(x, y, frame, noAction) {
    const sprite = this.physics.add.sprite(x, y, 'others');
    sprite.body.setAllowGravity(false);
    sprite.body.reset(x, y);
    sprite.setFrame(frame);
    sprite.setVisible(true);
    sprite.setScale(0.25);
    return {sprite, actions: noAction};
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
      pos7: this.addHeroTo(275, 690, 6,
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
      pos13:  this.addHeroTo(430, 560, 12,
        { }
      ),
      pos14:  this.addHeroTo(470, 620, 13,
        { noAction: "pos15" }
      ),
      pos15:  this.addHeroTo(490, 530, 14,
        { noAction: "pos16" }
      ),
      pos16:  this.addHeroTo(510, 460, 15,
        { noAction: "pos17" }
      ),
      pos17:  this.addHeroTo(510, 360, 16,
        { left: "pos19", jump: "pos18" }
      ),
      pos18:  this.addHeroTo(490, 290, 17,
        { noAction: "pos17", left: "pos19" }
      ),
      pos19:  this.addHeroTo(420, 360, 18,
        { left: "pos21", jump: "pos20" }
      ),
      pos20:  this.addHeroTo(390, 265, 19,
        { noAction: "pos19", left: "pos20" }
      ),
      pos21:  this.addHeroTo(320, 360, 20,
        { left: "pos22" }
      ),
      pos22:  this.addHeroTo(180, 345, 21,
        { left: "pos23" }
      ),
      pos23:  this.addHeroTo(90, 345, 22,
        { up: "pos24" }
      ),
      pos24:  this.addHeroTo(50, 230, 23,
        { right: "pos25", down: "pos23" }
      ),
      pos25:  this.addHeroTo(200, 220, 24,
        { right: "pos26", left: "pos24" }
      ),
      pos26:  this.addHeroTo(340, 180, 25,
        { right: "pos27", left: "pos25" }
      ),
      pos27:  this.addHeroTo(470, 195, 26,
        { right: "openKey", left: "pos26" }
      ),
    }

    this.key = this.addOthers(170, 750, 0);
    this.downBall = {
      pos1: this.addOthers(190, 480, 37, {noAction: "pos2"}),
      pos2: this.addOthers(170, 580, 37, {noAction: "pos3"}),
      pos3: this.addOthers(120, 710, 37, {noAction: "pos1"}),
    }
    this.snake = this.addOthers(220, 720, 2);
    this.dog = this.addOthers(340, 720, 3);
    this.platform = this.addOthers(315, 635, 6); // gameB might have disappear

    this.platform2 = {
      pos1: this.addOthers(395, 635, 4, {noAction:  "pos2"}),
      pos2: this.addOthers(425, 655, 5, {noAction:  "pos1"})
    };

    this.friend = this.addOthers(550, 625, 7);
    this.friendPlatform = {
      pos1: this.addOthers(520, 710, 8),
      pos2: this.addOthers(510, 695, 9),
    }

    this.base_create();
  }
  _checkTarget() {

  }

}

export default GameScene;
