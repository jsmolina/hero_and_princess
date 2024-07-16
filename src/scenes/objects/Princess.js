class Princess {
  unlock() {
    this._locksStatus--;
    if (this._locksStatus === 0) {
      // free princess
    }
  }
  hideShow(visible) {
    this._allPositions.forEach((pos) => {
      this._positions[pos].sprite.setVisible(visible);
    });
    this._allLocks.forEach((pos) => {
      this._locks[pos].sprite.setVisible(visible);
    });
  }

  start() {
    this.hideShow(false);
    this._locksStatus = 4;
    this._positions["pos1"].sprite.setVisible(true);
    this._allLocks.forEach((pos) => {
      this._locks[pos].sprite.setVisible(true);
    });
  }

  reset() {
    this.hideShow(true);
  }
  openLock(events) {
    if (this._locksStatus > 0) {
      this._locksStatus--;
    }

    if (this._locksStatus === 3) {
      this._locks.lock1.sprite.setVisible(false);
    } else if (this._locksStatus === 2) {
      this._locks.lock2.sprite.setVisible(false);
    } else if (this._locksStatus === 1) {
      this._locks.lock3.sprite.setVisible(false);
    } else if (this._locksStatus === 0) {
      // TODO show princess outside of place now
      this._locks.lock4.sprite.setVisible(false);
    }
  }

  create(utils) {
    this._locksStatus = 4;

    this._positions = {
      pos1: utils.addOthers(
        {x: 540, y: 65, frame: 18, scale: 0.3, visible: true},
        {}
      ),
      pos2: utils.addOthers(
        {x: 557, y: 115, frame: 19, scale: 0.25},
        {}
      ),
    };
    this._locks = {
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

    this._allPositions = Object.keys(this._positions);
    this._allLocks = Object.keys(this._locks);
  }
}

export default Princess;
