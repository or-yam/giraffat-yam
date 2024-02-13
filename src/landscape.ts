import { KaboomCtx } from 'kaboom';
import { FLOOR_HEIGHT, OBSTACLES, SPEED } from './consts';
import { SPRITES } from './sprites';

export const addFloor = (k: KaboomCtx) => {
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

export const addPlayer = (k: KaboomCtx) => k.add([k.sprite(SPRITES.girafa), k.pos(20, 40), k.area(), k.body()]);

export const spawnBath = (k: KaboomCtx) => {
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
