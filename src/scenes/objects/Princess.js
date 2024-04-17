class Princess {
  unlock() {
    this.locksStatus--;
    if (this.locksStatus === 0) {
      // free princess
    }
  }
  hideShow(visible) {
    this.allPositions.forEach((pos) => {
      this.positions[pos].sprite.setVisible(visible);
    });
    this.allLocks.forEach((pos) => {
      this.locks[pos].sprite.setVisible(visible);
    });
  }

  start() {
    this.hideShow(false);
    this.locksStatus = 4;
    this.positions["pos1"].sprite.setVisible(true);
    this.allLocks.forEach((pos) => {
      this.locks[pos].sprite.setVisible(true);
    });
  }

  reset() {
    this.hideShow(true);
  }

  create(utils) {
    this.locksStatus = 4;

    this.positions = {
      pos1: utils.addOthers(
        {x: 540, y: 65, frame: 18, scale: 0.3, visible: true},
        {}
      ),
      pos2: utils.addOthers(
        {x: 557, y: 115, frame: 19, scale: 0.25},
        {}
      ),
    };
    this.locks = {
      lock1: utils.addOthers(
        {x: 530, y: 70, frame: 17, visible: true},
        {}
      ),
      lock2: utils.addOthers(
        {x: 610, y: 65, frame: 17, visible: true},
        {}
      ),
      lock3: utils.addOthers(
        {x: 535, y: 105, frame: 17, visible: true},
        {}
      ),
      lock4: utils.addOthers(
        {x: 610, y: 95, frame: 17, visible: true},
        {}
      ),
    }

    this.allPositions = Object.keys(this.positions);
    this.allLocks = Object.keys(this.locks);
  }
}

export default Princess;
