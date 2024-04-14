const SceneUtils = (physics) => {
  return {
    addHeroTo: ({x, y, frame},
                {left, right, up, down, jump, noAction, death}) => {
      const sprite = physics.add.sprite(x, y, 'hero');
      sprite.body.setAllowGravity(false);
      sprite.body.reset(x, y + 0);
      sprite.setFrame(frame);
      sprite.setVisible(false);
      sprite.setScale(0.25);
      return {sprite, actions: {left, right, up, down, jump, noAction, death}};
    },

    addOthers: ({x, y, frame, scale = 0.25, visible = false},
                {left, right, up, down, jump, noAction}) => {
      const sprite = physics.add.sprite(x, y, 'others');
      sprite.body.setAllowGravity(false);
      sprite.body.reset(x, y + 0);
      sprite.setFrame(frame);
      sprite.setVisible(visible);
      sprite.setScale(scale);
      return {sprite, actions: {left, right, up, down, jump, noAction}};
    },
  };
};

export default SceneUtils;
