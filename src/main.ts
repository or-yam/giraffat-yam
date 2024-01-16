import kaboom from 'kaboom';

const k = kaboom();

const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 800;
const SPEED = 480;

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
  onUpdate,
  addKaboom,
  center
} = k;

// initialize context
setBackground(141, 183, 255);

// load assets
loadSprite('girafa', '/sprites/sea-gerafe_md.png');
loadSprite('bath', '/sprites/bath.png');

scene('game', () => {
  // define gravity
  setGravity(2400);

  // add a game object to screen
  const player = add([
    // list of components
    sprite('girafa'),
    pos(20, 40),
    area(),
    body()
  ]);

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

  // jump when user press space
  onKeyPress('space', jump);
  onClick(jump);

  function spawnTree() {
    // add tree obj
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
    wait(rand(0.8, 2), spawnTree);
  }

  // start spawning trees
  spawnTree();

  // lose if player collides with any game obj with tag "tree"
  player.onCollide('tree', () => {
    // go to "lose" scene and pass the score
    go('lose', score);
    burp({ speed: 3 });
    addKaboom(center());
  });

  // keep track of score
  let score = 0;

  const scoreLabel = add([text(score.toString()), pos(24, 24)]);

  // increment score every frame
  onUpdate(() => {
    score++;
    scoreLabel.text = score.toString();
    if (score === 1000) {
      go('win');
      addKaboom(center());
    }
  });
});

scene('lose', (score) => {
  add([sprite('girafa'), pos(width() / 2, height() / 2 - 64), scale(2), anchor('center')]);

  // display score
  add([text(score), pos(width() / 2, height() / 2 + 64), scale(2), anchor('center')]);

  // go back to game with space is pressed
  onKeyPress('space', () => go('game'));
  onClick(() => go('game'));
});

scene('win', () => {
  add([sprite('bath'), pos(width() / 2, height() / 2 - 64), scale(2), anchor('center')]);
  add([text('You Win'), pos(width() / 2, height() / 2 + 64), scale(2), anchor('center')]);
  onKeyPress('space', () => go('game'));
  onClick(() => go('game'));
});

go('game');
