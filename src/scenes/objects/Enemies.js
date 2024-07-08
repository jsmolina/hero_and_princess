import { ACTIONS, DEFAULT_HITS } from "../constants";

class Enemies {
  hideShow(visible) {
    this._allMonkeyPositions.forEach((pos) => {
      this._monkey[pos].sprite.setVisible(visible);
    });
    this._allMonkeyArmPositions.forEach((pos) => {
      this._monkeyArm[pos].sprite.setVisible(visible);
    });
    this._allBallPositions.forEach((pos) => {
      this._ball[pos].sprite.setVisible(visible);
    });
    this._allBirdPositions.forEach((pos) => {
      this._bird[pos].sprite.setVisible(visible);
    });
  }

  start() {
    this._heroFloor = ACTIONS.floor1;
    this._reseting = false;
    this._pause = false;
    this.hideShow(false);
    // rest
    this._birdPos = "pos1";
    this._bird.pos1.sprite.setVisible(true);
  }

  reset() {
    this.hideShow(true);
    this._reseting = true;
  }

  moveBird(events, heroPos) {
    this._bird[this._birdPos].sprite.setVisible(false);
    const newPosition = this._bird[this._birdPos].actions.noAction;
    if (!newPosition) {
      console.log("New position empty", this._bird[this._birdPos].actions);
      return;
    }
    this._birdPos = newPosition;
    this._bird[newPosition].sprite.setVisible(true);
  }

  _moveMonkeySprite(currentNodeFsm, newNodeFsm) {
    // hide old
    this._monkey[currentNodeFsm.position].sprite.setVisible(false);
    if (currentNodeFsm.arm) {
      this._monkeyArm[currentNodeFsm.arm].sprite.setVisible(false);
    }
    if (!newNodeFsm) {
      return;
    }
    // show new
    this._monkey[newNodeFsm.position].sprite.setVisible(true);
    if (newNodeFsm.arm) {
      this._monkeyArm[newNodeFsm.arm].sprite.setVisible(true);
    }

    // no more than two balls at once
    if (newNodeFsm.drop && this._heroFloor !== ACTIONS.floor3) {
      // if !this._ballPos maybe? wait?
      const ballFsmPositionFromArm = (this._heroFloor === ACTIONS.floor1) ? {
        left: "hBtopScreenFallsLeft",
        middle: "hBtopScreenFallsMiddle1",
      } : {
        left: "hTtopScreenFallsLeft",
        middle: "hTtopScreenFallsMiddle1",
      };

      if (newNodeFsm.position === "left" && !this._leftBallPos) {
        this._leftBallPos = ballFsmPositionFromArm[newNodeFsm.position];
        this._ball[this._leftBallPos].sprite.setVisible(true);
      } else if (newNodeFsm.position === "middle" && !this._middleBallPos) {
        this._middleBallPos = ballFsmPositionFromArm[newNodeFsm.position];
        this._ball[this._middleBallPos].sprite.setVisible(true);
      }
    }
  }

  swordHit() {
    this._hits--;
    console.warn("Swordhit in enemies...", this._hits)
    if (this._hits <= 0) {
      const currentNodeFsm = this._monkeyFightFsm[this._monkeyFsmPos];
      this._hits = DEFAULT_HITS;
      // hide monkey arm
      this._allMonkeyArmPositions.forEach((pos) => {
        this._monkeyArm[pos].sprite.setVisible(false);
      });
      if (this._monkeyPos === "left") {
        console.log("Reached left all hits")
        this._monkeyFsmPos = 3;
        this._monkeyPos = "middle";
      } else if (this._monkeyPos === "middle") {
        console.log("Reached middle all hits")
        this._monkeyFsmPos = 6;
        this._monkeyPos = "right";
      }
      const newNodeFsm = this._monkeyFightFsm[this._monkeyFsmPos];
      this._moveMonkeySprite(currentNodeFsm, newNodeFsm);
    }
  }

  moveMonkey(events, heroPos) {
    if (this._heroFloor === ACTIONS.floor3) {
      const currentNodeFsm = this._monkeyFightFsm[this._monkeyFsmPos];
      // monkey should fight and not move easily
      const doesHit = Math.random();
      // firstFight
      if (this._monkeyPos === "left") {
        if (doesHit <= 0.25) {
           this._monkeyFsmPos = 1;
        } else {
          this._monkeyFsmPos = 0;
        }
        const newNodeFsm = this._monkeyFightFsm[this._monkeyFsmPos];
        this._moveMonkeySprite(currentNodeFsm, newNodeFsm);
      }
    } else {
      const currentNodeFsm = this._monkeyFsm[this._monkeyFsmPos];
      this._monkeyFsmPos = (this._monkeyFsmPos + 1) % this._monkeyFsm.length;
      const newNodeFsm = this._monkeyFsm[this._monkeyFsmPos];
      this._monkeyPos = newNodeFsm.position;
      this._moveMonkeySprite(currentNodeFsm, newNodeFsm);
    }
  }

  getMonkeyPos() {
     return this._monkeyPos;
  }

  _moveBallTo(events, heroPos, newPos) {
    if (newPos) {
      const actualNode = this._ball[newPos];
      if (!actualNode) {
        console.warn("no actualNode found for ", newPos);
        return;
      }
      actualNode.sprite.setVisible(false);
      const noAction = actualNode.actions.noAction;
      const noActionPos = noAction.length < 2 ? noAction[0] : noAction[Math.floor(Math.random() * noAction.length)];
      if (noActionPos) {
        if(!this._ball[noActionPos]) {
          console.warn("no automatic node found", newPos);
          return;
        }
        this._ball[noActionPos].sprite.setVisible(true);
      }
      return noActionPos;
    }
    return newPos;
  }

  moveBall(events, heroPos) {
    this._middleBallPos = this._moveBallTo(events, heroPos, this._middleBallPos);
    this._leftBallPos = this._moveBallTo(events, heroPos, this._leftBallPos);
  }

  checkBallDeaths(events, heroPos) {
    //console.info("heroPos", heroPos, "middleBallpos", this._middleBallPos, "leftBallpos", this._leftBallPos);
    if(this._middleBallPos && this._ball[this._middleBallPos] && this._ball[this._middleBallPos].actions.death) {
      if (this._ball[this._middleBallPos].actions.death.includes(heroPos)) {
        // todo two ticks maybe?
        console.warn("Hero death middle!!", this._middleBallPos, heroPos);
        events.emit(ACTIONS.death);
        return true;
      }
    }

    if(this._leftBallPos && this._ball[this._leftBallPos] && this._ball[this._leftBallPos].actions.death) {
      if (this._ball[this._leftBallPos].actions.death.includes(heroPos)) {
        console.warn("Hero death left!!", this._leftBallPos, heroPos);
        events.emit(ACTIONS.death);
        return true;
      }
    }

    return false;
  }

  checkBirdDeaths(events, heroPos) {
    //console.info("heroPos", heroPos, "birdPos", this._birdPos);
    if(this._birdPos && this._bird[this._birdPos] && this._bird[this._birdPos].actions.death) {
      if (this._bird[this._birdPos].actions.death.includes(heroPos)) {
        console.warn("Hero death by bird!!", this._birdPos, heroPos);
        events.emit(ACTIONS.death);
        return true;
      }
    }
    return false;
  }

  tick(events, heroPos) {
    if (this._reseting || this._pause) {
      return;
    }
    if (this.checkBallDeaths(events, heroPos)) {
      return;
    }
    if (this.checkBirdDeaths(events, heroPos)) {
      return;
    }
    this.moveBird(events, heroPos);
    this.moveMonkey(events, heroPos);
    this.moveBall(events, heroPos);
    // deads
    //TODO console.log("deads", this._middleBallPos, heroPos);
  }

  changeFloor(floor) {
    console.log("Switch to floor", floor);
    this._heroFloor = floor;
    // switch monkey fsm to left
    if (this._heroFloor === ACTIONS.floor3) {
        const currentNodeFsm = this._monkeyFsm[this._monkeyFsmPos];
        this._monkeyPos = "left";
        this._hits = DEFAULT_HITS;
        this._monkeyFsmPos = 0; // change if applies
        const newNodeFsm = this._monkeyFsm[this._monkeyFsmPos];
        this._moveMonkeySprite(currentNodeFsm, newNodeFsm);
    } else if (this._monkeyFight !== "") {
        const currentNodeFsm = this._monkeyFightFsm[this._monkeyFsmPos];
        this._monkeyPos = "left";
        this._monkeyFsmPos = 0;
        const newNodeFsm = this._monkeyFsm[this._monkeyFsmPos];
        this._moveMonkeySprite(currentNodeFsm, newNodeFsm);
    }
  }

  paws() {
    this._pause = true;
  }

  unPaws() {
    this._pause = false;
  }

  create(utils) {
    this._reseting = false;
    this._monkeyFsmPos = 0;
    this._hits = DEFAULT_HITS;
    this._monkeyFight = "";
    this._heroFloor = ACTIONS.floor1;
    this._monkeyPos = "";
    this._middleBallPos = undefined;
    this._leftBallPos = undefined;
    this._birdPos = "pos1";
    this._pause = false;

    this._bird = {
      pos1: utils.addOthers(
        {x: 430, y: 365, frame: 11},
        {noAction: "pos2"}
      ),
      pos2: utils.addOthers(
        {x: 350, y: 380, frame: 12},
        {noAction: "pos3", death: ["pos10"]},
      ),
      pos3: utils.addOthers(
        {x: 310, y: 400, frame: 13},
        {noAction: "pos4", death: ["pos9"]},
      ),
      pos4: utils.addOthers(
        {x: 210, y: 380, frame: 14},
        {noAction: "pos5", death: ["pos6"]},
      ),
      pos5: utils.addOthers(
        {x: 100, y: 380, frame: 15},
        {noAction: "pos1"},
      ),
    };

    this._monkeyFightFsm = [
      {position: "left", arm: "leftDrop", drop: false},
      {position: "left", arm: "leftTake", drop: false},
      {position: "left", arm: "leftPunch", drop: false},
      {position: "middle", arm: "middleDrop", drop: false},
      {position: "middle", arm: "middleTake", drop: false},
      {position: "middle", arm: "middlePunch", drop: false},
      {position: "right", arm: "", drop: false},
      {position: "right", arm: "rightAngry", drop: false},
      {position: "right", arm: "rightTake", drop: false},
      {position: "right", arm: "rightPunch", drop: false},
    ];

    this._monkeyFsm = [
      {position: "left", arm: "leftTake", drop: false},
      {position: "left", arm: "leftDrop", drop: true},
      {position: "middle", arm: "middleTake", drop: false},
      {position: "middle", arm: "middleDrop", drop: true},
      {position: "left", arm: "leftTake", drop: false},
      {position: "left", arm: "leftDrop", drop: true},
      {position: "middle", arm: "middleTake", drop: false},
      {position: "middle", arm: "middleDrop", drop: true},
      {position: "left", arm: "leftDrop", drop: false},
      {position: "left", arm: "leftDrop", drop: false},
      {position: "middle", arm: "middleDrop", drop: false},
      {position: "middle", arm: "middleDrop", drop: false},
      {position: "left", arm: "leftTake", drop: false},
      {position: "left", arm: "leftDrop", drop: true},
      {position: "middle", arm: "middleTake", drop: false},
      {position: "middle", arm: "middleDrop", drop: true},
      {position: "right", arm: "", drop: false},
      {position: "right", arm: "", drop: false},
      {position: "middle", arm: "middleDrop", drop: false},
      {position: "middle", arm: "middleDrop", drop: false},
      {position: "left", arm: "leftDrop", drop: false},
      {position: "left", arm: "leftDrop", drop: false},
      {position: "left", arm: "leftDrop", drop: true},
      {position: "middle", arm: "middleTake", drop: false},
      {position: "middle", arm: "middleDrop", drop: true},
      {position: "middle", arm: "middleTake", drop: false},
      {position: "middle", arm: "middleDrop", drop: true},
      {position: "middle", arm: "middleTake", drop: false},
      {position: "middle", arm: "middleDrop", drop: true},
      {position: "middle", arm: "middleTake", drop: false},
      {position: "middle", arm: "middleDrop", drop: true},
      {position: "middle", arm: "middleTake", drop: false},
      {position: "middle", arm: "middleDrop", drop: true},
      {position: "middle", arm: "middleTake", drop: false},
      {position: "middle", arm: "middleDrop", drop: true},
    ];

    this._monkey = {
      left: utils.addOthers(
        {x: 110, y: 130, frame: 20},
        {}
      ),
      middle: utils.addOthers(
        {x: 265, y: 100, frame: 21},
        {}
      ),
      right: utils.addOthers(
        {x: 420, y: 55, frame: 22},
        {}
      ),
    };

    this._monkeyArm = {
      leftTake: utils.addOthers(
        {x: 160, y: 135, frame: 34},
        {}
      ),
      leftDrop: utils.addOthers(
        {x: 184, y: 175, frame: 33},
        {}
      ),
      leftPunch: utils.addOthers(
        {x: 105, y: 150, frame: 35},
        {}
      ),
      middlePunch: utils.addOthers(
        {x: 250, y: 125, frame: 35},
        {}
      ),
      middleDrop: utils.addOthers(
        {x: 322, y: 145, frame: 33},
        {}
      ),
      middleTake:
        utils.addOthers(
          {x: 300, y: 110, frame: 34},
          {}
      ),
      rightPunch: utils.addOthers(
        {x: 435, y: 100, frame: 42, scale: 0.3},
        {noAction: "right_1"}
      ),
      rightAngry: utils.addOthers(
        {x: 465, y: 70, frame: 41, scale: 0.3},
        {noAction: "right_2"}
      ),
      rightTake: utils.addOthers(
        {x: 470, y: 82, frame: 43, scale: 0.3},
        {noAction: "right"}
      ),
    };

    // if hero is on bottom, ball goes down
    this._ball = {
      hBtopScreenFallsMiddle1: utils.addOthers(
        {x: 285, y: 230, frame: 39},
        {noAction: ["hBtopScreenFallsMiddle2"]}
      ),
      hBtopScreenFallsMiddle2: utils.addOthers(
        {x: 285, y: 280, frame: 37},
        {noAction: ["hBdownScreenTop"]}
      ),
      hBdownScreenTop: utils.addOthers(
        {x: 190, y: 380, frame: 37},
        {noAction: ["hBdownScreenMiddle"]}
      ),
      //, death: ["pos4"]
      hBdownScreenMiddle: utils.addOthers(
        {x: 170, y: 480, frame: 37},
        {noAction: ["hBdownScreenCloseToKey"], death: ["pos4"]}
      ),
      hBdownScreenCloseToKey: utils.addOthers(
        {x: 120, y: 610, frame: 37},
        {noAction: [""], death: ["pos2"]}
      ),
      //leftBallForHeroOnBottom
      hBtopScreenFallsLeft: utils.addOthers(
        {x: 170, y: 250, frame: 39},
        {noAction: ["hBtopScreenFallsLeftFloor"]}
      ),
      hBtopScreenFallsLeftFloor: utils.addOthers(
        {x: 145, y: 320, frame: 37},
        {noAction: ["hBtopScreenOverSkull"]}
      ),
      hBtopScreenOverSkull: utils.addOthers(
        {x: 45, y: 260, frame: 39},
        {noAction: [""]}
      ),
      // hero on top
      // top rightmost
      hTtopScreenRight3: utils.addOthers(
        {x: 580, y: 340, frame: 37},
        {noAction: [""]}
      ),
      hTtopScreenRight2: utils.addOthers(
        {x: 480, y: 340, frame: 37},
        {noAction: ["hTtopScreenRight3"], death: ["pos17"]}
      ),
      hTtopScreenRight1: utils.addOthers(
        {x: 385, y: 330, frame: 37},
        {noAction: ["hTtopScreenRight2"], death: ["pos19"]}
      ),
      hTtopScreenRight0: utils.addOthers(
        {x: 290, y: 320, frame: 39},
        {noAction: ["hTtopScreenLeft1", "hTtopScreenRight1"]}
      ),
      hTtopScreenFallsMiddle1: utils.addOthers(
        {x: 285, y: 230, frame: 39},
        {noAction: ["hTtopScreenFallsMiddle2"]}
      ),
      hTtopScreenFallsMiddle2: utils.addOthers(
        {x: 285, y: 280, frame: 37},
        {noAction: ["hTtopScreenRight0"]}
      ),
      hTtopScreenLeft1: utils.addOthers(
        {x: 255, y: 310, frame: 37},
        {noAction: ["hTtopScreenLeft2"], death: ["pos22"]}
      ),
      hTtopScreenLeft2: utils.addOthers(
        {x: 145, y: 320, frame: 37},
        {noAction: ["hTtopScreenOverSkull"], death: ["pos23"]}
      ),
      // this might not be necessary
      hTtopScreenFallsLeft: utils.addOthers(
        {x: 170, y: 250, frame: 39},
        {noAction: ["hTtopScreenLeft2"]}
      ),
      // this might not be necessary
      hTtopScreenOverSkull: utils.addOthers(
        {x: 45, y: 260, frame: 39},
        {noAction: [""]}
      ),
    };
    this._allMonkeyPositions = Object.keys(this._monkey);
    this._allMonkeyArmPositions = Object.keys(this._monkeyArm);
    this._allBallPositions = Object.keys(this._ball);
    this._allBirdPositions = Object.keys(this._bird);
  };
}

export default Enemies;
