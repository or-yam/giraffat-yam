import kaboom, { GameObj } from 'kaboom';
import { loadSprites } from './sprites';
import { SCENES, addLoseScene, addWinScene } from './scenes';
import { FLOOR_HEIGHT, GRAVITY, JUMP_FORCE, MAX_SCORE, OBSTACLES, SPEED } from './consts';
import { addFloor, addPlayer, spawnBath } from './landscape';

const jump = (player: GameObj) => {
  if (player.isGrounded()) {
    burp({ speed: 5 });
    player.jump(JUMP_FORCE);
  }
};

const k = kaboom();
const {
  setBackground,
  scene,
  setGravity,
  add,
  pos,
  area,
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
  text,
  burp,
  LEFT,
  onUpdate
} = k;

setBackground(141, 183, 255);
loadSprites(k);

scene(SCENES.game, () => {
  let score = 0;

  setGravity(GRAVITY);
  addFloor(k);

  const player = addPlayer(k);

  onKeyPress('space', () => jump(player));
  onClick(() => jump(player));

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
    wait(rand(0.8, 2), () => (score >= MAX_SCORE ? spawnBath(k) : spawnTree()));
  }

  spawnTree();

  player.onCollide(OBSTACLES.tree, () => {
    go(SCENES.lose, score);
    burp({ speed: 0.8 });
  });

  player.onCollide(OBSTACLES.bath, () => {
    go(SCENES.win, score);
    burp({ speed: 3 });
  });

  const scoreLabel = add([text(score.toString()), pos(width() / 2, 24), color(0, 0, 0)]);

  onUpdate(() => {
    score++;
    scoreLabel.text = score.toString();
  });
});

addLoseScene(k);
addWinScene(k);

go(SCENES.game);
