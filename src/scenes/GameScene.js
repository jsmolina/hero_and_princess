import PointerBase from "./PointerBase";
import Hero from "./objects/Hero";
import SceneUtils from "./SceneUtils";
import Statics from "./objects/Statics";
import Enemies from "./objects/Enemies";
import Princess from "./objects/Princess";
import { ACTIONS } from "./constants";

class GameScene extends PointerBase {

  constructor() {
    super("scene-game");
  }

  create() {
    this.events.on(ACTIONS.takeKey, this.keyHandler, this);
    this.events.on(ACTIONS.takeSword, this.swordHandler, this);
    this.events.on(ACTIONS.friendPlatform, this.inPlatform, this);
    this.events.on(ACTIONS.friendPlatformLeave, this.outPlatform, this);

    this.triggerTimer = this.time.addEvent({
        callback: this.ticker,
        callbackScope: this,
        delay: 1000, // 1000 = 1 second
        loop: true
    });

    this.frameTime = 0;
    this.reseting = false;
    this.reseted = false;
    this.text = null;
    this.cameras.main.setBackgroundColor(0xFFFFFF);
    this.add.image(300, 500, 'bottom');
    this.add.image(300, 160, 'top');

    const utils = SceneUtils(this.physics);
    this.hero = new Hero();
    this.hero.create(utils);

    this.enemy = new Enemies();
    this.enemy.create(utils);

    this.statics = new Statics();
    this.statics.create(utils);

    this.princess = new Princess();
    this.princess.create(utils);

    this.hero.start();
    this.statics.start();

    this.base_create();

    // Create a helper object for our arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();
  }
  ticker() {
    // todo: check game started
    this.statics.tick(this.events);
    this.hero.tick(this.events);
  }

  keyHandler() {
    console.log("KeyHandler called");
    this.statics.takeKey();
  }

  swordHandler() {
    console.log("SwordHandler called");
    this.statics.takeSword();
  }

  inPlatform() {
    this.statics.showHideFriendPlatform(true);
  }
  outPlatform() {
    this.statics.showHideFriendPlatform(false);
  }

  update(time, delta) {
    super.update(time, delta);
    /*this.frameTime += delta

    if (this.frameTime > 16.5) {
        this.frameTime = 0;
        // Code that relies on a consistent 60hz update
    }
    console.log("t", time);*/

    if (this.cursors.shift.isDown) {
      this.reseting = true;
    }

    if (this.reseting && this.cursors.shift.isUp) {
      this.reseting = false;
      console.log("Reset pressed");
      if (!this.reseted) {
        this.hero.reset();
        this.enemy.reset();
        this.statics.reset();
        this.princess.reset();
        this.reseted = true;
        setTimeout(() => {
          this.hero.start();
          this.princess.start();
          this.enemy.start();
          this.statics.start();
          this.reseted = false;
        }, 2000);
      }
    }

    if (this.cursors.right.isDown) {
      console.log("Right");
      this.hero.move(ACTIONS.right, this.events);
    } else if (this.cursors.left.isDown) {
      this.hero.move(ACTIONS.left, this.events);
    }

    if (this.cursors.up.isDown) {
      this.hero.move(ACTIONS.up, this.events);
    } else if (this.cursors.down.isDown) {
      this.hero.move(ACTIONS.down, this.events);
    }

    if (this.cursors.space.isDown) {
      this.hero.move(ACTIONS.jump, this.events);
    }
  }

  _checkTarget() {

  }

}

export default GameScene;
