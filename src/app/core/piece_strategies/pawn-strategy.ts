import { Board, Directions, GetMovesStrategy, IPiece } from '../types';

export class PawnStrategy implements GetMovesStrategy {
  execute(piece: IPiece, currPosition: number, board: Board): number[] {
    return [
      ...this.getNormalMoves(piece, currPosition, board),
      ...this.getCaptureMoves(piece, currPosition, board),
    ];
  }

  /**TODO: implement En Passant rule */
  private getEnPassantMoves(): number[] {
    return [];
  }

  /**
   * Returns forward moves, one or two steps, depending on the piece color and position.
   * 
   * @param piece 
   * @param currPosition 
   * @param board 
   * @returns 
   */
  private getNormalMoves(piece: IPiece, currPosition: number, board: Board): number[] {
    const isFirstMove = piece.getColor() == 'white' ? currPosition < 16 : currPosition > 47;
    const direction = piece.getColor() == 'white' ? Directions.UP : Directions.DOWN;
    const ONE_STEP_FORWARD = currPosition + direction;
    const TWO_STEPS_FORWARD = currPosition + direction * 2;

    const moves = [];
    
    if(board[ONE_STEP_FORWARD] === null) {
      moves.push(ONE_STEP_FORWARD);
      if(isFirstMove && board[TWO_STEPS_FORWARD] === null) {
        moves.push(TWO_STEPS_FORWARD);
      }
    };

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
  private getCaptureMoves(piece: IPiece, currPosition: number, board: Board): number[] {
    const leftDiagonalIndex = piece.getColor() == 'white'
        ? currPosition + Directions.UP_LEFT
        : currPosition + Directions.DOWN_RIGHT;

    console.log(leftDiagonalIndex)
    const rightDiagonalIndex = piece.getColor() == 'white'
        ? currPosition + Directions.UP_RIGHT
        : currPosition + Directions.DOWN_LEFT;
        

    const rightDiagonalPiece = board[rightDiagonalIndex];
    const leftDiagonalPiece = board[leftDiagonalIndex];
    const moves: number[] = [];
    const hasPieceOnRightDiagonal = rightDiagonalPiece !== null;
    const hasPieceOnLeftDiagonal = leftDiagonalPiece !== null;


    if(!hasPieceOnRightDiagonal && !hasPieceOnLeftDiagonal) return moves;

    if(hasPieceOnRightDiagonal && rightDiagonalPiece?.getColor() != piece.getColor()) {
        moves.push(rightDiagonalIndex)
    };

    if(hasPieceOnLeftDiagonal && leftDiagonalPiece?.getColor() != piece.getColor()) {
        moves.push(leftDiagonalIndex);
    }

    return moves;
  }
}
