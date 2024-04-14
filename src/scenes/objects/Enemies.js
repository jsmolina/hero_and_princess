const Enemies = (utils) => {

  return {
    monkeyPos: "pos24",
    ballPos: "",
    monkey: {
      pos24: utils.addOthers(
        {x: 120, y: 130, frame: 20},
        {}
      ),
      pos25: utils.addOthers(
        {x: 285, y: 100, frame: 21},
        {}
      ),
      pos26: utils.addOthers(
        {x: 430, y: 55, frame: 22, scale: 0.22},
        {}
      ),
    },
    monkeyArm: {
      pos24: utils.addOthers(
        {x: 194, y: 175, frame: 33},
        {}
      ),
      pos24_1: utils.addOthers(
        {x: 115, y: 150, frame: 35},
        {}
      ),
      pos25: utils.addOthers(
        {x: 270, y: 125, frame: 35},
        {}
      ),
      pos25_1: utils.addOthers(
        {x: 342, y: 145, frame: 33},
        {}
      ),
      pos26: utils.addOthers(
        {x: 435, y: 100, frame: 42, scale: 0.3},
        {}
      ),
      pos26_2: utils.addOthers(
        {x: 465, y: 70, frame: 41, scale: 0.3},
        {}
      ),
      pos26_3: utils.addOthers(
        {x: 480, y: 92, frame: 43, scale: 0.3},
        {}
      ),
    },
    ball: {
      pos1: utils.addOthers(
        {x: 190, y: 380, frame: 37},
        {noAction: "pos2"}
      ),
      pos2: utils.addOthers(
        {x: 170, y: 480, frame: 37},
        {noAction: "pos3"}
      ),
      pos3: utils.addOthers(
        {x: 120, y: 610, frame: 37},
        {noAction: "pos1"}
      ),
      pos17: utils.addOthers(
        {x: 580, y: 340, frame: 37},
        {}
      ),
      pos18: utils.addOthers(
        {x: 480, y: 340, frame: 37},
        {}
      ),
      pos19: utils.addOthers(
        {x: 385, y: 330, frame: 37},
        {}
      ),
      pos20: utils.addOthers(
        {x: 255, y: 310, frame: 37},
        {}
      ),
      pos20_1: utils.addOthers(
        {x: 285, y: 280, frame: 37},
        {}
      ),
      pos20_2: utils.addOthers(
        {x: 285, y: 230, frame: 39},
        {}
      ),
      pos20_3: utils.addOthers(
        {x: 290, y: 320, frame: 39},
        {}
      ),
      pos21: utils.addOthers(
        {x: 145, y: 320, frame: 37},
        {}
      ),
      pos22: utils.addOthers(
        {x: 170, y: 250, frame: 39},
        {}
      ),
      pos23: utils.addOthers(
        {x: 45, y: 260, frame: 39},
        {}
      ),
      pos24_2: utils.addOthers(
        {x: 170, y: 135, frame: 34},
        {}
      ),
      pos25_2:
        utils.addOthers(
          {x: 320, y: 110, frame: 34},
          {}
        ),
    }
  };
}

export default Enemies;
