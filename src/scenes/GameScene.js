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
    this.events.on(ACTIONS.death, this.deathStarts, this);
    this.events.on(ACTIONS.deathEnd, this.deathEnds, this);
    this.events.on(ACTIONS.noLives, this.noLives, this);
    this.events.on(ACTIONS.floor3, this.heroFloor3, this);
    this.events.on(ACTIONS.floor2, this.heroFloor2, this);
    this.events.on(ACTIONS.floor1, this.heroFloor1, this);
    this.events.on(ACTIONS.swordHit, this.swordHit, this);
    this.events.on(ACTIONS.heroHitByMonkey, this.heroHitByMonkey, this);
    this.events.on(ACTIONS.heroHitByMonkeyOnMiddleOrRight, this.heroHitByMonkeyOnMiddleOrRight, this);

    this.triggerTimer = this.time.addEvent({
        callback: this.heroTicker,
        callbackScope: this,
        delay: 250, // 1000 = 1 second
        loop: true
    });

    this.normalTimer = this.time.addEvent({
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
    this.heroPos = "pos1";

    this.enemies = new Enemies();
    this.enemies.create(utils);

    this.statics = new Statics();
    this.statics.create(utils);

    this.princess = new Princess();
    this.princess.create(utils);

    this.hero.start();
    this.statics.start();

    this.base_create();

    // Create a helper object for our arrow keys
    this.cursors = this.input.keyboard.createCursorKeys();
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    // init sounds
    this.takeKeySound = this.sound.add('takeKey');
    this.takeSwordSound = this.sound.add('takeSword');
    this.deathSound = this.sound.add('death');
    this.keyPressSound = this.sound.add('keyPress');
  }

  ticker() {
    // todo: check game started
    if (this.hero.isDead()) {
      return;
    }
    this.statics.tick(this.events);
    this.enemies.tick(this.events, this.hero.getPosition());
  }

  heroTicker() {
    this.hero.tick(this.events);
  }

  keyHandler() {
    console.log("KeyHandler called");
    this.takeKeySound.play();
    this.statics.takeKey();
  }

  swordHandler() {
    console.log("SwordHandler called");
    this.takeSwordSound.play();
    this.statics.takeSword();
  }

  inPlatform() {
    this.statics.showHideFriendPlatform(true);
  }
  outPlatform() {
    this.statics.showHideFriendPlatform(false);
  }

  deathStarts() {
    console.warn("Dead starts -->");
    this.hero.death();
    this.enemies.paws();
    this.deathSound.play();
  }

  deathEnds() {
    console.warn("<---- Dead end");
    // TODO flashing ends, a new head appears on top, hero retries
    this.statics.start();
    this.enemies.start();
    this.hero.tryAgain(this.events);
    this.heroPos = "pos1";
  }

  noLives() {
    console.warn("No more lives");
  }

  heroFloor3() {
    this.enemies.changeFloor(ACTIONS.floor3);
  }
  heroFloor2() {
    this.enemies.changeFloor(ACTIONS.floor2);
  }
  heroFloor1() {
    this.enemies.changeFloor(ACTIONS.floor1);
  }

  swordHit() {
    this.enemies.swordHit()
  }

  heroHitByMonkey() {
    console.warn("Hero hit by monkey!!!!");
    this.deathStarts();
  }

  heroHitByMonkeyOnMiddleOrRight() {
    console.warn("Hero hit by monkey on middle or right!", this.enemies.getMonkeyPos());
    // simulates hero move to left by punch
    this.hero.move(ACTIONS.left, this.events, this.enemies.getMonkeyPos());
  }

  update(time, delta) {
    super.update(time, delta);
    /*this.frameTime += delta

    if (this.frameTime > 16.5) {
        this.frameTime = 0;
        // Code that relies on a consistent 60hz update
    }
    console.log("t", time);*/
    if (this.cursors.down.isDown || this.cursors.up.isDown || this.cursors.left.isDown || this.cursors.right.isDown) {
      this.keyPressSound.play();
    }

    if (this.cursors.shift.isDown) {
      this.reseting = true;
    }

    if (this.reseting && this.cursors.shift.isUp) {
      this.reseting = false;
      console.log("Reset pressed");
      if (!this.reseted) {
        this.hero.reset();
        this.heroPos = "pos1";
        this.enemies.reset();
        this.statics.reset();
        this.princess.reset();
        this.reseted = true;
        this.time.addEvent({
          callback: () => {
            this.hero.start();
            this.princess.start();
            this.enemies.start();
            this.statics.start();
            this.reseted = false;
          },
          callbackScope: this,
          delay: 2000,
          loop: false
        });
      }
    }

    const action = this.keysToAction();
    if (action) {
      // TODO take hero position here
      this.hero.move(action, this.events, this.enemies.getMonkeyPos());
    }
  }

  // detects pressed keys and converts to ACTIONS
  keysToAction() {
    if (this.cursors.right.isDown) {
      return ACTIONS.right;
    } else if (this.cursors.left.isDown) {
      return ACTIONS.left;
    }

    if (this.cursors.up.isDown) {
      return ACTIONS.up;
    } else if (this.cursors.down.isDown) {
      return ACTIONS.down;
    }

    if (this.cursors.space.isDown) {
      return ACTIONS.jump;
    }
  }

  _checkTarget() {

  }

}

export default GameScene;
