import { KAPLAYCtx } from 'kaplay';
import { FLOOR_HEIGHT, OBSTACLES, SPEED } from './consts';
import { SPRITES } from './sprites';

export const addFloor = (k: KAPLAYCtx) => {
  k.add([
    k.rect(k.width(), FLOOR_HEIGHT),
    k.pos(0, k.height()),
    k.anchor('botleft'),
    k.area(),
    k.body({ isStatic: true }),
    k.color(120, 135, 110)
  ]);

  k.add([
    k.rect(k.width(), 8),
    k.pos(0, k.height() - FLOOR_HEIGHT + 12),
    k.anchor('botleft'),
    k.color(160, 155, 135),
    k.opacity(0.6)
  ]);

  k.add([
    k.rect(k.width(), 4),
    k.pos(0, k.height() - FLOOR_HEIGHT + 20),
    k.anchor('botleft'),
    k.color(180, 175, 155),
    k.opacity(0.4)
  ]);

  const shimmer = (t: number) => {
    const shift = Math.sin(t * 2) * 10;
    return k.rgb(
      140 + shift,
      150 + Math.floor(shift * 0.5),
      125 + Math.floor(shift * 0.3)
    );
  };

  k.onUpdate(() => {
    const time = k.time();
    const newColor = shimmer(time);
    k.get('floor-shimmer').forEach((e) => {
      e.color = newColor;
    });
  });

  k.add([
    k.rect(k.width(), FLOOR_HEIGHT),
    k.pos(0, k.height()),
    k.anchor('botleft'),
    k.area(),
    k.body({ isStatic: true }),
    k.color(140, 150, 125),
    k.opacity(0.3),
    'floor-shimmer'
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

export const spawnBath = (k: KAPLAYCtx, getSpeed: () => number = () => SPEED) => {
  k.wait(1.5, () =>
    k.add([
      k.sprite(SPRITES.bath),
      k.area(),
      k.pos(k.width(), k.height() - FLOOR_HEIGHT),
      k.anchor('botleft'),
      k.move(k.LEFT, getSpeed()),
      k.offscreen({ destroy: true }),
      OBSTACLES.bath
    ])
  );
  k.wait(k.rand(0.8, 2), () => spawnBath(k, getSpeed));
};
