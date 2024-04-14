class Princess {
  unlock() {
    this.locksStatus--;
    if (this.locksStatus === 0) {
      // free princess
    }
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
  }
}

export default Princess;
