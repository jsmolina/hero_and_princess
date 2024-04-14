const Statics = (utils) => {

  return {
    snake: utils.addOthers(
      {x: 220, y: 620, frame: 2},
      {}
    ),
    dog: utils.addOthers(
      {x: 340, y: 620, frame: 3},
      {}
    ),
    platform: utils.addOthers(
      {x: 315, y: 535, frame: 6},
      {}
    ), // gameB might have disappear
    platform2: {
      pos1: utils.addOthers(
        {x: 395, y: 535, frame: 4},
        {noAction: "pos2"}
      ),
      pos2: utils.addOthers(
        {x: 425, y: 555, frame: 5},
        {noAction: "pos1"}
      ),
    },

    friend: utils.addOthers(
      {x: 550, y: 525, frame: 7},
      {}
    ),
    friendPlatform: {
      pos1: utils.addOthers(
        {x: 520, y: 610, frame: 8},
        {}
      ),
      pos2: utils.addOthers(
        {x: 510, y: 595, frame: 9},
        {}
      ),
    },
    objects: {
      key: utils.addOthers(
        {x: 170, y: 650, frame: 0},
        {}
      ),
      sword: utils.addOthers(
        {x: 580, y: 380, frame: 10},
        {}
      ),
    },
    skull: utils.addOthers(
      {x: 48, y: 295, frame: 16, scale: 0.30},
      {}
    )
  };
}

export default Statics;
