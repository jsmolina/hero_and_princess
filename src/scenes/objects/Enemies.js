class Enemies {
  hideShow(visible) {
    this.allMonkeyPositions.forEach((pos) => {
      this.monkey[pos].sprite.setVisible(visible);
    });
    this.allMonkeyArmPositions.forEach((pos) => {
      this.monkeyArm[pos].sprite.setVisible(visible);
    });
    this.allBallPositions.forEach((pos) => {
      this.ball[pos].sprite.setVisible(visible);
    });
    this.allBirdPositions.forEach((pos) => {
      this.bird[pos].sprite.setVisible(visible);
    });
  }

  start() {
    this.reseting = false;
    this.hideShow(false);
    // rest
    this.birdPos = "pos1";
    this.bird.pos1.sprite.setVisible(true);
  }

  reset() {
    this.hideShow(true);
    this.reseting = true;
  }

  tick() {
    if (this.reseting) {
      return;
    }
    // move bird
    console.log(this.birdPos, this.bird);
    this.bird[this.birdPos].sprite.setVisible(false);
    const newPosition = this.bird[this.birdPos].actions.noAction;
    if (!newPosition) {
      console.log("New position empty", this.bird[this.birdPos].actions);
      return;
    }
    this.birdPos = newPosition;
    this.bird[newPosition].sprite.setVisible(true);
  }

  create(utils) {
    this.reseting = false;
    this.position = "pos24";
    this.ballPos = undefined;
    this.birdPos = "pos1";

    this.bird = {
      pos1: utils.addOthers(
        {x: 430, y: 365, frame: 11},
        {noAction: "pos2"}
      ),
      pos2: utils.addOthers(
        {x: 350, y: 380, frame: 12},
        {noAction: "pos3"},
      ),
      pos3: utils.addOthers(
        {x: 310, y: 400, frame: 13},
        {noAction: "pos4"},
      ),
      pos4: utils.addOthers(
        {x: 210, y: 380, frame: 14},
        {noAction: "pos5"},
      ),
      pos5: utils.addOthers(
        {x: 100, y: 380, frame: 15},
        {noAction: "pos1"},
      ),
    }
    this.monkeyFsm = [
      {pos: "left", arm: ""},
      {pos: "left", arm: ""}
    ]
    this.monkey = {
      left: utils.addOthers(
        {x: 120, y: 130, frame: 20, visible: false},
        {}
      ),
      middle: utils.addOthers(
        {x: 285, y: 100, frame: 21},
        {}
      ),
      right: utils.addOthers(
        {x: 430, y: 55, frame: 22, scale: 0.22, visible: true},
        {}
      ),
    };
    this.monkeyArm = {
      leftTake: utils.addOthers(
        {x: 170, y: 135, frame: 34},
        {}
      ),
      leftDrop: utils.addOthers(
        {x: 194, y: 175, frame: 33},
        {}
      ),
      leftPunch: utils.addOthers(
        {x: 115, y: 150, frame: 35},
        {}
      ),
      middlePunch: utils.addOthers(
        {x: 270, y: 125, frame: 35},
        {}
      ),
      middleDrop: utils.addOthers(
        {x: 342, y: 145, frame: 33},
        {}
      ),
      middleTake:
        utils.addOthers(
          {x: 320, y: 110, frame: 34},
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
        {x: 470, y: 82, frame: 43, scale: 0.3, visible: true},
        {noAction: "right"}
      ),
    };
    this.ball = {
      downScreenTop: utils.addOthers(
        {x: 190, y: 380, frame: 37},
        {noAction: "downScreenMiddle"}
      ),
      downScreenMiddle: utils.addOthers(
        {x: 170, y: 480, frame: 37},
        {noAction: "downScreenMiddle"}
      ),
      downScreenBottom: utils.addOthers(
        {x: 120, y: 610, frame: 37},
        {noAction: "downScreenBottom"}
      ),
      topScreenRight3: utils.addOthers(
        {x: 580, y: 340, frame: 37, visible: false},
        {}
      ),
      topScreenRight2: utils.addOthers(
        {x: 480, y: 340, frame: 37, visible: false},
        {}
      ),
      topScreenRight1: utils.addOthers(
        {x: 385, y: 330, frame: 37, visible: false},
        {}
      ),
      topScreenRight0: utils.addOthers(
        {x: 290, y: 320, frame: 39},
        {}
      ),
      topScreenFallsMiddle1: utils.addOthers(
        {x: 285, y: 230, frame: 39, visible: false},
        {noAction: "topScreenFallsMiddle2"}
      ),
      topScreenFallsMiddle2: utils.addOthers(
        {x: 285, y: 280, frame: 37, visible: false},
        {noAction: "downScreenTop"}
      ),
      topScreenLeft1: utils.addOthers(
        {x: 255, y: 310, frame: 37, visible: false},
        {}
      ),
      topScreenLeft2: utils.addOthers(
        {x: 145, y: 320, frame: 37, visible: false},
        {}
      ),
      topScreenFallsLeft: utils.addOthers(
        {x: 170, y: 250, frame: 39, visible: false},
        {}
      ),
      topScreenOverSkull: utils.addOthers(
        {x: 45, y: 260, frame: 39, visible: false},
        {}
      ),

    }
    this.allMonkeyPositions = Object.keys(this.monkey);
    this.allMonkeyArmPositions = Object.keys(this.monkeyArm);
    this.allBallPositions = Object.keys(this.ball);
    this.allBirdPositions = Object.keys(this.bird);
  };
}

export default Enemies;
