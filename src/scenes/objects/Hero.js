import { ACTIONS } from "../constants";

class Hero {
  hideShow(visible) {
    this._allPositions.forEach((pos) => {
      this._positions[pos].sprite.setVisible(visible);
    });
    this._allSwordPositions.forEach((pos) => {
      this._swordPositions[pos].sprite.setVisible(visible);
    });
  }

  start() {
      this.hideShow(false);
      this._dead = false;
      this._moving = false;
      this._position = "pos1";
      this._lives = 3;
      this._keyIsTaken = false;
      this._swordIsTaken = false;
      this._positions.pos1.sprite.setVisible(true);
      this._faces.face1.sprite.setVisible(false);
      this._faces.face2.sprite.setVisible(false);
      this._faces.face3.sprite.setVisible(false);
  }

  reset() {
    this.hideShow(true);
    this._dead = false;
    this._moving = false;
    this._faces.face1.sprite.setVisible(true);
    this._faces.face2.sprite.setVisible(true);
    this._faces.face3.sprite.setVisible(true);
  }

  death(events) {
    this._dead = true;
    this._flashCountsDead = 14;
    this._lives--;
  }

  tryAgain(events) {
    if (!this._dead) {return false;}
    // show faces of death
    if (this._lives === 2) {
      this._faces.face1.sprite.setVisible(true);
    } else if (this._lives === 1) {
      this._faces.face2.sprite.setVisible(true);
    } else if (this._lives === 0) {
      this._faces.face3.sprite.setVisible(true);
    }

    if (this._lives === 0) {
      events.emit(ACTIONS.noLives);
      return;
    }
    this.hideShow(false);
    this._dead = false;
    this._position = "pos1";
    this._keyIsTaken = false;
    this._swordIsTaken = false;
    this._positions.pos1.sprite.setVisible(true);
    return true;
  }

  create(utils) {
    this._autoAction = undefined;
    this._swordIsTaken = false;
    this._keyIsTaken = false;
    this._dead = false;
    this._flashCountsDead = 0;
    this._position = "pos1";
    this._currentSword = "";
    this._timeAutoAction = 0;
    // TODO maybe lives should go to gameScene?
    this._lives = 3;
    this._faces = {
      face1: utils.addOthers({x: 140, y: 60, frame: 36, visible: true},
        {}
      ),
      face2: utils.addOthers({x: 180, y: 60, frame: 36, visible: true},
        {}
      ),
      face3: utils.addOthers({x: 220, y: 60, frame: 36, visible: true},
        {}
      ),
      gameA: utils.addOthers({x: 60, y: 80, frame: 44, scale: 0.4, visible: true},
        {}
      ),
    };
    // this should be only visible is sword is taken!
    this._swordPositions = {
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
      // TODO: right only if monkey is damaged
      pos24: utils.addOthers(
        {x: 80, y: 130, frame: 27},
        {right: "pos25", down: "pos23", jump: "pos24_2"}
      ),
      pos24_2: utils.addOthers(
        {x: 95, y: 170, frame: 28},
        {right: "pos25", down: "pos23", jump: "pos24"}
      ),
      // right only if monkey is damaged
      pos25: utils.addOthers(
        {x: 220, y: 115, frame: 30},
        {right: "pos26", left: "pos24", jump: "pos25_2"}
      ),
      pos25_2: utils.addOthers(
        {x: 243, y: 159, frame: 29},
        {right: "pos26", left: "pos24", jump: "pos25"}
      ),
      // right only if monkey is damaged
      pos26: utils.addOthers(
        {x: 380, y: 78, frame: 32},
        {right: "pos27", left: "pos25", jump: "pos26_2"}
      ),
      pos26_2: utils.addOthers(
        {x: 400, y: 120, frame: 31},
        {right: "pos27", left: "pos25", jump: "pos26"}
      ),
      // opened only if key is owned
      pos27: utils.addOthers(
        {x: 540, y: 110, frame: 1, scale: 0.20},
        {right: "openKey", left: "pos26"}
      ),
    };
    this._positions = {
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
        {right: "pos4", noAction: "pos2"}
      ),
      pos4: utils.addHeroTo(
        {x: 130, y: 490, frame: 3},
        {jump: "pos5", left: "pos3"}
      ),
      pos5: utils.addHeroTo(
        {x: 110, y: 410, frame: 4},
        {right: "pos6", noAction: "pos4"}
      ),
      pos5_1: utils.addHeroTo(
        {x: 110, y: 410, frame: 4},
        {right: "pos6", noAction: "pos4"}
      ),
      pos6: utils.addHeroTo(
        {x: 210, y: 450, frame: 5},
        {jump: "pos8", left: "pos5_1"}
      ),
      pos7: utils.addHeroTo(
        {x: 275, y: 590, frame: 6},
        {death: true}
      ),
      pos8: utils.addHeroTo(
        {x: 265, y: 350, frame: 7},
        {right: "pos9", noAction: "pos9"}
      ),
      pos8_1: utils.addHeroTo(
        {x: 265, y: 350, frame: 7},
        {noAction: "pos6"}
      ),
      pos9: utils.addHeroTo(
        {x: 300, y: 440, frame: 8},
        {right: "pos10", left: "pos7", jump: "pos8_1"}
      ),
      pos10: utils.addHeroTo(
        {x: 360, y: 435, frame: 9},
        {right: "pos11", jump: "pos12", left: "pos9"}
      ),
      pos11: utils.addHeroTo(
        {x: 390, y: 560, frame: 10},
        {death: true}
      ),
      pos12: utils.addHeroTo(
        {x: 430, y: 370, frame: 11},
        { noAction: "pos13" }
      ),
      pos12_1: utils.addHeroTo(
        {x: 430, y: 370, frame: 11},
        { noAction: "pos10" }
      ),
      pos13: utils.addHeroTo(
        {x: 430, y: 460, frame: 12},
        {noAction: "pos14"}
      ),
      pos13_1: utils.addHeroTo(
        {x: 430, y: 460, frame: 12},
        {noAction: "pos12_1"}
      ),
      pos14: utils.addHeroTo(
        {x: 470, y: 520, frame: 13},
        {noAction: "pos15"}
      ),
      pos14_1: utils.addHeroTo(
        {x: 470, y: 520, frame: 13},
        {noAction: "pos13_1"}
      ),
      pos15: utils.addHeroTo(
        {x: 490, y: 430, frame: 14},
        {noAction: "pos16"}
      ),
      pos15_1: utils.addHeroTo(
        {x: 490, y: 430, frame: 14},
        {noAction: "pos14_1"}
      ),
      pos16: utils.addHeroTo(
        {x: 510, y: 360, frame: 15},
        {noAction: "pos17", right: "take:sword"}
      ),
      pos16_1: utils.addHeroTo(
        {x: 510, y: 360, frame: 15},
        {noAction: "pos15_1", right: "take:sword"}
      ),
      pos17: utils.addHeroTo(
        {x: 510, y: 260, frame: 16},
        {left: "pos19", jump: "pos18", right: "pos16_1"}
      ),
      pos18: utils.addHeroTo(
        {x: 490, y: 190, frame: 17},
        {noAction: "pos17", left: "pos19"}
      ),
      pos19: utils.addHeroTo(
        {x: 420, y: 260, frame: 18},
        {left: "pos21", jump: "pos20", right: "pos17"}
      ),
      pos20: utils.addHeroTo(
        {x: 390, y: 165, frame: 19},
        {noAction: "pos19", left: "pos20"}
      ),
      pos21: utils.addHeroTo(
        {x: 320, y: 260, frame: 20},
        {left: "pos22", right: "pos19"}
      ),
      pos22: utils.addHeroTo(
        {x: 180, y: 245, frame: 21},
        {left: "pos23", right: "pos21"}
      ),
      pos23: utils.addHeroTo(
        {x: 90, y: 245, frame: 22},
        {up: "pos24", right: "pos22"}
      ),
      pos24: utils.addHeroTo(
        {x: 40, y: 130, frame: 23},
        {right: "cond:pos25", down: "pos23", jump: "fight:sword"}
      ),
      pos25: utils.addHeroTo(
        {x: 200, y: 120, frame: 24},
        {right: "cond:pos26", left: "pos24", jump: "fight:sword"}
      ),
      pos26: utils.addHeroTo(
        {x: 350, y: 80, frame: 25},
        {right: "cond:pos27", left: "pos25", jump: "fight:sword"}
      ),
      pos27: utils.addHeroTo(
        {x: 490, y: 95, frame: 26},
        {right: "take:openKey", left: "pos26"}
      ),
    }
    this._allPositions = Object.keys(this._positions);
    this._allSwordPositions = Object.keys(this._swordPositions);
  };

  changeSwordPositionIfApplies(oldPosition, newPosition) {
    if (this._allSwordPositions.includes(this._currentSword)) {
      this._swordPositions[this._currentSword].sprite.setVisible(false);
    }
    if (this._swordIsTaken && this._allSwordPositions.includes(newPosition)) {
      this._currentSword = newPosition;
      this._swordPositions[this._currentSword].sprite.setVisible(true);
    }
  }

  getPosition() {
    return this._position;
  }

  swordFight(currentPosition, monkeyPos, events) {
    if (!this._currentSword.includes(currentPosition)) {
      console.log("not includes currentPosition", this._currentSword, currentPosition)
      this._currentSword = currentPosition;
    }
    if((currentPosition === "pos24" && monkeyPos === "left")
      || (currentPosition === "pos25" && monkeyPos === "middle")
      || (currentPosition === "pos26" && monkeyPos === "right")) {
      console.warn("Fightin... emit event ");
      events.emit(ACTIONS.swordHit);
    }
    this._swordPositions[this._currentSword].sprite.setVisible(false);
    this._currentSword = this._swordPositions[this._currentSword].actions.jump
    this._swordPositions[this._currentSword].sprite.setVisible(true);
  }

  changePosition(newPosition, events) {
    this._autoAction = undefined;
    // check for platform events
    if (newPosition === "pos14"|| newPosition === "pos14_1") {
      events.emit(ACTIONS.friendPlatform);
    } else if (this._position === "pos14" || this._position === "pos14_1") {
      events.emit(ACTIONS.friendPlatformLeave);
    }
    // check for floor
    if (this._position === "pos23" && newPosition === "pos24") {
      events.emit(ACTIONS.floor3);
    } else if (this._position === "pos24" && newPosition === "pos23") {
      events.emit(ACTIONS.floor2);
    } else if (this._position === "pos16" && newPosition === "pos17") {
      events.emit(ACTIONS.floor2);
    } else if (this._position === "pos17" && newPosition === "pos16_1") {
      events.emit(ACTIONS.floor1);
    }

    this.changeSwordPositionIfApplies(this._position, newPosition);
    this._positions[this._position].sprite.setVisible(false);
    this._position = newPosition;
    this._positions[this._position].sprite.setVisible(true);

    // detect death position on new Position (fallen)
    if (this._positions[newPosition].actions.death) {
      events.emit(ACTIONS.death);
    }
    // detect future automatic action and set a timeout for it
    if(this._positions[newPosition].actions.noAction) {
      // this will happen when you don't push any other button
      this._autoAction = this._positions[newPosition].actions.noAction;
      this._timeAutoAction = Date.now();
    }
  }

  move(where, events, monkeyPos) {
    if(this._dead) {
      // you don't move while dead, you zombie :)
      return;
    }
    if (this._positions[this._position].actions[where]) {
      const newPosition = this._positions[this._position].actions[where];

      if (newPosition.includes("take:")) {
        if (newPosition.includes("take:key")) {
          if (!this._keyIsTaken) {
            this._keyIsTaken = true;
            events.emit(ACTIONS.takeKey);
          }
        } else if (newPosition.includes("take:sword")) {
          if (!this._swordIsTaken) {
            this._swordIsTaken = true;
            events.emit(ACTIONS.takeSword);
          }
        }
      } else if (newPosition === "fight:sword") {
        console.log("fight sword", this._position);
        this.swordFight(this._position, monkeyPos, events);
      }  else if (newPosition.includes("cond:")) {
        //// switch to new position
        //         this.changePosition(newPosition, events);
        const cleanPos = newPosition.split(":")[1];
        console.log("monkey pos is ", monkeyPos);
        if (cleanPos === "pos25" && monkeyPos === "left") {
          return false;
        } else if (cleanPos === "pos26" && monkeyPos === "middle") {
          return false;
        } else if (cleanPos === "pos27" && monkeyPos === "right") {
          return false;
        }
        console.warn("Moving from", this._position, "to", cleanPos, "monkey", monkeyPos);
        this.changePosition(cleanPos, events);
      } else {
        // if sprite is moved, stop any automatic action
        if (this._autoAction) {
          clearTimeout(this._autoAction);
          this._autoAction = undefined;
        }
        // switch to new position
        this.changePosition(newPosition, events);
      }
    }
  }

  isDead() {
    return this._dead;
  }

  tick(events) {
    if (this._dead && this._flashCountsDead > 0) {
      this._flashCountsDead--;
      this._positions[this._position].sprite.setVisible((this._flashCountsDead % 2) === 0);
      if (this._flashCountsDead === 0) {
        events.emit(ACTIONS.deathEnd);
      }
    }
    if (this._autoAction) {
      const millis = Date.now() - this._timeAutoAction;
      if (millis >= 800) {
        this.changePosition(this._autoAction, events);
      }
    }
  }

}

export default Hero;
