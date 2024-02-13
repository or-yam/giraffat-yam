import { KaboomCtx } from 'kaboom';

export const SPRITES = {
  girafa: 'girafa',
  girafa_lg: 'girafa_lg',
  bath: 'bath',
  bath_lg: 'bath_lg'
} as const;

export const loadSprites = (k: KaboomCtx) => {
  k.loadSprite('girafa', '/sprites/new-gerafe.png');
  k.loadSprite('girafa_lg', '/sprites/new-gerafe_lg.png');
  k.loadSprite('bath', '/sprites/bath.png');
  k.loadSprite('bath_lg', '/sprites/bath_og.png');
};
