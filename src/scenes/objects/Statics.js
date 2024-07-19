class Statics {
  hideShow(visible) {

  }
  start() {
    this.reseting = false;
    this.objects.key.sprite.setVisible(true);
    this.objects.sword.sprite.setVisible(true);
    this.platform2Pos = "pos1";
    this.platform2["pos1"].sprite.setVisible(true);
    this.platform2["pos2"].sprite.setVisible(false);
    this.showHideFriendPlatform(false);
  }

  tick() {
    if (this.reseting) {
      return;
    }
    this.platform2[this.platform2Pos].sprite.setVisible(false);
    const newPosition = this.platform2[this.platform2Pos].actions.noAction;
    this.platform2Pos = newPosition;
    this.platform2[newPosition].sprite.setVisible(true);
  }

  takeKey() {
    this.objects.key.sprite.setVisible(false);
  }

  leaveKey() {
    this.objects.keyOnLock.sprite.setVisible(false);
    this.objects.key.sprite.setVisible(true);
  }

  openLock() {
    this.objects.keyOnLock.sprite.setVisible(true);
  }

  takeSword() {
    this.objects.sword.sprite.setVisible(false);
  }

  leaveSword() {
    this.objects.sword.sprite.setVisible(true);
  }

  showHideFriendPlatform(visible) {
    this.friendPlatform.pos1.sprite.setVisible(visible);
  }

  reset() {
    this.reseting = true;
    this.objects.key.sprite.setVisible(true);
    this.objects.sword.sprite.setVisible(true);
    this.platform2["pos1"].sprite.setVisible(true);
    this.platform2["pos2"].sprite.setVisible(true);
    this.showHideFriendPlatform(true);
  }

  create(utils) {
    this.reseting = false;
    this.platform2Pos = "pos1";

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
      keyOnLock: utils.addOthers(
        {x: 540, y: 110, frame: 1, scale: 0.20},
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
