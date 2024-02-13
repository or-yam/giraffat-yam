import { KaboomCtx } from 'kaboom';
import { SPRITES } from './sprites';

export const SCENES = {
  lose: 'lose',
  win: 'win',
  game: 'game'
} as const;

export const addLoseScene = (k: KaboomCtx) => {
  const { scene, add, sprite, pos, width, height, scale, anchor, text, color, onKeyPress, go, onClick } = k;
  scene(SCENES.lose, (score) => {
    add([sprite(SPRITES.girafa_lg), pos(width() / 2, height() / 2), scale(1), anchor('center')]);
    add([text(score), pos(width() / 2, height() / 2), scale(2), anchor('center'), color(0, 0, 0)]);

    onKeyPress('space', () => go('game'));
    onClick(() => go('game'));
  });
};

export const addWinScene = (k: KaboomCtx) => {
  const { scene, add, sprite, pos, width, height, scale, anchor, text, color, onKeyPress, go, onClick } = k;

  scene(SCENES.win, () => {
    add([sprite('girafa_lg'), pos(width() / 2, height() / 2), scale(1), anchor('center')]);
    add([sprite('bath_lg'), pos(width() / 2, height() / 2 + 120), scale(1), anchor('center')]);
    add([text('You Win'), pos(width() / 2, height() / 2 - 300), scale(2), anchor('center'), color(0, 0, 0)]);

    onKeyPress('space', () => go('game'));
    onClick(() => go('game'));
  });
};
