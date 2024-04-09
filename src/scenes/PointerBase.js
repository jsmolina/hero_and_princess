import {Scene, Math as pMath} from 'phaser';

const {Vector2} = pMath;


class PointerBase extends Scene {
  /*_scene_events(worldX, worldY) {
    console.log(worldX, worldY, "events");

    this.text && this.text.destroy();
    this.objects.map((object)=> {
      if (worldY > object.minY && worldY <object.maxY  && worldX > object.minX && worldX < object.maxX) {
          this.text = this.add.text(0, 150, object.text, {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif', fontSize: 40});
      }
    });

    this.persons.map((object)=> {
      if (worldY > object.minY && worldY < object.maxY  && worldX > object.minX && worldX < object.maxX) {
          //this.text = this.add.text(0, 150, object.text, {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
        //alert("initiate dialog " + object.dialog)
        this.text = this.add.text(0, 150, object.dialog, {fontFamily: 'CustomFont', fontSize: 40, color: "#a35ec9", fontStyle: "bold"});
        // deberia dejar abajo las opciones de dialogo
      }
    });

  }*/
  // implement this for checking boundaries on children
  /*_boundariesChecks() {

  }*/

  /*stopWednesday(x, y) {
    this.cat.body.reset(x, y);
    this.cat.stop();
    this.arrow.setVisible(false);
    // check exits now!
    console.log("parao", x, y);
    const objetosConseguidos = this.registry.get('ownObjects');
    this.exits.map((salida) => {
      if (this.cat.y > salida.minY && this.cat.y < salida.maxY  && this.cat.x > salida.minX && this.cat.x < salida.maxX) {
        console.log("SALIENDOOO1")
        if (salida.requires && !objetosConseguidos.includes(salida.requires)) {
          this.text = this.add.text(0, 150, salida.text, {fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif'});
        } else {
          console.log("SALIENDOOO")
          this.scene.start(salida.newScene);
        }
      }
    });
  }*/

  update(time, delta) {
    /*// If the cat is moving...
    if (this.cat.body.speed > 0) {
      // Calculate its distance to the target
      const d = pMath.Distance.Between(this.cat.x, this.cat.y, this.target.x, this.target.y);
      // If it's close enough,
      if (d < 4) {
        // Reset it's body so it stops, hide our arrow
        this.stopWednesday(this.target.x, this.target.y);
      }

      this._boundariesChecks();
    }*/
  }

  _checkTarget() {
    // allows setting different target if exceeds boundaries
  }

  base_create() {
    console.log("registry", this.registry.get("ownObjects"))

    //this.arrow = this.physics.add.sprite(0, 0, 'arrow');

    // Add, scale, and make up a speed for our creature
    /*this.cat = this.physics.add.sprite(490, 618, 'wednesday');
    this.cat.body.setAllowGravity(false);
    this.cat.setScale(2);*/

    // Adding an arrow is optional, but a nice touch
    /*this.arrow = this.physics.add.sprite(0, 0, 'arrow');
    this.arrow.body.setAllowGravity(false);
    this.arrow.setVisible(false);
    this.arrow.setScale(0.5);
    this.arrow.play({key: 'arrow-osc', repeat: -1});*/
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
