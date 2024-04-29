import {Scene} from 'phaser';

class BootScene extends Scene {
  constructor() {
    super("scene-boot");
  }

  preload() {
    // Load any assets here from your assets directory
    //this.load.image('cat-like', 'assets/wednesday.png');
    this.load.image('bottom', 'assets/bottom_bg.png');
    this.load.image('top', 'assets/top_bg.png');
    this.load.image('img', 'assets/spritesheet.png');
    this.load.spritesheet('hero', 'assets/spritesheet.png', {frameWidth: 315, frameHeight: 406});
    this.load.spritesheet('others', 'assets/spritesheet_others.png',
      {frameWidth: 315, frameHeight: 406}
    );
    this.load.audio('takeKey', [ 'assets/sounds/takeKey.ogg' ]);
    /*this.load.spritesheet('wednesday', 'assets/wednesday_sheet2.png', {frameWidth: 50, frameHeight: 51});
    this.load.spritesheet('arrow', 'assets/arrow.png', {frameWidth: 60, frameHeight: 60});
    this.load.image('background', './assets/instituto.jpeg');
    this.load.image('mom_scene_background', './assets/mom_scene.png');
    this.load.image('mom_scene_overlay', './assets/mom_scene_overlay.png');
    this.load.image('morticia', 'assets/morticia.png');*/
    this.load.css('headers', 'main.css');
  }

  create() {
    this.registry.set('ownObjects', []);
    this.scene.start('scene-game');

    /*this.anims.create({
      key: 'arrow-osc',
      frames: this.anims.generateFrameNumbers('arrow'),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'walk-right',
      frames: this.anims.generateFrameNumbers(
        'wednesday',
        { frames: [ 1, 4, 5, 6, 7 ] }
      ),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'walk-left',
      frames: this.anims.generateFrameNumbers(
        'wednesday',
        { frames: [ 2, 8, 9, 10, 11 ] }
      ),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'walk-up',
      frames: this.anims.generateFrameNumbers(
        'wednesday',
        { frames: [ 3, 16, 17, 18, 19 ] }
      ),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'walk-down',
      frames: this.anims.generateFrameNumbers(
        'wednesday',
        { frames: [ 0, 13, 14, 15, 16 ] }
      ),
      frameRate: 10,
      repeat: -1
    });*/
  }
}

export default BootScene;
