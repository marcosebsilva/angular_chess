import {
  ChessPieces,
  Colors,
  Directions,
} from '../enums';
import { Piece, Board, BoardBorders } from '../types';

import { Rook } from './rook';

export class King extends Piece {
  private hasMoved = false;
  constructor(color: Colors) {
    super(color, ChessPieces.KING.name, ChessPieces.KING.code);
  }

  private getCastleMoves(currPosition: number, board: Board): number[] {
    const moves = new Set<number>();
    if (this.canCastle(currPosition, board, 'king')) {
      moves.add(currPosition + 2);
    }
    if (this.canCastle(currPosition, board, 'queen')) {
      moves.add(currPosition - 2);
    }
    return Array.from(moves);
  }
  
  private canCastle(currPosition: number, board: Board, side: 'king' | 'queen'): boolean {
    if (this.hasMoved) return false;
  
    const kingIndex = board.indexOf(board[currPosition]);
    const rookIndex = side === 'king' ? kingIndex + 3 : kingIndex - 4;
    const rook = board[rookIndex] as Rook;
  
    if (!rook || rook.getName() !== ChessPieces.ROOK.name || rook.getColor() !== this.getColor() || rook.getHasMoved()) {
      return false;
    }
  
    const tilesBetweenKingAndRook = side === 'king' ? [1, 2] : [-1, -2, -3];
    const isPathClear = tilesBetweenKingAndRook.every(offset => board[kingIndex + offset] == null);
  
    return isPathClear;
  }

  public override getMoves(currPosition: number, board: Board): number[] {
    const piece = board[currPosition];
    if (!piece) return [];
    const moves = new Set<number>();
    const isOccupiedByFriendly = (index: number) =>
      board[index]?.getColor() === piece.getColor();
    const isOutOfBounds = (index: number) => index < 0 || index > 63;

    for (const [direction, offset] of Object.entries(Directions)) {
      const index = currPosition + offset;

      const isOnBorder = () => {
        // this is a hack to handle diagonal directions
        const parsedDirection = direction.split('_').pop();

        return BoardBorders[
          parsedDirection as keyof typeof BoardBorders
        ].includes(currPosition);
      };

      if (isOnBorder()) {
        continue;
      }

      if (isOutOfBounds(index) || isOccupiedByFriendly(index)) {
        continue;
      }

      moves.add(index);
    }

    return [
      ...Array.from(moves),
      ...this.getCastleMoves(currPosition, board),
    ]
  }

  getHasMoved(): boolean {
    return this.hasMoved;
  }

  override finalizeMove(): void {
    this.hasMoved = true;
  }
}
