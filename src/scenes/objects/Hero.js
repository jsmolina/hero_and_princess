
class Hero {
  start() {
      this.position = "pos1";
      this.lives = 3;
      this.keyIsTaken = false;
      this.swordIsTaken = false;
      this.positions.pos1.sprite.setVisible(true);
  }

  create(utils) {
    this.swordIsTaken = false;
    this.keyIsTaken = false;
    this.position = "pos1";
    this.lives = 3;
    // this should be only visible is sword is taken!
    this.swordPositions = {
      pos17: utils.addOthers({x: 483, y: 298, frame: 23},
        {left: "pos19", jump: "pos18"}
      ),
      pos18: utils.addOthers({x: 465, y: 210, frame: 23},
        {noAction: "pos17", left: "pos19"}
      ),
      pos19: utils.addOthers({x: 392, y: 296, frame: 23},
        {left: "pos21", jump: "pos20"}
      ),
      pos20: utils.addOthers({x: 355, y: 232, frame: 24},
        {noAction: "pos19", left: "pos20"}
      ),
      pos21: utils.addOthers({x: 385, y: 284, frame: 25},
        {left: "pos22"}
      ),
      pos22: utils.addOthers({x: 248, y: 286, frame: 28},
        {left: "pos23"}
      ),
      pos23: utils.addOthers({x: 78, y: 265, frame: 26},
        {up: "pos24"}
      ),
      // right only if monkey is damaged
      pos24: utils.addOthers(
        {x: 90, y: 130, frame: 27},
        {right: "pos25", down: "pos23", jump: "pos24_2"}
      ),
      pos24_2: utils.addOthers(
        {x: 105, y: 170, frame: 28},
        {right: "pos25", down: "pos23", jump: "pos24"}
      ),
      // right only if monkey is damaged
      pos25: utils.addOthers(
        {x: 240, y: 115, frame: 30},
        {right: "pos26", left: "pos24", jump: "pos25_2"}
      ),
      pos25_2: utils.addOthers(
        {x: 263, y: 159, frame: 29},
        {right: "pos26", left: "pos24", jump: "pos25"}
      ),
      // right only if monkey is damaged
      pos26: utils.addOthers(
        {x: 390, y: 78, frame: 32},
        {right: "pos27", left: "pos25", jump: "pos26_2"}
      ),
      pos26_2: utils.addOthers(
        {x: 410, y: 120, frame: 31},
        {right: "pos27", left: "pos25", jump: "pos26"}
      ),
      // opened only if key is owned
      pos27: utils.addOthers(
        {x: 540, y: 110, frame: 1, scale: 0.20},
        {right: "openKey", left: "pos26"}
      ),
    };
    this.positions = {
      pos1: utils.addHeroTo(
        {x: 60, y: 620, frame: 0},
        {right: "pos2"}
      ),
      pos2: utils.addHeroTo(
        {x: 120, y: 620, frame: 1},
        {jump: "pos3", left: "pos1", right: "take:key"}
      ),
      pos3: utils.addHeroTo(
        {x: 80, y: 490, frame: 2},
        {right: "pos4"}
      ),
      pos4: utils.addHeroTo(
        {x: 130, y: 490, frame: 3},
        {jump: "pos5"}
      ),
      pos5: utils.addHeroTo(
        {x: 110, y: 410, frame: 4},
        {right: "pos6"}
      ),
      pos6: utils.addHeroTo(
        {x: 210, y: 450, frame: 5},
        {right: "pos7", jump: "pos8"}
      ),
      pos7: utils.addHeroTo(
        {x: 275, y: 590, frame: 6},
        {death: true}
      ),
      pos8: utils.addHeroTo(
        {x: 275, y: 350, frame: 7},
        {right: "pos9"}
      ),
      pos9: utils.addHeroTo(
        {x: 300, y: 440, frame: 8},
        {right: "pos10"}
      ),
      pos10: utils.addHeroTo(
        {x: 360, y: 435, frame: 9},
        {right: "pos11", jump: "pos12"}
      ),
      pos11: utils.addHeroTo(
        {x: 390, y: 560, frame: 10},
        {death: true}
      ),
      pos12: utils.addHeroTo(
        {x: 430, y: 370, frame: 11},
        {}
      ),
      pos13: utils.addHeroTo(
        {x: 430, y: 460, frame: 12},
        {}
      ),
      pos14: utils.addHeroTo(
        {x: 470, y: 520, frame: 13},
        {noAction: "pos15"}
      ),
      pos15: utils.addHeroTo(
        {x: 490, y: 430, frame: 14},
        {noAction: "pos16"}
      ),
      pos16: utils.addHeroTo(
        {x: 510, y: 360, frame: 15},
        {noAction: "pos17", right: "take:sword"}
      ),
      pos17: utils.addHeroTo(
        {x: 510, y: 260, frame: 16},
        {left: "pos19", jump: "pos18"}
      ),
      pos18: utils.addHeroTo(
        {x: 490, y: 190, frame: 17},
        {noAction: "pos17", left: "pos19"}
      ),
      pos19: utils.addHeroTo(
        {x: 420, y: 260, frame: 18},
        {left: "pos21", jump: "pos20"}
      ),
      pos20: utils.addHeroTo(
        {x: 390, y: 165, frame: 19},
        {noAction: "pos19", left: "pos20"}
      ),
      pos21: utils.addHeroTo(
        {x: 320, y: 260, frame: 20},
        {left: "pos22"}
      ),
      pos22: utils.addHeroTo(
        {x: 180, y: 245, frame: 21},
        {left: "pos23"}
      ),
      pos23: utils.addHeroTo(
        {x: 90, y: 245, frame: 22},
        {up: "pos24"}
      ),
      pos24: utils.addHeroTo(
        {x: 50, y: 130, frame: 23},
        {right: "pos25", down: "pos23"}
      ),
      pos25: utils.addHeroTo(
        {x: 220, y: 120, frame: 24},
        {right: "pos26", left: "pos24"}
      ),
      pos26: utils.addHeroTo(
        {x: 360, y: 80, frame: 25},
        {right: "pos27", left: "pos25"}
      ),
      pos27: utils.addHeroTo(
        {x: 490, y: 95, frame: 26},
        {right: "openKey", left: "pos26"}
      ),
    }
  };
}

export default Hero;