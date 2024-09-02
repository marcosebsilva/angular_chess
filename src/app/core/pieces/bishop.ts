import { ChessPieces, Colors, Directions } from '../types';
import { SlidingPiece } from './sliding-piece';

export class Bishop extends SlidingPiece {
  constructor(color: Colors) {
    super(color, ChessPieces.BISHOP.name, ChessPieces.BISHOP.code, {
      UP_LEFT: Directions.UP_LEFT,
      UP_RIGHT: Directions.UP_RIGHT,
      DOWN_LEFT: Directions.DOWN_LEFT,
      DOWN_RIGHT: Directions.DOWN_RIGHT,
    });
  }
}
