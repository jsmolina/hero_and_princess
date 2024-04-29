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

  moveBird() {
    this.bird[this.birdPos].sprite.setVisible(false);
    const newPosition = this.bird[this.birdPos].actions.noAction;
    if (!newPosition) {
      console.log("New position empty", this.bird[this.birdPos].actions);
      return;
    }
    this.birdPos = newPosition;
    this.bird[newPosition].sprite.setVisible(true);
  }

  moveMonkey() {
    // TODO react to swordFight
    // TODO react to get
    const currentNode = this.monkeyFsm[this.monkeyPos];
    console.log("FSM", currentNode.position, this.monkeyPos);
    this.monkey[currentNode.position].sprite.setVisible(false);
    if (currentNode.arm) {
      this.monkeyArm[currentNode.arm].sprite.setVisible(false);
    }
    this.monkeyPos = (this.monkeyPos + 1) % this.monkeyFsm.length;

    const newNode = this.monkeyFsm[this.monkeyPos];
    this.monkey[newNode.position].sprite.setVisible(true);
    if (newNode.arm) {
      this.monkeyArm[newNode.arm].sprite.setVisible(true);
    }
    if (newNode.drop) {
      console.log("DROP! ", newNode.position)
    }
  }

  moveBall() {
    if (!this.ballPos) {
      return;
    }
  }

  tick() {
    if (this.reseting) {
      return;
    }
    this.moveBird();
    this.moveMonkey();
    this.moveBall();
  }

  create(utils) {
    this.reseting = false;
    this.monkeyPos = 0;
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
    };

    this.ballFromArm = {
      left: "topScreenFallsLeft",
      middle: "topScreenFallsMiddle1",
    };

    this.monkeyFsm = [
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
      {position: "middle", arm: "middleTake", drop: false},
      {position: "middle", arm: "middleDrop", drop: true},
      {position: "middle", arm: "middleTake", drop: false},
      {position: "middle", arm: "middleDrop", drop: true},
      {position: "middle", arm: "middleTake", drop: false},
      {position: "middle", arm: "middleDrop", drop: true},
    ];

    this.monkey = {
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

    this.monkeyArm = {
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
        {x: 580, y: 340, frame: 37},
        {}
      ),
      topScreenRight2: utils.addOthers(
        {x: 480, y: 340, frame: 37},
        {}
      ),
      topScreenRight1: utils.addOthers(
        {x: 385, y: 330, frame: 37},
        {}
      ),
      topScreenRight0: utils.addOthers(
        {x: 290, y: 320, frame: 39},
        {}
      ),
      topScreenFallsMiddle1: utils.addOthers(
        {x: 285, y: 230, frame: 39},
        {noAction: "topScreenFallsMiddle2"}
      ),
      topScreenFallsMiddle2: utils.addOthers(
        {x: 285, y: 280, frame: 37},
        {noAction: "downScreenTop"}
      ),
      topScreenLeft1: utils.addOthers(
        {x: 255, y: 310, frame: 37},
        {}
      ),
      topScreenLeft2: utils.addOthers(
        {x: 145, y: 320, frame: 37},
        {}
      ),
      topScreenFallsLeft: utils.addOthers(
        {x: 170, y: 250, frame: 39},
        {}
      ),
      topScreenOverSkull: utils.addOthers(
        {x: 45, y: 260, frame: 39},
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
