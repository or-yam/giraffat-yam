import kaboom, { GameObj } from 'kaplay';
import { loadSprites, SPRITES } from './sprites';
import { SCENES, addLoseScene, addWinScene } from './scenes';
import { FLOOR_HEIGHT, GRAVITY, JUMP_FORCE, MAX_SCORE, OBSTACLES, SPEED, BG_SCROLL_RATIO } from './consts';
import { addFloor, addPlayer, spawnBath } from './landscape';

const jump = (player: GameObj) => {
  if (player.isGrounded()) {
    burp({ speed: 5 });
    player.jump(JUMP_FORCE);
  }
};

const k = kaboom();
const {
  scene,
  setGravity,
  add,
  pos,
  area,
  rect,
  width,
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
  text,
  burp,
  sprite,
  scale,
  dt,
  LEFT,
  onUpdate,
  get
} = k;

loadSprites(k);

scene(SCENES.game, () => {
  let score = 0;

  const bgScale = height() / 768;
  const bgWidth = 1376 * bgScale;

  const bg1 = add([
    sprite(SPRITES.bg),
    pos(0, 0),
    anchor('topleft'),
    scale(bgScale),
    'background'
  ]);

  const bg2 = add([
    sprite(SPRITES.bg),
    pos(bgWidth, 0),
    anchor('topleft'),
    scale(bgScale),
    'background'
  ]);

  const currentSpeed = () => SPEED * (1 + score / 2000);

  onUpdate(() => {
    const dtVal = dt();
    const speedVal = currentSpeed();
    bg1.pos.x -= speedVal * BG_SCROLL_RATIO * dtVal;
    bg2.pos.x -= speedVal * BG_SCROLL_RATIO * dtVal;

    if (bg1.pos.x <= -bgWidth) {
      bg1.pos.x = bg2.pos.x + bgWidth;
    }
    if (bg2.pos.x <= -bgWidth) {
      bg2.pos.x = bg1.pos.x + bgWidth;
    }

    get('coral').forEach((c) => {
      const coral = c as GameObj & { passed: boolean };
      if (!coral.passed && coral.pos.x < player.pos.x - 30) {
        coral.passed = true;
        score += 20;
        scoreLabel.text = score.toString();
      }
    });
  });

  setGravity(GRAVITY);
  addFloor(k);

  const player = addPlayer(k);

  onKeyPress('space', () => jump(player));
  onClick(() => jump(player));

  function spawnCoral() {
    wait(1.5, () => {
      const baseWidth = 32;
      const baseHeight = rand(40, 80);
      const startX = width();
      const startY = height() - FLOOR_HEIGHT;

      add([
        rect(baseWidth, baseHeight),
        area(),
        pos(startX, startY),
        anchor('botleft'),
        color(255, 127, 80),
        move(LEFT, currentSpeed()),
        offscreen({ destroy: true }),
        'coral',
        { passed: false }
      ]) satisfies GameObj & { passed: boolean };

      add([
        rect(16, 8),
        area(),
        pos(startX - 4, startY - baseHeight * 0.3),
        anchor('botleft'),
        color(255, 127, 80),
        move(LEFT, currentSpeed()),
        offscreen({ destroy: true })
      ]);

      add([
        rect(12, 6),
        area(),
        pos(startX + baseWidth - 8, startY - baseHeight * 0.5),
        anchor('botleft'),
        color(255, 99, 71),
        move(LEFT, currentSpeed()),
        offscreen({ destroy: true })
      ]);

      add([
        rect(20, 8),
        area(),
        pos(startX - 8, startY - baseHeight * 0.7),
        anchor('botleft'),
        color(255, 99, 71),
        move(LEFT, currentSpeed()),
        offscreen({ destroy: true })
      ]);
    });
    wait(rand(0.8, 2), () => (score >= MAX_SCORE ? spawnBath(k, currentSpeed) : spawnCoral()));
  }

  spawnCoral();

  player.onCollide(OBSTACLES.coral, () => {
    go(SCENES.lose, score);
    burp({ speed: 0.8 });
  });

  player.onCollide(OBSTACLES.bath, () => {
    go(SCENES.win, score);
    burp({ speed: 3 });
  });

  add([
    rect(84, 44),
    pos(width() / 2 - 42, 6),
    anchor('topleft'),
    color(0, 0, 0),
  ]);

  add([
    rect(80, 40),
    pos(width() / 2 - 40, 8),
    anchor('topleft'),
    color(255, 255, 255),
  ]);

  const scoreLabel = add([
    text(score.toString()),
    pos(width() / 2, 30),
    anchor('center'),
    color(0, 0, 0),
  ]);

  const updateScore = () => {
    score++;
    scoreLabel.text = score.toString();
    wait(0.1, updateScore);
  };

  wait(0.1, updateScore);
});

addLoseScene(k);
addWinScene(k);

go(SCENES.game);
