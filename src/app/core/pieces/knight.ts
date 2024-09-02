import { Piece, Colors, ChessPieces, Board } from '../types';

export class Knight extends Piece {
  constructor(color: Colors) {
    super(color, ChessPieces.KNIGHT.name, ChessPieces.KNIGHT.code);
  }

  override getMoves(currPosition: number, board: Board): number[] {
    const piece = board[currPosition];
    if (!piece) return [];

    const AMOUNT_OF_ROWS_AND_COLUMNS = 8;
    const moves = new Set<number>();
    const isOccupiedByFriendly = (index: number) =>
      board[index]?.getColor() === piece.getColor();
    const isOutOfBounds = (index: number) => index < 0 || index > 63;

    const knightMoves = [
      { rowOffset: 2, colOffset: 1 },
      { rowOffset: 2, colOffset: -1 },
      { rowOffset: -2, colOffset: 1 },
      { rowOffset: -2, colOffset: -1 },
      { rowOffset: 1, colOffset: 2 },
      { rowOffset: 1, colOffset: -2 },
      { rowOffset: -1, colOffset: 2 },
      { rowOffset: -1, colOffset: -2 },
    ];

    const currRow = Math.floor(currPosition / AMOUNT_OF_ROWS_AND_COLUMNS);
    const currCol = currPosition % AMOUNT_OF_ROWS_AND_COLUMNS;

    for (const move of knightMoves) {
      const newRow = currRow + move.rowOffset;
      const newCol = currCol + move.colOffset;
      const newPosition = newRow * AMOUNT_OF_ROWS_AND_COLUMNS + newCol;

      if (
        newRow >= 0 &&
        newRow < AMOUNT_OF_ROWS_AND_COLUMNS &&
        newCol >= 0 &&
        newCol < AMOUNT_OF_ROWS_AND_COLUMNS
      ) {
        if (!isOutOfBounds(newPosition) && !isOccupiedByFriendly(newPosition)) {
          moves.add(newPosition);
        }
      }
    }

    return Array.from(moves);
  }
}
