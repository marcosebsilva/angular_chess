import { Colors, ChessPieces, Directions } from '../enums';
import { Piece, Board, BoardBorders } from '../types';

export class Pawn extends Piece {
  hasMovedTwoSquares = false;

  constructor(color: Colors) {
    super(color, ChessPieces.PAWN.name, ChessPieces.PAWN.code);
  }

  getMoves(currPosition: number, board: Board): number[] {
    const piece = board[currPosition];
    if (!piece) return [];
    return [
      ...this.getNormalMoves(piece, currPosition, board),
      ...this.getCaptureMoves(piece, currPosition, board),
    ];
  }

  /**
   * Returns forward moves, one or two steps, depending on the piece color and position.
   *
   * @param piece
   * @param currPosition
   * @param board
   * @returns
   */
  private getNormalMoves(
    piece: Piece,
    currPosition: number,
    board: Board
  ): number[] {
    const isFirstMove =
      piece.getColor() == 'white' ? currPosition < 16 : currPosition > 47;
    const direction =
      piece.getColor() == 'white' ? Directions.UP : Directions.DOWN;
    const ONE_STEP_FORWARD = currPosition + direction;
    const TWO_STEPS_FORWARD = currPosition + direction * 2;

    const moves = [];

    if (board[ONE_STEP_FORWARD] === null) {
      moves.push(ONE_STEP_FORWARD);
      if (isFirstMove && board[TWO_STEPS_FORWARD] === null) {
        moves.push(TWO_STEPS_FORWARD);
      }
    }

    return moves;
  }

  /**
   * Returns the capture moves, left and right diagonals.
   *
   * @param piece
   * @param currPosition
   * @param board
   * @returns
   */
  private getCaptureMoves(
    piece: Piece,
    currPosition: number,
    board: Board
  ): number[] {
    const leftDiagonalIndex =
      piece.getColor() == 'white'
        ? currPosition + Directions.UP_LEFT
        : currPosition + Directions.DOWN_RIGHT;

    const rightDiagonalIndex =
      piece.getColor() == 'white'
        ? currPosition + Directions.UP_RIGHT
        : currPosition + Directions.DOWN_LEFT;

    const rightDiagonalPiece = board[rightDiagonalIndex];
    const leftDiagonalPiece = board[leftDiagonalIndex];
    const moves: number[] = [];
    const hasPieceOnRightDiagonal = rightDiagonalPiece !== null;
    const hasPieceOnLeftDiagonal = leftDiagonalPiece !== null;

    if (!hasPieceOnRightDiagonal && !hasPieceOnLeftDiagonal) return moves;

    if (
      !BoardBorders.RIGHT.includes(rightDiagonalIndex) &&
      hasPieceOnRightDiagonal &&
      rightDiagonalPiece?.getColor() != piece.getColor()
    ) {
      moves.push(rightDiagonalIndex);
    }

    if (
      !BoardBorders.LEFT.includes(leftDiagonalIndex) &&
      hasPieceOnLeftDiagonal &&
      leftDiagonalPiece?.getColor() != piece.getColor()
    ) {
      moves.push(leftDiagonalIndex);
    }

    return moves;
  }

  override finalizeMove(from: number, to: number): void {
    if(Math.abs(from - to) === 16) {
      this.hasMovedTwoSquares = true;
    }
  }
}
