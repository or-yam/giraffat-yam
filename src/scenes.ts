import { KAPLAYCtx } from 'kaplay';
import { SPRITES } from './sprites';

export const SCENES = {
  lose: 'lose',
  win: 'win',
  game: 'game'
} as const;

export const addLoseScene = (k: KAPLAYCtx) => {
  const { scene, add, sprite, pos, width, height, scale, anchor, text, color, onKeyPress, go, onClick, rect } = k;
  scene(SCENES.lose, (score) => {
    const bgScale = height() / 768;
    add([sprite(SPRITES.bg), pos(0, 0), anchor('topleft'), scale(bgScale)]);
    add([sprite(SPRITES.bg), pos(1376 * bgScale, 0), anchor('topleft'), scale(bgScale)]);

    const centerX = width() / 2;
    const centerY = height() / 2;

    const girafa = add([sprite(SPRITES.girafa_lg), pos(centerX, centerY - 80), scale(1), anchor('center')]);
    girafa.play('sit');

    const boxW = 300;
    const boxH = 100;
    const boxY = centerY + 80;

    add([rect(boxW, boxH), pos(centerX, boxY), anchor('center'), color(0, 0, 0)]);
    add([rect(boxW - 8, boxH - 8), pos(centerX, boxY), anchor('center'), color(255, 255, 255)]);
    add([text(score), pos(centerX, boxY), scale(2), anchor('center'), color(0, 0, 0)]);

    onKeyPress('space', () => go('game'));
    onClick(() => go('game'));
  });
};

export const addWinScene = (k: KAPLAYCtx) => {
  const { scene, add, sprite, pos, width, height, scale, anchor, text, color, onKeyPress, go, onClick } = k;

  scene(SCENES.win, () => {
    const bgScale = height() / 768;
    add([sprite(SPRITES.bg), pos(0, 0), anchor('topleft'), scale(bgScale)]);
    add([sprite(SPRITES.bg), pos(1376 * bgScale, 0), anchor('topleft'), scale(bgScale)]);

    const girafa = add([sprite(SPRITES.girafa_lg), pos(width() / 2, height() / 1.5), scale(1), anchor('center')]);
    girafa.play('sit');
    add([sprite('bath_lg'), pos(width() / 2, height() / 2 + 120), scale(1), anchor('center')]);
    add([text('You Win'), pos(width() / 2, height() / 2 - 300), scale(2), anchor('center'), color(0, 0, 0)]);

    onKeyPress('space', () => go('game'));
    onClick(() => go('game'));
  });
};
