const ACTIONS = {
  right: "right",
  left: "left",
  up: "up",
  down: "down",
  jump: "jump",
  takeKey: Symbol(),
  takeSword: Symbol(),
  death: Symbol(),
  deathEnd: Symbol(),
  noLives: Symbol(),
  friendPlatform: Symbol(),
  friendPlatformLeave: Symbol(),
  floor3: Symbol(),
  floor2: Symbol(),
  floor1: Symbol(),
  swordHit: Symbol(),
  heroHitByMonkey: Symbol(),
  heroHitByMonkeyOnMiddleOrRight: Symbol(),
  openLock: Symbol(),
  openLockFinished: Symbol(),
  princessFree: Symbol(),
  none: false,
};

const DEFAULT_HITS = 9; // 9

export { ACTIONS, DEFAULT_HITS };
