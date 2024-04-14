import {Scene, Math as pMath} from 'phaser';

const {Vector2} = pMath;


class PointerBase extends Scene {
  update(time, delta) {

  }

  _checkTarget() {
    // allows setting different target if exceeds boundaries
  }

  base_create() {
    console.log("registry", this.registry.get("ownObjects"))

    // Create a helper object for our arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();
    /*this.target = new Vector2();
    // When the user releases the screen...
    this.input.on('pointerup', (pointer) => {
      // Get the WORLD x and y position of the pointer
      const {worldX, worldY} = pointer;
      this._scene_events(worldX, worldY);

      console.log(worldX, worldY);
      // Assign the world x and y to our vector
      this.target.x = worldX;
      this.target.y = worldY;
      this._checkTarget();

      const xAbs = Math.abs(this.target.x - this.cat.x);

      if (xAbs > 20) {
        if (this.cat.x > this.target.x) {
          this.cat.play({key: 'walk-left', repeat: -1});
        } else {
          this.cat.play({key: 'walk-right', repeat: -1});
        }
      } else {
        if (this.cat.y > this.target.y) {
          this.cat.play({key: 'walk-up', repeat: -1});
        } else {
          this.cat.play({key: 'walk-down', repeat: -1});
        }
      }


      // Position the arrow at our world x and y
      this.arrow.body.reset(worldX, worldY);
      this.arrow.setVisible(true);

      // Start moving our cat towards the target
      this.physics.moveToObject(this.cat, this.target, 300);
    });*/
  }
}

export default PointerBase;
