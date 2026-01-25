import { KAPLAYCtx } from 'kaplay';

export const SPRITES = {
  girafa: 'girafa',
  girafa_lg: 'girafa_lg',
  bath: 'bath',
  bath_lg: 'bath_lg'
} as const;

export const loadSprites = (k: KAPLAYCtx) => {
  k.loadSprite('girafa', '/sprites/girafe-spriteshit.png', {
    sliceX: 7,
    sliceY: 5,
    anims: {
      run: { from: 0, to: 6, loop: true, speed: 10 },
    },
  });
  k.loadSprite('girafa_lg', '/sprites/girafe-spriteshit.png', {
    sliceX: 7,
    sliceY: 5,
    anims: {
      sit: { from: 21, to: 27, loop: false, speed: 5 },
    },
  });
  k.loadSprite('bath', '/sprites/bath.png');
  k.loadSprite('bath_lg', '/sprites/bath_og.png');
};
