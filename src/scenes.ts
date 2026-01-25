import { KAPLAYCtx } from 'kaplay';
import { SPRITES } from './sprites';

export const SCENES = {
  lose: 'lose',
  win: 'win',
  game: 'game'
} as const;

export const addLoseScene = (k: KAPLAYCtx) => {
  const { scene, add, sprite, pos, width, height, scale, anchor, text, color, onKeyPress, go, onClick } = k;
  scene(SCENES.lose, (score) => {
    const girafa = add([sprite(SPRITES.girafa_lg), pos(width() / 2.5, height() / 2), scale(1), anchor('center')]);
    girafa.play('sit');
    add([text(score), pos(width() / 2, height() / 2), scale(2), anchor('center'), color(0, 0, 0)]);

    onKeyPress('space', () => go('game'));
    onClick(() => go('game'));
  });
};

export const addWinScene = (k: KAPLAYCtx) => {
  const { scene, add, sprite, pos, width, height, scale, anchor, text, color, onKeyPress, go, onClick } = k;

  scene(SCENES.win, () => {
    const girafa = add([sprite(SPRITES.girafa_lg), pos(width() / 2, height() / 1.5), scale(1), anchor('center')]);
    girafa.play('sit');
    add([sprite('bath_lg'), pos(width() / 2, height() / 2 + 120), scale(1), anchor('center')]);
    add([text('You Win'), pos(width() / 2, height() / 2 - 300), scale(2), anchor('center'), color(0, 0, 0)]);

    onKeyPress('space', () => go('game'));
    onClick(() => go('game'));
  });
};
