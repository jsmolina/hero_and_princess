import {Math as pMath} from 'phaser';
import PointerBase from "./PointerBase";


class GameScene extends PointerBase {

  constructor() {
    super("scene-game");
  }

  addHeroTo({x, y, frame}, {left, right, up, down, jump, noAction, death}) {
    const sprite = this.physics.add.sprite(x, y, 'hero');
    sprite.body.setAllowGravity(false);
    sprite.body.reset(x, y + 40);
    sprite.setFrame(frame);
    sprite.setVisible(true);
    sprite.setScale(0.25);
    return {sprite, actions: {left, right, up, down, jump, noAction, death}};
  }

  addOthers({x, y, frame, scale = 0.25}, {left, right, up, down, jump, noAction}) {
    const sprite = this.physics.add.sprite(x, y, 'others');
    sprite.body.setAllowGravity(false);
    sprite.body.reset(x, y + 40);
    sprite.setFrame(frame);
    sprite.setVisible(true);
    sprite.setScale(scale);
    return {sprite, actions: {left, right, up, down, jump, noAction}};
  }

  create() {
    this.text = null;
    this.cameras.main.setBackgroundColor(0xFFFFFF);
    this.add.image(300, 540, 'bottom');
    this.add.image(300, 200, 'top');

    this.hero = {};
    this.hero = {
      swordIsTaken: false,
      keyIsTaken: false,
      pos1: this.addHeroTo(
        {x: 60, y: 620, frame: 0},
        {right: "pos2"}
      ),
      pos2: this.addHeroTo(
        {x: 120, y: 620, frame: 1},
        {jump: "pos3", left: "pos1", right: "take:key"}
      ),
      pos3: this.addHeroTo(
        {x: 80, y: 490, frame: 2},
        {right: "pos4"}
      ),
      pos4: this.addHeroTo(
        {x: 130, y: 490, frame: 3},
        {jump: "pos5"}
      ),
      pos5: this.addHeroTo(
        {x: 110, y: 410, frame: 4},
        {right: "pos6"}
      ),
      pos6: this.addHeroTo(
        {x: 210, y: 450, frame: 5},
        {right: "pos7", jump: "pos8"}
      ),
      pos7: this.addHeroTo(
        {x: 275, y: 590, frame: 6},
        {death: true}
      ),
      pos8: this.addHeroTo(
        {x: 275, y: 350, frame: 7},
        {right: "pos9"}
      ),
      pos9: this.addHeroTo(
        {x: 300, y: 440, frame: 8},
        {right: "pos10"}
      ),
      pos10: this.addHeroTo(
        {x: 360, y: 435, frame: 9},
        {right: "pos11", jump: "pos12"}
      ),
      pos11: this.addHeroTo(
        {x: 390, y: 560, frame: 10},
        {death: true}
      ),
      pos12: this.addHeroTo(
        {x: 430, y: 370, frame: 11},
        {}
      ),
      pos13: this.addHeroTo(
        {x: 430, y: 460, frame: 12},
        {}
      ),
      pos14: this.addHeroTo(
        {x: 470, y: 520, frame: 13},
        {noAction: "pos15"}
      ),
      pos15: this.addHeroTo(
        {x: 490, y: 430, frame: 14},
        {noAction: "pos16"}
      ),
      pos16: this.addHeroTo(
        {x: 510, y: 360, frame: 15},
        {noAction: "pos17", right: "take:sword"}
      ),
      pos17: this.addHeroTo(
        {x: 510, y: 260, frame: 16},
        {left: "pos19", jump: "pos18"}
      ),
      pos18: this.addHeroTo(
        {x: 490, y: 190, frame: 17},
        {noAction: "pos17", left: "pos19"}
      ),
      pos19: this.addHeroTo(
        {x: 420, y: 260, frame: 18},
        {left: "pos21", jump: "pos20"}
      ),
      pos20: this.addHeroTo(
        {x: 390, y: 165, frame: 19},
        {noAction: "pos19", left: "pos20"}
      ),
      pos21: this.addHeroTo(
        {x: 320, y: 260, frame: 20},
        {left: "pos22"}
      ),
      pos22: this.addHeroTo(
        {x: 180, y: 245, frame: 21},
        {left: "pos23"}
      ),
      pos23: this.addHeroTo(
        {x: 90, y: 245, frame: 22},
        {up: "pos24"}
      ),
      pos24: this.addHeroTo(
        {x: 50, y: 130, frame: 23},
        {right: "pos25", down: "pos23"}
      ),
      pos25: this.addHeroTo(
        {x: 220, y: 120, frame: 24},
        {right: "pos26", left: "pos24"}
      ),
      pos26: this.addHeroTo(
        {x: 360, y: 80, frame: 25},
        {right: "pos27", left: "pos25"}
      ),
      pos27: this.addHeroTo(
        {x: 490, y: 95, frame: 26},
        {right: "openKey", left: "pos26"}
      ),
    };
    // this should be only visible is sword is taken!
    this.heroSword = {
      pos17: this.addOthers({x: 483, y: 298, frame: 23},
        {left: "pos19", jump: "pos18"}
      ),
      pos18: this.addOthers({x: 465, y: 210, frame: 23},
        {noAction: "pos17", left: "pos19"}
      ),
      pos19: this.addOthers({x: 392, y: 296, frame: 23},
        {left: "pos21", jump: "pos20"}
      ),
      pos20: this.addOthers({x: 355, y: 232, frame: 24},
        {noAction: "pos19", left: "pos20"}
      ),
      pos21: this.addOthers({x: 385, y: 284, frame: 25},
        {left: "pos22"}
      ),
      pos22: this.addOthers({x: 248, y: 286, frame: 28},
        {left: "pos23"}
      ),
      pos23: this.addOthers({x: 78, y: 265, frame: 26},
        {up: "pos24"}
      ),
      // right only if monkey is damaged
      pos24: this.addOthers(
        {x: 90, y: 130, frame: 27},
        {right: "pos25", down: "pos23", jump: "pos24_2"}
      ),
      pos24_2: this.addOthers(
        {x: 105, y: 170, frame: 28},
        {right: "pos25", down: "pos23", jump: "pos24"}
      ),
      // right only if monkey is damaged
      pos25: this.addOthers(
        {x: 240, y: 115, frame: 30},
        {right: "pos26", left: "pos24", jump: "pos25_2"}
      ),
      pos25_2: this.addOthers(
        {x: 263, y: 159, frame: 29},
        {right: "pos26", left: "pos24", jump: "pos25"}
      ),
      // right only if monkey is damaged
      pos26: this.addOthers(
        {x: 390, y: 78, frame: 32},
        {right: "pos27", left: "pos25", jump: "pos26_2"}
      ),
      pos26_2: this.addOthers(
        {x: 410, y: 120, frame: 31},
        {right: "pos27", left: "pos25", jump: "pos26"}
      ),
      // opened only if key is owned
      pos27: this.addOthers(
        {x: 540, y: 110, frame: 1, scale: 0.20},
        {right: "openKey", left: "pos26"}
      ),
    };

    this.downBall = {
      pos1: this.addOthers(
        {x: 190, y: 380, frame: 37},
        {noAction: "pos2"}
      ),
      pos2: this.addOthers(
        {x: 170, y: 480, frame: 37},
        {noAction: "pos3"}
      ),
      pos3: this.addOthers(
        {x: 120, y: 610, frame: 37},
        {noAction: "pos1"}
      ),
    }
    this.snake = this.addOthers(
      {x: 220, y: 620, frame: 2},
      {}
    );
    this.dog = this.addOthers(
      {x: 340, y: 620, frame: 3},
      {}
    );
    this.platform = this.addOthers(
      {x: 315, y: 535, frame: 6},
      {}
    ); // gameB might have disappear

    this.platform2 = {
      pos1: this.addOthers(
        {x: 395, y: 535, frame: 4},
        {noAction: "pos2"}
      ),
      pos2: this.addOthers(
        {x: 425, y: 555, frame: 5},
        {noAction: "pos1"}
      ),
    };

    this.friend = this.addOthers(
      {x: 550, y: 525, frame: 7},
      {}
    );
    this.friendPlatform = {
      pos1: this.addOthers(
        {x: 520, y: 610, frame: 8},
        {}
      ),
      pos2: this.addOthers(
        {x: 510, y: 595, frame: 9},
        {}
      ),
    }
    this.objects = {
      key: this.addOthers(
        {x: 170, y: 650, frame: 0},
        {}
      ),
      sword: this.addOthers(
        {x: 580, y: 380, frame: 10},
        {}
      ),
    }
    this.skull = this.addOthers(
      {x: 48, y: 295, frame: 16, scale: 0.30},
      {}
    );

    this.monkey = {
      pos24: this.addOthers(
        {x: 120, y: 130, frame: 20},
        {}
      ),
      pos25: this.addOthers(
        {x: 285, y: 100, frame: 21},
        {}
      ),
      pos26: this.addOthers(
        {x: 430, y: 55, frame: 22, scale: 0.22},
        {}
      ),
    }

    this.monkeyArm = {
      pos24: this.addOthers(
        {x: 194, y: 175, frame: 33},
        {}
      ),
      pos24_1: this.addOthers(
        {x: 115, y: 150, frame: 35},
        {}
      ),
    };

    this.princess = {
      pos1: this.addOthers(
        {x: 540, y: 65, frame: 18, scale: 0.3},
        {}
      ),
      pos2: this.addOthers(
        {x: 557, y: 115, frame: 19, scale: 0.25},
        {}
      ),
    }

    this.lock1 = this.addOthers(
        {x: 530, y: 70, frame: 17},
        {}
    );
    this.lock2 = this.addOthers(
        {x: 610, y: 65, frame: 17},
        {}
    );
    this.lock3 = this.addOthers(
        {x: 535, y: 105, frame: 17},
        {}
    );
    this.lock4 = this.addOthers(
        {x: 610, y: 95, frame: 17},
        {}
    );

    this.base_create();
  }

  _checkTarget() {

  }

}

export default GameScene;
