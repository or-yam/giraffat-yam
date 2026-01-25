import { KAPLAYCtx } from 'kaplay';
import { FLOOR_HEIGHT, OBSTACLES, SPEED } from './consts';
import { SPRITES } from './sprites';

export const addFloor = (k: KAPLAYCtx) => {
  k.add([
    k.rect(k.width(), FLOOR_HEIGHT),
    k.outline(4),
    k.pos(0, k.height()),
    k.anchor('botleft'),
    k.area(),
    k.body({ isStatic: true }),
    k.color(69, 176, 140)
  ]);
};

export const addPlayer = (k: KAPLAYCtx) => {
  const player = k.add([
    k.sprite(SPRITES.girafa, { flipX: true }),
    k.pos(80, 40),
    k.scale(0.6),
    k.area({ scale: k.vec2(0.5, 1) }),
    k.body(),
  ]);
  player.play('run');
  return player;
};

export const spawnBath = (k: KAPLAYCtx) => {
  k.wait(1.5, () =>
    k.add([
      k.sprite(SPRITES.bath),
      k.area(),
      k.pos(k.width(), k.height() - FLOOR_HEIGHT),
      k.anchor('botleft'),
      k.move(k.LEFT, SPEED),
      k.offscreen({ destroy: true }),
      OBSTACLES.bath
    ])
  );
  k.wait(k.rand(0.8, 2), () => spawnBath(k));
};
