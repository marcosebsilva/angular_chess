import {
  Directions,
} from '../types';
import { SlidingPieceStrategy } from './sliding-piece-strategy';

export class RookStrategy extends SlidingPieceStrategy {
  constructor() {
    super({
      UP: Directions.UP,
      DOWN: Directions.DOWN,
      LEFT: Directions.LEFT,
      RIGHT: Directions.RIGHT,
    });
  }
}
