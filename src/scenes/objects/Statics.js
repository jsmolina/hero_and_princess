class Statics {
  create(utils) {
    this.friendPlatformPos = "pos2";
    this.swordVisible = true;
    this.keyVisible = true;

    this.snake = utils.addOthers(
      {x: 220, y: 620, frame: 2, visible: true},
      {}
    );
    this.dog = utils.addOthers(
      {x: 340, y: 620, frame: 3, visible: true},
      {}
    );
    this.platform = utils.addOthers(
      {x: 315, y: 535, frame: 6, visible: true},
      {}
    ); // gameB might have disappear
    this.platform2 = {
      pos1: utils.addOthers(
        {x: 395, y: 535, frame: 4, visible: true},
        {noAction: "pos2"}
      ),
      pos2: utils.addOthers(
        {x: 425, y: 555, frame: 5},
        {noAction: "pos1"}
      ),
    };

    this.friend = utils.addOthers(
      {x: 550, y: 525, frame: 7, visible: true},
      {}
    );
    this.friendPlatform = {
      pos1: utils.addOthers(
        {x: 520, y: 610, frame: 8, visible: false},
        {}
      ),
      pos2: utils.addOthers(
        {x: 510, y: 595, frame: 9, visible: true},
        {}
      ),
    };
    this.objects = {
      key: utils.addOthers(
        {x: 170, y: 650, frame: 0, visible: true},
        {}
      ),
      sword: utils.addOthers(
        {x: 580, y: 380, frame: 10, visible: true},
        {}
      ),
    };

    this.skull = utils.addOthers(
      {x: 48, y: 295, frame: 16, scale: 0.30, visible: true},
      {}
    )
  };
}

export default Statics;
