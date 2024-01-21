import kaboom from 'kaboom';

const k = kaboom();
const {
  setBackground,
  loadSprite,
  scene,
  setGravity,
  add,
  sprite,
  pos,
  area,
  body,
  rect,
  width,
  outline,
  height,
  anchor,
  color,
  onKeyPress,
  onClick,
  rand,
  move,
  wait,
  go,
  offscreen,
  scale,
  text,
  burp,
  LEFT,
  onUpdate
} = k;

const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 900;
const SPEED = 480;
const MAX_SCORE = 1000;

// initialize context
setBackground(141, 183, 255);

// load assets
// loadSprite('girafa', '/sprites/sea-gerafe_md.png');
loadSprite('girafa', '/sprites/new-gerafe.png');
loadSprite('girafa_lg', '/sprites/new-gerafe_lg.png');
loadSprite('bath', '/sprites/bath.png');
loadSprite('bath_lg', '/sprites/bath_og.png');

scene('game', () => {
  setGravity(2400);
  let score = 0;

  const player = add([sprite('girafa'), pos(20, 40), area(), body()]);

  // floor
  add([
    rect(width(), FLOOR_HEIGHT),
    outline(4),
    pos(0, height()),
    anchor('botleft'),
    area(),
    body({ isStatic: true }),
    color(69, 176, 140)
  ]);

  function jump() {
    if (player.isGrounded()) {
      burp({ speed: 5 });
      player.jump(JUMP_FORCE);
    }
  }

  onKeyPress('space', jump);
  onClick(jump);

  function spawnBath() {
    wait(1.5, () =>
      add([
        sprite('bath'),
        area(),
        pos(width(), height() - FLOOR_HEIGHT),
        anchor('botleft'),
        move(LEFT, SPEED),
        offscreen({ destroy: true }),
        'bath'
      ])
    );
    wait(rand(0.8, 2), spawnBath);
  }

  function spawnTree() {
    wait(1.5, () =>
      add([
        rect(48, rand(32, 96), { radius: 10 }),
        area(),
        outline(4),
        pos(width(), height() - FLOOR_HEIGHT),
        anchor('botleft'),
        color(150, 75, 0),
        move(LEFT, SPEED),
        offscreen({ destroy: true }),
        'tree'
      ])
    );
    // wait a random amount of time to spawn next tree
    wait(rand(0.8, 2), () => (score >= MAX_SCORE ? spawnBath() : spawnTree()));
  }

  spawnTree();

  // lose if player collides with any game obj with tag "tree"
  player.onCollide('tree', () => {
    // go to "lose" scene and pass the score
    go('lose', score);
    burp({ speed: 0.8 });
  });

  player.onCollide('bath', () => {
    // go to "win" scene and pass the score
    go('win', score);
    burp({ speed: 3 });
  });

  const scoreLabel = add([text(score.toString()), pos(24, 24), color(0, 0, 0)]);

  onUpdate(() => {
    score++;
    scoreLabel.text = score.toString();
  });
});

scene('lose', (score) => {
  add([sprite('girafa_lg'), pos(width() / 2, height() / 2), scale(1), anchor('center')]);
  add([text(score), pos(width() / 2, height() / 2), scale(2), anchor('center'), color(0, 0, 0)]);

  onKeyPress('space', () => go('game'));
  onClick(() => go('game'));
});

scene('win', () => {
  add([sprite('girafa_lg'), pos(width() / 2, height() / 2), scale(1), anchor('center')]);
  add([sprite('bath_lg'), pos(width() / 2, height() / 2 + 120), scale(1), anchor('center')]);
  add([text('You Win'), pos(width() / 2, height() / 2 - 300), scale(2), anchor('center'), color(0, 0, 0)]);

  onKeyPress('space', () => go('game'));
  onClick(() => go('game'));
});

go('game');
