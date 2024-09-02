import { Colors, ChessPieces, Directions } from '../types';
import { SlidingPiece } from './sliding-piece';

export class Queen extends SlidingPiece {
  constructor(color: Colors) {
    super(color, ChessPieces.QUEEN.name, ChessPieces.QUEEN.code, Directions);
  }
}
